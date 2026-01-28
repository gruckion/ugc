import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { BriefCard } from "@/components/web/BriefCard";
import { getResponsiveValue, useResponsive } from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";
import { SEO, createWebPageJsonLd, createBreadcrumbJsonLd } from "@/components/web/SEO";

// Mock brief data
const MOCK_BRIEFS = [
  {
    id: "1",
    title: "Product Review Video for Skincare Brand",
    brandName: "GlowUp Beauty",
    description:
      "Looking for authentic UGC creator to review our new vitamin C serum.",
    budget: 500,
    category: "Beauty",
    daysRemaining: 5,
    paymentSecured: true,
  },
  {
    id: "2",
    title: "Unboxing TikTok for Wireless Earbuds",
    brandName: "SoundWave Tech",
    description:
      "Create an engaging unboxing video showcasing our premium wireless earbuds.",
    budget: 350,
    category: "Tech",
    daysRemaining: 3,
    paymentSecured: true,
  },
  {
    id: "3",
    title: "Lifestyle Content for Fitness App",
    brandName: "FitLife Pro",
    description: "Show how our app fits into your daily workout routine.",
    budget: 600,
    category: "Fitness",
    daysRemaining: 7,
    paymentSecured: true,
  },
  {
    id: "4",
    title: "Recipe Video for Organic Snacks",
    brandName: "NatureBite",
    description: "Create a fun recipe using our organic snack products.",
    budget: 400,
    category: "Food",
    daysRemaining: 4,
    paymentSecured: true,
  },
  {
    id: "5",
    title: "Fashion Haul Video",
    brandName: "UrbanStyle Co",
    description: "Showcase our new spring collection with styling tips.",
    budget: 550,
    category: "Fashion",
    daysRemaining: 6,
    paymentSecured: true,
  },
  {
    id: "6",
    title: "Travel Vlog Partnership",
    brandName: "WanderLux Hotels",
    description: "Document your stay at our boutique hotel property.",
    budget: 800,
    category: "Travel",
    daysRemaining: 10,
    paymentSecured: true,
  },
  {
    id: "7",
    title: "Gaming Headset Review",
    brandName: "ProGamer Gear",
    description: "In-depth review of our new surround sound gaming headset.",
    budget: 300,
    category: "Gaming",
    daysRemaining: 5,
    paymentSecured: true,
  },
  {
    id: "8",
    title: "Morning Routine with Our Coffee",
    brandName: "BeanBrew Co",
    description:
      "Feature our specialty coffee in your morning routine content.",
    budget: 350,
    category: "Lifestyle",
    daysRemaining: 4,
    paymentSecured: true,
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

// Budget filters
const BUDGET_FILTERS = [
  { id: "all", label: "All Budgets" },
  { id: "under300", label: "Under $300" },
  { id: "300-500", label: "$300 - $500" },
  { id: "500-800", label: "$500 - $800" },
  { id: "over800", label: "$800+" },
];

export default function BrowseBriefsPage() {
  const { width, isMobile } = useResponsive();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");

  const briefsJsonLd = createWebPageJsonLd(
    "Browse Briefs - UGC Marketplace",
    "Find paid UGC opportunities and brand briefs.",
    "/browse/briefs"
  );

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "Briefs", path: "/browse/briefs" },
  ]);

  // Grid columns calculated but using flex-wrap for responsiveness
  const _columns = getResponsiveValue(width, {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  });
  void _columns; // Used for future grid layout implementation

  // Filter briefs
  const filteredBriefs = MOCK_BRIEFS.filter((brief) => {
    const categoryMatch =
      selectedCategory === "all" ||
      brief.category.toLowerCase() === selectedCategory;

    let budgetMatch = true;
    if (selectedBudget === "under300") budgetMatch = brief.budget < 300;
    else if (selectedBudget === "300-500")
      budgetMatch = brief.budget >= 300 && brief.budget <= 500;
    else if (selectedBudget === "500-800")
      budgetMatch = brief.budget >= 500 && brief.budget <= 800;
    else if (selectedBudget === "over800") budgetMatch = brief.budget > 800;

    return categoryMatch && budgetMatch;
  });

  return (
    <View className="flex-1 bg-background">
      <SEO
        title="Browse Briefs"
        description="Find paid UGC opportunities on our marketplace. Browse brand briefs with secure payment, filter by category and budget, and start creating authentic content."
        path="/browse/briefs"
        keywords={[
          "UGC briefs",
          "paid creator opportunities",
          "brand briefs",
          "content creator jobs",
          "UGC jobs",
        ]}
        jsonLd={[briefsJsonLd, breadcrumbJsonLd]}
      />

      {/* Header */}
      <View
        className="pt-8 pb-6 px-6 border-b border-border"
      >
        <View
          className="w-full mx-auto"
          style={{ maxWidth: 1200 }}
        >
          <Text
            className="text-3xl font-bold text-foreground mb-2"
          >
            Browse Briefs
          </Text>
          <Text className="text-base text-muted">
            {filteredBriefs.length} briefs available - All with secured payment
          </Text>
        </View>
      </View>

      {/* Filters */}
      <View
        className="py-4 px-6 bg-surface-raised border-b border-border"
      >
        <View
          className="w-full mx-auto"
          style={{ maxWidth: 1200 }}
        >
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

          {/* Budget Filter */}
          <View className="flex-row items-center gap-3">
            <Text className="text-sm text-muted">
              Budget:
            </Text>
            <ScrollView
              contentContainerStyle={{ gap: 8 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {BUDGET_FILTERS.map((filter) => (
                <Pressable
                  key={filter.id}
                  onPress={() => setSelectedBudget(filter.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-2xl",
                    selectedBudget === filter.id
                      ? "bg-chip-bg"
                      : "bg-transparent",
                  )}
                >
                  <Text
                    className={cn(
                      "text-[13px]",
                      selectedBudget === filter.id
                        ? "font-semibold text-primary"
                        : "font-normal text-muted",
                    )}
                  >
                    {filter.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>

      {/* Brief Grid */}
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 32,
          paddingHorizontal: 24,
        }}
        className="flex-1"
      >
        <View
          className="w-full mx-auto"
          style={{ maxWidth: 1200 }}
        >
          <View
            className="flex-row flex-wrap gap-6"
            style={{
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            {filteredBriefs.map((brief) => (
              <BriefCard
                brandName={brief.brandName}
                budget={brief.budget}
                category={brief.category}
                daysRemaining={brief.daysRemaining}
                description={brief.description}
                id={brief.id}
                key={brief.id}
                paymentSecured={brief.paymentSecured}
                title={brief.title}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
