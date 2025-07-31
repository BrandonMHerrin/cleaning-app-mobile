import { View, Text } from "react-native";

/**
 * HomeScreen component serves as the main dashboard for authenticated users.
 * It displays a welcome message and indicates that the user is logged in successfully.
 */
export default function HomeScreen() {
  return (
    <View className="flex-1 bg-slate-900">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-white text-3xl font-bold text-center mb-4">
          Welcome to the Dashboard
        </Text>
        <Text className="text-slate-300 text-lg text-center mb-4">
          This is your protected area.
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-lg">
          You are logged in successfully!
        </Text>
        </View>
    </View>
  );
}