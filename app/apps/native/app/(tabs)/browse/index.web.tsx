import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";
import { SEO, createWebPageJsonLd, createBreadcrumbJsonLd } from "@/components/web/SEO";

// Browse options data
const BROWSE_OPTIONS = [
  {
    id: "creators",
    title: "Find Creators",
    subtitle: "For Brands",
    description:
      "Browse vetted UGC creators with proven track records. Filter by niche, engagement rate, and starting price.",
    icon: "people" as const,
    href: "/browse/creators",
    stats: [
      { label: "Active creators", value: "2,400+" },
      { label: "Avg. response", value: "< 4hrs" },
    ],
  },
  {
    id: "briefs",
    title: "Find Briefs",
    subtitle: "For Creators",
    description:
      "Discover paid opportunities from brands. Every brief has secured payment held in escrow.",
    icon: "document-text" as const,
    href: "/browse/briefs",
    stats: [
      { label: "Open briefs", value: "180+" },
      { label: "Avg. budget", value: "$350" },
    ],
  },
];

// Category data
const CATEGORIES = [
  { id: "lifestyle", label: "Lifestyle", icon: "heart-outline" as const },
  { id: "tech", label: "Tech", icon: "phone-portrait-outline" as const },
  { id: "beauty", label: "Beauty", icon: "sparkles-outline" as const },
  { id: "food", label: "Food", icon: "restaurant-outline" as const },
  { id: "fitness", label: "Fitness", icon: "barbell-outline" as const },
  { id: "fashion", label: "Fashion", icon: "shirt-outline" as const },
  { id: "travel", label: "Travel", icon: "airplane-outline" as const },
  { id: "gaming", label: "Gaming", icon: "game-controller-outline" as const },
];

// Card component for browse options
function BrowseCard({
  option,
  isMobile,
}: {
  option: (typeof BROWSE_OPTIONS)[0];
  isMobile: boolean;
}) {
  return (
    <View
      className={isMobile ? "w-full" : "flex-1"}
    >
      <Link asChild href={option.href as any}>
        <Pressable
          className="flex-1 bg-background rounded-xl p-6 border border-border hover:border-primary"
          style={({ hovered }) => ({
            shadowColor: "#000",
            shadowOffset: { width: 0, height: hovered ? 4 : 2 },
            shadowOpacity: hovered ? 0.1 : 0.05,
            shadowRadius: hovered ? 8 : 4,
            transform: hovered ? [{ translateY: -2 }] : [],
          })}
        >
          {/* Header row */}
          <View className="flex-row items-center justify-between mb-4">
            <View
              className="items-center justify-center bg-chip-bg"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
              }}
            >
              <Ionicons
                className="text-primary"
                name={option.icon}
                size={20}
              />
            </View>
            <View
              className="rounded-md bg-surface-raised"
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <Text className="text-xs font-medium text-muted">
                {option.subtitle}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text
            className="text-xl font-semibold text-foreground mb-2"
            style={{ letterSpacing: -0.3 }}
          >
            {option.title}
          </Text>

          {/* Description */}
          <Text
            className="text-sm text-muted mb-5"
            style={{ lineHeight: 21 }}
          >
            {option.description}
          </Text>

          {/* Stats row */}
          <View
            className="flex-row gap-6 pt-4 border-t border-border"
          >
            {option.stats.map((stat) => (
              <View key={stat.label}>
                <Text
                  className="text-base font-semibold text-foreground"
                  style={{ marginBottom: 2 }}
                >
                  {stat.value}
                </Text>
                <Text className="text-xs text-muted">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          {/* CTA */}
          <View
            className="flex-row items-center mt-5"
            style={{ gap: 6 }}
          >
            <Text className="text-sm font-medium text-primary">
              Browse {option.id}
            </Text>
            <Ionicons
              className="text-primary"
              name="arrow-forward"
              size={16}
            />
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

// Category pill component - uses useState for reliable hover tracking
function CategoryPill({ category }: { category: (typeof CATEGORIES)[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link asChild href={`/browse/creators?category=${category.id}` as any}>
      <Pressable
        className={cn(
          "flex-row items-center gap-2 px-4 rounded-lg border",
          isHovered
            ? "bg-primary border-primary"
            : "bg-background border-border",
        )}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        style={{
          paddingVertical: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: isHovered ? 0 : 0.04,
          shadowRadius: 2,
        }}
      >
        <Ionicons
          className={isHovered ? "text-primary-foreground" : "text-muted"}
          name={category.icon}
          size={16}
        />
        <Text
          className={cn(
            "text-[13px] font-medium",
            isHovered ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {category.label}
        </Text>
      </Pressable>
    </Link>
  );
}

// Trust indicator component
function TrustIndicator({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <View className="flex-row items-center gap-2">
      <View
        className="items-center justify-center rounded-full bg-chip-bg"
        style={{
          width: 28,
          height: 28,
        }}
      >
        <Ionicons className="text-success" name={icon} size={14} />
      </View>
      <Text className="text-[13px] text-muted">{text}</Text>
    </View>
  );
}

export default function BrowseLandingPage() {
  const { width } = useResponsive();
  // Force desktop layout for widths >= 768px to fix React Native Web dimension issues
  const isMobileLayout = width > 0 && width < 768;

  const browseJsonLd = createWebPageJsonLd(
    "Browse Marketplace - UGC Marketplace",
    "Browse UGC creators and brand briefs on our marketplace.",
    "/browse"
  );

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
  ]);

  return (
    <View className="flex-1 bg-background">
      <SEO
        title="Browse Marketplace"
        description="Browse the UGC Marketplace. Find talented creators for your brand or discover paid briefs as a creator. Connect, collaborate, and create authentic content."
        path="/browse"
        keywords={[
          "browse UGC",
          "find creators",
          "brand briefs",
          "content marketplace",
          "UGC opportunities",
        ]}
        jsonLd={[browseJsonLd, breadcrumbJsonLd]}
      />

      {/* Header Section */}
      <View
        className="px-6 bg-surface-raised"
        style={{
          paddingTop: 48,
          paddingBottom: 48,
        }}
      >
        <View
          className="w-full mx-auto"
          style={{ maxWidth: 1000 }}
        >
          <Text
            className="text-[13px] font-medium uppercase mb-3 text-center text-primary"
            style={{
              letterSpacing: 0.5,
            }}
          >
            Marketplace
          </Text>
          <Text
            className="font-semibold text-foreground text-center mb-3"
            style={{
              fontSize: isMobileLayout ? 28 : 36,
              letterSpacing: -0.5,
            }}
          >
            Start exploring
          </Text>
          <Text
            className="text-base text-muted text-center mx-auto"
            style={{
              maxWidth: 480,
              lineHeight: 24,
            }}
          >
            Connect with creators or discover paid opportunities. Every
            transaction is protected by escrow.
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View
        className="px-6"
        style={{ paddingVertical: 48 }}
      >
        <View
          className="w-full mx-auto"
          style={{ maxWidth: 1000 }}
        >
          {/* Cards Grid */}
          <View
            className={isMobileLayout ? "flex-col" : "flex-row"}
            style={{ gap: 20, marginBottom: 48 }}
          >
            {BROWSE_OPTIONS.map((option) => (
              <BrowseCard
                isMobile={isMobileLayout}
                key={option.id}
                option={option}
              />
            ))}
          </View>

          {/* Categories Section */}
          <View
            className="rounded-xl p-6 border border-border bg-surface-raised"
          >
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-sm font-semibold text-foreground">
                Browse by category
              </Text>
              <Text className="text-[13px] text-muted">
                {CATEGORIES.length} categories
              </Text>
            </View>
            <View
              className="flex-row flex-wrap"
              style={{ gap: 10 }}
            >
              {CATEGORIES.map((category) => (
                <CategoryPill category={category} key={category.id} />
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Trust Indicators */}
      <View
        className="py-8 px-6 border-t border-border"
      >
        <View
          className={`w-full mx-auto justify-center items-center ${isMobileLayout ? "flex-col gap-4" : "flex-row"}`}
          style={{
            maxWidth: 1000,
            gap: isMobileLayout ? undefined : 48,
          }}
        >
          <TrustIndicator
            icon="shield-checkmark"
            text="Payment protection on every brief"
          />
          <TrustIndicator
            icon="checkmark-circle"
            text="All creators verified"
          />
          <TrustIndicator icon="time" text="Average 48hr delivery" />
        </View>
      </View>
    </View>
  );
}
