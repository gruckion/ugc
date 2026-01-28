import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { WebHero } from "@/components/web/WebHero";
import { CategoryCardsSection } from "@/components/web/CategoryCardsSection";
import { PopularServicesCarousel } from "@/components/web/PopularServicesCarousel";
import { PromoBanner } from "@/components/web/PromoBanner";
import { MadeOnUGPGallery } from "@/components/web/MadeOnUGPGallery";
import { GuidesSection } from "@/components/web/GuidesSection";
import { JoinCTASection } from "@/components/web/JoinCTASection";
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

// Mock data for briefs
const MOCK_BRIEFS = [
  {
    id: "1",
    title: "Product Review Video for Skincare Brand",
    brandName: "GlowUp Beauty",
    budget: 500,
    category: "Beauty",
    daysRemaining: 5,
  },
  {
    id: "2",
    title: "Unboxing TikTok for Wireless Earbuds",
    brandName: "SoundWave Tech",
    budget: 350,
    category: "Tech",
    daysRemaining: 3,
  },
  {
    id: "3",
    title: "Lifestyle Content for Fitness App",
    brandName: "FitLife Pro",
    budget: 600,
    category: "Fitness",
    daysRemaining: 7,
  },
  {
    id: "4",
    title: "Recipe Video for Organic Snacks",
    brandName: "NatureBite",
    budget: 400,
    category: "Food",
    daysRemaining: 4,
  },
];

// Mock data for creators
const MOCK_CREATORS = [
  {
    id: "1",
    name: "Sarah Johnson",
    tagline: "Authentic lifestyle content for DTC brands",
    niches: ["Lifestyle", "Beauty"],
    trustScore: 98,
    startingRate: 250,
  },
  {
    id: "2",
    name: "Mike Chen",
    tagline: "Tech reviews that convert",
    niches: ["Tech", "Gadgets"],
    trustScore: 95,
    startingRate: 300,
  },
  {
    id: "3",
    name: "Emma Davis",
    tagline: "Fitness content that inspires action",
    niches: ["Fitness", "Wellness"],
    trustScore: 97,
    startingRate: 275,
  },
  {
    id: "4",
    name: "Alex Rivera",
    tagline: "Food content that makes you hungry",
    niches: ["Food", "Lifestyle"],
    trustScore: 94,
    startingRate: 225,
  },
];

// Simple Brief Card for homepage
function BriefCardSimple({
  title,
  brandName,
  budget,
  category,
  daysRemaining,
}: {
  title: string;
  brandName: string;
  budget: number;
  category: string;
  daysRemaining: number;
}) {
  return (
    <Pressable
      style={({ hovered }) => ({
        backgroundColor: THEME_COLORS.background,
        borderRadius: 12,
        padding: 20,
        width: 280,
        borderWidth: 1,
        borderColor: THEME_COLORS.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: hovered ? 4 : 2 },
        shadowOpacity: hovered ? 0.1 : 0.05,
        shadowRadius: hovered ? 8 : 4,
        transform: [{ translateY: hovered ? -2 : 0 }],
      })}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <View
          style={{
            backgroundColor: "#f0fdf4",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: THEME_COLORS.primary,
              fontWeight: "600",
            }}
          >
            {category}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Ionicons
            color={THEME_COLORS.primary}
            name="checkmark-circle"
            size={14}
          />
          <Text
            style={{
              fontSize: 11,
              color: THEME_COLORS.primary,
              fontWeight: "500",
            }}
          >
            Payment Secured
          </Text>
        </View>
      </View>

      <Text
        numberOfLines={2}
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: THEME_COLORS.foreground,
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      <Text
        style={{ fontSize: 13, color: THEME_COLORS.muted, marginBottom: 16 }}
      >
        by {brandName}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: THEME_COLORS.foreground,
          }}
        >
          ${budget}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Ionicons color={THEME_COLORS.muted} name="time-outline" size={14} />
          <Text style={{ fontSize: 13, color: THEME_COLORS.muted }}>
            {daysRemaining} days left
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

// Simple Creator Card for homepage
function CreatorCardSimple({
  name,
  tagline,
  niches,
  trustScore,
  startingRate,
}: {
  name: string;
  tagline: string;
  niches: string[];
  trustScore: number;
  startingRate: number;
}) {
  return (
    <Pressable
      style={({ hovered }) => ({
        backgroundColor: THEME_COLORS.background,
        borderRadius: 12,
        padding: 20,
        width: 280,
        borderWidth: 1,
        borderColor: THEME_COLORS.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: hovered ? 4 : 2 },
        shadowOpacity: hovered ? 0.1 : 0.05,
        shadowRadius: hovered ? 8 : 4,
        transform: [{ translateY: hovered ? -2 : 0 }],
      })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: THEME_COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: THEME_COLORS.primaryForeground,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {name.charAt(0)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: THEME_COLORS.foreground,
            }}
          >
            {name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons color="#fbbf24" name="star" size={12} />
            <Text style={{ fontSize: 13, color: THEME_COLORS.muted }}>
              {trustScore} Trust Score
            </Text>
          </View>
        </View>
      </View>

      <Text
        numberOfLines={2}
        style={{
          fontSize: 14,
          color: THEME_COLORS.muted,
          marginBottom: 12,
          lineHeight: 20,
        }}
      >
        {tagline}
      </Text>

      <View style={{ flexDirection: "row", gap: 6, marginBottom: 16 }}>
        {niches.map((niche) => (
          <View
            key={niche}
            style={{
              backgroundColor: "#f5f5f5",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: THEME_COLORS.foreground,
              }}
            >
              {niche}
            </Text>
          </View>
        ))}
      </View>

      <Text
        style={{
          fontSize: 14,
          color: THEME_COLORS.foreground,
        }}
      >
        From{" "}
        <Text style={{ fontWeight: "700", fontSize: 16 }}>${startingRate}</Text>
        /brief
      </Text>
    </Pressable>
  );
}

// Section Header Component
function SectionHeader({
  title,
  linkText,
  linkHref,
}: {
  title: string;
  linkText?: string;
  linkHref?: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          color: THEME_COLORS.foreground,
        }}
      >
        {title}
      </Text>
      {linkText && linkHref && (
        <Link asChild href={linkHref as any}>
          <Pressable
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          >
            {({ hovered }) => (
              <>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: hovered
                      ? THEME_COLORS.primary
                      : THEME_COLORS.foreground,
                  }}
                >
                  {linkText}
                </Text>
                <Ionicons
                  color={
                    hovered ? THEME_COLORS.primary : THEME_COLORS.foreground
                  }
                  name="arrow-forward"
                  size={18}
                />
              </>
            )}
          </Pressable>
        </Link>
      )}
    </View>
  );
}

// How It Works Step Component
function HowItWorksStep({
  number,
  title,
  description,
  icon,
}: {
  number: number;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={{ alignItems: "center", flex: 1, paddingHorizontal: 16 }}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: "#f0fdf4",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <Ionicons color={THEME_COLORS.primary} name={icon} size={28} />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: THEME_COLORS.primary,
          marginBottom: 8,
        }}
      >
        STEP {number}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: THEME_COLORS.foreground,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: THEME_COLORS.muted,
          textAlign: "center",
          lineHeight: 20,
        }}
      >
        {description}
      </Text>
    </View>
  );
}

export default function WebHomePage() {
  const router = useRouter();
  const { isMobile } = useResponsive();

  const handleSearch = (_query: string, _categoryId?: string) => {
    router.push("/browse/creators" as any);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Hero Section */}
      <WebHero onSearch={handleSearch} />

      {/* Category Cards Section */}
      <CategoryCardsSection />

      {/* Popular Services Carousel */}
      <PopularServicesCarousel />

      {/* First Promo Banner - UGC Videos */}
      <PromoBanner
        backgroundColor="#9d7c93"
        ctaText="Explore UGC Services"
        ctaHref="/browse/creators?service=ugc-videos"
        heading="Need help with UGC videos?"
        subheading="Connect with talented creators who specialize in authentic user-generated content that converts."
        videoSrc="/videos/vibe-coding-banner.mp4"
      />

      {/* Ready Briefs Section */}
      <View
        style={{
          paddingVertical: 64,
          paddingHorizontal: 24,
          backgroundColor: THEME_COLORS.background,
        }}
      >
        <View
          style={{ maxWidth: 1200, marginHorizontal: "auto", width: "100%" }}
        >
          <SectionHeader
            linkHref="/browse/briefs"
            linkText="See All Briefs"
            title="Ready Briefs"
          />
          <ScrollView
            contentContainerStyle={{ gap: 20, paddingBottom: 8 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {MOCK_BRIEFS.map((brief) => (
              <BriefCardSimple
                brandName={brief.brandName}
                budget={brief.budget}
                category={brief.category}
                daysRemaining={brief.daysRemaining}
                key={brief.id}
                title={brief.title}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Top Creators Section */}
      <View
        style={{
          paddingVertical: 64,
          paddingHorizontal: 24,
          backgroundColor: THEME_COLORS.sectionBackground,
        }}
      >
        <View
          style={{ maxWidth: 1200, marginHorizontal: "auto", width: "100%" }}
        >
          <SectionHeader
            linkHref="/browse/creators"
            linkText="See All Creators"
            title="Top Creators"
          />
          <ScrollView
            contentContainerStyle={{ gap: 20, paddingBottom: 8 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {MOCK_CREATORS.map((creator) => (
              <CreatorCardSimple
                key={creator.id}
                name={creator.name}
                niches={creator.niches}
                startingRate={creator.startingRate}
                tagline={creator.tagline}
                trustScore={creator.trustScore}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Second Promo Banner - UGP Pro */}
      <PromoBanner
        backgroundColor="#faf5e4"
        badge="pro"
        ctaText="Learn More"
        ctaHref="/pro"
        heading="Get matched with vetted creators"
        subheading="UGP Pro connects you with our top-tier creators for premium content that elevates your brand."
        variant="pro"
        videoSrc="/videos/ugp-pro-banner.mp4"
      />

      {/* Made on UGP Gallery */}
      <MadeOnUGPGallery />

      {/* Guides Section */}
      <GuidesSection />

      {/* How It Works Section */}
      <View
        style={{
          paddingVertical: 64,
          paddingHorizontal: 24,
          backgroundColor: THEME_COLORS.background,
        }}
      >
        <View
          style={{ maxWidth: 1200, marginHorizontal: "auto", width: "100%" }}
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
            How It Works
          </Text>
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 40 : 0,
            }}
          >
            <HowItWorksStep
              description="Define your product, audience, and deliverables with our guided form"
              icon="create-outline"
              number={1}
              title="Create a Brief"
            />
            <HowItWorksStep
              description="Our AI generates script options based on your brief. Approve and lock the scope."
              icon="sparkles-outline"
              number={2}
              title="AI Script Generation"
            />
            <HowItWorksStep
              description="Browse qualified creators and select the perfect match for your brand"
              icon="people-outline"
              number={3}
              title="Match with Creators"
            />
            <HowItWorksStep
              description="Receive authentic UGC with payment released automatically on approval"
              icon="checkmark-circle-outline"
              number={4}
              title="Get Quality Content"
            />
          </View>
        </View>
      </View>

      {/* Testimonials Section */}
      <View
        style={{
          paddingVertical: 80,
          paddingHorizontal: 24,
          backgroundColor: THEME_COLORS.background,
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
            Trusted by Brands & Creators
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
            See what our community has to say about their experience
          </Text>

          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: 24,
            }}
          >
            {/* Testimonial 1 */}
            <View
              style={{
                flex: 1,
                padding: 32,
                borderRadius: 16,
                backgroundColor: THEME_COLORS.sectionBackground,
                borderWidth: 1,
                borderColor: THEME_COLORS.border,
              }}
            >
              <View style={{ flexDirection: "row", gap: 4, marginBottom: 16 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons color="#ffbe5b" key={star} name="star" size={18} />
                ))}
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: THEME_COLORS.foreground,
                  lineHeight: 24,
                  marginBottom: 24,
                }}
              >
                "The quality of creators on this platform is incredible. We've
                cut our content production time in half while getting more
                authentic results than ever before."
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: THEME_COLORS.primary,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: THEME_COLORS.primaryForeground,
                    }}
                  >
                    JT
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: THEME_COLORS.foreground,
                    }}
                  >
                    Jennifer Thompson
                  </Text>
                  <Text style={{ fontSize: 13, color: THEME_COLORS.muted }}>
                    Marketing Director, GlowUp Beauty
                  </Text>
                </View>
              </View>
            </View>

            {/* Testimonial 2 */}
            <View
              style={{
                flex: 1,
                padding: 32,
                borderRadius: 16,
                backgroundColor: THEME_COLORS.sectionBackground,
                borderWidth: 1,
                borderColor: THEME_COLORS.border,
              }}
            >
              <View style={{ flexDirection: "row", gap: 4, marginBottom: 16 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons color="#ffbe5b" key={star} name="star" size={18} />
                ))}
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: THEME_COLORS.foreground,
                  lineHeight: 24,
                  marginBottom: 24,
                }}
              >
                "As a creator, this platform has been a game-changer. The briefs
                are clear, payment is always on time, and I've built amazing
                brand relationships."
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "#3b82f6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: THEME_COLORS.primaryForeground,
                    }}
                  >
                    MC
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: THEME_COLORS.foreground,
                    }}
                  >
                    Maria Chen
                  </Text>
                  <Text style={{ fontSize: 13, color: THEME_COLORS.muted }}>
                    Lifestyle Creator, 150K Followers
                  </Text>
                </View>
              </View>
            </View>

            {/* Testimonial 3 */}
            <View
              style={{
                flex: 1,
                padding: 32,
                borderRadius: 16,
                backgroundColor: THEME_COLORS.sectionBackground,
                borderWidth: 1,
                borderColor: THEME_COLORS.border,
              }}
            >
              <View style={{ flexDirection: "row", gap: 4, marginBottom: 16 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons color="#ffbe5b" key={star} name="star" size={18} />
                ))}
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: THEME_COLORS.foreground,
                  lineHeight: 24,
                  marginBottom: 24,
                }}
              >
                "The escrow system gives us complete peace of mind. We know our
                budget is protected and creators are motivated to deliver their
                best work."
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "#8b5cf6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: THEME_COLORS.primaryForeground,
                    }}
                  >
                    DP
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: THEME_COLORS.foreground,
                    }}
                  >
                    David Park
                  </Text>
                  <Text style={{ fontSize: 13, color: THEME_COLORS.muted }}>
                    Founder, TechStart Inc
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Join UGP CTA Section */}
      <JoinCTASection />
    </View>
  );
}
