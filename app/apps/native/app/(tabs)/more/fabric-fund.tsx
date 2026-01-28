import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExternalLinkButton } from "@/components/ExternalLinkButton";

// Image from the Fabric Fund page
const FABRIC_FUND_IMAGE =
  "https://static.wixstatic.com/media/5e0aaa_a4f22f2a2cc743e5bb27e7cce56a0327~mv2.jpg/v1/fill/w_600,h_800,al_c,q_85,enc_avif,quality_auto/5e0aaa_a4f22f2a2cc743e5bb27e7cce56a0327~mv2.jpg";

export default function FabricFund() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Theme colors for Ionicons (which don't support className)
  const foreground = useThemeColor("foreground");
  const accent = useThemeColor("accent");
  const primaryForeground = "#FFFFFF";

  const handleDonate = () => {
    Linking.openURL(
      "mailto:contact@ugc.com?subject=Fabric%20Fund%20Donation"
    );
  };

  const handleCall = () => {
    Linking.openURL("tel:02078636681");
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View
        className="bg-primary px-4 pb-4"
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
          <Text className="font-light font-serif text-xl text-primary-foreground">
            Fabric Fund
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        {/* Hero Image */}
        <Image
          cachePolicy="memory-disk"
          contentFit="cover"
          source={{ uri: FABRIC_FUND_IMAGE }}
          style={{
            width: "100%",
            height: 240,
          }}
        />

        {/* Main Content */}
        <View className="p-4">
          {/* Title Card */}
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
            <Text className="mb-2 font-light font-serif text-2xl text-foreground">
              The UGC Fabric Fund
            </Text>
            <Text className="text-base italic text-accent">
              Looking forward to the next 125 years
            </Text>
          </View>

          {/* About Section */}
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
            <Text className="mb-3 text-base font-semibold text-foreground">
              About the Fund
            </Text>
            <Text className="mb-3 text-[15px] leading-6 text-muted">
              In January 2018, UGC moved into our new home
              at 42 Crutched Friars, leaving behind our base of over 120 years
              at 50 Cornhill.
            </Text>
            <Text className="mb-3 text-[15px] leading-6 text-muted">
              Since we moved in, the Club has established itself in the local
              area and the Committee has resolved to refurbish and completely
              overhaul the interior of the facilities.
            </Text>
            <Text className="text-[15px] leading-6 text-muted">
              The Committee has established the 'Fabric Fund Committee' to lead
              on fundraising and provide the Club with the resources necessary
              to complete the project and ensure we have a club ready for the
              next 125 years.
            </Text>
          </View>

          {/* Honours Board Section */}
          <View className="mb-4 rounded-xl bg-primary p-5">
            <View className="mb-3 flex-row items-center">
              <Ionicons color={accent} name="ribbon-outline" size={24} />
              <Text className="ml-[10px] text-lg font-semibold text-primary-foreground">
                Members Honour Board
              </Text>
            </View>
            <Text className="mb-4 text-[15px] leading-6 text-primary-foreground">
              Join the Fabric Fund today and make your name known! We are
              inviting members to donate to the Club and, in return, have their
              name featured on a new 'Members Honour Board'.
            </Text>
            <View
              className="items-center rounded-lg p-4 bg-white/15"
            >
              <Text className="mb-1 text-sm font-medium text-accent">
                Contribution Amount
              </Text>
              <Text className="font-light font-serif text-[32px] text-primary-foreground">
                £125.00
              </Text>
              <Text className="mt-1 text-[13px] text-primary-foreground opacity-80">
                Your name and year of membership displayed
              </Text>
            </View>
          </View>

          {/* How to Contribute */}
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
            <Text className="mb-4 text-base font-semibold text-foreground">
              How to Support Your Club
            </Text>

            <ContributionItem
              accent={accent}
              description="Donate £125 to have your name displayed"
              icon="heart-outline"
              title="Join the Honour Board"
            />
            <ContributionItem
              accent={accent}
              description="Support fundraising celebrations"
              icon="calendar-outline"
              title="Attend Club Events"
            />
            <ContributionItem
              accent={accent}
              description="Encourage fellow members to contribute"
              icon="megaphone-outline"
              isLast
              title="Spread the Word"
            />
          </View>

          {/* Contact Card */}
          <View
            className="mb-5 rounded-xl bg-surface p-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="mb-3 text-base font-semibold text-foreground">
              Get in Touch
            </Text>
            <Text className="mb-4 text-sm leading-[22px] text-muted">
              To make a donation or learn more about the Fabric Fund, please
              contact the Club Secretary.
            </Text>

            <Pressable
              className="mb-3 flex-row items-center"
              onPress={handleCall}
            >
              <Ionicons color={accent} name="call-outline" size={18} />
              <Text className="ml-[10px] text-sm text-foreground">
                020 7863 6681
              </Text>
            </Pressable>

            <Pressable
              className="flex-row items-center"
              onPress={handleDonate}
            >
              <Ionicons color={accent} name="mail-outline" size={18} />
              <Text className="ml-[10px] text-sm text-foreground">
                contact@ugc.com
              </Text>
            </Pressable>
          </View>

          {/* Action Buttons */}
          <View className="gap-3">
            <Pressable
              className="bg-accent flex-row items-center justify-center rounded-xl p-[18px]"
              onPress={handleDonate}
              style={({ pressed }) => ({
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <Ionicons color={foreground} name="heart" size={22} />
              <Text className="ml-[10px] text-base font-semibold text-foreground">
                Enquire About Donating
              </Text>
            </Pressable>

            <ExternalLinkButton
              label="Learn More"
              url="https://ugc.com/about-2"
              variant="primary"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function ContributionItem({
  icon,
  title,
  description,
  isLast = false,
  accent,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  isLast?: boolean;
  accent: string;
}) {
  return (
    <View
      className="flex-row items-center border-border py-3"
      style={{
        borderBottomWidth: isLast ? 0 : 1,
      }}
    >
      <View className="mr-[14px] h-10 w-10 items-center justify-center rounded-full bg-accent/20">
        <Ionicons color={accent} name={icon} size={20} />
      </View>
      <View className="flex-1">
        <Text className="text-[15px] font-medium text-foreground">
          {title}
        </Text>
        <Text className="mt-[2px] text-[13px] text-muted">
          {description}
        </Text>
      </View>
    </View>
  );
}
