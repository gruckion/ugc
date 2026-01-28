import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";

// Fiverr-style theme colors (consistent with rest of app)
const THEME_COLORS = {
  primary: "#1DBF73",
  primaryForeground: "#FFFFFF",
  foreground: "#222325",
  muted: "#62646a",
  border: "#e4e5e7",
  background: "#FFFFFF",
  sectionBackground: "#fafafa",
  // Semantic colors
  success: "#1DBF73",
  successSubtle: "#f0fdf4",
};

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
    <View style={{ flex: isMobile ? undefined : 1, width: isMobile ? "100%" : undefined }}>
      <Link asChild href={option.href as any}>
        <Pressable
          style={({ hovered }) => ({
            flex: 1,
            backgroundColor: THEME_COLORS.background,
            borderRadius: 12,
            padding: 24,
            borderWidth: 1,
            borderColor: hovered ? THEME_COLORS.primary : THEME_COLORS.border,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: hovered ? 4 : 2 },
            shadowOpacity: hovered ? 0.1 : 0.05,
            shadowRadius: hovered ? 8 : 4,
            transform: hovered ? [{ translateY: -2 }] : [],
          })}
        >
        {/* Header row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: THEME_COLORS.successSubtle,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons color={THEME_COLORS.primary} name={option.icon} size={20} />
          </View>
          <View
            style={{
              backgroundColor: THEME_COLORS.sectionBackground,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: THEME_COLORS.muted,
              }}
            >
              {option.subtitle}
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: THEME_COLORS.foreground,
            marginBottom: 8,
            letterSpacing: -0.3,
          }}
        >
          {option.title}
        </Text>

        {/* Description */}
        <Text
          style={{
            fontSize: 14,
            color: THEME_COLORS.muted,
            lineHeight: 21,
            marginBottom: 20,
          }}
        >
          {option.description}
        </Text>

        {/* Stats row */}
        <View
          style={{
            flexDirection: "row",
            gap: 24,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: THEME_COLORS.border,
          }}
        >
          {option.stats.map((stat) => (
            <View key={stat.label}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: THEME_COLORS.foreground,
                  marginBottom: 2,
                }}
              >
                {stat.value}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: THEME_COLORS.muted,
                }}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: THEME_COLORS.primary,
            }}
          >
            Browse {option.id}
          </Text>
          <Ionicons color={THEME_COLORS.primary} name="arrow-forward" size={16} />
        </View>
      </Pressable>
    </Link>
    </View>
  );
}

// Category pill component
function CategoryPill({ category }: { category: (typeof CATEGORIES)[0] }) {
  return (
    <Link
      asChild
      href={`/browse/creators?category=${category.id}` as any}
    >
      <Pressable
        style={({ hovered }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 8,
          backgroundColor: hovered ? THEME_COLORS.primary : THEME_COLORS.background,
          borderWidth: 1,
          borderColor: hovered ? THEME_COLORS.primary : THEME_COLORS.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: hovered ? 0 : 0.04,
          shadowRadius: 2,
        })}
      >
        {({ hovered }) => (
          <>
            <Ionicons
              color={hovered ? THEME_COLORS.primaryForeground : THEME_COLORS.muted}
              name={category.icon}
              size={16}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: hovered ? THEME_COLORS.primaryForeground : THEME_COLORS.foreground,
              }}
            >
              {category.label}
            </Text>
          </>
        )}
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
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: THEME_COLORS.successSubtle,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons color={THEME_COLORS.success} name={icon} size={14} />
      </View>
      <Text style={{ fontSize: 13, color: THEME_COLORS.muted }}>{text}</Text>
    </View>
  );
}

export default function BrowseLandingPage() {
  const { width } = useResponsive();
  // Force desktop layout for widths >= 768px to fix React Native Web dimension issues
  const isMobileLayout = width > 0 && width < 768;

  return (
    <View style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
      {/* Header Section */}
      <View
        style={{
          paddingTop: 48,
          paddingBottom: 48,
          paddingHorizontal: 24,
          backgroundColor: THEME_COLORS.sectionBackground,
        }}
      >
        <View
          style={{
            maxWidth: 1000,
            marginHorizontal: "auto",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "500",
              color: THEME_COLORS.primary,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            Marketplace
          </Text>
          <Text
            style={{
              fontSize: isMobileLayout ? 28 : 36,
              fontWeight: "600",
              color: THEME_COLORS.foreground,
              textAlign: "center",
              marginBottom: 12,
              letterSpacing: -0.5,
            }}
          >
            Start exploring
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: THEME_COLORS.muted,
              textAlign: "center",
              maxWidth: 480,
              marginHorizontal: "auto",
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
        style={{
          paddingVertical: 48,
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            maxWidth: 1000,
            marginHorizontal: "auto",
            width: "100%",
          }}
        >
          {/* Cards Grid */}
          <View
            style={{
              flexDirection: isMobileLayout ? "column" : "row",
              gap: 20,
              marginBottom: 48,
            }}
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
            style={{
              backgroundColor: THEME_COLORS.sectionBackground,
              borderRadius: 12,
              padding: 24,
              borderWidth: 1,
              borderColor: THEME_COLORS.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: THEME_COLORS.foreground,
                }}
              >
                Browse by category
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: THEME_COLORS.muted,
                }}
              >
                {CATEGORIES.length} categories
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
              }}
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
        style={{
          paddingVertical: 32,
          paddingHorizontal: 24,
          borderTopWidth: 1,
          borderTopColor: THEME_COLORS.border,
        }}
      >
        <View
          style={{
            maxWidth: 1000,
            marginHorizontal: "auto",
            width: "100%",
            flexDirection: isMobileLayout ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            gap: isMobileLayout ? 16 : 48,
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
