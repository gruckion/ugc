import { api } from "@convoexpo-and-nextjs-web-bun-better-auth/backend/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useConvexAuth, useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import {
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExternalLinkButton } from "@/components/ExternalLinkButton";
import { UGCLogo } from "@/components/UGCLogo";
import { authClient } from "@/lib/auth-client";

// Type-safe menu routing
const MENU_ROUTES = {
  membership: "/(tabs)/more/membership",
  "dining-room": "/(tabs)/more/dining-room",
  "reciprocal-clubs": "/(tabs)/more/reciprocal-clubs",
  "fabric-fund": "/(tabs)/more/fabric-fund",
  contact: "/(tabs)/more/contact",
  about: "/(tabs)/more/about",
  newsletter: "/(tabs)/more/bugle",
} as const satisfies Record<string, `/(tabs)/more/${string}`>;

type MenuId = keyof typeof MENU_ROUTES;

const MENU_ITEMS: Array<{
  id: MenuId;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}> = [
  {
    id: "membership",
    icon: "card-outline",
    title: "Membership Card",
    subtitle: "View your membership details",
  },
  {
    id: "dining-room",
    icon: "restaurant-outline",
    title: "Dining Room",
    subtitle: "Information about our facilities",
  },
  {
    id: "reciprocal-clubs",
    icon: "globe-outline",
    title: "Reciprocal Clubs",
    subtitle: "450+ partner clubs worldwide",
  },
  {
    id: "fabric-fund",
    icon: "heart-outline",
    title: "Fabric Fund",
    subtitle: "Support club renovations",
  },
  {
    id: "newsletter",
    icon: "newspaper-outline",
    title: "The Bugle",
    subtitle: "Read our newsletter",
  },
  {
    id: "about",
    icon: "information-circle-outline",
    title: "About the Club",
    subtitle: "Our history since 1895",
  },
  {
    id: "contact",
    icon: "call-outline",
    title: "Contact",
    subtitle: "Get in touch",
  },
];

export default function More() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(api.auth.getCurrentUser, isAuthenticated ? {} : "skip");

  // Theme colors for Ionicons (which don't support className)
  const foreground = useThemeColor("foreground");
  const border = useThemeColor("border");

  const handleMenuPress = (id: MenuId) => {
    const route = MENU_ROUTES[id];
    router.push(route);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View
        className="bg-primary pb-6 px-5"
        style={{
          paddingTop: insets.top + 16,
        }}
      >
        <View className="flex-row items-center gap-4">
          {/* Logo - White circle variant for primary background */}
          <UGCLogo
            bgClassName="bg-background"
            size={60}
            textClassName="text-primary"
          />
          <View className="flex-1">
            <Text
              className="text-primary-foreground text-[22px] font-semibold"
            >
              UGC Marketplace
            </Text>
            {isAuthenticated && user?.name && (
              <Text
                className="text-accent text-sm mt-[2px]"
              >
                {user.name}
              </Text>
            )}
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      >
        {/* Quick Contact */}
        <View
          className="bg-surface rounded-xl p-4 mb-5 flex-row items-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View className="flex-1">
            <Text
              className="text-foreground text-[15px] font-semibold"
            >
              42 Crutched Friars
            </Text>
            <Text className="text-muted text-sm mt-[2px]">
              London EC3N 2AP
            </Text>
            <Text
              className="text-accent text-sm mt-1"
            >
              020 7167 6682
            </Text>
          </View>
          <Pressable
            className="bg-accent w-12 h-12 rounded-full items-center justify-center"
            onPress={() => Linking.openURL("tel:02071676682")}
          >
            <Ionicons color={foreground} name="call" size={22} />
          </Pressable>
        </View>

        {/* Menu Items */}
        {MENU_ITEMS.map((item) => (
          <Pressable
            className="bg-surface rounded-xl p-4 mb-3 flex-row items-center"
            key={item.id}
            onPress={() => handleMenuPress(item.id)}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <View
              className="bg-primary/10 w-11 h-11 rounded-full items-center justify-center mr-[14px]"
            >
              <Ionicons color={foreground} name={item.icon} size={22} />
            </View>
            <View className="flex-1">
              <Text
                className="text-foreground text-base font-medium"
              >
                {item.title}
              </Text>
              <Text
                className="text-muted text-[13px] mt-[2px]"
              >
                {item.subtitle}
              </Text>
            </View>
            <Ionicons color={border} name="chevron-forward" size={20} />
          </Pressable>
        ))}

        {/* Opening Hours */}
        <View
          className="bg-primary rounded-xl p-5 mt-2 mb-4"
        >
          <Text
            className="text-primary-foreground text-base font-semibold mb-3"
          >
            Opening Hours
          </Text>
          <Text
            className="text-primary-foreground text-sm leading-[22px]"
          >
            Monday to Friday{"\n"}
            9:00 AM - 5:00 PM
          </Text>
          <Text className="text-accent text-[13px] mt-2">
            Lunch: 12:00 PM - Last orders 2:30 PM
          </Text>
        </View>

        {/* Sign Out Button */}
        {isAuthenticated && (
          <Pressable
            className="border-border bg-surface rounded-xl p-4 items-center border"
            onPress={() => authClient.signOut()}
          >
            <Text className="text-error text-[15px] font-medium">
              Sign Out
            </Text>
          </Pressable>
        )}

        {/* Website Link */}
        <View className="mt-4">
          <ExternalLinkButton
            label="Visit Our Website"
            url="https://ugc.com/"
            variant="subtle"
          />
        </View>
      </ScrollView>
    </View>
  );
}
