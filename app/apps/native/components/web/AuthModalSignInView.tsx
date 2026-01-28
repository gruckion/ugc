import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { authClient } from "@/lib/auth-client";
import { useAppleAuth, useGitHubAuth, useGoogleAuth } from "@/lib/oauth";
import { cn } from "@/lib/utils";

export function AuthModalSignInView() {
  const { setView, close } = useAuthModal();
  const router = useRouter();
  const { signIn: signInWithGoogle, isLoading: isGoogleLoading } =
    useGoogleAuth();
  const { signIn: signInWithApple, isLoading: isAppleLoading } = useAppleAuth();
  const { signIn: signInWithGitHub, isLoading: isGitHubLoading } =
    useGitHubAuth();
  const isLoading = isGoogleLoading || isAppleLoading || isGitHubLoading;

  const [lastMethod, setLastMethod] = useState<string | null>(null);
  useEffect(() => {
    const method = authClient.getLastUsedLoginMethod();
    setLastMethod(method);
  }, []);

  return (
    <View>
      {/* Heading */}
      <View className="mb-8">
        <Text className="text-[28px] font-bold mb-2 text-foreground">
          Sign in to your account
        </Text>
        <View className="flex-row items-center gap-1">
          <Text className="text-[15px] text-muted">
            Don't have an account?
          </Text>
          <Pressable onPress={() => setView("signup")}>
            {({ hovered }) => (
              <Text
                className={cn(
                  "text-[15px] font-semibold text-primary",
                  hovered && "underline"
                )}
              >
                Join here
              </Text>
            )}
          </Pressable>
        </View>
      </View>

      {/* OAuth Buttons */}
      <View className="gap-3 mb-6">
        <OAuthButton
          disabled={isLoading}
          icon="logo-google"
          isLastUsed={lastMethod === "google"}
          isLoading={isGoogleLoading}
          label="Continue with Google"
          onPress={signInWithGoogle}
        />
        <OAuthButton
          disabled={isLoading}
          icon="logo-apple"
          isLastUsed={lastMethod === "apple"}
          isLoading={isAppleLoading}
          label="Continue with Apple"
          onPress={signInWithApple}
        />
        <OAuthButton
          disabled={isLoading}
          icon="logo-github"
          isLastUsed={lastMethod === "github"}
          isLoading={isGitHubLoading}
          label="Continue with GitHub"
          onPress={signInWithGitHub}
        />
      </View>

      {/* Divider */}
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-px bg-border" />
        <Text className="px-4 text-[13px] text-muted">
          OR
        </Text>
        <View className="flex-1 h-px bg-border" />
      </View>

      {/* Email Button */}
      <View className="relative">
        <Pressable
          className="flex-row items-center justify-center gap-3 py-3.5 rounded-lg border border-border bg-background hover:bg-hover-surface"
          onPress={() => setView("email-signin")}
        >
          <Ionicons
            className="text-foreground"
            name="mail-outline"
            size={20}
          />
          <Text className="text-[15px] font-medium text-foreground">
            Continue with email
          </Text>
        </Pressable>
        {lastMethod === "email" && <LastUsedBadge />}
      </View>

      {/* Terms */}
      <Text className="text-xs text-center mt-8 leading-[18px] text-muted">
        By joining, you agree to the UGC Marketplace{" "}
        <Text
          className="underline text-primary"
          onPress={() => {
            close();
            router.push("/termsofservice" as any);
          }}
        >
          Terms of Service
        </Text>{" "}
        and to occasionally receive emails from us. Please read our{" "}
        <Text
          className="underline text-primary"
          onPress={() => {
            close();
            router.push("/privacypolicy" as any);
          }}
        >
          Privacy Policy
        </Text>{" "}
        to learn how we use your personal data.
      </Text>
    </View>
  );
}

function OAuthButton({
  icon,
  label,
  onPress,
  isLoading,
  isLastUsed,
  disabled,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isLoading: boolean;
  isLastUsed: boolean;
  disabled: boolean;
}) {
  return (
    <View className="relative">
      <Pressable
        className={cn(
          "flex-row items-center justify-center gap-3 py-3.5 rounded-lg border border-border bg-background hover:bg-hover-surface",
          disabled && !isLoading && "opacity-70"
        )}
        disabled={disabled}
        onPress={onPress}
      >
        {isLoading ? (
          <ActivityIndicator color="var(--foreground)" size="small" />
        ) : (
          <>
            <Ionicons className="text-foreground" name={icon} size={20} />
            <Text className="text-[15px] font-medium text-foreground">
              {label}
            </Text>
          </>
        )}
      </Pressable>
      {isLastUsed && <LastUsedBadge />}
    </View>
  );
}

function LastUsedBadge() {
  return (
    <View className="absolute -top-2 -right-2 px-2 py-0.5 rounded-[10px] bg-primary">
      <Text className="text-[10px] font-semibold text-primary-foreground">
        Last used
      </Text>
    </View>
  );
}

export default AuthModalSignInView;
