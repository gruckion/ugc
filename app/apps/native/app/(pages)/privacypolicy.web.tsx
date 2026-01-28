import { ScrollView, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd } from "@/components/web/SEO";

const THEME_COLORS = {
  primary: "#1DBF73",
  primaryForeground: "#FFFFFF",
  foreground: "#222325",
  muted: "#62646a",
  border: "#e4e5e7",
  background: "#FFFFFF",
  sectionBackground: "#fafafa",
};

export default function PrivacyPolicyPage() {
  const { isMobile } = useResponsive();

  const privacyJsonLd = createWebPageJsonLd(
    "Privacy Policy - UGC Marketplace",
    "Privacy Policy explaining how UGC Marketplace handles your data.",
    "/privacypolicy"
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
      <SEO
        title="Privacy Policy"
        description="Read the Privacy Policy for UGC Marketplace. Learn how we collect, use, and protect your personal information and data."
        path="/privacypolicy"
        keywords={["privacy policy", "data protection", "personal information"]}
        jsonLd={privacyJsonLd}
      />

      {/* Header */}
      <View
        style={{
          paddingTop: 48,
          paddingBottom: 32,
          paddingHorizontal: 24,
          backgroundColor: THEME_COLORS.sectionBackground,
        }}
      >
        <View
          style={{
            maxWidth: 900,
            marginHorizontal: "auto",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: isMobile ? 32 : 42,
              fontWeight: "700",
              color: THEME_COLORS.foreground,
              marginBottom: 16,
            }}
          >
            Privacy Policy
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: THEME_COLORS.muted,
            }}
          >
            Last Updated: January 2026
          </Text>
        </View>
      </View>

      {/* Content */}
      <View
        style={{
          paddingVertical: 48,
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            maxWidth: 900,
            marginHorizontal: "auto",
            width: "100%",
            gap: 40,
          }}
        >
          {/* Introduction */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              UGC Marketplace ("we," "us," or "our") is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website and use our services.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              Please read this Privacy Policy carefully. By using our Site and
              services, you consent to the practices described in this policy.
            </Text>
          </View>

          {/* Information We Collect */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              Information We Collect
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: THEME_COLORS.foreground,
                marginTop: 8,
              }}
            >
              Personal Information You Provide
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              When you register for an account, we collect information such as:
            </Text>
            <View style={{ gap: 8, paddingLeft: 16 }}>
              {[
                "Name and email address",
                "Profile information (bio, profile photo, portfolio)",
                "Payment information (processed securely through our payment providers)",
                "Communication preferences",
                "Content you upload to the platform",
              ].map((item, index) => (
                <View key={index} style={{ flexDirection: "row", gap: 8 }}>
                  <Text style={{ color: THEME_COLORS.muted }}>•</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: THEME_COLORS.muted,
                      lineHeight: 24,
                      flex: 1,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: THEME_COLORS.foreground,
                marginTop: 16,
              }}
            >
              Information Collected Automatically
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              When you access our Site, we automatically collect certain
              information, including:
            </Text>
            <View style={{ gap: 8, paddingLeft: 16 }}>
              {[
                "Device information (browser type, operating system, device type)",
                "IP address and approximate location",
                "Pages visited and features used",
                "Time and date of visits",
                "Referring website or source",
              ].map((item, index) => (
                <View key={index} style={{ flexDirection: "row", gap: 8 }}>
                  <Text style={{ color: THEME_COLORS.muted }}>•</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: THEME_COLORS.muted,
                      lineHeight: 24,
                      flex: 1,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* How We Use Your Information */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              How We Use Your Information
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              We use the information we collect to:
            </Text>
            <View style={{ gap: 8, paddingLeft: 16 }}>
              {[
                "Provide, maintain, and improve our services",
                "Process transactions and send related information",
                "Send promotional communications (with your consent)",
                "Respond to your comments, questions, and requests",
                "Monitor and analyze trends, usage, and activities",
                "Detect, investigate, and prevent fraudulent transactions and abuse",
                "Personalize and improve your experience",
                "Comply with legal obligations",
              ].map((item, index) => (
                <View key={index} style={{ flexDirection: "row", gap: 8 }}>
                  <Text style={{ color: THEME_COLORS.muted }}>•</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: THEME_COLORS.muted,
                      lineHeight: 24,
                      flex: 1,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Information Sharing */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              Information Sharing and Disclosure
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              We may share your information in the following circumstances:
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: THEME_COLORS.foreground,
                marginTop: 8,
              }}
            >
              With Other Users
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              When you use our platform, certain information may be shared with
              other users. For example, Brands can see Creator profiles,
              portfolios, and ratings. Creators can see Brand profiles and brief
              details.
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: THEME_COLORS.foreground,
                marginTop: 16,
              }}
            >
              With Service Providers
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              We share information with third-party vendors who perform services
              on our behalf, such as payment processing, data analysis, email
              delivery, hosting services, and customer service.
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: THEME_COLORS.foreground,
                marginTop: 16,
              }}
            >
              For Legal Reasons
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              We may disclose information if required by law, in response to
              legal process, to protect our rights, or to protect the safety of
              our users or the public.
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: THEME_COLORS.foreground,
                marginTop: 16,
              }}
            >
              Business Transfers
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              If we are involved in a merger, acquisition, or sale of assets,
              your information may be transferred as part of that transaction.
            </Text>
          </View>

          {/* Cookies */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              Cookies and Tracking Technologies
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              We use cookies and similar tracking technologies to collect
              information about your browsing activities. Cookies are small data
              files stored on your device that help us improve our services and
              your experience.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              You can set your browser to refuse all or some cookies, or to
              alert you when cookies are being sent. If you disable cookies,
              some parts of the Site may not function properly.
            </Text>
          </View>

          {/* Data Security */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              Data Security
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the Internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </Text>
          </View>

          {/* Data Retention */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              Data Retention
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              We retain your personal information for as long as necessary to
              fulfill the purposes for which it was collected, including to
              satisfy legal, accounting, or reporting requirements. When your
              information is no longer needed, we will securely delete or
              anonymize it.
            </Text>
          </View>

          {/* Your Rights */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              Your Rights and Choices
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              Depending on your location, you may have certain rights regarding
              your personal information:
            </Text>
            <View style={{ gap: 8, paddingLeft: 16 }}>
              {[
                "Access: Request a copy of the personal information we hold about you",
                "Correction: Request that we correct inaccurate or incomplete information",
                "Deletion: Request that we delete your personal information",
                "Portability: Request a copy of your data in a portable format",
                "Objection: Object to our processing of your personal information",
                "Withdraw Consent: Withdraw consent where processing is based on consent",
              ].map((item, index) => (
                <View key={index} style={{ flexDirection: "row", gap: 8 }}>
                  <Text style={{ color: THEME_COLORS.muted }}>•</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: THEME_COLORS.muted,
                      lineHeight: 24,
                      flex: 1,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              To exercise these rights, please contact us at
              privacy@ugcmarketplace.com.
            </Text>
          </View>

          {/* California Privacy Rights */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              California Privacy Rights
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              If you are a California resident, you have additional rights under
              the California Consumer Privacy Act (CCPA), including the right to
              know what personal information we collect, the right to delete
              your personal information, and the right to opt-out of the sale of
              your personal information. We do not sell personal information.
            </Text>
          </View>

          {/* International Users */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              International Users
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              If you are located outside the United States, please be aware that
              your information may be transferred to, stored, and processed in
              the United States where our servers are located. By using our
              services, you consent to this transfer.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              For users in the European Economic Area (EEA), we comply with GDPR
              requirements and provide appropriate safeguards for data
              transfers.
            </Text>
          </View>

          {/* Children's Privacy */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              Children's Privacy
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect personal information from children. If
              we learn that we have collected personal information from a child
              under 18, we will take steps to delete such information.
            </Text>
          </View>

          {/* Third-Party Links */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              Third-Party Links
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              Our Site may contain links to third-party websites and services.
              We are not responsible for the privacy practices of these third
              parties. We encourage you to read the privacy policies of any
              third-party sites you visit.
            </Text>
          </View>

          {/* Changes to Policy */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              Changes to This Privacy Policy
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last Updated" date. You are advised to
              review this Privacy Policy periodically for any changes.
            </Text>
          </View>

          {/* Contact */}
          <View style={{ gap: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              Contact Us
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: THEME_COLORS.muted,
                lineHeight: 24,
              }}
            >
              If you have any questions about this Privacy Policy or our privacy
              practices, please contact us at:
            </Text>
            <View style={{ gap: 8, paddingLeft: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: THEME_COLORS.muted,
                  lineHeight: 24,
                }}
              >
                Email: privacy@ugcmarketplace.com
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: THEME_COLORS.muted,
                  lineHeight: 24,
                }}
              >
                UGC Marketplace
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
