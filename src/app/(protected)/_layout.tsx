import { useAuth } from "@/src/contexts/auth-context";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

/**
 * TabLayout component defines the main navigation structure for the protected routes of the app.
 * It includes tabs for the dashboard and profile, ensuring that users can easily navigate between these sections.
 * The component also checks if the user is authenticated before rendering the tabs.
 */
export default function TabLayout() {
  // Access the authentication context to check the current session
  const { session } = useAuth();

  // Redirect to the landing page if the user is not authenticated
  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1d4ed8",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#f8fafc",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}>
      <Tabs.Screen name="dash" options={ {title: "Home"}} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
