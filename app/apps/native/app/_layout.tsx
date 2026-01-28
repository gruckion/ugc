import "@/polyfills";
import "@/global.css";

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { api } from "@convoexpo-and-nextjs-web-bun-better-auth/backend/convex/_generated/api";
import { env } from "@convoexpo-and-nextjs-web-bun-better-auth/env/native";
import { ConvexReactClient, useConvexAuth, useQuery } from "convex/react";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { HeroUINativeProvider } from "heroui-native";
import { useEffect, useState } from "react";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { AppThemeProvider } from "@/contexts/app-theme-context";
import { authClient } from "@/lib/auth-client";

// Expo Go doesn't support custom splash screens (SDK 52+), so we silence errors there only
const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

// Prevent splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync().catch((error) => {
  if (!isExpoGo) {
    throw error;
  }
});

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const convex = new ConvexReactClient(env.EXPO_PUBLIC_CONVEX_URL, {
  expectAuth: true,
  unsavedChangesWarning: false,
});

/**
 * Navigation Layout - Selective Auth Pattern
 *
 * This pattern allows:
 * - Main app (tabs) accessible to everyone, authenticated or not
 * - Auth screens presented as modals that can be dismissed
 * - Individual screens can check auth state and show appropriate UI
 *
 * For the "Auth-First" pattern, see: docs/AUTH_NAVIGATION_PATTERNS.md
 */
function StackLayout() {
  return (
    <Stack screenOptions={{ animation: "fade" }}>
      {/* Main tabs - always accessible */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      {/* Content pages - pushed on top of tabs (tab bar hidden) */}
      <Stack.Screen
        name="(pages)"
        options={{
          headerShown: false,
        }}
      />

      {/* Auth screens - presented as fullscreen modal */}
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />

      <Stack.Screen
        name="modal"
        options={{ title: "Modal", presentation: "modal" }}
      />
    </Stack>
  );
}

/**
 * AuthGate - Controls splash screen visibility based on auth state
 *
 * This component ensures the splash screen stays visible until:
 * 1. Auth state is resolved (isLoading becomes false)
 * 2. If authenticated, user data is preloaded
 *
 * This prevents the "flash" of unauthenticated UI when the app reloads
 * while a user is logged in, and prevents the "Member" placeholder
 * from appearing before the actual user name loads.
 */
function AuthGate({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const [splashHidden, setSplashHidden] = useState(false);

  // Preload user data while splash is visible (only if authenticated)
  // This ensures user name is ready before we show the UI
  const user = useQuery(api.auth.getCurrentUser, isAuthenticated ? {} : "skip");

  useEffect(() => {
    // Auth must be resolved (not loading)
    const authReady = !isLoading;

    // If authenticated, wait for user data; if not authenticated, we're ready
    const userReady = !isAuthenticated || user !== undefined;

    // Only hide splash once, and only when both conditions are met
    if (authReady && userReady && !splashHidden) {
      SplashScreen.hideAsync().catch((error) => {
        if (!isExpoGo) {
          throw error;
        }
      });
      setSplashHidden(true);
    }
  }, [isLoading, isAuthenticated, user, splashHidden]);

  // Keep returning null until splash can be hidden
  // This prevents any flash of incorrect UI
  if (!splashHidden) {
    return null;
  }

  return <>{children}</>;
}

/* ------------------------------- root layout ------------------------------ */
export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    "DancingScript-Regular": require("@/assets/fonts/DancingScript-Regular.ttf"),
    "DancingScript-Bold": require("@/assets/fonts/DancingScript-Bold.ttf"),
  });

  // Don't render until fonts are loaded
  // Note: SplashScreen.hideAsync() is now handled by AuthGate after auth resolves
  if (!(fontsLoaded || fontError)) {
    return null;
  }

  return (
    <ConvexBetterAuthProvider authClient={authClient} client={convex}>
      <SystemBars style="light" />
      <GestureHandlerRootView className="flex-1">
        <KeyboardProvider>
          <HeroUINativeProvider
            config={{
              textProps: {
                allowFontScaling: false,
              },
            }}
          >
            <AppThemeProvider>
              <AuthGate>
                <StackLayout />
              </AuthGate>
            </AppThemeProvider>
          </HeroUINativeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ConvexBetterAuthProvider>
  );
}
