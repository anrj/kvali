import { useState, useEffect, useRef } from "react";
import { User, Session } from "@supabase/supabase-js";
import supabase from "../utils/supabase";
import { AuthContext, UserProfile } from "./auth-context";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Use ref to access current user without dependency issues
  const userRef = useRef<User | null>(null);

  // Update ref when user changes
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    let ignore = false;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (ignore) return;

      setUser(session?.user ?? null);
      setSession(session);

      if (session?.user) {
        try {
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          if (!ignore) {
            setProfile(data);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          if (!ignore) setProfile(null);
        }
      } else {
        if (!ignore) setProfile(null);
      }

      if (!ignore) {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (ignore) return;

      if (event === "SIGNED_OUT") {
        setUser(null);
        setSession(null);
        setProfile(null);
        setLoading(false);
      } else if (event === "SIGNED_IN" && !userRef.current) {
        setUser(session?.user ?? null);
        setSession(session);

        if (session?.user) {
          try {
            const { data } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();
            if (!ignore) {
              setProfile(data);
            }
          } catch (error) {
            console.error("Error fetching profile on sign in:", error);
            if (!ignore) setProfile(null);
          }
        }

        if (!ignore) {
          setLoading(false);
        }
      }
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    profile,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
