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
import { cn } from "@/lib/utils";

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
          className="flex-row items-center gap-2 mb-6 self-start p-1 -ml-1 rounded hover:bg-hover-surface"
          onPress={handleBack}
        >
          <Ionicons className="text-foreground" name="arrow-back" size={20} />
          <Text className="text-[15px] font-medium text-foreground">
            Back
          </Text>
        </Pressable>

        {/* Success Message */}
        <View className="bg-success-bg border border-success-border rounded-lg p-4 mb-6">
          <Text className="text-base font-semibold text-success-text mb-2">
            Check your email
          </Text>
          <Text className="text-sm text-success-text leading-5">
            If an account exists with {email}, you'll receive a verification code
            shortly. Check your inbox and spam folder.
          </Text>
        </View>

        <Pressable
          className="py-4 rounded-lg items-center bg-primary hover:bg-hover-primary"
          onPress={handleBack}
        >
          <Text className="text-base font-semibold text-primary-foreground">
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
        className="flex-row items-center gap-2 mb-6 self-start p-1 -ml-1 rounded hover:bg-hover-surface"
        onPress={handleBack}
      >
        <Ionicons className="text-foreground" name="arrow-back" size={20} />
        <Text className="text-[15px] font-medium text-foreground">
          Back
        </Text>
      </Pressable>

      {/* Heading */}
      <Text className="text-2xl font-bold mb-3 text-foreground">
        Reset password
      </Text>

      <Text className="text-[15px] mb-8 leading-[22px] text-muted">
        Enter your email address and we'll send you a link to reset your password.
      </Text>

      {/* Error Message */}
      <View className="min-h-[48px] mb-4">
        {error && (
          <View className="bg-error-bg border border-error-border rounded-lg p-3">
            <Text className="text-sm text-error-text">
              {error}
            </Text>
          </View>
        )}
      </View>

      {/* Email Field */}
      <View className="mb-6">
        <Text className="text-sm font-medium mb-2 text-foreground">
          Email
        </Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          className="border border-input-border rounded-lg p-3.5 text-[15px]"
          keyboardType="email-address"
          onChangeText={setEmail}
          onSubmitEditing={handleResetPassword}
          placeholder="name@email.com"
          placeholderTextColor="var(--muted)"
          returnKeyType="go"
          style={{
            color: "var(--foreground)",
          }}
          textContentType="emailAddress"
          value={email}
        />
      </View>

      {/* Submit Button */}
      <Pressable
        className={cn(
          "py-4 rounded-lg items-center",
          isLoading
            ? "bg-border"
            : "bg-primary hover:bg-hover-primary"
        )}
        disabled={isLoading}
        onPress={handleResetPassword}
      >
        {isLoading ? (
          <ActivityIndicator color="var(--primary-foreground)" />
        ) : (
          <Text className="text-base font-semibold text-primary-foreground">
            Reset password
          </Text>
        )}
      </Pressable>
    </View>
  );
}

export default AuthModalForgotPassword;
