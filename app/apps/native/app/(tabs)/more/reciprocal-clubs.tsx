import { Ionicons } from "@expo/vector-icons";
import { useConvexAuth } from "convex/react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExternalLinkButton } from "@/components/ExternalLinkButton";

// Globe image from UGC website (larger size for better display)
const GLOBE_IMAGE_URL =
  "https://static.wixstatic.com/media/5e0aaa_e35eca3738ef43d99b99e1e26df0bf16~mv2.png/v1/fill/w_640,h_536,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5e0aaa_e35eca3738ef43d99b99e1e26df0bf16~mv2.png";

// Sample featured reciprocal clubs (for visual appeal)
const FEATURED_CLUBS = [
  {
    name: "The Arts Club",
    location: "London, UK",
    icon: "color-palette-outline" as const,
  },
  {
    name: "University Club",
    location: "New York, USA",
    icon: "school-outline" as const,
  },
  {
    name: "Australian Club",
    location: "Sydney, Australia",
    icon: "leaf-outline" as const,
  },
  {
    name: "Hong Kong Club",
    location: "Hong Kong",
    icon: "business-outline" as const,
  },
];

// Club facilities available at reciprocal clubs
const FACILITIES = [
  { icon: "bed-outline" as const, label: "Accommodation" },
  { icon: "fitness-outline" as const, label: "Gym" },
  { icon: "water-outline" as const, label: "Swimming Pool" },
  { icon: "golf-outline" as const, label: "Golf Course" },
  { icon: "tennisball-outline" as const, label: "Tennis Courts" },
  { icon: "restaurant-outline" as const, label: "Dining" },
];

export default function ReciprocalClubs() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useConvexAuth();

  // Theme colors for Ionicons (which don't support className)
  const foreground = useThemeColor("foreground");
  const accent = useThemeColor("accent");
  const primaryForeground = "#FFFFFF";

  const handleSignIn = () => {
    router.push("/(auth)/landing");
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View
        className="bg-primary px-4 pb-5"
        style={{
          paddingTop: insets.top + 8,
        }}
      >
        <View className="flex-row items-center">
          <Pressable
            className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white/15"
            onPress={() => router.back()}
          >
            <Ionicons color={primaryForeground} name="arrow-back" size={22} />
          </Pressable>
          <Text className="flex-1 font-light font-serif text-xl text-primary-foreground">
            Reciprocal Clubs
          </Text>
          <Ionicons color={accent} name="globe-outline" size={24} />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Hero Image */}
        <Image
          cachePolicy="memory-disk"
          className="h-[220px] w-full"
          contentFit="cover"
          source={{ uri: GLOBE_IMAGE_URL }}
        />

        {/* Content Section */}
        <View className="p-4">
          {/* Stats Card */}
          <View
            className="mb-4 rounded-xl bg-surface p-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="mb-1 text-center text-[28px] font-bold text-foreground">
              450+
            </Text>
            <Text className="mb-3 text-center text-base font-medium text-accent">
              Reciprocal Clubs Worldwide
            </Text>
            <Text className="text-center text-[15px] leading-[22px] text-muted">
              UGC has a unique list of over 450 reciprocal
              clubs throughout the world where members will be welcomed.
            </Text>
          </View>

          {/* About Section */}
          <View
            className="mb-4 rounded-xl bg-surface p-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="mb-3 text-[17px] font-semibold text-foreground">
              World-Class Clubs
            </Text>
            <Text className="text-[15px] leading-6 text-muted">
              Many of our reciprocal clubs are renowned as being amongst the
              very finest private members' clubs in the world. As a City
              UGC member, you have access to an exclusive global
              network.
            </Text>
          </View>

          {/* Available Facilities */}
          <View
            className="mb-4 rounded-xl bg-surface p-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="mb-4 text-[17px] font-semibold text-foreground">
              Available Facilities
            </Text>
            <Text className="mb-4 text-sm leading-[22px] text-muted">
              Many reciprocal clubs offer accommodation and a number possess
              excellent facilities including:
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {FACILITIES.map((facility) => (
                <View
                  className="flex-row items-center gap-1.5 rounded-full bg-primary/10 px-3 py-2"
                  key={facility.label}
                >
                  <Ionicons color={foreground} name={facility.icon} size={16} />
                  <Text className="text-[13px] font-medium text-foreground">
                    {facility.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Authentication-based content */}
          {isAuthenticated ? (
            // Authenticated: Show full access coming soon
            <View className="mb-4 items-center rounded-xl bg-accent p-6">
              <Ionicons
                color={foreground}
                name="checkmark-circle"
                size={48}
                style={{ marginBottom: 12 }}
              />
              <Text className="mb-2 text-center text-lg font-semibold text-foreground">
                Member Access
              </Text>
              <Text className="text-center text-[15px] leading-[22px] text-foreground opacity-[0.85]">
                Full reciprocal clubs directory coming soon. In the meantime,
                you can view the complete list on our website.
              </Text>
              <View className="mt-4">
                <ExternalLinkButton
                  label="View Members' Area"
                  url="https://ugc.com/copy-of-reciprocal-clubs"
                  variant="primary"
                />
              </View>
            </View>
          ) : (
            // Not authenticated: Show sign in prompt
            <View className="mb-4 items-center rounded-xl border-2 border-dashed border-accent bg-surface p-6">
              <Ionicons
                color={foreground}
                name="lock-closed-outline"
                size={40}
                style={{ marginBottom: 12 }}
              />
              <Text className="mb-2 text-center text-[17px] font-semibold text-foreground">
                Members Only
              </Text>
              <Text className="mb-4 text-center text-sm leading-[22px] text-muted">
                Sign in to access the full directory of reciprocal clubs and
                view detailed information about each club's facilities and
                booking process.
              </Text>
              <Pressable
                className="flex-row items-center gap-2 rounded-lg bg-primary px-8 py-3.5"
                onPress={handleSignIn}
              >
                <Ionicons
                  color={primaryForeground}
                  name="log-in-outline"
                  size={20}
                />
                <Text className="text-[15px] font-semibold text-primary-foreground">
                  Sign In to Access Full Details
                </Text>
              </Pressable>
            </View>
          )}

          {/* Featured Clubs Preview */}
          <View
            className="mb-4 rounded-xl bg-surface p-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="mb-4 text-[17px] font-semibold text-foreground">
              Featured Partner Clubs
            </Text>
            {FEATURED_CLUBS.map((club, index) => (
              <View
                className="flex-row items-center border-border py-3"
                key={club.name}
                style={{
                  borderBottomWidth: index < FEATURED_CLUBS.length - 1 ? 1 : 0,
                }}
              >
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-accent/30">
                  <Ionicons color={foreground} name={club.icon} size={20} />
                </View>
                <View className="flex-1">
                  <Text className="text-[15px] font-medium text-foreground">
                    {club.name}
                  </Text>
                  <Text className="mt-0.5 text-[13px] text-muted">
                    {club.location}
                  </Text>
                </View>
              </View>
            ))}
            <Text className="mt-3 text-center text-xs italic text-muted">
              ...and 446+ more clubs worldwide
            </Text>
          </View>

          {/* Contact for Assistance */}
          <View className="items-center rounded-xl bg-primary p-5">
            <Text className="mb-2 text-[15px] font-semibold text-primary-foreground">
              Need Assistance?
            </Text>
            <Text className="mb-3 text-center text-sm text-primary-foreground opacity-90">
              Contact the club for help with reciprocal club bookings
            </Text>
            <Pressable
              className="flex-row items-center gap-2 rounded-lg bg-accent px-5 py-3"
              onPress={() => Linking.openURL("tel:02071676682")}
            >
              <Ionicons color={foreground} name="call" size={18} />
              <Text className="text-sm font-semibold text-foreground">
                020 7167 6682
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
