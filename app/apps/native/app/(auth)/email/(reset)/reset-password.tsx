import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, Text, type TextInput, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import FormHeader, { StyledButton, StyledTextInput } from "@/components/form";
import { KeyboardAwareForm } from "@/components/keyboard";
import { authClient } from "@/lib/auth-client";

/**
 * Sanitize error messages for password reset
 */
function getSafeErrorMessage(errorMessage: string | undefined): string {
  const lowerMessage = (errorMessage || "").toLowerCase();

  if (
    lowerMessage.includes("token") ||
    lowerMessage.includes("expired") ||
    lowerMessage.includes("invalid") ||
    lowerMessage.includes("otp")
  ) {
    return "This reset code has expired or is invalid. Please request a new one.";
  }

  if (
    lowerMessage.includes("password") &&
    (lowerMessage.includes("weak") || lowerMessage.includes("short"))
  ) {
    return "Password does not meet requirements. Please use at least 6 characters.";
  }

  return "Unable to reset password. Please try again or request a new code.";
}

export default function ResetPasswordRoute() {
  const router = useRouter();
  // Support both token-based (deep link) and OTP-based (verification code) flows
  const { token, email, otp, error } = useLocalSearchParams<{
    token?: string;
    email?: string;
    otp?: string;
    error?: string;
  }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Ref for keyboard navigation: password → confirmPassword → submit
  const confirmPasswordRef = useRef<TextInput>(null);

  // Set dark status bar style for light background (stack-based approach)
  useEffect(() => {
    const entry = SystemBars.pushStackEntry({ style: "dark" });
    return () => SystemBars.popStackEntry(entry);
  }, []);

  // Determine which flow we're using
  const isOtpFlow = email && otp;
  const isTokenFlow = token;
  const hasValidParams = isOtpFlow || isTokenFlow;

  const handleResetPassword = async () => {
    if (!password) {
      Alert.alert("Error", "Please enter your new password");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      if (isOtpFlow) {
        // OTP-based password reset
        const { error: resetError } = await authClient.emailOtp.resetPassword({
          email: email!,
          otp: otp!,
          password,
        });

        setIsLoading(false);

        if (resetError) {
          Alert.alert("Error", getSafeErrorMessage(resetError.message));
          return;
        }

        Alert.alert(
          "Success",
          "Password reset successfully. Please sign in with your new password.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/(auth)/email/signin"),
            },
          ]
        );
      } else if (isTokenFlow) {
        // Token-based password reset (from deep link)
        await authClient.resetPassword(
          {
            newPassword: password,
            token: token!,
          },
          {
            onError: (ctx) => {
              setIsLoading(false);
              Alert.alert("Error", getSafeErrorMessage(ctx.error.message));
            },
            onSuccess: () => {
              setIsLoading(false);
              Alert.alert(
                "Success",
                "Password reset successfully. Please sign in with your new password.",
                [
                  {
                    text: "OK",
                    onPress: () => router.replace("/(auth)/email/signin"),
                  },
                ]
              );
            },
          }
        );
      }
    } catch (_err) {
      setIsLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // Invalid state - no token or email+otp
  if (error === "INVALID_TOKEN" || !hasValidParams) {
    return (
      <View className="flex-1 justify-center px-6 bg-background">
        <View className="items-center mb-8">
          <Text className="text-center text-foreground text-3xl font-light font-serif mb-3">
            Invalid Link
          </Text>
          <Text className="text-center text-muted text-[15px] leading-[22px]">
            This reset link has expired or is invalid. Please request a new one.
          </Text>
        </View>
        <Link asChild href="/(auth)/email/signin">
          <Pressable className="bg-primary rounded-xl py-4 items-center">
            <Text className="text-primary-foreground text-base font-semibold">
              Back to Sign In
            </Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <KeyboardAwareForm>
      <FormHeader
        description="Enter your new password to complete the reset"
        title="New Password"
      />

      <StyledTextInput
        autoComplete="new-password"
        blurOnSubmit={false}
        label="New Password"
        onChangeText={setPassword}
        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        placeholder="Enter your new password"
        returnKeyType="next"
        secureTextEntry
        textContentType="newPassword"
        value={password}
      />

      <StyledTextInput
        autoComplete="new-password"
        label="Confirm Password"
        onChangeText={setConfirmPassword}
        onSubmitEditing={handleResetPassword}
        placeholder="Confirm your new password"
        ref={confirmPasswordRef}
        returnKeyType="go"
        secureTextEntry
        textContentType="newPassword"
        value={confirmPassword}
      />

      <View className="mt-2">
        <StyledButton
          isLoading={isLoading}
          label="Reset Password"
          onPress={handleResetPassword}
        />
      </View>
    </KeyboardAwareForm>
  );
}
