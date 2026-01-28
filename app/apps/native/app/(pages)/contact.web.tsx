import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { XIcon } from "@/components/icons/XIcon";
import { createWebPageJsonLd, SEO } from "@/components/web/SEO";
import { useResponsive } from "@/hooks/useResponsive";

// Fiverr-style theme colors
const THEME_COLORS = {
  primary: "#1DBF73",
  primaryForeground: "#FFFFFF",
  foreground: "#222325",
  muted: "#62646a",
  border: "#e4e5e7",
  background: "#FFFFFF",
  sectionBackground: "#fafafa",
};

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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
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
        style={{
          paddingTop: 48,
          paddingBottom: 64,
          paddingHorizontal: 24,
          backgroundColor: THEME_COLORS.sectionBackground,
        }}
      >
        <View
          style={{
            maxWidth: 1200,
            marginHorizontal: "auto",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: isMobile ? 32 : 48,
              fontWeight: "700",
              color: THEME_COLORS.foreground,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Contact Us
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: THEME_COLORS.muted,
              textAlign: "center",
              maxWidth: 600,
              marginHorizontal: "auto",
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
        style={{
          paddingVertical: 64,
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            maxWidth: 1200,
            marginHorizontal: "auto",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 24,
              justifyContent: "center",
            }}
          >
            {CONTACT_OPTIONS.map((option) => (
              <View
                key={option.title}
                style={{
                  width: isMobile ? "100%" : 260,
                  padding: 24,
                  borderRadius: 12,
                  backgroundColor: THEME_COLORS.background,
                  borderWidth: 1,
                  borderColor: THEME_COLORS.border,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: `${THEME_COLORS.primary}15`,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Ionicons
                    color={THEME_COLORS.primary}
                    name={option.icon}
                    size={24}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: THEME_COLORS.foreground,
                    marginBottom: 8,
                  }}
                >
                  {option.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: THEME_COLORS.muted,
                    marginBottom: 12,
                    lineHeight: 20,
                  }}
                >
                  {option.description}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: THEME_COLORS.primary,
                    fontWeight: "500",
                  }}
                >
                  {option.email}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Contact Form & Info */}
      <View
        style={{
          paddingVertical: 64,
          paddingHorizontal: 24,
          backgroundColor: THEME_COLORS.sectionBackground,
        }}
      >
        <View
          style={{
            maxWidth: 1200,
            marginHorizontal: "auto",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: 48,
            }}
          >
            {/* Contact Form */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: THEME_COLORS.foreground,
                  marginBottom: 24,
                }}
              >
                Send Us a Message
              </Text>

              {submitted ? (
                <View
                  style={{
                    padding: 32,
                    borderRadius: 12,
                    backgroundColor: THEME_COLORS.background,
                    borderWidth: 1,
                    borderColor: THEME_COLORS.primary,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      backgroundColor: `${THEME_COLORS.primary}15`,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <Ionicons
                      color={THEME_COLORS.primary}
                      name="checkmark-circle"
                      size={32}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      color: THEME_COLORS.foreground,
                      marginBottom: 8,
                    }}
                  >
                    Message Sent!
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: THEME_COLORS.muted,
                      textAlign: "center",
                    }}
                  >
                    We'll get back to you within 24-48 hours.
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    padding: 32,
                    borderRadius: 12,
                    backgroundColor: THEME_COLORS.background,
                    borderWidth: 1,
                    borderColor: THEME_COLORS.border,
                  }}
                >
                  {/* Name Input */}
                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: THEME_COLORS.foreground,
                        marginBottom: 8,
                      }}
                    >
                      Name
                    </Text>
                    <TextInput
                      onChangeText={(text) =>
                        setFormData({ ...formData, name: text })
                      }
                      placeholder="Your name"
                      placeholderTextColor={THEME_COLORS.muted}
                      style={{
                        padding: 14,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: THEME_COLORS.border,
                        fontSize: 15,
                        color: THEME_COLORS.foreground,
                      }}
                      value={formData.name}
                    />
                  </View>

                  {/* Email Input */}
                  <View style={{ marginBottom: 20 }}>
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
                      keyboardType="email-address"
                      onChangeText={(text) =>
                        setFormData({ ...formData, email: text })
                      }
                      placeholder="your@email.com"
                      placeholderTextColor={THEME_COLORS.muted}
                      style={{
                        padding: 14,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: THEME_COLORS.border,
                        fontSize: 15,
                        color: THEME_COLORS.foreground,
                      }}
                      value={formData.email}
                    />
                  </View>

                  {/* Inquiry Type Dropdown */}
                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: THEME_COLORS.foreground,
                        marginBottom: 8,
                      }}
                    >
                      Inquiry Type
                    </Text>
                    <Pressable
                      onPress={() =>
                        setShowInquiryDropdown(!showInquiryDropdown)
                      }
                      style={{
                        padding: 14,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: THEME_COLORS.border,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: formData.inquiryType
                            ? THEME_COLORS.foreground
                            : THEME_COLORS.muted,
                        }}
                      >
                        {formData.inquiryType || "Select inquiry type"}
                      </Text>
                      <Ionicons
                        color={THEME_COLORS.muted}
                        name={
                          showInquiryDropdown ? "chevron-up" : "chevron-down"
                        }
                        size={20}
                      />
                    </Pressable>
                    {showInquiryDropdown && (
                      <View
                        style={{
                          marginTop: 4,
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: THEME_COLORS.border,
                          backgroundColor: THEME_COLORS.background,
                          overflow: "hidden",
                        }}
                      >
                        {INQUIRY_TYPES.map((type) => (
                          <Pressable
                            key={type}
                            onPress={() => {
                              setFormData({ ...formData, inquiryType: type });
                              setShowInquiryDropdown(false);
                            }}
                            style={({ hovered }) => ({
                              padding: 12,
                              backgroundColor: hovered
                                ? THEME_COLORS.sectionBackground
                                : THEME_COLORS.background,
                            })}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                color: THEME_COLORS.foreground,
                              }}
                            >
                              {type}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Message Input */}
                  <View style={{ marginBottom: 24 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: THEME_COLORS.foreground,
                        marginBottom: 8,
                      }}
                    >
                      Message
                    </Text>
                    <TextInput
                      multiline
                      numberOfLines={5}
                      onChangeText={(text) =>
                        setFormData({ ...formData, message: text })
                      }
                      placeholder="How can we help?"
                      placeholderTextColor={THEME_COLORS.muted}
                      style={{
                        padding: 14,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: THEME_COLORS.border,
                        fontSize: 15,
                        color: THEME_COLORS.foreground,
                        minHeight: 120,
                        textAlignVertical: "top",
                      }}
                      value={formData.message}
                    />
                  </View>

                  {/* Submit Button */}
                  <Pressable
                    disabled={
                      isSubmitting ||
                      !formData.name ||
                      !formData.email ||
                      !formData.message
                    }
                    onPress={handleSubmit}
                    style={({ hovered }) => ({
                      padding: 16,
                      borderRadius: 8,
                      backgroundColor:
                        isSubmitting ||
                        !formData.name ||
                        !formData.email ||
                        !formData.message
                          ? "#d0d0d0"
                          : hovered
                            ? "#19a864"
                            : THEME_COLORS.primary,
                    })}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: THEME_COLORS.primaryForeground,
                        textAlign: "center",
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>

            {/* Additional Info */}
            <View style={{ flex: 1, maxWidth: isMobile ? "100%" : 400 }}>
              {/* Office Info */}
              <View style={{ marginBottom: 32 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: THEME_COLORS.foreground,
                    marginBottom: 16,
                  }}
                >
                  Our Office
                </Text>
                <View
                  style={{
                    padding: 24,
                    borderRadius: 12,
                    backgroundColor: THEME_COLORS.background,
                    borderWidth: 1,
                    borderColor: THEME_COLORS.border,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    <Ionicons
                      color={THEME_COLORS.primary}
                      name="location-outline"
                      size={20}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: THEME_COLORS.foreground,
                          fontWeight: "500",
                          marginBottom: 4,
                        }}
                      >
                        Headquarters
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: THEME_COLORS.muted,
                          lineHeight: 20,
                        }}
                      >
                        123 Creator Street{"\n"}
                        San Francisco, CA 94103{"\n"}
                        United States
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Ionicons
                      color={THEME_COLORS.primary}
                      name="time-outline"
                      size={20}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: THEME_COLORS.foreground,
                          fontWeight: "500",
                          marginBottom: 4,
                        }}
                      >
                        Business Hours
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: THEME_COLORS.muted,
                        }}
                      >
                        Mon-Fri: 9am - 6pm PST
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Quick Links */}
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: THEME_COLORS.foreground,
                    marginBottom: 16,
                  }}
                >
                  Quick Links
                </Text>
                <View
                  style={{
                    padding: 24,
                    borderRadius: 12,
                    backgroundColor: THEME_COLORS.background,
                    borderWidth: 1,
                    borderColor: THEME_COLORS.border,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: THEME_COLORS.muted,
                      marginBottom: 16,
                    }}
                  >
                    Find answers to common questions:
                  </Text>
                  {QUICK_LINKS.map((link, index) => (
                    <View
                      key={link.title}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        paddingVertical: 8,
                        borderTopWidth: index > 0 ? 1 : 0,
                        borderTopColor: THEME_COLORS.border,
                      }}
                    >
                      <Ionicons
                        color={THEME_COLORS.primary}
                        name="arrow-forward"
                        size={16}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: THEME_COLORS.primary,
                          fontWeight: "500",
                        }}
                      >
                        {link.title}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Social Links */}
              <View style={{ marginTop: 32 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: THEME_COLORS.foreground,
                    marginBottom: 16,
                  }}
                >
                  Follow Us
                </Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
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
                      style={({ hovered }) => ({
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: hovered
                          ? THEME_COLORS.foreground
                          : THEME_COLORS.background,
                        borderWidth: 1,
                        borderColor: THEME_COLORS.border,
                        alignItems: "center",
                        justifyContent: "center",
                      })}
                    >
                      {({ hovered }) =>
                        social.icon === "x" ? (
                          <XIcon
                            color={
                              hovered
                                ? THEME_COLORS.primaryForeground
                                : THEME_COLORS.muted
                            }
                            size={20}
                          />
                        ) : (
                          <Ionicons
                            color={
                              hovered
                                ? THEME_COLORS.primaryForeground
                                : THEME_COLORS.muted
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
