import { useLocalSearchParams, useRouter } from "expo-router";
import { InputOTP } from "heroui-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Pressable, Text, View, type ViewStyle } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import FormHeader, { StyledButton } from "@/components/form";
import { KeyboardAwareForm } from "@/components/keyboard";
import { authClient } from "@/lib/auth-client";

// OTP slot layout style (dimensions and border width only)
const otpSlotLayoutStyle: ViewStyle = {
  width: 48,
  height: 56,
  borderWidth: 2,
};

export default function VerifyResetCodeRoute() {
  const router = useRouter();
  const { email, otp: prefilledOtp } = useLocalSearchParams<{
    email: string;
    otp?: string;
  }>();

  const [otp, setOtp] = useState(prefilledOtp || "");
  const [isResending, setIsResending] = useState(false);

  // Auto-navigate if OTP was pre-filled from deep link
  const hasAutoNavigated = useRef(false);

  // Set dark status bar style for light background (stack-based approach)
  useEffect(() => {
    const entry = SystemBars.pushStackEntry({ style: "dark" });
    return () => SystemBars.popStackEntry(entry);
  }, []);

  const handleVerifyCode = useCallback(
    (codeToVerify?: string) => {
      const code = codeToVerify || otp;

      if (!code || code.length !== 6) {
        Alert.alert("Error", "Please enter the 6-digit code from your email");
        return;
      }

      if (!email) {
        Alert.alert("Error", "Email is required. Please try again.");
        router.back();
        return;
      }

      // Navigate to reset password screen with email and OTP
      // The OTP validation happens when the user submits the new password
      // This is the correct flow per Better Auth documentation
      router.replace({
        pathname: "/(auth)/email/(reset)/reset-password",
        params: { email, otp: code },
      });
    },
    [otp, email, router]
  );

  useEffect(() => {
    if (prefilledOtp && !hasAutoNavigated.current) {
      hasAutoNavigated.current = true;
      handleVerifyCode(prefilledOtp);
    }
  }, [prefilledOtp, handleVerifyCode]);

  const handleResendCode = async () => {
    if (!email) {
      Alert.alert("Error", "Email is required");
      return;
    }

    setIsResending(true);

    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "forget-password",
      });

      setIsResending(false);

      if (error) {
        // SECURITY: Don't reveal if email exists
        Alert.alert(
          "Code Sent",
          "If an account exists with this email, you'll receive a new code shortly."
        );
      } else {
        Alert.alert(
          "Code Sent",
          "A new verification code has been sent to your email."
        );
      }
    } catch (_err) {
      setIsResending(false);
      Alert.alert(
        "Code Sent",
        "If an account exists with this email, you'll receive a new code shortly."
      );
    }
  };

  // No email provided - show error state
  if (!email) {
    return (
      <View className="flex-1 justify-center bg-background px-6">
        <View className="mb-8 items-center">
          <Text
            className="mb-3 text-center text-foreground"
            style={{
              fontSize: 28,
              fontWeight: "300",
              fontFamily: "serif",
            }}
          >
            Something Went Wrong
          </Text>
          <Text
            className="text-center text-muted"
            style={{
              fontSize: 15,
              lineHeight: 22,
            }}
          >
            We couldn't find your email address. Please try requesting a new
            password reset.
          </Text>
        </View>
        <Pressable
          className="items-center rounded-xl bg-primary py-4"
          onPress={() =>
            router.replace("/(auth)/email/(reset)/request-password-reset")
          }
        >
          <Text className="text-base font-semibold text-primary-foreground">
            Request New Code
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAwareForm>
      <FormHeader
        description={`Enter the 6-digit code we sent to ${email}`}
        title="Verify Code"
      />

      <View className="mb-2 items-center">
        <Text className="mb-3 text-sm font-medium text-foreground">
          Verification Code
        </Text>
        <InputOTP
          inputMode="numeric"
          maxLength={6}
          onChange={setOtp}
          onComplete={handleVerifyCode}
          textInputProps={{
            autoComplete: "one-time-code",
            textContentType: "oneTimeCode",
          }}
          value={otp}
        >
          <InputOTP.Group className="flex-row gap-2">
            {[0, 1, 2].map((index) => (
              <InputOTP.Slot
                className="items-center justify-center rounded-xl border-foreground bg-surface"
                index={index}
                key={index}
                style={otpSlotLayoutStyle}
              />
            ))}
          </InputOTP.Group>
          <InputOTP.Separator>
            <Text className="px-2 text-2xl text-foreground">-</Text>
          </InputOTP.Separator>
          <InputOTP.Group className="flex-row gap-2">
            {[3, 4, 5].map((index) => (
              <InputOTP.Slot
                className="items-center justify-center rounded-xl border-foreground bg-surface"
                index={index}
                key={index}
                style={otpSlotLayoutStyle}
              />
            ))}
          </InputOTP.Group>
        </InputOTP>
      </View>

      <View className="mt-2 gap-3">
        <StyledButton label="Continue" onPress={() => handleVerifyCode()} />

        <StyledButton
          isLoading={isResending}
          label="Resend Code"
          onPress={handleResendCode}
          variant="secondary"
        />
      </View>

      <View className="mt-4 items-center">
        <Text className="text-sm text-muted">Code expires in 5 minutes</Text>
      </View>
    </KeyboardAwareForm>
  );
}
