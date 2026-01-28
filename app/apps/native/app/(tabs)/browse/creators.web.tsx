import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { CreatorCard } from "@/components/web/CreatorCard";
import { getResponsiveValue, useResponsive } from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";
import { SEO, createWebPageJsonLd, createBreadcrumbJsonLd } from "@/components/web/SEO";

// Mock creator data
const MOCK_CREATORS = [
  {
    id: "1",
    name: "Sarah Johnson",
    tagline: "Authentic lifestyle content for DTC brands. 5+ years experience.",
    niches: ["Lifestyle", "Beauty"],
    trustScore: 98,
    level: "pro" as const,
    startingRate: 250,
    completedBriefs: 147,
    avgResponseTime: "2h",
  },
  {
    id: "2",
    name: "Mike Chen",
    tagline:
      "Tech reviews that convert. Specializing in gadgets and electronics.",
    niches: ["Tech", "Gadgets"],
    trustScore: 95,
    level: "established" as const,
    startingRate: 300,
    completedBriefs: 89,
    avgResponseTime: "4h",
  },
  {
    id: "3",
    name: "Emma Davis",
    tagline: "Fitness content that inspires action. NASM certified trainer.",
    niches: ["Fitness", "Wellness"],
    trustScore: 97,
    level: "pro" as const,
    startingRate: 275,
    completedBriefs: 112,
    avgResponseTime: "3h",
  },
  {
    id: "4",
    name: "Alex Rivera",
    tagline: "Food content that makes you hungry. Former chef turned creator.",
    niches: ["Food", "Lifestyle"],
    trustScore: 94,
    level: "established" as const,
    startingRate: 225,
    completedBriefs: 67,
    avgResponseTime: "5h",
  },
  {
    id: "5",
    name: "Jessica Park",
    tagline: "Beauty tutorials and skincare reviews. Over 500K followers.",
    niches: ["Beauty", "Skincare"],
    trustScore: 99,
    level: "pro" as const,
    startingRate: 400,
    completedBriefs: 234,
    avgResponseTime: "1h",
  },
  {
    id: "6",
    name: "David Kim",
    tagline: "Fashion and streetwear content. Based in NYC.",
    niches: ["Fashion", "Lifestyle"],
    trustScore: 92,
    level: "rising" as const,
    startingRate: 200,
    completedBriefs: 34,
    avgResponseTime: "6h",
  },
  {
    id: "7",
    name: "Maria Garcia",
    tagline: "Travel and adventure content. Visited 40+ countries.",
    niches: ["Travel", "Adventure"],
    trustScore: 96,
    level: "established" as const,
    startingRate: 350,
    completedBriefs: 78,
    avgResponseTime: "4h",
  },
  {
    id: "8",
    name: "James Wilson",
    tagline: "Gaming content and reviews. Twitch partner.",
    niches: ["Gaming", "Tech"],
    trustScore: 91,
    level: "rising" as const,
    startingRate: 175,
    completedBriefs: 45,
    avgResponseTime: "2h",
  },
];

// Filter categories
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "tech", label: "Tech" },
  { id: "beauty", label: "Beauty" },
  { id: "food", label: "Food" },
  { id: "fitness", label: "Fitness" },
  { id: "fashion", label: "Fashion" },
  { id: "travel", label: "Travel" },
  { id: "gaming", label: "Gaming" },
];

// Sort options
const SORT_OPTIONS = [
  { id: "trust", label: "Trust Score" },
  { id: "rate_low", label: "Rate: Low to High" },
  { id: "rate_high", label: "Rate: High to Low" },
  { id: "completed", label: "Most Completed" },
];

export default function BrowseCreatorsPage() {
  const { width, isMobile } = useResponsive();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("trust");

  const creatorsJsonLd = createWebPageJsonLd(
    "Browse Creators - UGC Marketplace",
    "Find and hire talented UGC creators for your brand.",
    "/browse/creators"
  );

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "Creators", path: "/browse/creators" },
  ]);

  const _columns = getResponsiveValue(width, {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  });

  // Filter and sort creators
  const filteredCreators = MOCK_CREATORS.filter((creator) => {
    if (selectedCategory === "all") return true;
    return creator.niches.some(
      (niche) => niche.toLowerCase() === selectedCategory
    );
  }).sort((a, b) => {
    switch (selectedSort) {
      case "trust":
        return b.trustScore - a.trustScore;
      case "rate_low":
        return a.startingRate - b.startingRate;
      case "rate_high":
        return b.startingRate - a.startingRate;
      case "completed":
        return b.completedBriefs - a.completedBriefs;
      default:
        return 0;
    }
  });

  return (
    <View className="flex-1 bg-background">
      <SEO
        title="Browse Creators"
        description="Find and hire talented UGC creators on our marketplace. Filter by niche, rating, and price. Connect with verified creators for authentic brand content."
        path="/browse/creators"
        keywords={[
          "hire UGC creators",
          "find content creators",
          "UGC talent",
          "creator marketplace",
          "brand content creators",
        ]}
        jsonLd={[creatorsJsonLd, breadcrumbJsonLd]}
      />

      {/* Header */}
      <View className="pt-8 pb-6 px-6 border-b border-border">
        <View className="w-full mx-auto" style={{ maxWidth: 1200 }}>
          <Text className="text-3xl font-bold text-foreground mb-2">
            Browse Creators
          </Text>
          <Text className="text-base text-muted">
            {filteredCreators.length} creators available
          </Text>
        </View>
      </View>

      {/* Filters */}
      <View className="py-4 px-6 bg-surface-raised border-b border-border">
        <View className="w-full mx-auto" style={{ maxWidth: 1200 }}>
          {/* Category Filter */}
          <ScrollView
            contentContainerStyle={{ gap: 8 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {CATEGORIES.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full border",
                  selectedCategory === category.id
                    ? "bg-primary border-primary"
                    : "bg-background border-border",
                )}
              >
                <Text
                  className={cn(
                    "text-sm font-medium",
                    selectedCategory === category.id
                      ? "text-primary-foreground"
                      : "text-foreground",
                  )}
                >
                  {category.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Sort Dropdown */}
          <View className="flex-row items-center gap-3">
            <Text className="text-sm text-muted">
              Sort by:
            </Text>
            <ScrollView
              contentContainerStyle={{ gap: 8 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {SORT_OPTIONS.map((option) => (
                <Pressable
                  key={option.id}
                  onPress={() => setSelectedSort(option.id)}
                  className={cn(
                    "px-3 rounded-2xl",
                    selectedSort === option.id
                      ? "bg-chip-bg"
                      : "bg-transparent",
                  )}
                  style={{
                    paddingVertical: 6,
                  }}
                >
                  <Text
                    className={cn(
                      "text-[13px]",
                      selectedSort === option.id
                        ? "font-semibold text-primary"
                        : "font-normal text-muted",
                    )}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>

      {/* Creator Grid */}
      <ScrollView
        contentContainerClassName="py-8 px-6"
        className="flex-1"
      >
        <View className="w-full mx-auto" style={{ maxWidth: 1200 }}>
          <View
            className="flex-row flex-wrap gap-6"
            style={{
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            {filteredCreators.map((creator) => (
              <CreatorCard
                avgResponseTime={creator.avgResponseTime}
                completedBriefs={creator.completedBriefs}
                id={creator.id}
                key={creator.id}
                level={creator.level}
                name={creator.name}
                niches={creator.niches}
                startingRate={creator.startingRate}
                tagline={creator.tagline}
                trustScore={creator.trustScore}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
