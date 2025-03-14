import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const loadSavedSession = async () => {
      try {
        const savedSession = await AsyncStorage.getItem("session");
        if (savedSession) {
          setSession(JSON.parse(savedSession));
        }
      } catch (error) {
        console.error("Error loading saved session:", error);
      }
    };

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        AsyncStorage.setItem("session", JSON.stringify(session));
      }
      setIsLoading(false);
    });

    loadSavedSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        await AsyncStorage.setItem("session", JSON.stringify(session));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem("session");
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
