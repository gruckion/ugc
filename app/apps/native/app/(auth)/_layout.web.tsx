import { useConvexAuth } from "convex/react";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

/**
 * Web Auth Layout - Full Page (Not Modal)
 *
 * Unlike native where auth is a modal overlay,
 * web auth pages are full pages without header/footer.
 */
export default function WebAuthLayout() {
  const router = useRouter();
  const { isAuthenticated } = useConvexAuth();

  // Navigate to homepage when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, router]);

  return (
    <View className="flex-1 bg-background">
      <Slot />
    </View>
  );
}
