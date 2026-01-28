import { ScrollView, Text, View } from "react-native";

const THEME_COLORS = {
  primary: "#1DBF73",
  foreground: "#222325",
  muted: "#62646a",
  background: "#FFFFFF",
};

export default function TermsOfServicePage() {
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
        Terms of Service
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
          Welcome to UGC Marketplace. These terms govern your access to and use
          of our website and mobile applications.
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
            Key Terms
          </Text>
          <Text
            style={{ fontSize: 14, color: THEME_COLORS.muted, lineHeight: 22 }}
          >
            Brands are users who purchase services. Creators are users who offer
            and perform services. Services include user-generated content such
            as videos, photos, and reviews.
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
            Eligibility
          </Text>
          <Text
            style={{ fontSize: 14, color: THEME_COLORS.muted, lineHeight: 22 }}
          >
            You must be at least 18 years old to use the Site. By using the
            Site, you agree to be bound by these Terms.
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
            Account Registration
          </Text>
          <Text
            style={{ fontSize: 14, color: THEME_COLORS.muted, lineHeight: 22 }}
          >
            You agree to provide accurate information when registering and are
            responsible for maintaining the confidentiality of your account.
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
            Payments
          </Text>
          <Text
            style={{ fontSize: 14, color: THEME_COLORS.muted, lineHeight: 22 }}
          >
            Payment is collected when a brief is accepted. You may not offer
            direct payments outside of the platform.
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
            Questions? Contact us at legal@ugcmarketplace.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
