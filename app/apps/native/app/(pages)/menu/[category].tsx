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

  // Theme colors for Ionicons
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Pressable
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons color={primaryForeground} name="arrow-back" size={24} />
          </Pressable>
          <View>
            <Text
              className="font-light text-2xl text-primary-foreground"
              style={{ fontFamily: "serif" }}
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
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        style={{ flex: 1 }}
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
      className="mb-4 overflow-hidden bg-surface"
      style={{
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {item.image && (
        <Image
          cachePolicy="memory-disk"
          contentFit="cover"
          placeholder={{ blurhash: FOOD_BLURHASH }}
          source={item.image}
          style={{ width: "100%", height: 180 }}
          transition={200}
        />
      )}
      <View style={{ padding: 16 }}>
        <Text
          className="font-semibold text-foreground"
          style={{ fontSize: 17, lineHeight: 22 }}
        >
          {item.name}
        </Text>
        {item.description && (
          <Text
            className="mt-1.5 text-muted text-sm"
            style={{ lineHeight: 20 }}
          >
            {item.description}
          </Text>
        )}
      </View>
    </View>
  );
}
