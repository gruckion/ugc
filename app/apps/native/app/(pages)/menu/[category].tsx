import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MENU_DATA } from "./index";

// Generic food blurhash placeholder (warm brown/beige tones)
const FOOD_BLURHASH = "LKJRyV~qIU-;_3M{ofRj9Fxut7WB";

const CATEGORY_TITLES: Record<string, string> = {
  starters: "Starters",
  mains: "Main Courses",
  desserts: "Desserts & Savouries",
  canape: "Canapé Menu",
};

export default function MenuCategory() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { category } = useLocalSearchParams<{ category: string }>();

  // Ionicons on primary bg always need white
  const primaryForeground = "#FFFFFF";

  const categoryTitle = CATEGORY_TITLES[category || ""] || "Menu";
  const items = MENU_DATA[category as keyof typeof MENU_DATA] || [];

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View
        className="bg-primary px-4 pb-5"
        style={{ paddingTop: insets.top + 8 }}
      >
        <View className="flex-row items-center gap-3">
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-full bg-white/15"
            onPress={() => router.back()}
          >
            <Ionicons color={primaryForeground} name="arrow-back" size={24} />
          </Pressable>
          <View>
            <Text
              className="font-light font-serif text-2xl text-primary-foreground"
            >
              {categoryTitle}
            </Text>
            <Text className="mt-0.5 text-accent text-sm">
              {items.length} items
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      >
        {items.map((item) => (
          <MenuItem item={item} key={item.name} />
        ))}
      </ScrollView>
    </View>
  );
}

function MenuItem({
  item,
}: {
  item: { name: string; description: string | null; image: string | null };
}) {
  return (
    <View
      className="mb-4 overflow-hidden rounded-xl bg-surface shadow-sm"
    >
      {item.image && (
        <Image
          cachePolicy="memory-disk"
          contentFit="cover"
          placeholder={{ blurhash: FOOD_BLURHASH }}
          className="h-[180px] w-full"
          source={item.image}
          transition={200}
        />
      )}
      <View className="p-4">
        <Text
          className="font-semibold text-[17px] leading-[22px] text-foreground"
        >
          {item.name}
        </Text>
        {item.description && (
          <Text
            className="mt-1.5 leading-5 text-muted text-sm"
          >
            {item.description}
          </Text>
        )}
      </View>
    </View>
  );
}
