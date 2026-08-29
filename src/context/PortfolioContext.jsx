import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { generateSlug } from '../lib/slugGenerator';
import { demoProfile } from '../utils/demoData';
import { useAuth } from './AuthContext';

const PortfolioContext = createContext(undefined);
const DRAFT_KEY = 'stackfolio_active_draft';

const isUUID = (id) => {
  if (!id) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
};

export const PortfolioProvider = ({ children }) => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Helper to persist draft to localStorage
  const saveToLocalStorage = (data) => {
    try {
      if (data) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
      }
    } catch (err) {
      console.warn('Failed to save draft to localStorage:', err);
    }
  };

  const fetchPortfolio = useCallback(async (userId) => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      // 1. First check if a saved draft exists in localStorage
      const localDraftRaw = localStorage.getItem(DRAFT_KEY);
      if (localDraftRaw) {
        try {
          const localDraft = JSON.parse(localDraftRaw);
          if (localDraft && typeof localDraft === 'object') {
            setPortfolio(localDraft);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn('Invalid local draft, continuing to fetch database state...');
        }
      }

      if (userId === 'guest-user-id') {
        const cleanState = {
          id: 'demo-profile-uuid-guest',
          user_id: 'guest-user-id',
          full_name: '',
          headline: '',
          bio: '',
          profile_image_url: '',
          avatar_url: '',
          location: '',
          email: '',
          github_url: '',
          linkedin_url: '',
          selected_template: 'dark_developer',
          is_published: true,
          public_slug: 'my-portfolio',
          experiences: [],
          education: [],
          projects: [],
          skills: [],
          achievements: []
        };
        setPortfolio(cleanState);
        saveToLocalStorage(cleanState);
        setLoading(false);
        return;
      }

      // 2. Fetch complete profile with child tables from Supabase
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select(`
          *,
          experiences (*),
          education (*),
          projects (*),
          skills (*),
          achievements (*)
        `)
        .eq('user_id', userId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        const sortByDisplayOrder = (arr) => {
          return [...(arr || [])].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
        };

        const cleanFullName = data.full_name === 'New User' ? '' : (data.full_name || '');

        const fetchedState = {
          ...data,
          full_name: cleanFullName,
          experiences: sortByDisplayOrder(data.experiences),
          education: sortByDisplayOrder(data.education),
          projects: sortByDisplayOrder(data.projects),
          skills: sortByDisplayOrder(data.skills),
          achievements: sortByDisplayOrder(data.achievements)
        };

        setPortfolio(fetchedState);
        saveToLocalStorage(fetchedState);
      } else {
        // 3. Initialize a clean blank profile if none exists
        const { data: { user } } = await supabase.auth.getUser();
        const slug = generateSlug('my-portfolio');

        const cleanNewProfile = {
          user_id: userId,
          full_name: '',
          headline: '',
          bio: '',
          location: '',
          email: user?.email || '',
          github_url: '',
          linkedin_url: '',
          selected_template: 'dark_developer',
          is_published: true,
          public_slug: slug,
          experiences: [],
          education: [],
          projects: [],
          skills: [],
          achievements: []
        };

        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([cleanNewProfile])
          .select()
          .single();

        if (insertError) {
          // If insert fails (e.g. RLS), fallback to local clean state
          setPortfolio({ id: `local-profile-${userId}`, ...cleanNewProfile });
          saveToLocalStorage({ id: `local-profile-${userId}`, ...cleanNewProfile });
        } else {
          const finalState = {
            ...newProfile,
            full_name: '',
            headline: '',
            bio: '',
            experiences: [],
            education: [],
            projects: [],
            skills: [],
            achievements: []
          };
          setPortfolio(finalState);
          saveToLocalStorage(finalState);
        }
      }
    } catch (err) {
      console.error('Error loading portfolio:', err);
      setError(err.message || 'Failed to load portfolio.');
    } finally {
      setLoading(false);
    }
  }, []);

  const savePortfolio = useCallback(async () => {
    if (!portfolio) return { success: false, error: 'No portfolio loaded' };

    setSaving(true);
    setError(null);

    // Save locally immediately
    saveToLocalStorage(portfolio);

    if (portfolio.user_id === 'guest-user-id' || !isUUID(portfolio.id)) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSaving(false);
      showToast('success', 'Changes saved & persisted locally!');
      return { success: true, guest: true };
    }

    try {
      const profileId = portfolio.id;

      // 1. Update Profile Metadata
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          user_id: user?.id,
          full_name: portfolio.full_name,
          headline: portfolio.headline,
          bio: portfolio.bio,
          profile_image_url: portfolio.profile_image_url,
          location: portfolio.location,
          email: portfolio.email,
          github_url: portfolio.github_url,
          linkedin_url: portfolio.linkedin_url,
          selected_template: portfolio.selected_template,
          is_published: true,
        })
        .eq('id', profileId);

      if (profileError) throw profileError;

      // 2. Sync Child Tables
      const syncChildTable = async (tableName, localItems) => {
        const { data: dbItems, error: getIdsError } = await supabase
          .from(tableName)
          .select('id')
          .eq('profile_id', profileId);

        if (getIdsError) throw getIdsError;

        const dbIds = dbItems ? dbItems.map(item => item.id) : [];
        const localIds = localItems.map(item => item.id).filter(isUUID);

        const idsToDelete = dbIds.filter(id => !localIds.includes(id));
        if (idsToDelete.length > 0) {
          await supabase.from(tableName).delete().in('id', idsToDelete);
        }

        const itemsToUpsert = localItems.map((item, index) => {
          const prepared = {
            ...item,
            profile_id: profileId,
            display_order: index
          };
          if (!isUUID(prepared.id)) {
            delete prepared.id;
          }
          return prepared;
        });

        if (itemsToUpsert.length > 0) {
          await supabase.from(tableName).upsert(itemsToUpsert);
        }
      };

      await syncChildTable('experiences', portfolio.experiences);
      await syncChildTable('education', portfolio.education);
      await syncChildTable('projects', portfolio.projects);
      await syncChildTable('skills', portfolio.skills);
      await syncChildTable('achievements', portfolio.achievements);

      const { data: updatedData } = await supabase
        .from('profiles')
        .select(`
          *,
          experiences (*),
          education (*),
          projects (*),
          skills (*),
          achievements (*)
        `)
        .eq('id', profileId)
        .single();

      if (updatedData) {
        const sortByDisplayOrder = (arr) => {
          return [...(arr || [])].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
        };

        const finalPersistedState = {
          ...updatedData,
          experiences: sortByDisplayOrder(updatedData.experiences),
          education: sortByDisplayOrder(updatedData.education),
          projects: sortByDisplayOrder(updatedData.projects),
          skills: sortByDisplayOrder(updatedData.skills),
          achievements: sortByDisplayOrder(updatedData.achievements)
        };

        setPortfolio(finalPersistedState);
        saveToLocalStorage(finalPersistedState);
      }

      showToast('success', 'Changes saved & persisted successfully!');
      return { success: true };
    } catch (err) {
      console.error('Error saving portfolio:', err);
      setError(err.message || 'Failed to save portfolio.');
      showToast('error', `Save warning: Persisted to local draft (${err.message})`);
      return { success: true, localOnly: true };
    } finally {
      setSaving(false);
    }
  }, [portfolio, user, showToast]);

  const loadDemoData = useCallback(() => {
    const experiences = demoProfile.experiences.map((exp, idx) => ({ ...exp, id: `temp-exp-${idx}` }));
    const education = demoProfile.education.map((edu, idx) => ({ ...edu, id: `temp-edu-${idx}` }));
    const projects = demoProfile.projects.map((proj, idx) => ({ ...proj, id: `temp-proj-${idx}` }));
    const skills = demoProfile.skills.map((skill, idx) => ({ ...skill, id: `temp-skill-${idx}` }));
    const achievements = demoProfile.achievements.map((ach, idx) => ({ ...ach, id: `temp-ach-${idx}` }));

    const demoState = {
      id: portfolio?.id || 'demo-profile-uuid-aarya-shah',
      user_id: portfolio?.user_id || 'guest-user-id',
      full_name: demoProfile.full_name,
      headline: demoProfile.headline,
      bio: demoProfile.bio,
      profile_image_url: demoProfile.profile_image_url,
      location: demoProfile.location,
      email: demoProfile.email,
      github_url: demoProfile.github_url,
      linkedin_url: demoProfile.linkedin_url,
      selected_template: demoProfile.selected_template,
      is_published: true,
      public_slug: 'aarya-shah-r4x9',
      experiences,
      education,
      projects,
      skills,
      achievements
    };

    setPortfolio(demoState);
    saveToLocalStorage(demoState);
    showToast('success', 'Loaded Aarya Shah demo profile!');
  }, [portfolio, showToast]);

  const applyParsedResume = useCallback((parsedDraft) => {
    if (!parsedDraft) return;

    setPortfolio((prev) => {
      const next = {
        ...(prev || {}),
        full_name: parsedDraft.full_name || prev?.full_name || '',
        headline: parsedDraft.headline || prev?.headline || '',
        bio: parsedDraft.bio || prev?.bio || '',
        location: parsedDraft.location || prev?.location || '',
        email: parsedDraft.email || prev?.email || '',
        github_url: parsedDraft.github_url || prev?.github_url || '',
        linkedin_url: parsedDraft.linkedin_url || prev?.linkedin_url || '',
        experiences: parsedDraft.experiences || prev?.experiences || [],
        education: parsedDraft.education || prev?.education || [],
        projects: parsedDraft.projects || prev?.projects || [],
        skills: parsedDraft.skills || prev?.skills || [],
        achievements: parsedDraft.achievements || prev?.achievements || []
      };
      saveToLocalStorage(next);
      return next;
    });
    showToast('success', '📄 Resume successfully parsed & auto-filled!');
  }, [showToast]);

  const updateProfileFields = useCallback((fields) => {
    setPortfolio((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...fields };
      saveToLocalStorage(next);
      return next;
    });
  }, []);

  const updateChildItems = useCallback((tableName, items) => {
    setPortfolio((prev) => {
      if (!prev) return prev;
      const next = { ...prev, [tableName]: items };
      saveToLocalStorage(next);
      return next;
    });
  }, []);

  const value = {
    portfolio,
    loading,
    saving,
    error,
    fetchPortfolio,
    savePortfolio,
    loadDemoData,
    applyParsedResume,
    updateProfileFields,
    updateChildItems,
    toast,
    showToast
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
