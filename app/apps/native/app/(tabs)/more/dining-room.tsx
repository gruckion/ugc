import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Dining room image from the UGC website
const DINING_ROOM_IMAGE =
  "https://static.wixstatic.com/media/5e0aaa_89c287ebeaca49b398ec7c86b8397a0f~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/5e0aaa_89c287ebeaca49b398ec7c86b8397a0f~mv2.webp";

export default function DiningRoom() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Theme colors for Ionicons (which don't support className)
  const foreground = useThemeColor("foreground");
  const accent = useThemeColor("accent");
  const primaryForeground = "#FFFFFF";

  const handleCall = () => {
    Linking.openURL("tel:02071676682");
  };

  const handleEmail = () => {
    Linking.openURL("mailto:contact@ugc.com");
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View
        className="bg-primary px-5 pb-5"
        style={{
          paddingTop: insets.top + 8,
        }}
      >
        <View className="flex-row items-center gap-3">
          <Pressable
            className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons color={primaryForeground} name="arrow-back" size={22} />
          </Pressable>
          <View className="flex-1">
            <Text
              className="text-primary-foreground text-2xl font-light"
              style={{
                fontFamily: "serif",
              }}
            >
              Dining Room
            </Text>
            <Text
              className="text-accent text-[13px] mt-0.5"
            >
              A quiet haven in the heart of the City
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Hero Image */}
        <Image
          cachePolicy="memory-disk"
          contentFit="cover"
          className="w-full h-[220px]"
          source={{ uri: DINING_ROOM_IMAGE }}
        />

        {/* Description Section */}
        <View className="p-4">
          <View
            className="bg-surface rounded-xl p-5 mb-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text
              className="text-foreground text-lg font-semibold mb-3"
            >
              About Our Dining Rooms
            </Text>
            <Text
              className="text-muted text-[15px] leading-6"
            >
              The dining rooms are a quiet haven in the heart of the City of
              London for members and their guests, offering excellent food and
              superb service.
            </Text>
            <Text
              className="text-muted text-[15px] leading-6 mt-3"
            >
              The welfare and happiness of our members and their guests is of
              paramount importance, so we will always try to cater for
              individual needs wherever possible.
            </Text>
          </View>

          {/* Opening Hours */}
          <View
            className="bg-primary rounded-xl p-5 mb-4"
          >
            <View
              className="flex-row items-center gap-2.5 mb-4"
            >
              <Ionicons color={accent} name="time-outline" size={22} />
              <Text
                className="text-primary-foreground text-lg font-semibold"
              >
                Opening Hours
              </Text>
            </View>

            <View className="gap-3">
              <View
                className="flex-row justify-between items-center"
              >
                <Text
                  className="text-primary-foreground text-[15px]"
                >
                  Lunch Service
                </Text>
                <Text className="text-accent text-[15px]">
                  12:00 noon onwards
                </Text>
              </View>
              <View
                className="flex-row justify-between items-center"
              >
                <Text
                  className="text-primary-foreground text-[15px]"
                >
                  Last Orders
                </Text>
                <Text className="text-accent text-[15px]">
                  2:30 PM
                </Text>
              </View>
              <View
                className="h-px bg-white/20 my-1"
              />
              <Text
                className="text-primary-foreground text-[13px] opacity-80 italic"
              >
                Later orders available by prior arrangement with the Secretary
              </Text>
            </View>
          </View>

          {/* Services */}
          <View
            className="bg-surface rounded-xl p-5 mb-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text
              className="text-foreground text-lg font-semibold mb-4"
            >
              Our Services
            </Text>

            <View className="gap-4">
              <ServiceItem
                description="Start your day at the Club"
                foreground={foreground}
                icon="cafe-outline"
                title="Breakfast"
              />
              <ServiceItem
                description="Daily lunch service with seasonal menus"
                foreground={foreground}
                icon="restaurant-outline"
                title="Lunch"
              />
              <ServiceItem
                description="Pre-lunch and post-lunch drinks available"
                foreground={foreground}
                icon="wine-outline"
                title="Bar"
              />
              <ServiceItem
                description="Evening dining for special occasions"
                foreground={foreground}
                icon="moon-outline"
                title="Private Dinners"
              />
              <ServiceItem
                description="Available 7 days a week for breakfast, lunch and dinner"
                foreground={foreground}
                icon="business-outline"
                title="Private Rooms"
              />
              <ServiceItem
                description="Professional spaces for private hire"
                foreground={foreground}
                icon="people-outline"
                title="Meeting Rooms"
              />
            </View>
          </View>

          {/* Booking Information */}
          <View
            className="bg-surface rounded-xl p-5 mb-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text
              className="text-foreground text-lg font-semibold mb-3"
            >
              Make a Reservation
            </Text>
            <Text
              className="text-muted text-[15px] leading-6 mb-4"
            >
              Contact the Secretary to make a reservation or enquire about
              private dining and meeting room hire.
            </Text>

            <View className="flex-row gap-3">
              <Pressable
                className="flex-1 bg-accent rounded-lg p-3.5 flex-row items-center justify-center gap-2"
                onPress={handleCall}
              >
                <Ionicons color={foreground} name="call" size={18} />
                <Text
                  className="text-foreground text-sm font-semibold"
                >
                  Call
                </Text>
              </Pressable>
              <Pressable
                className="flex-1 bg-primary rounded-lg p-3.5 flex-row items-center justify-center gap-2"
                onPress={handleEmail}
              >
                <Ionicons color={primaryForeground} name="mail" size={18} />
                <Text
                  className="text-primary-foreground text-sm font-semibold"
                >
                  Email
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Location Note */}
          <View
            className="bg-accent/15 rounded-xl p-4 flex-row items-center gap-3"
          >
            <Ionicons color={accent} name="location" size={22} />
            <View className="flex-1">
              <Text
                className="text-foreground text-sm font-medium"
              >
                42 Crutched Friars
              </Text>
              <Text
                className="text-muted text-[13px] mt-0.5"
              >
                London EC3N 2AP
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function ServiceItem({
  icon,
  title,
  description,
  foreground,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  foreground: string;
}) {
  return (
    <View className="flex-row items-start gap-3">
      <View
        className="bg-primary/10 w-10 h-10 rounded-full items-center justify-center"
      >
        <Ionicons color={foreground} name={icon} size={20} />
      </View>
      <View className="flex-1">
        <Text
          className="text-foreground text-[15px] font-medium"
        >
          {title}
        </Text>
        <Text
          className="text-muted text-[13px] mt-0.5"
        >
          {description}
        </Text>
      </View>
    </View>
  );
}
