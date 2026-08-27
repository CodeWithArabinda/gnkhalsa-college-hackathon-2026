import React, { createContext, useContext, useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { generateSlug } from '../lib/slugGenerator';
import { demoProfile } from '../utils/demoData';
import { useAuth } from './AuthContext';

const PortfolioContext = createContext(undefined);

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

  const fetchPortfolio = useCallback(async (userId) => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      if (userId === 'guest-user-id') {
        const experiences = demoProfile.experiences.map((exp, idx) => ({ ...exp, id: `temp-exp-${idx}` }));
        const education = demoProfile.education.map((edu, idx) => ({ ...edu, id: `temp-edu-${idx}` }));
        const projects = demoProfile.projects.map((proj, idx) => ({ ...proj, id: `temp-proj-${idx}` }));
        const skills = demoProfile.skills.map((skill, idx) => ({ ...skill, id: `temp-skill-${idx}` }));
        const achievements = demoProfile.achievements.map((ach, idx) => ({ ...ach, id: `temp-ach-${idx}` }));

        setPortfolio({
          id: 'demo-profile-uuid-aarya-shah',
          user_id: 'guest-user-id',
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
        });
        setLoading(false);
        return;
      }

      // 1. Fetch complete profile with child tables
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
        // Sort child tables by display_order
        const sortByDisplayOrder = (arr) => {
          return [...(arr || [])].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
        };

        setPortfolio({
          ...data,
          experiences: sortByDisplayOrder(data.experiences),
          education: sortByDisplayOrder(data.education),
          projects: sortByDisplayOrder(data.projects),
          skills: sortByDisplayOrder(data.skills),
          achievements: sortByDisplayOrder(data.achievements)
        });
      } else {
        // 2. Initialize a new profile if none exists
        // Get user session metadata for default name
        const { data: { user } } = await supabase.auth.getUser();
        const defaultName = user?.user_metadata?.full_name || 'New User';
        const slug = generateSlug(defaultName);

        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([{
            user_id: userId,
            full_name: defaultName,
            headline: '',
            bio: '',
            location: '',
            email: user?.email || '',
            selected_template: 'dark_developer',
            is_published: false,
            public_slug: slug
          }])
          .select()
          .single();

        if (insertError) throw insertError;

        setPortfolio({
          ...newProfile,
          experiences: [],
          education: [],
          projects: [],
          skills: [],
          achievements: []
        });
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

    if (portfolio.user_id === 'guest-user-id') {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSaving(false);
      return { success: true, guest: true };
    }

    setSaving(true);
    setError(null);

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
          is_published: portfolio.is_published,
        })
        .eq('id', profileId);

      if (profileError) throw profileError;

      // 2. Sync Child Tables (Helper function)
      const syncChildTable = async (tableName, localItems) => {
        // Fetch existing IDs from DB
        const { data: dbItems, error: getIdsError } = await supabase
          .from(tableName)
          .select('id')
          .eq('profile_id', profileId);

        if (getIdsError) throw getIdsError;

        const dbIds = dbItems ? dbItems.map(item => item.id) : [];
        const localIds = localItems.map(item => item.id).filter(isUUID);

        // Identify items to delete
        const idsToDelete = dbIds.filter(id => !localIds.includes(id));
        if (idsToDelete.length > 0) {
          const { error: deleteError } = await supabase
            .from(tableName)
            .delete()
            .in('id', idsToDelete);
          if (deleteError) throw deleteError;
        }

        // Prepare upsert items
        const itemsToUpsert = localItems.map((item, index) => {
          const prepared = {
            ...item,
            profile_id: profileId,
            display_order: index
          };
          // Remove ID if temporary
          if (!isUUID(prepared.id)) {
            delete prepared.id;
          }
          return prepared;
        });

        if (itemsToUpsert.length > 0) {
          const { error: upsertError } = await supabase
            .from(tableName)
            .upsert(itemsToUpsert);
          if (upsertError) throw upsertError;
        }
      };

      // Run syncs
      await syncChildTable('experiences', portfolio.experiences);
      await syncChildTable('education', portfolio.education);
      await syncChildTable('projects', portfolio.projects);
      await syncChildTable('skills', portfolio.skills);
      await syncChildTable('achievements', portfolio.achievements);

      // Re-fetch complete portfolio to get database UUIDs and clean state
      const { data: updatedData, error: refreshError } = await supabase
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

      if (refreshError) throw refreshError;

      const sortByDisplayOrder = (arr) => {
        return [...(arr || [])].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
      };

      setPortfolio({
        ...updatedData,
        experiences: sortByDisplayOrder(updatedData.experiences),
        education: sortByDisplayOrder(updatedData.education),
        projects: sortByDisplayOrder(updatedData.projects),
        skills: sortByDisplayOrder(updatedData.skills),
        achievements: sortByDisplayOrder(updatedData.achievements)
      });

      return { success: true };
    } catch (err) {
      console.error('Error saving portfolio:', err);
      setError(err.message || 'Failed to save portfolio.');
      return { success: false, error: err.message };
    } finally {
      setSaving(false);
    }
  }, [portfolio]);

  const loadDemoData = useCallback(() => {
    if (!portfolio) return;

    const { id: profileId, user_id: userId, public_slug: activeSlug } = portfolio;

    const experiences = demoProfile.experiences.map((exp, idx) => ({ ...exp, id: `temp-exp-${idx}` }));
    const education = demoProfile.education.map((edu, idx) => ({ ...edu, id: `temp-edu-${idx}` }));
    const projects = demoProfile.projects.map((proj, idx) => ({ ...proj, id: `temp-proj-${idx}` }));
    const skills = demoProfile.skills.map((skill, idx) => ({ ...skill, id: `temp-skill-${idx}` }));
    const achievements = demoProfile.achievements.map((ach, idx) => ({ ...ach, id: `temp-ach-${idx}` }));

    setPortfolio({
      id: profileId,
      user_id: userId,
      full_name: demoProfile.full_name,
      headline: demoProfile.headline,
      bio: demoProfile.bio,
      profile_image_url: demoProfile.profile_image_url,
      location: demoProfile.location,
      email: demoProfile.email,
      github_url: demoProfile.github_url,
      linkedin_url: demoProfile.linkedin_url,
      selected_template: demoProfile.selected_template,
      is_published: portfolio.is_published,
      public_slug: activeSlug,
      experiences,
      education,
      projects,
      skills,
      achievements
    });
  }, [portfolio]);

  const updateProfileFields = useCallback((fields) => {
    setPortfolio((prev) => {
      if (!prev) return prev;
      return { ...prev, ...fields };
    });
  }, []);

  const updateChildItems = useCallback((tableName, items) => {
    setPortfolio((prev) => {
      if (!prev) return prev;
      return { ...prev, [tableName]: items };
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
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
