import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd } from "@/components/web/SEO";
import { cn } from "@/lib/utils";

// Company values
const VALUES = [
  {
    title: "Trust First",
    description:
      "Every interaction on our platform is built on trust. We verify creators, protect payments, and ensure quality at every step.",
    icon: "shield-checkmark-outline" as const,
  },
  {
    title: "Creator Success",
    description:
      "We believe creators deserve fair compensation and the tools to build sustainable careers doing what they love.",
    icon: "trending-up-outline" as const,
  },
  {
    title: "Authentic Content",
    description:
      "Real content from real people. We champion authenticity over perfection, helping brands connect genuinely with audiences.",
    icon: "heart-outline" as const,
  },
  {
    title: "Continuous Innovation",
    description:
      "The creator economy is evolving fast. We're committed to building the tools and features that keep you ahead.",
    icon: "bulb-outline" as const,
  },
];

// Team members (mock data)
const TEAM = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    bio: "Former product lead at Instagram. Passionate about empowering creators.",
  },
  {
    name: "Marcus Johnson",
    role: "CTO & Co-founder",
    bio: "Ex-Stripe engineer. Building the infrastructure for the creator economy.",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Creator Success",
    bio: "Former UGC creator turned advocate. Knows the creator journey inside out.",
  },
  {
    name: "David Park",
    role: "Head of Brand Partnerships",
    bio: "10+ years in digital marketing. Connecting brands with authentic voices.",
  },
];

// Stats
const STATS = [
  { value: "50K+", label: "Active Creators" },
  { value: "10K+", label: "Brands Served" },
  { value: "$25M+", label: "Paid to Creators" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function AboutPage() {
  const { isMobile } = useResponsive();
  const { open: openAuthModal } = useAuthModal();

  const aboutPageJsonLd = createWebPageJsonLd(
    "About UGC Marketplace",
    "Learn about UGC Marketplace, our mission, values, and the team behind the platform connecting brands with creators.",
    "/about"
  );

  return (
    <ScrollView className="flex-1 bg-background">
      <SEO
        title="About Us"
        description="Learn about UGC Marketplace and our mission to connect brands with talented creators. Discover our story, values, and the team building the future of authentic content creation."
        path="/about"
        keywords={[
          "about UGC marketplace",
          "creator economy",
          "brand collaboration",
          "content creation platform",
          "our story",
        ]}
        jsonLd={aboutPageJsonLd}
      />

      {/* Hero Section */}
      <View className="pt-12 pb-16 px-6 bg-neutral-50">
        <View
          className="mx-auto w-full"
          style={{ maxWidth: 1200 }}
        >
          <Text
            className="font-bold text-foreground text-center mb-4"
            style={{ fontSize: isMobile ? 32 : 48 }}
          >
            About Us
          </Text>
          <Text
            className="text-lg text-muted text-center mx-auto"
            style={{ maxWidth: 700, lineHeight: 28 }}
          >
            We're building the future of brand-creator collaboration. Our
            mission is to make authentic content accessible to every brand and
            sustainable income achievable for every creator.
          </Text>
        </View>
      </View>

      {/* Stats Section */}
      <View className="py-12 px-6 bg-foreground">
        <View
          className="mx-auto w-full"
          style={{ maxWidth: 1200 }}
        >
          <View
            className="justify-around items-center"
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 32 : 16,
            }}
          >
            {STATS.map((stat) => (
              <View key={stat.label} className="items-center">
                <Text
                  className="font-bold text-primary mb-2"
                  style={{ fontSize: 40 }}
                >
                  {stat.value}
                </Text>
                <Text
                  className="text-sm uppercase text-muted"
                  style={{ letterSpacing: 1 }}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Our Story Section */}
      <View className="py-16 px-6">
        <View
          className="mx-auto w-full"
          style={{ maxWidth: 800 }}
        >
          <Text className="text-[28px] font-bold text-foreground text-center mb-8">
            Our Story
          </Text>
          <View className="gap-6">
            <Text
              className="text-base text-muted"
              style={{ lineHeight: 28 }}
            >
              We started this platform because we saw a broken system. Brands
              struggled to find authentic voices for their products, often
              relying on expensive agencies or unreliable freelance networks.
              Meanwhile, talented creators with engaged audiences couldn't find
              consistent work or fair compensation.
            </Text>
            <Text
              className="text-base text-muted"
              style={{ lineHeight: 28 }}
            >
              We knew there had to be a better way. A platform that would make
              it easy for brands to post execution-ready briefs with secured
              payment, and for creators to find opportunities that match their
              skills and interests.
            </Text>
            <Text
              className="text-base text-muted"
              style={{ lineHeight: 28 }}
            >
              Today, we're proud to have helped thousands of brands create
              millions of pieces of authentic content, while paying out tens of
              millions of dollars to creators worldwide. But we're just getting
              started.
            </Text>
          </View>
        </View>
      </View>

      {/* Values Section */}
      <View className="py-16 px-6 bg-neutral-50">
        <View
          className="mx-auto w-full"
          style={{ maxWidth: 1200 }}
        >
          <Text className="text-[28px] font-bold text-foreground text-center mb-12">
            Our Values
          </Text>

          <View className="flex-row flex-wrap gap-6 justify-center">
            {VALUES.map((value) => (
              <View
                key={value.title}
                className="p-8 rounded-2xl bg-background border border-border"
                style={{
                  width: isMobile ? "100%" : "48%",
                  maxWidth: 500,
                }}
              >
                <View
                  className="items-center justify-center mb-5 bg-primary/5"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                  }}
                >
                  <Ionicons
                    name={value.icon}
                    size={28}
                    className="text-primary"
                  />
                </View>
                <Text className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </Text>
                <Text
                  className="text-[15px] text-muted"
                  style={{ lineHeight: 24 }}
                >
                  {value.description}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Team Section */}
      <View className="py-16 px-6">
        <View
          className="mx-auto w-full"
          style={{ maxWidth: 1200 }}
        >
          <Text className="text-[28px] font-bold text-foreground text-center mb-4">
            Meet the Team
          </Text>
          <Text
            className="text-base text-muted text-center mb-12 mx-auto"
            style={{ maxWidth: 600 }}
          >
            We're a team of creators, engineers, and marketers united by a
            shared mission
          </Text>

          <View className="flex-row flex-wrap gap-6 justify-center">
            {TEAM.map((member) => (
              <View
                key={member.name}
                className="p-6 rounded-xl bg-background border border-border items-center"
                style={{ width: isMobile ? "100%" : 260 }}
              >
                <View
                  className="items-center justify-center mb-4 bg-surface-raised"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }}
                >
                  <Text className="text-[28px] font-semibold text-muted">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Text>
                </View>
                <Text className="text-lg font-semibold text-foreground mb-1 text-center">
                  {member.name}
                </Text>
                <Text className="text-[13px] text-primary font-medium mb-3 text-center">
                  {member.role}
                </Text>
                <Text
                  className="text-sm text-muted text-center"
                  style={{ lineHeight: 20 }}
                >
                  {member.bio}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Join Us CTA */}
      <View className="py-16 px-6 bg-foreground">
        <View
          className="mx-auto w-full items-center"
          style={{ maxWidth: 800 }}
        >
          <Text
            className="font-bold text-primary-foreground text-center mb-4"
            style={{ fontSize: isMobile ? 24 : 32 }}
          >
            Join Our Mission
          </Text>
          <Text
            className="text-base text-center mb-8 text-muted"
            style={{ lineHeight: 24 }}
          >
            We're always looking for talented people who share our passion for
            empowering creators
          </Text>
          <View
            className="gap-4"
            style={{ flexDirection: isMobile ? "column" : "row" }}
          >
            <Pressable
              onPress={() => openAuthModal("signup")}
              className="px-8 rounded-lg bg-primary hover:bg-hover-primary"
              style={{ paddingVertical: 14 }}
            >
              <Text className="text-base font-semibold text-primary-foreground text-center">
                Get Started
              </Text>
            </Pressable>
            <Link asChild href={"/contact" as any}>
              <Pressable
                className="px-8 rounded-lg border border-muted hover:border-primary-foreground"
                style={{ paddingVertical: 14 }}
              >
                <Text className="text-base font-semibold text-primary-foreground text-center">
                  View Careers
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
