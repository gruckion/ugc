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

const THEME_COLORS = {
  primary: "#1DBF73",
  primaryForeground: "#FFFFFF",
  foreground: "#222325",
  muted: "#62646a",
  border: "#e4e5e7",
  background: "#FFFFFF",
  error: "#dc2626",
};

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
          marginBottom: 32,
        }}
      >
        {isSignIn ? "Continue with your email" : "Create your account"}
      </Text>

      {/* Error Message - reserved height to prevent layout shift */}
      <View
        style={{
          minHeight: 48,
          marginBottom: 16,
        }}
      >
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

      {/* Form Fields */}
      <View style={{ gap: 20 }}>
        {/* Name (signup only) */}
        {!isSignIn && (
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: THEME_COLORS.foreground,
                marginBottom: 8,
              }}
            >
              Full Name
            </Text>
            <TextInput
              autoCapitalize="words"
              autoComplete="name"
              onChangeText={setName}
              onSubmitEditing={() => emailRef.current?.focus()}
              placeholder="Enter your full name"
              placeholderTextColor={THEME_COLORS.muted}
              returnKeyType="next"
              style={{
                borderWidth: 1,
                borderColor: THEME_COLORS.border,
                borderRadius: 8,
                padding: 14,
                fontSize: 15,
                color: THEME_COLORS.foreground,
              }}
              textContentType="name"
              value={name}
            />
          </View>
        )}

        {/* Email */}
        <View>
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
            onSubmitEditing={() => passwordRef.current?.focus()}
            placeholder="Enter your email"
            placeholderTextColor={THEME_COLORS.muted}
            ref={emailRef}
            returnKeyType="next"
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

        {/* Password */}
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: THEME_COLORS.foreground,
              marginBottom: 8,
            }}
          >
            Password
          </Text>
          <View style={{ position: "relative" }}>
            <TextInput
              autoComplete={isSignIn ? "password" : "new-password"}
              onChangeText={setPassword}
              onSubmitEditing={() =>
                isSignIn ? handleSubmit() : confirmPasswordRef.current?.focus()
              }
              placeholder={
                isSignIn ? "Enter your password" : "Create a password"
              }
              placeholderTextColor={THEME_COLORS.muted}
              ref={passwordRef}
              returnKeyType={isSignIn ? "go" : "next"}
              secureTextEntry={!showPassword}
              style={{
                borderWidth: 1,
                borderColor: THEME_COLORS.border,
                borderRadius: 8,
                padding: 14,
                paddingRight: 48,
                fontSize: 15,
                color: THEME_COLORS.foreground,
              }}
              textContentType={isSignIn ? "password" : "newPassword"}
              value={password}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 12,
                top: 0,
                bottom: 0,
                justifyContent: "center",
              }}
            >
              <Ionicons
                color={THEME_COLORS.muted}
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
              />
            </Pressable>
          </View>
          {isSignIn && (
            <Pressable
              onPress={() => setView("forgot-password")}
              style={{ alignSelf: "flex-end", marginTop: 8 }}
            >
              {({ hovered }) => (
                <Text
                  style={{
                    fontSize: 14,
                    color: THEME_COLORS.primary,
                    textDecorationLine: hovered ? "underline" : "none",
                  }}
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
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: THEME_COLORS.foreground,
                marginBottom: 8,
              }}
            >
              Confirm Password
            </Text>
            <TextInput
              autoComplete="new-password"
              onChangeText={setConfirmPassword}
              onSubmitEditing={handleSubmit}
              placeholder="Confirm your password"
              placeholderTextColor={THEME_COLORS.muted}
              ref={confirmPasswordRef}
              returnKeyType="go"
              secureTextEntry={!showPassword}
              style={{
                borderWidth: 1,
                borderColor: THEME_COLORS.border,
                borderRadius: 8,
                padding: 14,
                fontSize: 15,
                color: THEME_COLORS.foreground,
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
        style={({ hovered }) => ({
          backgroundColor: isLoading
            ? THEME_COLORS.border
            : hovered
              ? "#19a463"
              : THEME_COLORS.primary,
          paddingVertical: 16,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 32,
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
            {isSignIn ? "Sign In" : "Create Account"}
          </Text>
        )}
      </Pressable>

      {/* Terms */}
      <Text
        style={{
          fontSize: 12,
          color: THEME_COLORS.muted,
          textAlign: "center",
          marginTop: 24,
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

export default AuthModalEmailForm;
