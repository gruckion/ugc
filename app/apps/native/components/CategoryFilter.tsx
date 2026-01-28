import { Ionicons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export interface Category {
  id: string | null; // null = "All"
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

/**
 * Horizontal scrollable category filter chips
 *
 * Usage:
 * ```tsx
 * const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
 *
 * <CategoryFilter
 *   categories={CATEGORIES}
 *   selectedCategory={selectedCategory}
 *   onSelectCategory={setSelectedCategory}
 * />
 * ```
 */
export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <View className="bg-background py-3 border-b border-border">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 8,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => (
          <CategoryChip
            category={category}
            isSelected={selectedCategory === category.id}
            key={category.id ?? "all"}
            onPress={() => onSelectCategory(category.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function CategoryChip({
  category,
  isSelected,
  onPress,
}: {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
      }}
    >
      <Animated.View style={animatedStyle}>
        <View
          className={cn(
            "flex-row items-center gap-1.5 px-3.5 py-2.5 rounded-[20px] border",
            isSelected
              ? "border-primary bg-primary"
              : "border-border bg-surface",
          )}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: isSelected ? 0.1 : 0.05,
            shadowRadius: 2,
            elevation: isSelected ? 2 : 1,
          }}
        >
          <Ionicons
            className={cn(isSelected ? "text-accent" : "text-foreground")}
            name={category.icon}
            size={16}
          />
          <Text
            className={cn(
              "text-sm",
              isSelected
                ? "text-primary-foreground font-semibold"
                : "text-foreground font-medium",
            )}
          >
            {category.label}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

// Default event categories
export const EVENT_CATEGORIES: Category[] = [
  { id: null, label: "All Events", icon: "apps-outline" },
  { id: "seasonal", label: "Seasonal", icon: "leaf-outline" },
  { id: "special", label: "Special", icon: "star-outline" },
  { id: "recurring", label: "Recurring", icon: "repeat-outline" },
];
