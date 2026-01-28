import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { authClient } from "@/lib/auth-client";

const THEME_COLORS = {
  primary: "#1DBF73",
  primaryForeground: "#FFFFFF",
  foreground: "#222325",
  muted: "#62646a",
  border: "#e4e5e7",
  background: "#FFFFFF",
  error: "#dc2626",
};

export function AuthModalForgotPassword() {
  const { setView } = useAuthModal();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleBack = () => {
    setView("email-signin");
  };

  const handleResetPassword = async () => {
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setIsLoading(true);

    try {
      await authClient.emailOtp.sendVerificationOtp({
        email: email.trim(),
        type: "forget-password",
      });

      setIsLoading(false);
      setSuccess(true);
    } catch (_err) {
      setIsLoading(false);
      // Still show success to prevent email enumeration
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <View>
        {/* Back Button */}
        <Pressable
          onPress={handleBack}
          style={({ hovered }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
            alignSelf: "flex-start",
            padding: 4,
            marginLeft: -4,
            borderRadius: 4,
            backgroundColor: hovered ? "#f5f5f5" : "transparent",
          })}
        >
          <Ionicons color={THEME_COLORS.foreground} name="arrow-back" size={20} />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: THEME_COLORS.foreground,
            }}
          >
            Back
          </Text>
        </Pressable>

        {/* Success Message */}
        <View
          style={{
            backgroundColor: "#f0fdf4",
            borderWidth: 1,
            borderColor: "#bbf7d0",
            borderRadius: 8,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#166534",
              marginBottom: 8,
            }}
          >
            Check your email
          </Text>
          <Text style={{ fontSize: 14, color: "#166534", lineHeight: 20 }}>
            If an account exists with {email}, you'll receive a verification code
            shortly. Check your inbox and spam folder.
          </Text>
        </View>

        <Pressable
          onPress={handleBack}
          style={({ hovered }) => ({
            backgroundColor: hovered ? "#19a463" : THEME_COLORS.primary,
            paddingVertical: 16,
            borderRadius: 8,
            alignItems: "center",
          })}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: THEME_COLORS.primaryForeground,
            }}
          >
            Back to Sign In
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      {/* Back Button */}
      <Pressable
        onPress={handleBack}
        style={({ hovered }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
          alignSelf: "flex-start",
          padding: 4,
          marginLeft: -4,
          borderRadius: 4,
          backgroundColor: hovered ? "#f5f5f5" : "transparent",
        })}
      >
        <Ionicons color={THEME_COLORS.foreground} name="arrow-back" size={20} />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: THEME_COLORS.foreground,
          }}
        >
          Back
        </Text>
      </Pressable>

      {/* Heading */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: THEME_COLORS.foreground,
          marginBottom: 12,
        }}
      >
        Reset password
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: THEME_COLORS.muted,
          marginBottom: 32,
          lineHeight: 22,
        }}
      >
        Enter your email address and we'll send you a link to reset your password.
      </Text>

      {/* Error Message */}
      <View style={{ minHeight: 48, marginBottom: 16 }}>
        {error && (
          <View
            style={{
              backgroundColor: "#fef2f2",
              borderWidth: 1,
              borderColor: "#fecaca",
              borderRadius: 8,
              padding: 12,
            }}
          >
            <Text style={{ fontSize: 14, color: THEME_COLORS.error }}>
              {error}
            </Text>
          </View>
        )}
      </View>

      {/* Email Field */}
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: THEME_COLORS.foreground,
            marginBottom: 8,
          }}
        >
          Email
        </Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          onSubmitEditing={handleResetPassword}
          placeholder="name@email.com"
          placeholderTextColor={THEME_COLORS.muted}
          returnKeyType="go"
          style={{
            borderWidth: 1,
            borderColor: THEME_COLORS.border,
            borderRadius: 8,
            padding: 14,
            fontSize: 15,
            color: THEME_COLORS.foreground,
          }}
          textContentType="emailAddress"
          value={email}
        />
      </View>

      {/* Submit Button */}
      <Pressable
        disabled={isLoading}
        onPress={handleResetPassword}
        style={({ hovered }) => ({
          backgroundColor: isLoading
            ? THEME_COLORS.border
            : hovered
              ? "#19a463"
              : THEME_COLORS.primary,
          paddingVertical: 16,
          borderRadius: 8,
          alignItems: "center",
        })}
      >
        {isLoading ? (
          <ActivityIndicator color={THEME_COLORS.primaryForeground} />
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: THEME_COLORS.primaryForeground,
            }}
          >
            Reset password
          </Text>
        )}
      </Pressable>
    </View>
  );
}

export default AuthModalForgotPassword;
