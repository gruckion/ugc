import { ScrollView, Text, View } from "react-native";

const THEME_COLORS = {
  primary: "#1DBF73",
  foreground: "#222325",
  muted: "#62646a",
  background: "#FFFFFF",
};

export default function PrivacyPolicyPage() {
  return (
    <ScrollView
      contentContainerStyle={{ padding: 20 }}
      style={{ flex: 1, backgroundColor: THEME_COLORS.background }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: THEME_COLORS.foreground,
          marginBottom: 8,
        }}
      >
        Privacy Policy
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: THEME_COLORS.muted,
          marginBottom: 24,
        }}
      >
        Last Updated: January 2026
      </Text>

      <View style={{ gap: 20 }}>
        <Text
          style={{ fontSize: 14, color: THEME_COLORS.muted, lineHeight: 22 }}
        >
          UGC Marketplace is committed to protecting your privacy. This policy
          explains how we collect, use, and safeguard your information.
        </Text>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: THEME_COLORS.foreground,
              marginBottom: 8,
            }}
          >
            Information We Collect
          </Text>
          <Text
            style={{ fontSize: 14, color: THEME_COLORS.muted, lineHeight: 22 }}
          >
            We collect information you provide (name, email, profile info,
            payment details) and information collected automatically (device
            info, IP address, usage data).
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: THEME_COLORS.foreground,
              marginBottom: 8,
            }}
          >
            How We Use Information
          </Text>
          <Text
            style={{ fontSize: 14, color: THEME_COLORS.muted, lineHeight: 22 }}
          >
            We use your information to provide services, process transactions,
            send communications, and improve our platform.
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: THEME_COLORS.foreground,
              marginBottom: 8,
            }}
          >
            Information Sharing
          </Text>
          <Text
            style={{ fontSize: 14, color: THEME_COLORS.muted, lineHeight: 22 }}
          >
            We share information with other users as needed for the platform to
            function, with service providers, and when required by law.
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: THEME_COLORS.foreground,
              marginBottom: 8,
            }}
          >
            Your Rights
          </Text>
          <Text
            style={{ fontSize: 14, color: THEME_COLORS.muted, lineHeight: 22 }}
          >
            You may request access, correction, or deletion of your personal
            information by contacting us.
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: THEME_COLORS.foreground,
              marginBottom: 8,
            }}
          >
            Contact
          </Text>
          <Text
            style={{ fontSize: 14, color: THEME_COLORS.muted, lineHeight: 22 }}
          >
            Questions? Contact us at privacy@ugcmarketplace.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
