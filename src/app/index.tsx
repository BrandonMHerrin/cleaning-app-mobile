import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useAuth } from "../contexts/auth-context";

/**
 * Index component serves as the landing page for the application.
 * It provides options for users to log in or sign up.
 * If a user is already logged in, they are redirected to the dashboard.
 */
export default function Index() {
  // Access the authentication context to check the current session
  const { session } = useAuth();

  // Redirect to the dashboard if the user is already logged in
  // This ensures that logged-in users do not see the landing page again
  // and are taken directly to the dashboard.
  // This is useful for improving user experience by avoiding unnecessary navigation.
  useEffect(() => {
    if (session) {
      router.replace("/(protected)/dash");
    }
  }, [session]);
  
  return (
    <View className="flex-1 bg-slate-900">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-white text-3xl font-bold text-center mb-4">
          Welcome to the Cleaning App!
        </Text>
        <Text className="text-slate-300 text-lg text-center">
          Your professional cleaning service solution.
        </Text>
        <Text className="text-slate-300 text-lg text-center mb-6">
          Please log in or sign up to continue.
        </Text>
        <View className="mt-4 flex flex-col space-y-2 gap-4">
          <Link
            className="text-slate-900 text-lg text-center bg-slate-100 w-32 py-2 rounded"
            href="/login"
          >
            Log In
          </Link>
          <Link
            className="text-slate-900 text-lg text-center bg-slate-100 w-32 py-2 rounded"
            href="/signup"
          >
            Sign Up
          </Link>
        </View>
      </View>
    </View>
  );
}
