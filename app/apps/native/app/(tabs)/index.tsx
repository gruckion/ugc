import { api } from "@convoexpo-and-nextjs-web-bun-better-auth/backend/convex/_generated/api";
import { useConvexAuth, useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MembershipCard } from "@/components/MembershipCard";
import { UGCLogo } from "@/components/UGCLogo";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good Morning,";
  }
  if (hour < 17) {
    return "Good Afternoon,";
  }
  return "Good Evening,";
}

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const user = useQuery(api.auth.getCurrentUser, isAuthenticated ? {} : "skip");

  // Defense-in-depth: Don't render anything while auth is loading
  // This should rarely trigger since AuthGate handles splash visibility,
  // but protects against edge cases
  if (isLoading) {
    return null;
  }

  // If not authenticated, show landing prompt
  if (!isAuthenticated) {
    return (
      <View
        className="flex-1 bg-background"
        style={{
          paddingTop: insets.top,
        }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <View className="flex-row items-center gap-3">
            <UGCLogo size={56} />
            <View>
              <Text className="text-muted text-base">Welcome to</Text>
              <Text
                className="font-semibold text-2xl text-foreground"
              >
                UGC Marketplace
              </Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 items-center justify-center px-6">
          <UGCLogo size={120} />
          <Text
            className="mt-8 mb-4 text-center font-semibold text-3xl text-foreground"
          >
            Connect with Creators
          </Text>
          <Text className="mb-8 text-center text-muted text-base">
            Find authentic user-generated content for your brand
          </Text>
        </View>

        {/* Sign In Button */}
        <View className="px-6 pb-6">
          <Pressable
            className="items-center rounded-lg px-6 py-4 bg-primary"
            onPress={() => router.push("/(auth)/landing")}
          >
            <Text className="font-medium text-base text-primary-foreground">
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const firstName = user?.name?.split(" ")[0] || "Member";

  return (
    <View
      className="flex-1 bg-background"
      style={{
        paddingTop: insets.top,
      }}
    >
      {/* Header with Logo and Greeting */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center gap-3">
          {/* Logo */}
          <UGCLogo size={56} />
          {/* Greeting */}
          <View>
            <Text className="text-muted text-base">{getGreeting()}</Text>
            <Text
              className="font-semibold text-3xl text-foreground"
            >
              {firstName}
            </Text>
          </View>
        </View>
      </View>

      {/* Main content area with Membership Card */}
      <View className="flex-1 justify-center">
        <MembershipCard
          memberName={user?.name || "Member"}
          memberSince={
            user?._creationTime
              ? new Date(user._creationTime).toISOString()
              : undefined
          }
        />
      </View>
    </View>
  );
}
