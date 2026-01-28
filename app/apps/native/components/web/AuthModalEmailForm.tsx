import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
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

interface AuthModalEmailFormProps {
  mode: "signin" | "signup";
}

function getSafeSignInErrorMessage(errorMessage: string | undefined): string {
  const lowerMessage = (errorMessage || "").toLowerCase();

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

  return "Unable to sign in. Please check your credentials and try again.";
}

function getSafeSignUpErrorMessage(errorMessage: string | undefined): string {
  const lowerMessage = (errorMessage || "").toLowerCase();

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

  return "Unable to create account. Please try again.";
}

export function AuthModalEmailForm({ mode }: AuthModalEmailFormProps) {
  const { setView, close } = useAuthModal();
  const router = useRouter();
  const isSignIn = mode === "signin";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const handleBack = () => {
    setView(isSignIn ? "signin" : "signup");
  };

  const handleSignIn = async () => {
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!password) {
      setError("Please enter your password");
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
          setError(getSafeSignInErrorMessage(ctx.error.message));
        },
        onSuccess: () => {
          setIsLoading(false);
          // Modal will auto-close via AuthModal's isAuthenticated effect
        },
      }
    );
  };

  const handleSignUp = async () => {
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
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
          setError(getSafeSignUpErrorMessage(ctx.error.message));
        },
        onSuccess: () => {
          setIsLoading(false);
          // Modal will auto-close via AuthModal's isAuthenticated effect
        },
      }
    );
  };

  const handleSubmit = isSignIn ? handleSignIn : handleSignUp;

  return (
    <View>
      {/* Back Button */}
      <Pressable
        onPress={handleBack}
        className="flex-row items-center gap-2 mb-6 self-start p-1 -ml-1 rounded hover:bg-hover-surface"
      >
        <Ionicons className="text-foreground" name="arrow-back" size={20} />
        <Text className="text-[15px] font-medium text-foreground">
          Back
        </Text>
      </Pressable>

      {/* Heading */}
      <Text className="text-2xl font-bold mb-8 text-foreground">
        {isSignIn ? "Continue with your email" : "Create your account"}
      </Text>

      {/* Error Message - reserved height to prevent layout shift */}
      <View className="min-h-[48px] mb-4">
        {error && (
          <View className="bg-error-bg border border-error-border rounded-lg p-3">
            <Text className="text-sm text-error-text">
              {error}
            </Text>
          </View>
        )}
      </View>

      {/* Form Fields */}
      <View className="gap-5">
        {/* Name (signup only) */}
        {!isSignIn && (
          <View>
            <Text className="text-sm font-medium mb-2 text-foreground">
              Full Name
            </Text>
            <TextInput
              autoCapitalize="words"
              autoComplete="name"
              onChangeText={setName}
              onSubmitEditing={() => emailRef.current?.focus()}
              placeholder="Enter your full name"
              placeholderTextColor="var(--muted)"
              returnKeyType="next"
              className="border border-input-border rounded-lg p-3.5 text-[15px]"
              style={{
                color: "var(--foreground)",
              }}
              textContentType="name"
              value={name}
            />
          </View>
        )}

        {/* Email */}
        <View>
          <Text className="text-sm font-medium mb-2 text-foreground">
            Email
          </Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={setEmail}
            onSubmitEditing={() => passwordRef.current?.focus()}
            placeholder="Enter your email"
            placeholderTextColor="var(--muted)"
            ref={emailRef}
            returnKeyType="next"
            className="border border-input-border rounded-lg p-3.5 text-[15px]"
            style={{
              color: "var(--foreground)",
            }}
            textContentType="emailAddress"
            value={email}
          />
        </View>

        {/* Password */}
        <View>
          <Text className="text-sm font-medium mb-2 text-foreground">
            Password
          </Text>
          <View className="relative">
            <TextInput
              autoComplete={isSignIn ? "password" : "new-password"}
              onChangeText={setPassword}
              onSubmitEditing={() =>
                isSignIn ? handleSubmit() : confirmPasswordRef.current?.focus()
              }
              placeholder={
                isSignIn ? "Enter your password" : "Create a password"
              }
              placeholderTextColor="var(--muted)"
              ref={passwordRef}
              returnKeyType={isSignIn ? "go" : "next"}
              secureTextEntry={!showPassword}
              className="border border-input-border rounded-lg p-3.5 pr-12 text-[15px]"
              style={{
                color: "var(--foreground)",
              }}
              textContentType={isSignIn ? "password" : "newPassword"}
              value={password}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-0 bottom-0 justify-center"
            >
              <Ionicons
                className="text-muted"
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
              />
            </Pressable>
          </View>
          {isSignIn && (
            <Pressable
              onPress={() => setView("forgot-password")}
              className="self-end mt-2"
            >
              {({ hovered }) => (
                <Text
                  className={cn(
                    "text-sm text-primary",
                    hovered && "underline"
                  )}
                >
                  Forgot password?
                </Text>
              )}
            </Pressable>
          )}
        </View>

        {/* Confirm Password (signup only) */}
        {!isSignIn && (
          <View>
            <Text className="text-sm font-medium mb-2 text-foreground">
              Confirm Password
            </Text>
            <TextInput
              autoComplete="new-password"
              onChangeText={setConfirmPassword}
              onSubmitEditing={handleSubmit}
              placeholder="Confirm your password"
              placeholderTextColor="var(--muted)"
              ref={confirmPasswordRef}
              returnKeyType="go"
              secureTextEntry={!showPassword}
              className="border border-input-border rounded-lg p-3.5 text-[15px]"
              style={{
                color: "var(--foreground)",
              }}
              textContentType="newPassword"
              value={confirmPassword}
            />
          </View>
        )}
      </View>

      {/* Submit Button */}
      <Pressable
        disabled={isLoading}
        onPress={handleSubmit}
        className={cn(
          "py-4 rounded-lg items-center mt-8",
          isLoading
            ? "bg-border"
            : "bg-primary hover:bg-hover-primary"
        )}
      >
        {isLoading ? (
          <ActivityIndicator color="var(--primary-foreground)" />
        ) : (
          <Text className="text-base font-semibold text-primary-foreground">
            {isSignIn ? "Sign In" : "Create Account"}
          </Text>
        )}
      </Pressable>

      {/* Terms */}
      <Text className="text-xs text-center mt-6 leading-[18px] text-muted">
        By joining, you agree to the UGC Marketplace{" "}
        <Text
          onPress={() => {
            close();
            router.push("/termsofservice" as any);
          }}
          className="underline text-primary"
        >
          Terms of Service
        </Text>{" "}
        and to occasionally receive emails from us. Please read our{" "}
        <Text
          onPress={() => {
            close();
            router.push("/privacypolicy" as any);
          }}
          className="underline text-primary"
        >
          Privacy Policy
        </Text>{" "}
        to learn how we use your personal data.
      </Text>
    </View>
  );
}

export default AuthModalEmailForm;
