import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authClient } from "@/lib/auth-client";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Theme colors for Ionicons and placeholderTextColor (which don't support className)
  const accent = useThemeColor("accent");
  const muted = useThemeColor("muted");
  const primaryForeground = "#FFFFFF";

  // Get session - authenticated users don't need to enter name/email/phone
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  // Form state - guest fields only used when NOT authenticated
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
  };

  // Derive final values - session takes precedence for authenticated users
  const getName = () =>
    isAuthenticated ? session.user.name || "" : formData.name;
  const getEmail = () =>
    isAuthenticated ? session.user.email || "" : formData.email;
  const getPhone = () => (isAuthenticated ? "" : formData.phone);

  const handleSubmit = () => {
    const name = getName();
    const email = getEmail();

    // Only validate guest fields if not authenticated
    if (!isAuthenticated) {
      if (!name.trim()) {
        Alert.alert("Required Field", "Please enter your name.");
        return;
      }

      if (!email.trim()) {
        Alert.alert("Required Field", "Please enter your email address.");
        return;
      }

      if (!validateEmail(email.trim())) {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
        return;
      }
    }

    setIsSubmitting(true);

    // Prepare submission data
    const submissionData = {
      name: name.trim(),
      email: email.trim(),
      phone: getPhone().trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    console.log("Submitting contact form:", submissionData);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Message Sent",
        "Thank you for your message. We'll get back to you soon.",
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form (only reset fields that are in state)
              setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
              });
            },
          },
        ]
      );
    }, 500);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View
        className="bg-primary px-4 pb-4"
        style={{
          paddingTop: insets.top + 8,
        }}
      >
        <View className="flex-row items-center">
          <Pressable
            className="size-10 rounded-full bg-white/15 items-center justify-center mr-3"
            onPress={() => router.back()}
          >
            <Ionicons color={primaryForeground} name="arrow-back" size={22} />
          </Pressable>
          <Text className="text-primary-foreground text-xl font-light font-serif">
            Contact Us
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Contact Info Card */}
          <View
            className="bg-surface rounded-xl p-4 mb-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="text-foreground text-base font-semibold mb-3">
              Get in Touch
            </Text>

            <View className="flex-row items-center mb-2.5">
              <Ionicons color={accent} name="location-outline" size={18} />
              <Text className="text-muted text-sm ml-2.5">
                42 Crutched Friars, London EC3N 2AP
              </Text>
            </View>

            <Pressable
              className="flex-row items-center mb-2.5"
              onPress={() => Linking.openURL("tel:02071676682")}
            >
              <Ionicons color={accent} name="call-outline" size={18} />
              <Text className="text-foreground text-sm ml-2.5">
                020 7167 6682
              </Text>
            </Pressable>

            <Pressable
              className="flex-row items-center"
              onPress={() =>
                Linking.openURL("mailto:info@ugc.com")
              }
            >
              <Ionicons color={accent} name="mail-outline" size={18} />
              <Text className="text-foreground text-sm ml-2.5">
                info@ugc.com
              </Text>
            </Pressable>
          </View>

          {/* Contact Form */}
          <View
            className="bg-surface rounded-xl p-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="text-foreground text-base font-semibold mb-4">
              Send us a Message
            </Text>

            {/* Authenticated User Info */}
            {isAuthenticated && (
              <View className="bg-accent/15 rounded-lg p-3 mb-4 flex-row items-center">
                <Ionicons
                  color={accent}
                  name="person-circle-outline"
                  size={20}
                />
                <View className="ml-2.5 flex-1">
                  <Text className="text-foreground text-sm font-medium">
                    {session.user.name || "Member"}
                  </Text>
                  <Text className="text-muted text-[13px]">
                    {session.user.email}
                  </Text>
                </View>
              </View>
            )}

            {/* Guest Fields - Only shown when NOT authenticated */}
            {!isAuthenticated && (
              <>
                {/* Name Field */}
                <View className="mb-4">
                  <Text className="text-foreground text-sm font-medium mb-1.5">
                    Name <Text className="text-red-600">*</Text>
                  </Text>
                  <TextInput
                    className="border-border bg-surface text-foreground border rounded-lg p-3.5 text-[15px]"
                    onChangeText={(value) => updateField("name", value)}
                    placeholder="Your full name"
                    placeholderTextColor={muted}
                    value={formData.name}
                  />
                </View>

                {/* Email and Phone Row */}
                <View className="flex-row gap-3 mb-4">
                  {/* Email Field */}
                  <View className="flex-1">
                    <Text className="text-foreground text-sm font-medium mb-1.5">
                      Email <Text className="text-red-600">*</Text>
                    </Text>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      className="border-border bg-surface text-foreground border rounded-lg p-3.5 text-[15px]"
                      keyboardType="email-address"
                      onChangeText={(value) => updateField("email", value)}
                      placeholder="Email address"
                      placeholderTextColor={muted}
                      value={formData.email}
                    />
                  </View>

                  {/* Phone Field */}
                  <View className="flex-1">
                    <Text className="text-foreground text-sm font-medium mb-1.5">
                      Phone
                    </Text>
                    <TextInput
                      className="border-border bg-surface text-foreground border rounded-lg p-3.5 text-[15px]"
                      keyboardType="phone-pad"
                      onChangeText={(value) => updateField("phone", value)}
                      placeholder="Phone number"
                      placeholderTextColor={muted}
                      value={formData.phone}
                    />
                  </View>
                </View>
              </>
            )}

            {/* Subject Field */}
            <View className="mb-4">
              <Text className="text-foreground text-sm font-medium mb-1.5">
                Subject
              </Text>
              <TextInput
                className="border-border bg-surface text-foreground border rounded-lg p-3.5 text-[15px]"
                onChangeText={(value) => updateField("subject", value)}
                placeholder="What is this regarding?"
                placeholderTextColor={muted}
                value={formData.subject}
              />
            </View>

            {/* Message Field */}
            <View className="mb-5">
              <Text className="text-foreground text-sm font-medium mb-1.5">
                Message
              </Text>
              <TextInput
                className="border-border bg-surface text-foreground border rounded-lg p-3.5 text-[15px]"
                multiline
                numberOfLines={5}
                onChangeText={(value) => updateField("message", value)}
                placeholder="Your message..."
                placeholderTextColor={muted}
                style={{ height: 120 }}
                textAlignVertical="top"
                value={formData.message}
              />
            </View>

            {/* Submit Button */}
            <Pressable
              className="bg-primary rounded-lg p-4 items-center justify-center"
              disabled={isSubmitting}
              onPress={handleSubmit}
              style={({ pressed }) => ({
                opacity: pressed || isSubmitting ? 0.8 : 1,
              })}
            >
              <Text className="text-primary-foreground text-base font-semibold">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Text>
            </Pressable>
          </View>

          {/* Opening Hours */}
          <View className="bg-primary rounded-xl p-5 mt-5">
            <Text className="text-primary-foreground text-base font-semibold mb-3">
              Opening Hours
            </Text>
            <Text className="text-primary-foreground text-sm leading-[22px]">
              Monday to Friday{"\n"}
              9:00 AM - 5:00 PM
            </Text>
            <Text className="text-accent text-[13px] mt-2">
              Lunch: 12:00 PM - Last orders 2:30 PM
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
