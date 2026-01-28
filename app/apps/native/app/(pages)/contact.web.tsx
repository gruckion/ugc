import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { XIcon } from "@/components/icons/XIcon";
import { createWebPageJsonLd, SEO } from "@/components/web/SEO";
import { useResponsive } from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";

// Contact options
const CONTACT_OPTIONS = [
  {
    title: "General Support",
    description: "Questions about the platform, accounts, or getting started",
    email: "support@ugcmarketplace.com",
    icon: "help-circle-outline" as const,
  },
  {
    title: "Brand Partnerships",
    description: "Enterprise plans, custom integrations, and bulk pricing",
    email: "brands@ugcmarketplace.com",
    icon: "business-outline" as const,
  },
  {
    title: "Creator Support",
    description: "Help with payments, profile, or dispute resolution",
    email: "creators@ugcmarketplace.com",
    icon: "person-outline" as const,
  },
  {
    title: "Press & Media",
    description: "Press inquiries, media kits, and interview requests",
    email: "press@ugcmarketplace.com",
    icon: "newspaper-outline" as const,
  },
];

// FAQ quick links
const QUICK_LINKS = [
  { title: "Getting Started Guide", href: "/how-it-works" },
  { title: "Pricing & Plans", href: "/pricing" },
  { title: "Creator FAQ", href: "/faq/creators" },
  { title: "Brand FAQ", href: "/faq/brands" },
];

// Inquiry types for dropdown
const INQUIRY_TYPES = [
  "General Question",
  "Brand Inquiry",
  "Creator Support",
  "Payment Issue",
  "Technical Problem",
  "Partnership Opportunity",
  "Press/Media",
  "Other",
];

export default function ContactPage() {
  const { isMobile } = useResponsive();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [showInquiryDropdown, setShowInquiryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!(formData.name && formData.email && formData.message)) {
      return;
    }

    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const contactPageJsonLd = createWebPageJsonLd(
    "Contact Us - UGC Marketplace",
    "Get in touch with our team for support, partnerships, or inquiries.",
    "/contact"
  );

  const isFormDisabled =
    isSubmitting ||
    !formData.name ||
    !formData.email ||
    !formData.message;

  return (
    <ScrollView className="flex-1 bg-background">
      <SEO
        description="Get in touch with UGC Marketplace. Contact our support team for help, brand partnerships, creator support, or press inquiries. We're here to help."
        jsonLd={contactPageJsonLd}
        keywords={[
          "contact UGC marketplace",
          "customer support",
          "brand partnerships",
          "creator support",
        ]}
        path="/contact"
        title="Contact Us"
      />

      {/* Hero Section */}
      <View
        className="px-6 bg-sectionBackground"
        style={{
          paddingTop: 48,
          paddingBottom: 64,
        }}
      >
        <View
          className="w-full mx-auto"
          style={{ maxWidth: 1200 }}
        >
          <Text
            className="font-bold text-foreground text-center mb-4"
            style={{
              fontSize: isMobile ? 32 : 48,
            }}
          >
            Contact Us
          </Text>
          <Text
            className="text-lg text-muted text-center mx-auto"
            style={{
              maxWidth: 600,
              lineHeight: 28,
            }}
          >
            We're here to help. Reach out with any questions about our platform,
            partnerships, or support needs.
          </Text>
        </View>
      </View>

      {/* Contact Options */}
      <View
        className="px-6"
        style={{ paddingVertical: 64 }}
      >
        <View
          className="w-full mx-auto"
          style={{ maxWidth: 1200 }}
        >
          <View className="flex-row flex-wrap gap-6 justify-center">
            {CONTACT_OPTIONS.map((option) => (
              <View
                key={option.title}
                className="p-6 rounded-xl bg-background border border-border"
                style={{
                  width: isMobile ? "100%" : 260,
                }}
              >
                <View
                  className="w-12 h-12 items-center justify-center mb-4 bg-primary/5"
                  style={{ borderRadius: 24 }}
                >
                  <Ionicons
                    name={option.icon}
                    size={24}
                    className="text-primary"
                  />
                </View>
                <Text
                  className="text-lg font-semibold text-foreground mb-2"
                >
                  {option.title}
                </Text>
                <Text
                  className="text-sm text-muted mb-3"
                  style={{ lineHeight: 20 }}
                >
                  {option.description}
                </Text>
                <Text className="text-sm text-primary font-medium">
                  {option.email}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Contact Form & Info */}
      <View
        className="px-6 bg-sectionBackground"
        style={{ paddingVertical: 64 }}
      >
        <View
          className="w-full mx-auto"
          style={{ maxWidth: 1200 }}
        >
          <View
            className={isMobile ? "flex-col" : "flex-row"}
            style={{ gap: 48 }}
          >
            {/* Contact Form */}
            <View className="flex-1">
              <Text className="text-2xl font-bold text-foreground mb-6">
                Send Us a Message
              </Text>

              {submitted ? (
                <View className="p-8 rounded-xl bg-background border border-primary items-center">
                  <View
                    className="w-16 h-16 items-center justify-center mb-4 bg-primary/5"
                    style={{ borderRadius: 32 }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={32}
                      className="text-primary"
                    />
                  </View>
                  <Text
                    className="font-semibold text-foreground mb-2"
                    style={{ fontSize: 20 }}
                  >
                    Message Sent!
                  </Text>
                  <Text className="text-sm text-muted text-center">
                    We'll get back to you within 24-48 hours.
                  </Text>
                </View>
              ) : (
                <View className="p-8 rounded-xl bg-background border border-border">
                  {/* Name Input */}
                  <View className="mb-5">
                    <Text className="text-sm font-medium text-foreground mb-2">
                      Name
                    </Text>
                    <TextInput
                      onChangeText={(text) =>
                        setFormData({ ...formData, name: text })
                      }
                      placeholder="Your name"
                      placeholderTextColor="#62646a"
                      className="rounded-lg border border-border text-foreground"
                      style={{
                        padding: 14,
                        fontSize: 15,
                      }}
                      value={formData.name}
                    />
                  </View>

                  {/* Email Input */}
                  <View className="mb-5">
                    <Text className="text-sm font-medium text-foreground mb-2">
                      Email
                    </Text>
                    <TextInput
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onChangeText={(text) =>
                        setFormData({ ...formData, email: text })
                      }
                      placeholder="your@email.com"
                      placeholderTextColor="#62646a"
                      className="rounded-lg border border-border text-foreground"
                      style={{
                        padding: 14,
                        fontSize: 15,
                      }}
                      value={formData.email}
                    />
                  </View>

                  {/* Inquiry Type Dropdown */}
                  <View className="mb-5">
                    <Text className="text-sm font-medium text-foreground mb-2">
                      Inquiry Type
                    </Text>
                    <Pressable
                      onPress={() =>
                        setShowInquiryDropdown(!showInquiryDropdown)
                      }
                      className="rounded-lg border border-border flex-row justify-between items-center"
                      style={{ padding: 14 }}
                    >
                      <Text
                        className={cn(
                          formData.inquiryType
                            ? "text-foreground"
                            : "text-muted"
                        )}
                        style={{ fontSize: 15 }}
                      >
                        {formData.inquiryType || "Select inquiry type"}
                      </Text>
                      <Ionicons
                        name={
                          showInquiryDropdown ? "chevron-up" : "chevron-down"
                        }
                        size={20}
                        className="text-muted"
                      />
                    </Pressable>
                    {showInquiryDropdown && (
                      <View className="mt-1 rounded-lg border border-border bg-background overflow-hidden">
                        {INQUIRY_TYPES.map((type) => (
                          <Pressable
                            key={type}
                            onPress={() => {
                              setFormData({ ...formData, inquiryType: type });
                              setShowInquiryDropdown(false);
                            }}
                            className="p-3 bg-background hover:bg-surface-raised"
                          >
                            <Text className="text-sm text-foreground">
                              {type}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Message Input */}
                  <View className="mb-6">
                    <Text className="text-sm font-medium text-foreground mb-2">
                      Message
                    </Text>
                    <TextInput
                      multiline
                      numberOfLines={5}
                      onChangeText={(text) =>
                        setFormData({ ...formData, message: text })
                      }
                      placeholder="How can we help?"
                      placeholderTextColor="#62646a"
                      className="rounded-lg border border-border text-foreground"
                      style={{
                        padding: 14,
                        fontSize: 15,
                        minHeight: 120,
                        textAlignVertical: "top",
                      }}
                      value={formData.message}
                    />
                  </View>

                  {/* Submit Button */}
                  <Pressable
                    disabled={isFormDisabled}
                    onPress={handleSubmit}
                    className={cn(
                      "rounded-lg",
                      isFormDisabled
                        ? "bg-gray-300"
                        : "bg-primary hover:bg-hover-primary"
                    )}
                    style={{ padding: 16 }}
                  >
                    <Text className="text-base font-semibold text-primaryForeground text-center">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>

            {/* Additional Info */}
            <View className="flex-1" style={{ maxWidth: isMobile ? "100%" : 400 }}>
              {/* Office Info */}
              <View className="mb-8">
                <Text
                  className="font-bold text-foreground mb-4"
                  style={{ fontSize: 20 }}
                >
                  Our Office
                </Text>
                <View className="p-6 rounded-xl bg-background border border-border">
                  <View className="flex-row items-start gap-3 mb-4">
                    <Ionicons
                      name="location-outline"
                      size={20}
                      className="text-primary"
                    />
                    <View>
                      <Text className="text-sm text-foreground font-medium mb-1">
                        Headquarters
                      </Text>
                      <Text
                        className="text-sm text-muted"
                        style={{ lineHeight: 20 }}
                      >
                        123 Creator Street{"\n"}
                        San Francisco, CA 94103{"\n"}
                        United States
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-3">
                    <Ionicons
                      name="time-outline"
                      size={20}
                      className="text-primary"
                    />
                    <View>
                      <Text className="text-sm text-foreground font-medium mb-1">
                        Business Hours
                      </Text>
                      <Text className="text-sm text-muted">
                        Mon-Fri: 9am - 6pm PST
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Quick Links */}
              <View>
                <Text
                  className="font-bold text-foreground mb-4"
                  style={{ fontSize: 20 }}
                >
                  Quick Links
                </Text>
                <View className="p-6 rounded-xl bg-background border border-border">
                  <Text className="text-sm text-muted mb-4">
                    Find answers to common questions:
                  </Text>
                  {QUICK_LINKS.map((link, index) => (
                    <View
                      key={link.title}
                      className={cn(
                        "flex-row items-center gap-2 py-2",
                        index > 0 ? "border-t border-border" : ""
                      )}
                    >
                      <Ionicons
                        name="arrow-forward"
                        size={16}
                        className="text-primary"
                      />
                      <Text className="text-sm text-primary font-medium">
                        {link.title}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Social Links */}
              <View className="mt-8">
                <Text
                  className="font-bold text-foreground mb-4"
                  style={{ fontSize: 20 }}
                >
                  Follow Us
                </Text>
                <View className="flex-row gap-3">
                  {[
                    { icon: "x", href: "https://x.com/idoads" },
                    {
                      icon: "logo-instagram",
                      href: "https://instagram.com/idoads",
                    },
                    {
                      icon: "logo-linkedin",
                      href: "https://linkedin.com/company/idoads",
                    },
                    {
                      icon: "logo-youtube",
                      href: "https://youtube.com/@idoads",
                    },
                  ].map((social) => (
                    <Pressable
                      key={social.icon}
                      onPress={() => {
                        if (typeof window !== "undefined") {
                          window.open(
                            social.href,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
                      }}
                      className="items-center justify-center border border-border"
                      style={({ hovered }) => ({
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: hovered
                          ? "#222325"
                          : undefined,
                      })}
                    >
                      {({ hovered }) =>
                        social.icon === "x" ? (
                          <XIcon
                            color={
                              hovered
                                ? "#FFFFFF"
                                : "#62646a"
                            }
                            size={20}
                          />
                        ) : (
                          <Ionicons
                            color={
                              hovered
                                ? "#FFFFFF"
                                : "#62646a"
                            }
                            name={social.icon as any}
                            size={20}
                          />
                        )
                      }
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
