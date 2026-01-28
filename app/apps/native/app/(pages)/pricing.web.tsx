import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd, createFAQPageJsonLd } from "@/components/web/SEO";

// Fiverr-style theme colors
const THEME_COLORS = {
  primary: "#1DBF73",
  primaryForeground: "#FFFFFF",
  foreground: "#222325",
  muted: "#62646a",
  border: "#e4e5e7",
  background: "#FFFFFF",
  sectionBackground: "#fafafa",
  accent: "#ffbe5b",
};

// Pricing tiers for Brands
const BRAND_TIERS = [
  {
    name: "Starter",
    description: "Perfect for small brands getting started with UGC",
    price: "Free",
    priceNote: "Pay per project",
    features: [
      "Post unlimited briefs",
      "Browse all creators",
      "Secure payment escrow",
      "Basic analytics",
      "Email support",
    ],
    notIncluded: [
      "Priority support",
      "Dedicated account manager",
      "Custom contracts",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Growth",
    description: "For brands scaling their content production",
    price: "$199",
    priceNote: "per month",
    features: [
      "Everything in Starter",
      "Featured brief placement",
      "Advanced creator filters",
      "Campaign analytics",
      "Priority support",
      "Bulk project discounts",
    ],
    notIncluded: ["Dedicated account manager"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large brands with custom needs",
    price: "Custom",
    priceNote: "tailored pricing",
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Custom contract terms",
      "API access",
      "White-label options",
      "Volume discounts",
      "SLA guarantees",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    highlighted: false,
  },
];

// Pricing for Creators
const CREATOR_INFO = {
  commission: "10%",
  features: [
    "Free to join",
    "Keep 90% of your earnings",
    "Payment protection",
    "Build your portfolio",
    "Get reviews and ratings",
    "Direct messaging with brands",
  ],
};

// FAQ items
const FAQ_ITEMS = [
  {
    question: "How does payment protection work?",
    answer:
      "When a brand approves a brief and a creator is selected, the payment is held in escrow. The funds are only released to the creator once the brand approves the final content, ensuring both parties are protected.",
  },
  {
    question: "What's included in the platform fee?",
    answer:
      "Our 10% creator commission covers payment processing, escrow services, dispute resolution, platform maintenance, and customer support. Brands pay no additional fees on the Starter plan.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your current billing period. Any ongoing projects will continue until completion.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and PayPal. For Enterprise plans, we also offer invoicing and bank transfers.",
  },
  {
    question: "How do refunds work?",
    answer:
      "If a creator fails to deliver or the content doesn't meet the brief requirements, you can request a refund through our dispute resolution process. We aim to resolve all disputes within 48 hours.",
  },
];

export default function PricingPage() {
  const { isMobile } = useResponsive();
  const { open: openAuthModal } = useAuthModal();

  // Create FAQ JSON-LD from the FAQ items
  const pricingFaqJsonLd = createFAQPageJsonLd(
    FAQ_ITEMS.map((item) => ({
      question: item.question,
      answer: item.answer,
    }))
  );

  const pricingPageJsonLd = createWebPageJsonLd(
    "Pricing - UGC Marketplace",
    "Simple, transparent pricing for brands and creators. No hidden fees.",
    "/pricing"
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
      <SEO
        title="Pricing"
        description="Simple, transparent pricing for UGC Marketplace. Free for creators with 10% commission. Brand plans starting free. No hidden fees - see what works best for you."
        path="/pricing"
        keywords={[
          "UGC pricing",
          "creator marketplace pricing",
          "content creation costs",
          "brand marketing pricing",
          "UGC rates",
        ]}
        jsonLd={[pricingPageJsonLd, pricingFaqJsonLd]}
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
            Simple, Transparent Pricing
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
            No hidden fees. Choose the plan that works best for your brand, or
            start creating for free.
          </Text>
        </View>
      </View>

      {/* Brand Pricing Tiers */}
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
              fontSize: 24,
              fontWeight: "700",
              color: THEME_COLORS.foreground,
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            For Brands
          </Text>

          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: 24,
              alignItems: "stretch",
            }}
          >
            {BRAND_TIERS.map((tier) => (
              <View
                key={tier.name}
                style={{
                  flex: 1,
                  padding: 32,
                  borderRadius: 16,
                  backgroundColor: tier.highlighted
                    ? THEME_COLORS.foreground
                    : THEME_COLORS.background,
                  borderWidth: tier.highlighted ? 0 : 1,
                  borderColor: THEME_COLORS.border,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {tier.highlighted && (
                  <View
                    style={{
                      position: "absolute",
                      top: 16,
                      right: -32,
                      backgroundColor: THEME_COLORS.accent,
                      paddingHorizontal: 40,
                      paddingVertical: 4,
                      transform: [{ rotate: "45deg" }],
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color: THEME_COLORS.foreground,
                      }}
                    >
                      POPULAR
                    </Text>
                  </View>
                )}

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: tier.highlighted
                      ? THEME_COLORS.primaryForeground
                      : THEME_COLORS.foreground,
                    marginBottom: 8,
                  }}
                >
                  {tier.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: tier.highlighted ? "#a0a0a0" : THEME_COLORS.muted,
                    marginBottom: 24,
                  }}
                >
                  {tier.description}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    gap: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 40,
                      fontWeight: "700",
                      color: tier.highlighted
                        ? THEME_COLORS.primaryForeground
                        : THEME_COLORS.foreground,
                    }}
                  >
                    {tier.price}
                  </Text>
                  {tier.priceNote && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: tier.highlighted
                          ? "#a0a0a0"
                          : THEME_COLORS.muted,
                      }}
                    >
                      {tier.priceNote}
                    </Text>
                  )}
                </View>

                <View style={{ marginTop: 32, marginBottom: 32 }}>
                  {tier.features.map((feature) => (
                    <View
                      key={feature}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 12,
                      }}
                    >
                      <Ionicons
                        color={THEME_COLORS.primary}
                        name="checkmark-circle"
                        size={20}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: tier.highlighted
                            ? THEME_COLORS.primaryForeground
                            : THEME_COLORS.foreground,
                        }}
                      >
                        {feature}
                      </Text>
                    </View>
                  ))}
                  {tier.notIncluded.map((feature) => (
                    <View
                      key={feature}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 12,
                        opacity: 0.5,
                      }}
                    >
                      <Ionicons
                        color={tier.highlighted ? "#666" : THEME_COLORS.muted}
                        name="close-circle"
                        size={20}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: tier.highlighted ? "#666" : THEME_COLORS.muted,
                        }}
                      >
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>

                <Pressable
                  onPress={() => openAuthModal("signup")}
                  style={({ hovered }) => ({
                    paddingVertical: 14,
                    borderRadius: 8,
                    backgroundColor: tier.highlighted
                      ? hovered
                        ? "#19a864"
                        : THEME_COLORS.primary
                      : hovered
                        ? THEME_COLORS.foreground
                        : "transparent",
                    borderWidth: tier.highlighted ? 0 : 1,
                    borderColor: tier.highlighted
                      ? undefined
                      : hovered
                        ? THEME_COLORS.foreground
                        : THEME_COLORS.border,
                  })}
                >
                  {({ hovered }) => (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: tier.highlighted
                          ? THEME_COLORS.primaryForeground
                          : hovered
                            ? THEME_COLORS.primaryForeground
                            : THEME_COLORS.foreground,
                        textAlign: "center",
                      }}
                    >
                      {tier.cta}
                    </Text>
                  )}
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Creator Pricing */}
      <View
        style={{
          paddingVertical: 64,
          paddingHorizontal: 24,
          backgroundColor: THEME_COLORS.sectionBackground,
        }}
      >
        <View
          style={{
            maxWidth: 800,
            marginHorizontal: "auto",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: THEME_COLORS.foreground,
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            For Creators
          </Text>

          <View
            style={{
              padding: 32,
              borderRadius: 16,
              backgroundColor: THEME_COLORS.background,
              borderWidth: 1,
              borderColor: THEME_COLORS.border,
            }}
          >
            <View
              style={{
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                marginBottom: 32,
                gap: 16,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: THEME_COLORS.foreground,
                    marginBottom: 4,
                  }}
                >
                  Free to Join
                </Text>
                <Text style={{ fontSize: 14, color: THEME_COLORS.muted }}>
                  Only pay when you earn
                </Text>
              </View>
              <View
                style={{ alignItems: isMobile ? "flex-start" : "flex-end" }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    gap: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 40,
                      fontWeight: "700",
                      color: THEME_COLORS.primary,
                    }}
                  >
                    {CREATOR_INFO.commission}
                  </Text>
                  <Text style={{ fontSize: 14, color: THEME_COLORS.muted }}>
                    platform fee
                  </Text>
                </View>
                <Text style={{ fontSize: 14, color: THEME_COLORS.muted }}>
                  Keep 90% of your earnings
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              {CREATOR_INFO.features.map((feature) => (
                <View
                  key={feature}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    width: isMobile ? "100%" : "48%",
                  }}
                >
                  <Ionicons
                    color={THEME_COLORS.primary}
                    name="checkmark-circle"
                    size={20}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: THEME_COLORS.foreground,
                    }}
                  >
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            <View style={{ alignItems: "center", marginTop: 32 }}>
              <Pressable
                onPress={() => openAuthModal("signup")}
                style={({ hovered }) => ({
                  paddingHorizontal: 48,
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
                  }}
                >
                  Start Creating
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* FAQ Section */}
      <View
        style={{
          paddingVertical: 64,
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            maxWidth: 800,
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
              marginBottom: 48,
            }}
          >
            Frequently Asked Questions
          </Text>

          <View style={{ gap: 16 }}>
            {FAQ_ITEMS.map((item) => (
              <View
                key={item.question}
                style={{
                  padding: 24,
                  borderRadius: 12,
                  backgroundColor: THEME_COLORS.sectionBackground,
                  borderWidth: 1,
                  borderColor: THEME_COLORS.border,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: THEME_COLORS.foreground,
                    marginBottom: 12,
                  }}
                >
                  {item.question}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: THEME_COLORS.muted,
                    lineHeight: 22,
                  }}
                >
                  {item.answer}
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
            Still Have Questions?
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#a0a0a0",
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Our team is here to help you get started
          </Text>
          <Link asChild href={"/contact" as any}>
            <Pressable
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
                }}
              >
                Contact Us
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
