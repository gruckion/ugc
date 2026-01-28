import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { authClient } from "@/lib/auth-client";
import { useAppleAuth, useGitHubAuth, useGoogleAuth } from "@/lib/oauth";

const THEME_COLORS = {
  primary: "#1DBF73",
  primaryForeground: "#FFFFFF",
  foreground: "#222325",
  muted: "#62646a",
  border: "#e4e5e7",
  background: "#FFFFFF",
};

export function AuthModalSignUpView() {
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
      <View style={{ marginBottom: 32 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: THEME_COLORS.foreground,
            marginBottom: 8,
          }}
        >
          Create a new account
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text style={{ fontSize: 15, color: THEME_COLORS.muted }}>
            Already have an account?
          </Text>
          <Pressable onPress={() => setView("signin")}>
            {({ hovered }) => (
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: THEME_COLORS.primary,
                  textDecorationLine: hovered ? "underline" : "none",
                }}
              >
                Sign in
              </Text>
            )}
          </Pressable>
        </View>
      </View>

      {/* OAuth Buttons */}
      <View style={{ gap: 12, marginBottom: 24 }}>
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: THEME_COLORS.border,
          }}
        />
        <Text
          style={{
            paddingHorizontal: 16,
            fontSize: 13,
            color: THEME_COLORS.muted,
          }}
        >
          OR
        </Text>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: THEME_COLORS.border,
          }}
        />
      </View>

      {/* Email Button */}
      <View style={{ position: "relative" }}>
        <Pressable
          onPress={() => setView("email-signup")}
          style={({ hovered }) => ({
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            paddingVertical: 14,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: THEME_COLORS.border,
            backgroundColor: hovered ? "#fafafa" : THEME_COLORS.background,
          })}
        >
          <Ionicons
            color={THEME_COLORS.foreground}
            name="mail-outline"
            size={20}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: THEME_COLORS.foreground,
            }}
          >
            Continue with email
          </Text>
        </Pressable>
        {lastMethod === "email" && <LastUsedBadge />}
      </View>

      {/* Terms */}
      <Text
        style={{
          fontSize: 12,
          color: THEME_COLORS.muted,
          textAlign: "center",
          marginTop: 32,
          lineHeight: 18,
        }}
      >
        By joining, you agree to the UGC Marketplace{" "}
        <Text
          onPress={() => {
            close();
            router.push("/termsofservice" as any);
          }}
          style={{
            textDecorationLine: "underline",
            color: THEME_COLORS.primary,
          }}
        >
          Terms of Service
        </Text>{" "}
        and to occasionally receive emails from us. Please read our{" "}
        <Text
          onPress={() => {
            close();
            router.push("/privacypolicy" as any);
          }}
          style={{
            textDecorationLine: "underline",
            color: THEME_COLORS.primary,
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
    <View style={{ position: "relative" }}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({ hovered }) => ({
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          paddingVertical: 14,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: THEME_COLORS.border,
          backgroundColor: hovered ? "#fafafa" : THEME_COLORS.background,
          opacity: disabled && !isLoading ? 0.7 : 1,
        })}
      >
        {isLoading ? (
          <ActivityIndicator color={THEME_COLORS.foreground} size="small" />
        ) : (
          <>
            <Ionicons color={THEME_COLORS.foreground} name={icon} size={20} />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: THEME_COLORS.foreground,
              }}
            >
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
    <View
      style={{
        position: "absolute",
        top: -8,
        right: -8,
        backgroundColor: THEME_COLORS.primary,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 10,
          fontWeight: "600",
          color: THEME_COLORS.primaryForeground,
        }}
      >
        Last used
      </Text>
    </View>
  );
}

export default AuthModalSignUpView;
