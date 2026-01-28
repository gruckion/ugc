import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd } from "@/components/web/SEO";

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
    <ScrollView style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
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
            About Us
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: THEME_COLORS.muted,
              textAlign: "center",
              maxWidth: 700,
              marginHorizontal: "auto",
              lineHeight: 28,
            }}
          >
            We're building the future of brand-creator collaboration. Our
            mission is to make authentic content accessible to every brand and
            sustainable income achievable for every creator.
          </Text>
        </View>
      </View>

      {/* Stats Section */}
      <View
        style={{
          paddingVertical: 48,
          paddingHorizontal: 24,
          backgroundColor: THEME_COLORS.foreground,
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
              justifyContent: "space-around",
              alignItems: "center",
              gap: isMobile ? 32 : 16,
            }}
          >
            {STATS.map((stat) => (
              <View key={stat.label} style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: "700",
                    color: THEME_COLORS.primary,
                    marginBottom: 8,
                  }}
                >
                  {stat.value}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#a0a0a0",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Our Story Section */}
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
              marginBottom: 32,
            }}
          >
            Our Story
          </Text>
          <View style={{ gap: 24 }}>
            <Text
              style={{
                fontSize: 16,
                color: THEME_COLORS.muted,
                lineHeight: 28,
              }}
            >
              We started this platform because we saw a broken system. Brands
              struggled to find authentic voices for their products, often
              relying on expensive agencies or unreliable freelance networks.
              Meanwhile, talented creators with engaged audiences couldn't find
              consistent work or fair compensation.
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: THEME_COLORS.muted,
                lineHeight: 28,
              }}
            >
              We knew there had to be a better way. A platform that would make
              it easy for brands to post execution-ready briefs with secured
              payment, and for creators to find opportunities that match their
              skills and interests.
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: THEME_COLORS.muted,
                lineHeight: 28,
              }}
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
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: THEME_COLORS.foreground,
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Our Values
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 24,
              justifyContent: "center",
            }}
          >
            {VALUES.map((value) => (
              <View
                key={value.title}
                style={{
                  width: isMobile ? "100%" : "48%",
                  maxWidth: 500,
                  padding: 32,
                  borderRadius: 16,
                  backgroundColor: THEME_COLORS.background,
                  borderWidth: 1,
                  borderColor: THEME_COLORS.border,
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: `${THEME_COLORS.primary}15`,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Ionicons
                    color={THEME_COLORS.primary}
                    name={value.icon}
                    size={28}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: THEME_COLORS.foreground,
                    marginBottom: 12,
                  }}
                >
                  {value.title}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: THEME_COLORS.muted,
                    lineHeight: 24,
                  }}
                >
                  {value.description}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Team Section */}
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
            Meet the Team
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
            We're a team of creators, engineers, and marketers united by a
            shared mission
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 24,
              justifyContent: "center",
            }}
          >
            {TEAM.map((member) => (
              <View
                key={member.name}
                style={{
                  width: isMobile ? "100%" : 260,
                  padding: 24,
                  borderRadius: 12,
                  backgroundColor: THEME_COLORS.background,
                  borderWidth: 1,
                  borderColor: THEME_COLORS.border,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: THEME_COLORS.sectionBackground,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "600",
                      color: THEME_COLORS.muted,
                    }}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: THEME_COLORS.foreground,
                    marginBottom: 4,
                    textAlign: "center",
                  }}
                >
                  {member.name}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: THEME_COLORS.primary,
                    fontWeight: "500",
                    marginBottom: 12,
                    textAlign: "center",
                  }}
                >
                  {member.role}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: THEME_COLORS.muted,
                    textAlign: "center",
                    lineHeight: 20,
                  }}
                >
                  {member.bio}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Join Us CTA */}
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
            Join Our Mission
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
            We're always looking for talented people who share our passion for
            empowering creators
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
                Get Started
              </Text>
            </Pressable>
            <Link asChild href={"/contact" as any}>
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
