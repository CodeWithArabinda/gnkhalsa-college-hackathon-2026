import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const LOCAL_SESSION_KEY = 'stackfolio_auth_session';
const LOCAL_USERS_KEY = 'stackfolio_auth_users';

const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  loginAsGuest: () => {}
});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    const getInitialSession = async () => {
      try {
        if (isSupabaseConfigured) {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          if (currentSession) {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.warn('Error fetching Supabase session, checking local storage:', error);
      }

      // Check local storage session fallback
      try {
        const savedSession = localStorage.getItem(LOCAL_SESSION_KEY);
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          if (parsed && parsed.user) {
            setSession(parsed);
            setUser(parsed.user);
          }
        }
      } catch (e) {
        console.warn('Failed to parse local session:', e);
      }

      setLoading(false);
    };

    getInitialSession();

    // 2. Listen for auth changes if Supabase is active
    let subscription = null;
    if (isSupabaseConfigured) {
      const { data } = supabase.auth.onAuthStateChange((_event, currentSession) => {
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }
        setLoading(false);
      });
      subscription = data?.subscription;
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, options = {}) => {
    if (isSupabaseConfigured) {
      try {
        const res = await supabase.auth.signUp({
          email,
          password,
          options
        });
        if (res.data?.user) {
          return res;
        }
        if (res.error && !res.error.message?.includes('Failed to fetch')) {
          return res;
        }
      } catch (err) {
        console.warn('Supabase sign up error, falling back to local auth mode:', err);
      }
    }

    // Local Storage Fallback Signup
    const fullName = options?.data?.full_name || email.split('@')[0] || 'User';
    const localUser = {
      id: `local-user-${Date.now()}`,
      email,
      user_metadata: { full_name: fullName },
      isLocal: true,
      created_at: new Date().toISOString()
    };
    const localSession = {
      user: localUser,
      access_token: `mock-token-${Date.now()}`
    };

    // Save to users registry
    try {
      const existingUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
      existingUsers.push({ email, password, ...localUser });
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(existingUsers));
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(localSession));
    } catch (e) {
      console.warn('Error saving local user:', e);
    }

    setSession(localSession);
    setUser(localUser);
    return { data: { user: localUser, session: localSession }, error: null };
  };

  const signIn = async (email, password) => {
    if (isSupabaseConfigured) {
      try {
        const res = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (res.data?.session) {
          return res;
        }
        if (res.error && !res.error.message?.includes('Failed to fetch')) {
          return res;
        }
      } catch (err) {
        console.warn('Supabase sign in error, falling back to local auth mode:', err);
      }
    }

    // Local Storage Fallback Signin
    try {
      const existingUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
      const found = existingUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      const localUser = found || {
        id: `local-user-${Date.now()}`,
        email,
        user_metadata: { full_name: email.split('@')[0] },
        isLocal: true
      };

      const localSession = {
        user: localUser,
        access_token: `mock-token-${Date.now()}`
      };

      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(localSession));
      setSession(localSession);
      setUser(localUser);
      return { data: { user: localUser, session: localSession }, error: null };
    } catch (e) {
      return { data: { user: null, session: null }, error: { message: 'Local authentication failed' } };
    }
  };

  const loginAsGuest = () => {
    const guestUser = {
      id: 'guest-user-id',
      email: 'guest@stackfolio.demo',
      isGuest: true,
      user_metadata: { full_name: 'Aarya Shah (Guest)' }
    };
    const guestSession = {
      user: guestUser,
      access_token: 'guest-mock-token'
    };

    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(guestSession));
    setUser(guestUser);
    setSession(guestSession);
  };

  const signOut = async () => {
    localStorage.removeItem(LOCAL_SESSION_KEY);
    setUser(null);
    setSession(null);
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase sign out error:', e);
      }
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    loginAsGuest
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
