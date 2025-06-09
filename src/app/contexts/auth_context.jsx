'use client';

import { createClient } from '@/utils/supabase/client';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children, initialSession = null, initialUser = null }) {
  const [session, setSession] = useState(initialSession);
  const [user, setUser] = useState(initialUser);
  const [shownav, setShowNav] = useState(false);
  const supabase = createClient();
  const [activeSection, setActiveSection] = useState('profile');


  const display_name = user?.user_metadata?.first_name && user?.user_metadata?.last_name
    ? `${user.user_metadata.first_name}`
    : user?.email;
  const last_name = user?.user_metadata?.last_name
  const user_email = user?.email

  const refreshUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session)

    if (session) {
      const { data: userData, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(userData.user);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      await refreshUser();
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session) {
        const { data: userData, error } = await supabase.auth.getUser();
        if (!error) {
          setUser(userData.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ refreshUser, user_email, session, user, shownav, setShowNav, display_name, last_name, activeSection, setActiveSection }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
