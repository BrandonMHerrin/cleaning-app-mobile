import { View, Text, TextInput, Pressable } from "react-native";
import { useAuth } from "../contexts/auth-context";
import { useState } from "react";
import { router } from "expo-router";

/**
 * SignupScreen component allows users to create a new account.
 * It includes fields for business name, email, password, and confirm password,
 * and handles signup logic. If signup is successful, the user is redirected to the dashboard.
 */
export default function SignupScreen() {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const { loading,signUp } = useAuth();

  // Function to handle signup
  // It checks if all fields are filled correctly,
  // then attempts to sign up using the provided credentials.
  const handleSignUp = async () => {
    if (!formValid) {
      setError("Please fill in all fields correctly.");
      return;
    }
    setError("");
    try {
      await signUp(businessName, email, password);
      resetForm();
      router.replace("/(protected)/dash");
    } catch (err) {
      resetForm();
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } 
  };

  // Function to reset the form fields and state
  // This is useful after a successful signup or when an error occurs,
  // to clear the input fields and reset validation states.
  const resetForm = () => {
    setBusinessName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFormValid(false);
    setError("");
  };

  // Handlers for input changes
  // These functions update the respective state variables and validate the form.
  const handleBusinessNameChange = (text: string) => {
    setBusinessName(text);
    validateForm();
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateForm();
  };  

  const handlePasswordChange = (text: string) => {
    validatePassword(text);
    setPassword(text);
    if (text !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
    validateForm();
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (text !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
    validateForm();
  };

  // Function to validate the form
  // It checks if all required fields are filled and sets the formValid state accordingly.
  const validateForm = () => {
    if (businessName && email && password) {
      setFormValid(true);
      setError("");
    } else {
      setFormValid(false);
    }
  };

  // Function to validate the password
  // It checks if the password meets the minimum length requirement and updates the passwordError state.
  const validatePassword = (text: string) => {
    if (!text) {
      setPasswordError("Password cannot be empty.");
      setFormValid(false);
    } else
    if (text.length < 8 && text.length > 0) {
      setPasswordError("Password must be at least 8 characters long.");
      setFormValid(false);
    } else {
      setPasswordError("");
    }
    // Remove validateForm() call from here to prevent infinite loop
  };

  return (
    <View className="flex-1 bg-slate-900">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-white text-3xl font-bold text-center mb-4">
          Sign Up
        </Text>
        <Text className="text-slate-300 text-lg text-center mb-4">
          Create a new account to get started.
        </Text>
        <View className="w-full my-4">
          <TextInput
            className="bg-slate-100 text-slate-900 w-full p-3 rounded mb-4"
            placeholder="Business Name"
            placeholderTextColor={"#9ca3af"}
            autoCapitalize="none"
            value={businessName}
            onChangeText={handleBusinessNameChange}
          />
          <TextInput
            className="bg-slate-100 text-slate-900 w-full p-3 rounded mb-4"
            placeholder="Email"
            placeholderTextColor={"#9ca3af"}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={handleEmailChange}
          />
          <TextInput
            className="bg-slate-100 text-slate-900 w-full p-3 rounded mb-4"
            placeholder="Password"
            placeholderTextColor={"#9ca3af"}
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={handlePasswordChange}
          />
          {passwordError ? (
            <Text className="text-red-500 text-center mb-4">
              {passwordError}
            </Text>
          ) : null}
          <TextInput
            className="bg-slate-100 text-slate-900 w-full p-3 rounded mb-4"
            placeholder="Confirm Password"
            placeholderTextColor={"#9ca3af"}
            secureTextEntry
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
          />
          {confirmPasswordError ? (
            <Text className="text-red-500 text-center mb-4">
              {confirmPasswordError}
            </Text>
          ) : null}
          {error ? (
            <Text className="text-red-500 text-center mb-4">{error}</Text>
          ) : null}
          <Text className="text-slate-300 text-sm text-center mb-4">
            { formValid ? "Form is valid." : "Please fill in all fields correctly." }
          </Text>
          <Pressable className="my-12" onPress={handleSignUp}>
            <Text className="text-slate-900 text-lg text-center bg-slate-100 w-full py-2 rounded">
              {loading ? "Signing Up..." : "Sign Up"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
