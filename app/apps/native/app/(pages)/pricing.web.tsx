import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd, createFAQPageJsonLd } from "@/components/web/SEO";
import { cn } from "@/lib/utils";

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
    <ScrollView className="flex-1 bg-background">
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
      <View className="pt-12 pb-16 px-6 bg-surface-raised">
        <View className="w-full mx-auto" style={{ maxWidth: 1200 }}>
          <Text
            className="font-bold text-foreground text-center mb-4"
            style={{ fontSize: isMobile ? 32 : 48 }}
          >
            Simple, Transparent Pricing
          </Text>
          <Text
            className="text-lg text-muted text-center mx-auto"
            style={{ maxWidth: 600, lineHeight: 28 }}
          >
            No hidden fees. Choose the plan that works best for your brand, or
            start creating for free.
          </Text>
        </View>
      </View>

      {/* Brand Pricing Tiers */}
      <View className="py-16 px-6">
        <View className="w-full mx-auto" style={{ maxWidth: 1200 }}>
          <Text className="text-2xl font-bold text-foreground text-center mb-12">
            For Brands
          </Text>

          <View
            className="gap-6 items-stretch"
            style={{ flexDirection: isMobile ? "column" : "row" }}
          >
            {BRAND_TIERS.map((tier) => (
              <View
                key={tier.name}
                className={cn(
                  "flex-1 p-8 rounded-2xl relative overflow-hidden",
                  tier.highlighted
                    ? "bg-surface-highlight"
                    : "bg-background border border-border"
                )}
              >
                {tier.highlighted && (
                  <View
                    className="absolute px-10 py-1 bg-[#ffbe5b]"
                    style={{
                      top: 16,
                      right: -32,
                      transform: [{ rotate: "45deg" }],
                    }}
                  >
                    <Text
                      className="font-bold text-foreground"
                      style={{ fontSize: 11 }}
                    >
                      POPULAR
                    </Text>
                  </View>
                )}

                <Text
                  className={cn(
                    "text-xl font-bold mb-2",
                    tier.highlighted ? "text-surface-highlight-foreground" : "text-foreground"
                  )}
                >
                  {tier.name}
                </Text>
                <Text
                  className={cn(
                    "text-sm mb-6",
                    tier.highlighted ? "text-surface-highlight-muted" : "text-muted"
                  )}
                >
                  {tier.description}
                </Text>

                <View className="flex-row items-baseline gap-1">
                  <Text
                    className={cn(
                      "font-bold",
                      tier.highlighted ? "text-surface-highlight-foreground" : "text-foreground"
                    )}
                    style={{
                      fontSize: 40,
                    }}
                  >
                    {tier.price}
                  </Text>
                  {tier.priceNote && (
                    <Text
                      className={cn(
                        "text-sm",
                        tier.highlighted ? "text-surface-highlight-muted" : "text-muted"
                      )}
                    >
                      {tier.priceNote}
                    </Text>
                  )}
                </View>

                <View className="mt-8 mb-8">
                  {tier.features.map((feature) => (
                    <View
                      key={feature}
                      className="flex-row items-center gap-3 mb-3"
                    >
                      <Ionicons
                        className="text-primary"
                        name="checkmark-circle"
                        size={20}
                      />
                      <Text
                        className={cn(
                          "text-sm",
                          tier.highlighted ? "text-surface-highlight-foreground" : "text-foreground"
                        )}
                      >
                        {feature}
                      </Text>
                    </View>
                  ))}
                  {tier.notIncluded.map((feature) => (
                    <View
                      key={feature}
                      className="flex-row items-center gap-3 mb-3 opacity-50"
                    >
                      <Ionicons
                        className={cn(
                          tier.highlighted ? "text-muted" : "text-muted"
                        )}
                        name="close-circle"
                        size={20}
                      />
                      <Text
                        className={cn(
                          "text-sm",
                          tier.highlighted ? "text-muted" : "text-muted"
                        )}
                      >
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>

                <Pressable
                  onPress={() => openAuthModal("signup")}
                  className={cn(
                    "rounded-lg",
                    tier.highlighted
                      ? "bg-primary hover:bg-hover-primary"
                      : "border border-border hover:bg-foreground hover:border-foreground"
                  )}
                  style={{
                    paddingVertical: 14,
                  }}
                >
                  {({ hovered }) => (
                    <Text
                      className={cn(
                        "text-base font-semibold text-center",
                        tier.highlighted
                          ? "text-primary-foreground"
                          : hovered
                            ? "text-primary-foreground"
                            : "text-foreground"
                      )}
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
      <View className="py-16 px-6 bg-surface-raised">
        <View className="w-full mx-auto" style={{ maxWidth: 800 }}>
          <Text className="text-2xl font-bold text-foreground text-center mb-12">
            For Creators
          </Text>

          <View className="p-8 rounded-2xl bg-background border border-border">
            <View
              className="mb-8 gap-4"
              style={{
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
              }}
            >
              <View>
                <Text className="text-xl font-bold text-foreground mb-1">
                  Free to Join
                </Text>
                <Text className="text-sm text-muted">
                  Only pay when you earn
                </Text>
              </View>
              <View
                style={{ alignItems: isMobile ? "flex-start" : "flex-end" }}
              >
                <View className="flex-row items-baseline gap-1">
                  <Text
                    className="font-bold text-primary"
                    style={{
                      fontSize: 40,
                    }}
                  >
                    {CREATOR_INFO.commission}
                  </Text>
                  <Text className="text-sm text-muted">
                    platform fee
                  </Text>
                </View>
                <Text className="text-sm text-muted">
                  Keep 90% of your earnings
                </Text>
              </View>
            </View>

            <View className="flex-row flex-wrap gap-4">
              {CREATOR_INFO.features.map((feature) => (
                <View
                  key={feature}
                  className="flex-row items-center gap-2"
                  style={{ width: isMobile ? "100%" : "48%" }}
                >
                  <Ionicons
                    className="text-primary"
                    name="checkmark-circle"
                    size={20}
                  />
                  <Text className="text-sm text-foreground">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            <View className="items-center mt-8">
              <Pressable
                onPress={() => openAuthModal("signup")}
                className="px-12 rounded-lg bg-primary hover:bg-hover-primary"
                style={{
                  paddingVertical: 14,
                }}
              >
                <Text className="text-base font-semibold text-white">
                  Start Creating
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* FAQ Section */}
      <View className="py-16 px-6">
        <View className="w-full mx-auto" style={{ maxWidth: 800 }}>
          <Text
            className="font-bold text-foreground text-center mb-12"
            style={{ fontSize: 28 }}
          >
            Frequently Asked Questions
          </Text>

          <View className="gap-4">
            {FAQ_ITEMS.map((item) => (
              <View
                key={item.question}
                className="p-6 rounded-xl border border-border bg-surface-raised"
              >
                <Text className="text-base font-semibold text-foreground mb-3">
                  {item.question}
                </Text>
                <Text
                  className="text-sm text-muted"
                  style={{ lineHeight: 22 }}
                >
                  {item.answer}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* CTA Section */}
      <View className="py-16 px-6 bg-foreground">
        <View
          className="w-full mx-auto items-center"
          style={{ maxWidth: 800 }}
        >
          <Text
            className="font-bold text-center mb-4 text-primary-foreground"
            style={{
              fontSize: isMobile ? 24 : 32,
            }}
          >
            Still Have Questions?
          </Text>
          <Text className="text-base text-center mb-8 text-muted">
            Our team is here to help you get started
          </Text>
          <Link asChild href={"/contact" as any}>
            <Pressable
              className="px-8 rounded-lg bg-primary hover:bg-hover-primary"
              style={{
                paddingVertical: 14,
              }}
            >
              <Text className="text-base font-semibold text-white">
                Contact Us
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
