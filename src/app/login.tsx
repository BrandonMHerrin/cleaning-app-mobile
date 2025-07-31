import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useAuth } from "../contexts/auth-context";
import { router } from "expo-router";

/**
 * LoginScreen component allows users to log in to their account.
 * It includes fields for email and password, and handles login logic.
 * If login is successful, the user is redirected to the dashboard.
 */
export default function LoginScreen() {
  // State variables to manage email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Access the authentication context to handle login
  const { loading, signIn } = useAuth();

  // Function to handle login
  // It checks if the email and password fields are filled,
  // then attempts to sign in using the provided credentials.
  // If successful, it redirects to the dashboard.
  // If there's an error, it sets the error state to display the error message.
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    try {
      await signIn(email, password);
      
      setTimeout(() => router.replace("/(protected)/dash"), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };
  return (
    <View className="flex-1 bg-slate-900">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-white text-3xl font-bold text-center mb-4">
          Log In
        </Text>
        <Text className="text-slate-300 text-lg text-center mb-4">
          Please enter your credentials to log in.
        </Text>
        <View className="w-full max-w-md">
          <TextInput
            className="bg-white rounded-lg p-3 mb-4"
            placeholder="Email"
            placeholderTextColor={"#9ca3af"}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            className="bg-white rounded-lg p-3 mb-4"
            placeholder="Password"
            placeholderTextColor={"#9ca3af"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error ? <Text className="text-red-500 text-sm">{error}</Text> : null}
          <Pressable
            className="bg-blue-600 rounded-lg p-3 mt-4"
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-white text-center">Log In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}