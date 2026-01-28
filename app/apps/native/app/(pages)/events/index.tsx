import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CategoryFilter, EVENT_CATEGORIES } from "@/components/CategoryFilter";
import { ExternalLinkButton } from "@/components/ExternalLinkButton";

// Sample events data based on the website sitemap
export const EVENTS = [
  {
    id: "christmas-lunch-2025",
    title: "Christmas Lunch",
    description: "Enjoy our special festive menu in the Main Dining Room",
    fullDescription:
      "Join us for a memorable Christmas Lunch experience at UGC. Our award-winning chefs have prepared a special festive menu featuring traditional favorites with a modern twist. The elegant Main Dining Room will be beautifully decorated for the season, creating the perfect atmosphere for celebrating with friends, family, or colleagues.\n\nThe lunch includes a three-course meal with wine pairings, followed by coffee and mince pies. Vegetarian and dietary options are available upon request.",
    dateRange: "1st - 23rd December",
    time: "12:00 PM - 3:00 PM",
    location: "Main Dining Room",
    price: "45",
    capacity: 60,
    type: "seasonal",
    image:
      "https://static.wixstatic.com/media/11062b_7daf34b38d874071a1001caa9dde798f~mv2_d_5616_3744_s_4_2.jpg/v1/fill/w_400,h_300,al_c,q_80/11062b_7daf34b38d874071a1001caa9dde798f~mv2_d_5616_3744_s_4_2.webp",
  },
  {
    id: "christmas-dinner-2025",
    title: "Christmas Dinners",
    description: "An evening of festive celebration with special menu",
    fullDescription:
      "Experience the magic of Christmas with our exclusive Christmas Dinner event. This intimate evening celebration features a five-course tasting menu showcasing the finest seasonal ingredients, expertly paired with champagne and premium wines.\n\nThe evening includes live classical music, festive entertainment, and a special visit from Father Christmas. Perfect for couples or groups looking for an unforgettable holiday experience.",
    dateRange: "December 18th",
    time: "7:00 PM - 11:00 PM",
    location: "Private Dining Room",
    price: "85",
    capacity: 40,
    type: "special",
    image:
      "https://static.wixstatic.com/media/da00a6_3329029cfbc048ab9d8b8fdd4e5e3563~mv2.jpg/v1/fill/w_400,h_300,al_c,q_80/da00a6_3329029cfbc048ab9d8b8fdd4e5e3563~mv2.webp",
  },
  {
    id: "wine-tasting",
    title: "Wine Tasting Evening",
    description: "Sample fine wines from our cellar with expert guidance",
    fullDescription:
      "Our monthly Wine Tasting Evenings are a journey through the world's finest wine regions. Led by our expert sommelier, each session explores a different theme - from Old World classics to emerging New World producers.\n\nThe evening includes tasting of 6-8 wines, paired with artisanal cheeses and charcuterie. You'll learn about wine appreciation, food pairing principles, and discover new favorites for your personal collection.",
    dateRange: "Monthly",
    time: "6:30 PM - 9:00 PM",
    location: "Wine Cellar Room",
    price: "55",
    capacity: 24,
    type: "recurring",
    image:
      "https://static.wixstatic.com/media/da00a6_52bcb81f629b40c383a2f1a09aa1d97e~mv2.jpg/v1/fill/w_400,h_300,al_c,q_80/da00a6_52bcb81f629b40c383a2f1a09aa1d97e~mv2.webp",
  },
  {
    id: "business-lunch",
    title: "Business Networking Lunch",
    description: "Connect with fellow members over a delightful lunch",
    fullDescription:
      "Our Business Networking Lunches provide the perfect opportunity to expand your professional network while enjoying a delicious meal. Each month, we welcome guest speakers from various industries who share insights and expertise.\n\nThe format includes a welcome reception, two-course lunch with wine, a keynote presentation, and structured networking time. It's an ideal setting to make valuable connections and discuss business opportunities in a relaxed, members-only environment.",
    dateRange: "Last Friday of month",
    time: "12:30 PM - 2:30 PM",
    location: "Members Lounge",
    price: "35",
    capacity: 50,
    type: "recurring",
    image:
      "https://static.wixstatic.com/media/5e0aaa_89c287ebeaca49b398ec7c86b8397a0f~mv2.jpg/v1/fill/w_400,h_300,al_c,q_80/5e0aaa_89c287ebeaca49b398ec7c86b8397a0f~mv2.webp",
  },
];

export type Event = (typeof EVENTS)[0];

// Blurhash for event images
const EVENT_BLURHASH = "LKJRyV~qIU-;_3M{ofRj9Fxut7WB";

export default function Events() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const accent = useThemeColor("accent");

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Derived filtered events - no useEffect needed!
  const filteredEvents = selectedCategory
    ? EVENTS.filter((event) => event.type === selectedCategory)
    : EVENTS;

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View
        className="bg-primary"
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <Text
          className="text-primary-foreground"
          style={{
            fontSize: 28,
            fontWeight: "300",
            fontFamily: "serif",
          }}
        >
          Events
        </Text>
        <Text
          className="text-accent"
          style={{
            fontSize: 14,
            marginTop: 4,
          }}
        >
          Upcoming events at UGC
        </Text>
      </View>

      {/* Category Filter */}
      <CategoryFilter
        categories={EVENT_CATEGORIES}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        style={{ flex: 1 }}
      >
        {filteredEvents.length === 0 ? (
          <View
            style={{
              padding: 32,
              alignItems: "center",
            }}
          >
            <Ionicons color={accent} name="calendar-outline" size={48} />
            <Text
              className="text-foreground"
              style={{
                fontSize: 16,
                marginTop: 16,
                textAlign: "center",
              }}
            >
              No events found in this category
            </Text>
            <Pressable
              className="bg-accent"
              onPress={() => setSelectedCategory(null)}
              style={{
                marginTop: 12,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text
                className="text-foreground"
                style={{
                  fontWeight: "500",
                }}
              >
                View All Events
              </Text>
            </Pressable>
          </View>
        ) : (
          filteredEvents.map((event, index) => (
            <Animated.View
              entering={FadeInDown.delay(index * 100).springify()}
              key={event.id}
            >
              <EventCard
                event={event}
                featured={index === 0 && selectedCategory === null}
                onPress={() => router.push(`/events/${event.id}`)}
              />
            </Animated.View>
          ))
        )}

        {/* View Website Link */}
        <ExternalLinkButton
          label="View All Events"
          url="https://ugc.com/events"
          variant="subtle"
        />
      </ScrollView>
    </View>
  );
}

function EventCard({
  event,
  featured,
  onPress,
}: {
  event: Event;
  featured?: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  // useThemeColor only for Ionicons (which don't support className)
  const accent = useThemeColor("accent") || "#85b09a";
  const muted = useThemeColor("muted") || "#666666";

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className={featured ? "bg-primary" : "bg-surface"}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          borderRadius: 12,
          marginBottom: 16,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        {/* Event Image */}
        <Image
          contentFit="cover"
          placeholder={{ blurhash: EVENT_BLURHASH }}
          source={event.image}
          style={{ width: "100%", height: 160 }}
          transition={200}
        />

        {/* Event Details */}
        <View style={{ padding: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                className={
                  featured ? "text-primary-foreground" : "text-foreground"
                }
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginBottom: 4,
                }}
              >
                {event.title}
              </Text>
              <Text
                className={featured ? "text-accent" : "text-muted"}
                style={{
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {event.description}
              </Text>
            </View>
            {featured && (
              <View
                className="bg-accent"
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 12,
                  marginLeft: 8,
                }}
              >
                <Text
                  className="text-foreground"
                  style={{
                    fontSize: 11,
                    fontWeight: "600",
                  }}
                >
                  Featured
                </Text>
              </View>
            )}
          </View>

          {/* Date and RSVP */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons
                color={featured ? accent : muted}
                name="calendar-outline"
                size={16}
              />
              <Text
                className={featured ? "text-accent" : "text-muted"}
                style={{
                  fontSize: 13,
                }}
              >
                {event.dateRange}
              </Text>
            </View>

            <View
              className={featured ? "bg-primary-foreground" : "bg-primary"}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 6,
              }}
            >
              <Text
                className={
                  featured ? "text-primary" : "text-primary-foreground"
                }
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                }}
              >
                RSVP
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
