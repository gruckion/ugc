import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import FormHeader, { StyledButton, StyledTextInput } from "@/components/form";
import { KeyboardAwareForm } from "@/components/keyboard";
import { authClient } from "@/lib/auth-client";

export default function RequestPasswordResetRoute() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set dark status bar style for light background (stack-based approach)
  useEffect(() => {
    const entry = SystemBars.pushStackEntry({ style: "dark" });
    return () => SystemBars.popStackEntry(entry);
  }, []);

  const handleRequestReset = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    setIsLoading(true);

    try {
      // Use OTP-based password reset flow
      // This sends a 6-digit code to the user's email
      await authClient.emailOtp.sendVerificationOtp({
        email: email.trim(),
        type: "forget-password",
      });

      setIsLoading(false);

      // SECURITY: Always navigate to verify screen to prevent email enumeration
      // We don't reveal whether the email exists in our system
      // The verify screen will show the same message regardless
      router.push({
        pathname: "/(auth)/email/(reset)/verify-reset-code",
        params: { email: email.trim() },
      });

      // Show info message after navigation
      setTimeout(() => {
        Alert.alert(
          "Check Your Email",
          "If an account exists with this email, you'll receive a 6-digit verification code shortly."
        );
      }, 100);
    } catch (_err) {
      setIsLoading(false);
      // SECURITY: Still navigate even on error to prevent email enumeration
      router.push({
        pathname: "/(auth)/email/(reset)/verify-reset-code",
        params: { email: email.trim() },
      });

      setTimeout(() => {
        Alert.alert(
          "Check Your Email",
          "If an account exists with this email, you'll receive a 6-digit verification code shortly."
        );
      }, 100);
    }
  };

  return (
    <KeyboardAwareForm>
      <FormHeader
        description="Enter your email address and we'll send you a verification code to reset your password"
        title="Reset Password"
      />

      <StyledTextInput
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        label="Email Address"
        onChangeText={setEmail}
        onSubmitEditing={handleRequestReset}
        placeholder="Enter your email"
        returnKeyType="go"
        textContentType="emailAddress"
        value={email}
      />

      <View className="mt-2">
        <StyledButton
          isLoading={isLoading}
          label="Send Verification Code"
          onPress={handleRequestReset}
        />
      </View>
    </KeyboardAwareForm>
  );
}
