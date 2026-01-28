import { Ionicons } from "@expo/vector-icons";
import { useConvexAuth } from "convex/react";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Orders() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useConvexAuth();

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top }}
    >
      {/* Header */}
      <View className="bg-primary px-5 pb-5" style={{ paddingTop: 16 }}>
        <Text
          className="font-light text-3xl text-primary-foreground"
          style={{ fontFamily: "serif" }}
        >
          Manage Orders
        </Text>
        <Text className="mt-1 text-accent text-sm">
          Track and manage your orders
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons color="#9CA3AF" name="receipt-outline" size={64} />
        <Text className="mt-4 text-center font-semibold text-xl text-foreground">
          {isAuthenticated ? "No orders yet" : "Sign in to view your orders"}
        </Text>
        <Text className="mt-2 text-center text-muted text-sm">
          {isAuthenticated
            ? "Your active and completed orders will appear here."
            : "You need to be signed in to manage your orders."}
        </Text>
        {!isAuthenticated && (
          <Pressable
            className="mt-6 items-center bg-primary"
            onPress={() => router.push("/(auth)/landing")}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
            }}
          >
            <Text className="font-medium text-base text-primary-foreground">
              Sign In
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
