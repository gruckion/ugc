import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd, createBreadcrumbJsonLd } from "@/components/web/SEO";

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

// Steps for Brands
const BRAND_STEPS = [
  {
    number: "01",
    title: "Post Your Brief",
    description:
      "Describe your campaign, target audience, and content requirements. Set your budget and timeline.",
    icon: "document-text-outline" as const,
  },
  {
    number: "02",
    title: "Review Applications",
    description:
      "Receive proposals from verified creators. Review portfolios, ratings, and past work to find the perfect match.",
    icon: "people-outline" as const,
  },
  {
    number: "03",
    title: "Secure Payment",
    description:
      "Fund the project with our escrow system. Payment is held securely until you approve the content.",
    icon: "shield-checkmark-outline" as const,
  },
  {
    number: "04",
    title: "Receive Content",
    description:
      "Review deliverables, request revisions if needed, and approve final content. Payment releases automatically.",
    icon: "checkmark-circle-outline" as const,
  },
];

// Steps for Creators
const CREATOR_STEPS = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Showcase your portfolio, set your rates, and define your niche. Let brands discover your unique style.",
    icon: "person-outline" as const,
  },
  {
    number: "02",
    title: "Browse & Apply",
    description:
      "Find briefs that match your expertise. Submit compelling proposals that highlight your relevant experience.",
    icon: "search-outline" as const,
  },
  {
    number: "03",
    title: "Create Content",
    description:
      "Deliver high-quality content according to the brief. Communicate with brands through our platform.",
    icon: "videocam-outline" as const,
  },
  {
    number: "04",
    title: "Get Paid",
    description:
      "Receive payment once your content is approved. Build your reputation with reviews and repeat clients.",
    icon: "wallet-outline" as const,
  },
];

// Platform benefits
const PLATFORM_BENEFITS = [
  {
    title: "Payment Protection",
    description:
      "Escrow system ensures creators get paid and brands receive quality content.",
    icon: "shield-checkmark-outline" as const,
  },
  {
    title: "Verified Creators",
    description:
      "All creators are vetted for quality, authenticity, and professionalism.",
    icon: "checkmark-done-outline" as const,
  },
  {
    title: "Transparent Pricing",
    description:
      "No hidden fees. Clear pricing and service levels from the start.",
    icon: "pricetag-outline" as const,
  },
  {
    title: "Fast Turnaround",
    description: "Average delivery time of 5-7 days. Rush options available.",
    icon: "flash-outline" as const,
  },
  {
    title: "Content Rights",
    description:
      "Clear licensing terms. Full commercial rights included with every delivery.",
    icon: "document-outline" as const,
  },
  {
    title: "Support Team",
    description:
      "Dedicated support for both brands and creators. We're here to help.",
    icon: "chatbubbles-outline" as const,
  },
];

export default function HowItWorksPage() {
  const { isMobile } = useResponsive();
  const { open: openAuthModal } = useAuthModal();

  const howItWorksJsonLd = createWebPageJsonLd(
    "How It Works - UGC Marketplace",
    "Learn how UGC Marketplace connects brands with creators for authentic content.",
    "/how-it-works"
  );

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
  ]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
      <SEO
        title="How It Works"
        description="Learn how UGC Marketplace works for brands and creators. Post briefs, find creators, get authentic content with secure payments. Simple 4-step process."
        path="/how-it-works"
        keywords={[
          "how UGC works",
          "creator marketplace process",
          "brand content workflow",
          "UGC platform guide",
          "content creation process",
        ]}
        jsonLd={[howItWorksJsonLd, breadcrumbJsonLd]}
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
            How It Works
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
            Connect with the perfect match. Whether you're a brand looking for
            authentic content or a creator ready to showcase your talent.
          </Text>
        </View>
      </View>

      {/* For Brands Section */}
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
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 48,
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
              }}
            >
              <Ionicons
                color={THEME_COLORS.primary}
                name="business-outline"
                size={24}
              />
            </View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              For Brands
            </Text>
          </View>

          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: 24,
            }}
          >
            {BRAND_STEPS.map((step, index) => (
              <View
                key={step.number}
                style={{
                  flex: 1,
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
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: THEME_COLORS.primary,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "700",
                        color: THEME_COLORS.primaryForeground,
                      }}
                    >
                      {step.number}
                    </Text>
                  </View>
                  <Ionicons
                    color={THEME_COLORS.muted}
                    name={step.icon}
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
                  {step.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: THEME_COLORS.muted,
                    lineHeight: 22,
                  }}
                >
                  {step.description}
                </Text>
                {index < BRAND_STEPS.length - 1 && !isMobile && (
                  <View
                    style={{
                      position: "absolute",
                      right: -12,
                      top: "50%",
                      transform: [{ translateY: -12 }],
                    }}
                  >
                    <Ionicons
                      color={THEME_COLORS.border}
                      name="arrow-forward"
                      size={24}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={{ alignItems: "center", marginTop: 32 }}>
            <Link asChild href={"/browse/briefs" as any}>
              <Pressable
                style={({ hovered }) => ({
                  paddingHorizontal: 32,
                  paddingVertical: 14,
                  backgroundColor: hovered ? "#19a864" : THEME_COLORS.primary,
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                })}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: THEME_COLORS.primaryForeground,
                  }}
                >
                  Post a Brief
                </Text>
                <Ionicons
                  color={THEME_COLORS.primaryForeground}
                  name="arrow-forward"
                  size={18}
                />
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      {/* For Creators Section */}
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
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 48,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: "#3b82f615",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons color="#3b82f6" name="person-outline" size={24} />
            </View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: THEME_COLORS.foreground,
              }}
            >
              For Creators
            </Text>
          </View>

          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: 24,
            }}
          >
            {CREATOR_STEPS.map((step, index) => (
              <View
                key={step.number}
                style={{
                  flex: 1,
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
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#3b82f6",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "700",
                        color: THEME_COLORS.primaryForeground,
                      }}
                    >
                      {step.number}
                    </Text>
                  </View>
                  <Ionicons
                    color={THEME_COLORS.muted}
                    name={step.icon}
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
                  {step.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: THEME_COLORS.muted,
                    lineHeight: 22,
                  }}
                >
                  {step.description}
                </Text>
                {index < CREATOR_STEPS.length - 1 && !isMobile && (
                  <View
                    style={{
                      position: "absolute",
                      right: -12,
                      top: "50%",
                      transform: [{ translateY: -12 }],
                    }}
                  >
                    <Ionicons
                      color={THEME_COLORS.border}
                      name="arrow-forward"
                      size={24}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={{ alignItems: "center", marginTop: 32 }}>
            <Link asChild href={"/browse/creators" as any}>
              <Pressable
                style={({ hovered }) => ({
                  paddingHorizontal: 32,
                  paddingVertical: 14,
                  backgroundColor: hovered ? "#2563eb" : "#3b82f6",
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                })}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: THEME_COLORS.primaryForeground,
                  }}
                >
                  Join as Creator
                </Text>
                <Ionicons
                  color={THEME_COLORS.primaryForeground}
                  name="arrow-forward"
                  size={18}
                />
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      {/* Platform Benefits */}
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
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: THEME_COLORS.foreground,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Why Choose Our Platform
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: THEME_COLORS.muted,
              textAlign: "center",
              marginBottom: 48,
              maxWidth: 600,
              marginHorizontal: "auto",
            }}
          >
            Built with trust, transparency, and quality at its core
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 24,
              justifyContent: "center",
            }}
          >
            {PLATFORM_BENEFITS.map((benefit) => (
              <View
                key={benefit.title}
                style={{
                  width: isMobile ? "100%" : 340,
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
                    name={benefit.icon}
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
                  {benefit.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: THEME_COLORS.muted,
                    lineHeight: 22,
                  }}
                >
                  {benefit.description}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* CTA Section */}
      <View
        style={{
          paddingVertical: 64,
          paddingHorizontal: 24,
          backgroundColor: THEME_COLORS.foreground,
        }}
      >
        <View
          style={{
            maxWidth: 800,
            marginHorizontal: "auto",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: isMobile ? 24 : 32,
              fontWeight: "700",
              color: THEME_COLORS.primaryForeground,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Ready to Get Started?
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#a0a0a0",
              textAlign: "center",
              marginBottom: 32,
              lineHeight: 24,
            }}
          >
            Join thousands of brands and creators already using our platform
          </Text>
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: 16,
            }}
          >
            <Pressable
              onPress={() => openAuthModal("signup")}
              style={({ hovered }) => ({
                paddingHorizontal: 32,
                paddingVertical: 14,
                backgroundColor: hovered ? "#19a864" : THEME_COLORS.primary,
                borderRadius: 8,
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
                Sign Up Free
              </Text>
            </Pressable>
            <Link asChild href={"/browse" as any}>
              <Pressable
                style={({ hovered }) => ({
                  paddingHorizontal: 32,
                  paddingVertical: 14,
                  backgroundColor: "transparent",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: hovered
                    ? THEME_COLORS.primaryForeground
                    : "#666",
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
                  Browse Marketplace
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
