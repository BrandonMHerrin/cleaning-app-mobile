import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useAuth } from "@/src/contexts/auth-context";
import { User } from "@supabase/supabase-js";

/**
 * ProfileScreen component displays the user's profile information.
 * It shows the user's email and provides an option to sign out.
 * If the user is not authenticated, it redirects to the landing page.
 */
export default function ProfileScreen() {
  // State to hold user information
  const [user, setUser] = useState<User | undefined>(undefined);

  // Access the authentication context to get the current session and handle sign out
  const { session, signOut } = useAuth();

  // Effect to set the user state when the component mounts
  // If the session is not available, it redirects to the landing page.
  useEffect(() => {
    if (session) {
      setUser(session.user);
    } else {
      router.replace("/");
    }
  }, []);

  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <View className="flex-1 bg-slate-900">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-white text-3xl font-bold text-center mb-4">
          Profile
        </Text>
        <Text className="text-slate-300 text-lg text-center mb-2">
          Welcome, {user?.email || "User"}!
        </Text>
        <Text className="text-slate-300 text-lg text-center">
          This is your profile page.
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Pressable onPress={handleSignOut} className="mt-4">
          <Text className="text-slate-900 text-lg text-center bg-slate-100 w-32 py-2 rounded mt-4">
            Sign Out
          </Text>
        </Pressable>
      </View>
      </View>
  );
}