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
  // Don't reveal whether email exists or password is wrong
  if (
    lowerMessage.includes("user not found") ||
    lowerMessage.includes("no user") ||
    lowerMessage.includes("invalid email") ||
    lowerMessage.includes("invalid password") ||
    lowerMessage.includes("incorrect password") ||
    lowerMessage.includes("wrong password") ||
    lowerMessage.includes("invalid credentials")
  ) {
    return "Invalid email or password. Please try again.";
  }

  if (
    lowerMessage.includes("too many") ||
    lowerMessage.includes("rate limit")
  ) {
    return "Too many attempts. Please try again later.";
  }

  if (
    lowerMessage.includes("account locked") ||
    lowerMessage.includes("account disabled")
  ) {
    return "Unable to sign in. Please contact support.";
  }

  // Generic fallback for any other errors
  return "Unable to sign in. Please check your credentials and try again.";
}

export default function SignInRoute() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Ref for focusing password field on Enter
  const passwordRef = useRef<TextInput>(null);

  // Set dark status bar style for light background (stack-based approach)
  useEffect(() => {
    const entry = SystemBars.pushStackEntry({ style: "dark" });
    return () => SystemBars.popStackEntry(entry);
  }, []);

  const handleSignIn = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    await authClient.signIn.email(
      {
        email: email.trim(),
        password,
        rememberMe: true,
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
        description="Sign in to access your membership and exclusive club features"
        title="Welcome Back"
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
        returnKeyType="next"
        textContentType="emailAddress"
        value={email}
      />

      <StyledTextInput
        autoComplete="password"
        label="Password"
        onChangeText={setPassword}
        onSubmitEditing={handleSignIn}
        placeholder="Enter your password"
        ref={passwordRef}
        returnKeyType="go"
        secureTextEntry
        textContentType="password"
        value={password}
      />

      <View className="mt-2">
        <StyledButton
          isLoading={isLoading}
          label="Sign In"
          onPress={handleSignIn}
        />
      </View>

      <Link asChild href="/(auth)/email/(reset)/request-password-reset">
        <Pressable className="self-center py-2">
          <Text className="text-accent text-sm font-medium">
            Forgot Password?
          </Text>
        </Pressable>
      </Link>

      <View className="flex-row justify-center items-center mt-6 gap-1">
        <Text className="text-muted text-sm">Don't have an account?</Text>
        <Link asChild href="/(auth)/email/signup" replace>
          <Pressable>
            <Text className="text-accent text-sm font-semibold">Sign Up</Text>
          </Pressable>
        </Link>
      </View>
    </KeyboardAwareForm>
  );
}
