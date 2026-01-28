import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRef } from "react";
import {
  Pressable,
  ScrollView,
  type ScrollView as ScrollViewType,
  Text,
  View,
} from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";

export interface CardCarouselProps<T> {
  /** Section title */
  title: string;
  /** Items to render */
  items: T[];
  /** Render function for each card */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Key extractor */
  keyExtractor: (item: T) => string;
  /** "See all" link URL */
  seeAllHref?: string;
  /** "See all" link text */
  seeAllText?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Gap between cards */
  gap?: number;
}

export function CardCarousel<T>({
  title,
  items,
  renderItem,
  keyExtractor,
  seeAllHref,
  seeAllText = "See All",
  isLoading = false,
  gap = 20,
}: CardCarouselProps<T>) {
  const { isDesktop } = useResponsive();
  const scrollViewRef = useRef<ScrollViewType>(null);

  const scrollLeft = () => {
    scrollViewRef.current?.scrollTo({
      x: 0,
      animated: true,
    });
  };

  const scrollRight = () => {
    // Scroll to end
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-[28px] font-bold text-foreground">
          {title}
        </Text>

        <View className="flex-row items-center gap-4">
          {/* Desktop Navigation Arrows */}
          {isDesktop && items.length > 3 && (
            <View className="flex-row gap-2">
              <Pressable
                className="w-9 h-9 rounded-full border border-border items-center justify-center hover:border-primary hover:bg-chip-bg"
                onPress={scrollLeft}
              >
                <Ionicons
                  className="text-foreground"
                  name="chevron-back"
                  size={18}
                />
              </Pressable>
              <Pressable
                className="w-9 h-9 rounded-full border border-border items-center justify-center hover:border-primary hover:bg-chip-bg"
                onPress={scrollRight}
              >
                <Ionicons
                  className="text-foreground"
                  name="chevron-forward"
                  size={18}
                />
              </Pressable>
            </View>
          )}

          {/* See All Link */}
          {seeAllHref && (
            <Link asChild href={seeAllHref as any}>
              <Pressable className="flex-row items-center gap-1 group">
                <Text className="text-[15px] font-medium text-foreground group-hover:text-primary">
                  {seeAllText}
                </Text>
                <Ionicons
                  className="text-foreground group-hover:text-primary"
                  name="arrow-forward"
                  size={18}
                />
              </Pressable>
            </Link>
          )}
        </View>
      </View>

      {/* Cards */}
      {isLoading ? (
        // Loading Skeleton
        <View className="flex-row" style={{ gap }}>
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              className="w-[300px] h-[280px] bg-skeleton rounded-xl"
            />
          ))}
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ gap, paddingBottom: 8 }}
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
        >
          {items.map((item, index) => (
            <View key={keyExtractor(item)}>{renderItem(item, index)}</View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export default CardCarousel;
