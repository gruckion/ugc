import { ScrollView, Text, View } from "react-native";
import { CategoryTag } from "./CategoryTag";
import { type CategoryOption, SearchBar } from "./SearchBar";

interface PopularTag {
  label: string;
  href: string;
}

export interface WebHeroProps {
  /** Main headline text */
  headline?: string;
  /** Subheadline with value props */
  subheadline?: string;
  /** Categories for the search dropdown */
  categories?: CategoryOption[];
  /** Popular tags to display below search */
  popularTags?: PopularTag[];
  /** Search submit handler */
  onSearch?: (query: string, categoryId?: string) => void;
}

const DEFAULT_CATEGORIES: CategoryOption[] = [
  { id: "all", label: "All Categories", icon: "grid-outline" },
  { id: "lifestyle", label: "Lifestyle", icon: "heart-outline" },
  { id: "tech", label: "Tech & Gadgets", icon: "phone-portrait-outline" },
  { id: "beauty", label: "Beauty", icon: "sparkles-outline" },
  { id: "food", label: "Food & Beverage", icon: "restaurant-outline" },
  { id: "fitness", label: "Fitness", icon: "barbell-outline" },
];

const DEFAULT_POPULAR_TAGS: PopularTag[] = [
  { label: "Product Reviews", href: "/browse?tag=reviews" },
  { label: "Unboxing", href: "/browse?tag=unboxing" },
  { label: "Testimonials", href: "/browse?tag=testimonials" },
  { label: "How-To Videos", href: "/browse?tag=howto" },
];

export function WebHero({
  headline = "Find trusted UGC creators",
  subheadline = "Connect with authentic creators for your brand. Every brief is execution-ready, payment is secured, and trust is built into the system.",
  categories = DEFAULT_CATEGORIES,
  popularTags = DEFAULT_POPULAR_TAGS,
  onSearch,
}: WebHeroProps) {
  return (
    <View className="relative z-10 md:min-h-[500px] lg:min-h-[600px] overflow-visible bg-[#1a1a1a]">
      {/* Background Video - Web only */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for text readability */}
      <View className="absolute inset-0 bg-black/50 z-1" />

      {/* Content */}
      <View className="relative z-2 pt-[60px] md:pt-[100px] lg:pt-[140px] pb-8 md:pb-12 lg:pb-20 px-4 md:px-6">
        <View className="w-full max-w-[900px] mx-auto items-center">
          {/* Headline */}
          <Text
            className="text-[28px] md:text-[42px] lg:text-[56px] font-bold text-center mb-3 md:mb-4 leading-[36px] md:leading-[50px] lg:leading-[66px] text-white"
            style={{
              textShadowColor: "rgba(0, 0, 0, 0.3)",
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 4,
            }}
          >
            {headline}
          </Text>

          {/* Subheadline */}
          <Text
            className="text-sm md:text-lg text-center leading-[22px] md:leading-7 max-w-full md:max-w-[600px] mb-6 md:mb-8 text-white opacity-80"
            style={{
              textShadowColor: "rgba(0, 0, 0, 0.3)",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
          >
            {subheadline}
          </Text>

          {/* Search Bar */}
          <View className="w-full items-center mb-4 md:mb-6">
            <SearchBar categories={categories} onSearch={onSearch} />
          </View>

          {/* Popular Tags - always horizontal scroll on mobile, wrap on desktop */}
          <View className="flex-row items-center gap-2 flex-nowrap md:flex-wrap justify-center w-full">
            <Text className="hidden xs:inline text-sm mr-1 shrink-0 text-white opacity-80">
              Popular:
            </Text>
            <ScrollView
              className="flex-1 md:flex-none"
              contentContainerStyle={{
                gap: 8,
                paddingRight: 24,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {popularTags.map((tag) => (
                <CategoryTag
                  href={tag.href}
                  key={tag.label}
                  label={tag.label}
                  size="small"
                  variant="light"
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}

export default WebHero;
