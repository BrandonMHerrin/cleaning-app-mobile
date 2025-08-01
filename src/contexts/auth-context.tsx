import { Session } from "@supabase/supabase-js";
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase-client";

type AuthContextType = {
  session: Session | null;
  loading: boolean;

  signUp: (businessName: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const { data: { subscription} } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (businessName: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { businessName },
      },
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};