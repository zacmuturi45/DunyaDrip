'use client';

import { createClient } from '@/utils/supabase/client';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children, initialSession = null, initialUser = null }) {
  const [session, setSession] = useState(initialSession);
  const [user, setUser] = useState(initialUser);
  const [shownav, setShowNav] = useState(false);
  const supabase = createClient();
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState(null);
  const pathname = usePathname();
  const [show_shipping_button, setShowShippingButton] = useState(false);

  
  const display_name = profile?.first_name
    ? `${profile.first_name}`
    : user?.user_metadata.first_name;
  const last_name = profile?.last_name ? profile.last_name : user?.user_metadata.last_name;
  const user_email = user?.email;

  useEffect(() => {
    setShowNav(pathname === '/dashboard');
  }, [pathname, setShowNav]);

  const fetchProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      return;
    }
    const { data, error } = await supabase
    .from('profiles')
    .select('first_name, last_name')
    .eq('unique_identifier', userId)
    .single();
    if (!error) {
      setProfile(data);
    } else {
      setProfile(null)
    }
  };


  const refreshUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session)

    if (session) {
      const { data: userData, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(userData.user);
      } else {
        setUser(null);
        setProfile(null)
      }
    } else {
      setUser(null);
      setProfile(null);
    }
  };

  useEffect(() => {
    if (user?.id) fetchProfile(user.id);
    else setProfile(null);
  }, [user]);

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
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ profile, refreshUser, user_email, session, user, shownav, setShowNav, display_name, last_name, activeSection, setActiveSection, show_shipping_button, setShowShippingButton }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
