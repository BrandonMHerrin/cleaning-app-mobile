import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "../contexts/auth-context";

/**
 * 
 * @returns Root layout component for the app.
 * This component wraps the entire application in the AuthProvider context,
 * allowing access to authentication state and methods throughout the app.
 * It also defines the main navigation structure using the Stack component from expo-router.
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "Log In" }} />
        <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      </Stack>
    </AuthProvider>
  );
}
