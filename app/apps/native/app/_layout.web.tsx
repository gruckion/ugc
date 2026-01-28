import "@/polyfills";
import "@/global.css";

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { api } from "@convoexpo-and-nextjs-web-bun-better-auth/backend/convex/_generated/api";
import { env } from "@convoexpo-and-nextjs-web-bun-better-auth/env/native";
import { ConvexReactClient, useConvexAuth, useQuery } from "convex/react";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { HeroUINativeProvider } from "heroui-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { AuthModal } from "@/components/web/AuthModal";
import { WebNavigationShell } from "@/components/web/WebNavigationShell";
import { AppThemeProvider } from "@/contexts/app-theme-context";
import { AuthModalProvider } from "@/contexts/auth-modal-context";
import { authClient } from "@/lib/auth-client";

// Prevent splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore errors on web
});

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const convex = new ConvexReactClient(env.EXPO_PUBLIC_CONVEX_URL, {
  expectAuth: true,
  unsavedChangesWarning: false,
});

/**
 * AuthGate - Controls initial loading state
 *
 * This component ensures the app waits until:
 * 1. Auth state is resolved (isLoading becomes false)
 * 2. If authenticated, user data is preloaded
 */
function AuthGate({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const [ready, setReady] = useState(false);

  // Preload user data while loading (only if authenticated)
  const user = useQuery(api.auth.getCurrentUser, isAuthenticated ? {} : "skip");

  useEffect(() => {
    const authReady = !isLoading;
    const userReady = !isAuthenticated || user !== undefined;

    if (authReady && userReady && !ready) {
      SplashScreen.hideAsync().catch(() => {
        // Ignore errors on web
      });
      setReady(true);
    }
  }, [isLoading, isAuthenticated, user, ready]);

  if (!ready) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        {/* Simple loading state for web */}
      </View>
    );
  }

  return <>{children}</>;
}

/**
 * Web Layout with Navigation Shell
 *
 * Unlike native, web uses:
 * - Persistent header with navigation
 * - Persistent footer
 * - No gesture handlers or keyboard providers
 */
function WebLayout() {
  return (
    <WebNavigationShell>
      <Slot />
    </WebNavigationShell>
  );
}

/* ------------------------------- root layout ------------------------------ */
export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    "DancingScript-Regular": require("@/assets/fonts/DancingScript-Regular.ttf"),
    "DancingScript-Bold": require("@/assets/fonts/DancingScript-Bold.ttf"),
  });

  // Don't render until fonts are loaded
  if (!(fontsLoaded || fontError)) {
    return null;
  }

  return (
    <ConvexBetterAuthProvider authClient={authClient} client={convex}>
      <AuthModalProvider>
        <HeroUINativeProvider
          config={{
            textProps: {
              allowFontScaling: false,
            },
          }}
        >
          <AppThemeProvider>
            <AuthGate>
              <WebLayout />
            </AuthGate>
          </AppThemeProvider>
        </HeroUINativeProvider>
        <AuthModal />
      </AuthModalProvider>
    </ConvexBetterAuthProvider>
  );
}
