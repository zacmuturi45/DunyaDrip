'use client';

import { createClient } from '@/utils/supabase/client';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [shownav, setShowNav] = useState(false);
  const supabase = createClient();

  const display_name = user?.user_metadata?.first_name && user?.user_metadata?.last_name
    ? `${user.user_metadata.first_name}`
    : user?.email;
  const last_name = user?.user_metadata?.last_name
  const user_email = user?.email

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        const { data: userData, error } = await supabase.auth.getUser();
        if (!error) {
          setUser(userData.user);
        } else {
          setUser(null);
        }
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session) {
        const { data: userData, error } = await supabase.auth.getUser();
        if (!error) {
          console.log('User metadata', userData.user.user_metadata)
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
    <AuthContext.Provider value={{ user_email, session, user, shownav, setShowNav, display_name, last_name }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
