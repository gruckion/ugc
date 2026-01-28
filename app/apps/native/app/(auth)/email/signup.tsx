import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, Text, type TextInput, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import FormHeader, { StyledButton, StyledTextInput } from "@/components/form";
import { KeyboardAwareForm } from "@/components/keyboard";
import { authClient } from "@/lib/auth-client";

/**
 * Sanitize error messages to prevent information disclosure
 * This prevents email enumeration attacks by using generic messages
 */
function getSafeErrorMessage(errorMessage: string | undefined): string {
  const lowerMessage = (errorMessage || "").toLowerCase();

  // Map specific revealing errors to generic messages
  if (
    lowerMessage.includes("user already exists") ||
    lowerMessage.includes("email already") ||
    lowerMessage.includes("already registered")
  ) {
    return "Unable to create account. Please check your details or try signing in.";
  }

  if (
    lowerMessage.includes("invalid email") ||
    lowerMessage.includes("email format")
  ) {
    return "Please enter a valid email address.";
  }

  if (
    lowerMessage.includes("password") &&
    (lowerMessage.includes("weak") || lowerMessage.includes("short"))
  ) {
    return "Password does not meet requirements. Please use at least 6 characters.";
  }

  // Generic fallback for any other errors
  return "Unable to create account. Please try again.";
}

export default function SignUpRoute() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Refs for keyboard navigation: name → email → password → confirmPassword → submit
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  // Set dark status bar style for light background (stack-based approach)
  useEffect(() => {
    const entry = SystemBars.pushStackEntry({ style: "dark" });
    return () => SystemBars.popStackEntry(entry);
  }, []);

  const handleSignUp = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
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

    await authClient.signUp.email(
      {
        name: name.trim(),
        email: email.trim(),
        password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onError: (ctx) => {
          setIsLoading(false);
          // Use sanitized error message to prevent email enumeration
          Alert.alert("Error", getSafeErrorMessage(ctx.error.message));
        },
        onSuccess: () => {
          setIsLoading(false);
          // Navigation handled by (auth)/_layout.tsx auth state listener
        },
      }
    );
  };

  return (
    <KeyboardAwareForm>
      <FormHeader
        description="Join UGC and enjoy exclusive member benefits"
        title="Create Account"
      />

      <StyledTextInput
        autoCapitalize="words"
        autoComplete="name"
        blurOnSubmit={false}
        label="Full Name"
        onChangeText={setName}
        onSubmitEditing={() => emailRef.current?.focus()}
        placeholder="Enter your full name"
        returnKeyType="next"
        textContentType="name"
        value={name}
      />

      <StyledTextInput
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        blurOnSubmit={false}
        keyboardType="email-address"
        label="Email Address"
        onChangeText={setEmail}
        onSubmitEditing={() => passwordRef.current?.focus()}
        placeholder="Enter your email"
        ref={emailRef}
        returnKeyType="next"
        textContentType="emailAddress"
        value={email}
      />

      <StyledTextInput
        autoComplete="new-password"
        blurOnSubmit={false}
        label="Password"
        onChangeText={setPassword}
        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        placeholder="Create a password"
        ref={passwordRef}
        returnKeyType="next"
        secureTextEntry
        textContentType="newPassword"
        value={password}
      />

      <StyledTextInput
        autoComplete="new-password"
        label="Confirm Password"
        onChangeText={setConfirmPassword}
        onSubmitEditing={handleSignUp}
        placeholder="Confirm your password"
        ref={confirmPasswordRef}
        returnKeyType="go"
        secureTextEntry
        textContentType="newPassword"
        value={confirmPassword}
      />

      <View className="mt-2">
        <StyledButton
          isLoading={isLoading}
          label="Create Account"
          onPress={handleSignUp}
        />
      </View>

      <Text className="text-center text-muted text-[13px] leading-5 px-5">
        By signing up, you agree to our{" "}
        <Link asChild href="/termsofservice">
          <Text className="text-foreground underline">Terms of Service</Text>
        </Link>{" "}
        and{" "}
        <Link asChild href="/privacypolicy">
          <Text className="text-foreground underline">Privacy Policy</Text>
        </Link>
      </Text>

      <View className="flex-row justify-center items-center mt-2 gap-1">
        <Text className="text-muted text-sm">Already have an account?</Text>
        <Link asChild href="/(auth)/email/signin" replace>
          <Pressable>
            <Text className="text-accent text-sm font-semibold">Sign In</Text>
          </Pressable>
        </Link>
      </View>
    </KeyboardAwareForm>
  );
}
