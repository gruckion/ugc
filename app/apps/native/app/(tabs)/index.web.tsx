import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Card } from "heroui-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { WebHero } from "@/components/web/WebHero";
import { CategoryCardsSection } from "@/components/web/CategoryCardsSection";
import { PopularServicesCarousel } from "@/components/web/PopularServicesCarousel";
import { HelpPromoBanner } from "@/components/web/HelpPromoBanner";
import { ProPromoBanner } from "@/components/web/ProPromoBanner";
import { MadeOnUGCGallery } from "@/components/web/MadeOnUGCGallery";
import { GuidesSection } from "@/components/web/GuidesSection";
import { JoinCTASection } from "@/components/web/JoinCTASection";
import { useResponsive } from "@/hooks/useResponsive";
import {
  SEO,
  organizationJsonLd,
  websiteJsonLd,
  serviceJsonLd,
} from "@/components/web/SEO";
import { cn } from "@/lib/utils";

// Theme colors are now defined in global.css and accessed via Tailwind classes:
// - text-foreground, text-muted, text-primary, text-primary-foreground
// - bg-background, bg-surface, bg-primary
// - border-border

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
    <Card className="w-[280px] p-5 rounded-xl bg-background border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <View className="flex-row justify-between mb-3">
        <View className="bg-chip-bg px-2.5 py-1 rounded-xl">
          <Text className="text-xs text-primary font-semibold">{category}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Ionicons className="text-primary" name="checkmark-circle" size={14} />
          <Text className="text-xs text-primary font-medium">
            Payment Secured
          </Text>
        </View>
      </View>

      <Text className="text-base font-semibold text-foreground mb-1" numberOfLines={2}>
        {title}
      </Text>
      <Text className="text-sm text-muted mb-4">by {brandName}</Text>

      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold text-foreground">${budget}</Text>
        <View className="flex-row items-center gap-1">
          <Ionicons className="text-muted" name="time-outline" size={14} />
          <Text className="text-sm text-muted">{daysRemaining} days left</Text>
        </View>
      </View>
    </Card>
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
    <Card className="w-[280px] p-5 rounded-xl bg-background border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <View className="flex-row items-center gap-3 mb-3">
        <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
          <Text className="text-lg font-semibold text-primary-foreground">
            {name.charAt(0)}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground">{name}</Text>
          <View className="flex-row items-center gap-1">
            <Ionicons className="text-star" name="star" size={12} />
            <Text className="text-sm text-muted">{trustScore} Trust Score</Text>
          </View>
        </View>
      </View>

      <Text className="text-sm text-muted mb-3 leading-5" numberOfLines={2}>
        {tagline}
      </Text>

      <View className="flex-row gap-1.5 mb-4">
        {niches.map((niche) => (
          <View key={niche} className="bg-chip-muted-bg px-2.5 py-1 rounded-xl">
            <Text className="text-xs text-chip-muted-text">{niche}</Text>
          </View>
        ))}
      </View>

      <Text className="text-sm text-foreground">
        From <Text className="font-bold text-base">${startingRate}</Text>/brief
      </Text>
    </Card>
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
    <View className="flex-row justify-between items-center mb-6">
      <Text className="text-2xl font-bold text-foreground">{title}</Text>
      {linkText && linkHref && (
        <Link asChild href={linkHref as any}>
          <Pressable className="flex-row items-center gap-1">
            {({ hovered }) => (
              <>
                <Text
                  className={cn(
                    "text-base font-medium",
                    hovered ? "text-primary" : "text-foreground",
                  )}
                >
                  {linkText}
                </Text>
                <Ionicons
                  className={cn(hovered ? "text-primary" : "text-foreground")}
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
    <View className="items-center flex-1 px-4">
      <View className="w-16 h-16 rounded-full bg-chip-bg items-center justify-center mb-4">
        <Ionicons className="text-primary" name={icon} size={28} />
      </View>
      <Text className="text-xs font-semibold text-primary mb-2">
        STEP {number}
      </Text>
      <Text className="text-lg font-semibold text-foreground text-center mb-2">
        {title}
      </Text>
      <Text className="text-sm text-muted text-center leading-5">
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

  // Combined JSON-LD for homepage
  const homepageJsonLd = [organizationJsonLd, websiteJsonLd, serviceJsonLd];

  return (
    <View className="flex-1">
      <SEO
        title="UGC Marketplace - Connect Brands with Creators"
        description="Find authentic user-generated content for your brand. Connect with talented creators and get high-quality UGC that converts. Browse briefs, discover creators, and start creating today."
        path="/"
        keywords={[
          "UGC marketplace",
          "find UGC creators",
          "brand content",
          "creator marketplace",
          "authentic content",
          "video content creators",
          "social media content",
        ]}
        jsonLd={homepageJsonLd}
      />

      {/* Hero Section */}
      <WebHero onSearch={handleSearch} />

      {/* Category Cards Section */}
      <CategoryCardsSection />

      {/* Popular Services Carousel */}
      <PopularServicesCarousel />

      {/* First Promo Banner - UGC Videos */}
      <HelpPromoBanner />

      {/* Ready Briefs Section */}
      <View className="py-16 px-6 bg-background">
        <View className="max-w-[1200px] mx-auto w-full">
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
      <View className="py-16 px-6 bg-surface">
        <View className="max-w-[1200px] mx-auto w-full">
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

      {/* Second Promo Banner - UGC Pro */}
      <ProPromoBanner />

      {/* Made on UGC Gallery */}
      <MadeOnUGCGallery />

      {/* Guides Section */}
      <GuidesSection />

      {/* How It Works Section */}
      <View className="py-16 px-6 bg-background">
        <View className="max-w-[1200px] mx-auto w-full">
          <Text className="text-2xl font-bold text-foreground text-center mb-12">
            How It Works
          </Text>
          <View className={cn(isMobile ? "flex-col gap-10" : "flex-row")}>
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
      <View className="py-20 px-6 bg-background">
        <View className="max-w-[1200px] mx-auto w-full">
          <Text className="text-2xl font-bold text-foreground text-center mb-4">
            Trusted by Brands & Creators
          </Text>
          <Text className="text-base text-muted text-center mb-12 max-w-[600px] mx-auto">
            See what our community has to say about their experience
          </Text>

          <View className={cn("gap-6", isMobile ? "flex-col" : "flex-row")}>
            {/* Testimonial 1 */}
            <Card className="flex-1 p-8 rounded-2xl bg-surface border border-border">
              <View className="flex-row gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons className="text-accent" key={star} name="star" size={18} />
                ))}
              </View>
              <Card.Description className="text-base text-foreground leading-6 mb-6">
                "The quality of creators on this platform is incredible. We've
                cut our content production time in half while getting more
                authentic results than ever before."
              </Card.Description>
              <View className="flex-row items-center gap-3">
                <View className="w-11 h-11 rounded-full bg-primary items-center justify-center">
                  <Text className="text-base font-semibold text-primary-foreground">
                    JT
                  </Text>
                </View>
                <View className="flex-1 min-w-0">
                  <Card.Title
                    className="text-base font-semibold text-foreground"
                    numberOfLines={1}
                  >
                    Jennifer Thompson
                  </Card.Title>
                  <Card.Description className="text-sm text-muted" numberOfLines={1}>
                    Marketing Director, GlowUp Beauty
                  </Card.Description>
                </View>
              </View>
            </Card>

            {/* Testimonial 2 */}
            <Card className="flex-1 p-8 rounded-2xl bg-surface border border-border">
              <View className="flex-row gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons className="text-accent" key={star} name="star" size={18} />
                ))}
              </View>
              <Card.Description className="text-base text-foreground leading-6 mb-6">
                "As a creator, this platform has been a game-changer. The briefs
                are clear, payment is always on time, and I've built amazing
                brand relationships."
              </Card.Description>
              <View className="flex-row items-center gap-3">
                <View className="w-11 h-11 rounded-full bg-blue-500 items-center justify-center">
                  <Text className="text-base font-semibold text-white">
                    MC
                  </Text>
                </View>
                <View className="flex-1 min-w-0">
                  <Card.Title
                    className="text-base font-semibold text-foreground"
                    numberOfLines={1}
                  >
                    Maria Chen
                  </Card.Title>
                  <Card.Description className="text-sm text-muted" numberOfLines={1}>
                    Lifestyle Creator, 150K Followers
                  </Card.Description>
                </View>
              </View>
            </Card>

            {/* Testimonial 3 */}
            <Card className="flex-1 p-8 rounded-2xl bg-surface border border-border">
              <View className="flex-row gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons className="text-accent" key={star} name="star" size={18} />
                ))}
              </View>
              <Card.Description className="text-base text-foreground leading-6 mb-6">
                "The escrow system gives us complete peace of mind. We know our
                budget is protected and creators are motivated to deliver their
                best work."
              </Card.Description>
              <View className="flex-row items-center gap-3">
                <View className="w-11 h-11 rounded-full bg-violet-500 items-center justify-center">
                  <Text className="text-base font-semibold text-white">
                    DP
                  </Text>
                </View>
                <View className="flex-1 min-w-0">
                  <Card.Title
                    className="text-base font-semibold text-foreground"
                    numberOfLines={1}
                  >
                    David Park
                  </Card.Title>
                  <Card.Description className="text-sm text-muted" numberOfLines={1}>
                    Founder, TechStart Inc
                  </Card.Description>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </View>

      {/* Join UGC CTA Section */}
      <JoinCTASection />
    </View>
  );
}
