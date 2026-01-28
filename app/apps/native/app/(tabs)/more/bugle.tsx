import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useThemeColor } from "heroui-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExternalLinkButton } from "@/components/ExternalLinkButton";
import { cn } from "@/lib/utils";

// The Bugle PDF URL
const BUGLE_PDF_URL =
  "https://ugc.com/_files/newsletter.pdf";

// Past issues (for display purposes)
const PAST_ISSUES = [
  { issue: "Autumn 2025", current: true },
  { issue: "Summer 2025", current: false },
  { issue: "Spring 2025", current: false },
  { issue: "Winter 2024", current: false },
];

export default function Bugle() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Theme colors for Ionicons (which don't support className)
  const foreground = useThemeColor("foreground");
  const accent = useThemeColor("accent");
  const muted = useThemeColor("muted");
  const primaryForeground = "#FFFFFF";

  const handleOpenPDF = async () => {
    await WebBrowser.openBrowserAsync(BUGLE_PDF_URL);
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
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center bg-white/15"
          >
            <Ionicons color={primaryForeground} name="arrow-back" size={24} />
          </Pressable>
          <Text
            className="text-primary-foreground text-2xl font-light"
            style={{
              fontFamily: "serif",
            }}
          >
            The Bugle
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      >
        {/* Hero Section with Icon */}
        <View
          className="bg-surface rounded-2xl p-6 items-center mb-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          {/* Newsletter Icon */}
          <View className="bg-primary/10 w-[100px] h-[100px] rounded-full items-center justify-center mb-5">
            <View className="bg-primary/15 w-[70px] h-[70px] rounded-full items-center justify-center">
              <Ionicons color={foreground} name="newspaper" size={36} />
            </View>
          </View>

          <Text
            className="text-center text-foreground text-[22px] font-light mb-2"
            style={{
              fontFamily: "serif",
            }}
          >
            Club Newsletter
          </Text>

          <Text className="text-center text-muted text-[15px] mb-5 px-2" style={{ lineHeight: 22 }}>
            Stay informed with the latest news, events, and updates from
            UGC. Published quarterly for our members.
          </Text>

          {/* Current Issue Badge */}
          <View className="bg-accent/20 px-4 py-2 rounded-full mb-5">
            <Text className="text-foreground text-sm font-semibold">
              Autumn 2025 Issue Now Available
            </Text>
          </View>

          {/* Read Latest Issue Button */}
          <Pressable
            className="w-full bg-primary rounded-xl py-4 px-8 flex-row items-center justify-center gap-[10px]"
            onPress={handleOpenPDF}
            style={({ pressed }) => ({
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Ionicons
              color={primaryForeground}
              name="document-text"
              size={22}
            />
            <Text className="text-primary-foreground text-base font-semibold">
              Read Latest Issue
            </Text>
          </Pressable>
        </View>

        {/* What's Inside Section */}
        <View
          className="bg-surface rounded-xl p-5 mb-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          <Text className="text-foreground text-base font-semibold mb-4">
            What's Inside The Bugle
          </Text>

          <ContentItem
            accent={accent}
            description="Details on club gatherings and special occasions"
            icon="calendar-outline"
            title="Upcoming Events"
          />
          <ContentItem
            accent={accent}
            description="Updates and achievements from our community"
            icon="people-outline"
            title="Member News"
          />
          <ContentItem
            accent={accent}
            description="New menus and seasonal offerings"
            icon="restaurant-outline"
            title="Dining Updates"
          />
          <ContentItem
            accent={accent}
            description="Fabric Fund progress and renovations"
            icon="construct-outline"
            isLast
            title="Club Improvements"
          />
        </View>

        {/* Past Issues */}
        <View
          className="bg-surface rounded-xl p-5 mb-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          <Text className="text-foreground text-base font-semibold mb-4">
            Recent Issues
          </Text>

          {PAST_ISSUES.map((item, index) => (
            <View
              className="border-border flex-row items-center py-3"
              key={item.issue}
              style={{
                borderBottomWidth: index === PAST_ISSUES.length - 1 ? 0 : 1,
              }}
            >
              <View
                className={cn(item.current ? "bg-accent/20" : "bg-primary/10", "w-9 h-9 rounded-full items-center justify-center mr-3")}
              >
                <Ionicons
                  color={item.current ? accent : muted}
                  name="document-text-outline"
                  size={18}
                />
              </View>
              <Text
                className={cn("flex-1 text-foreground text-[15px]", item.current ? "font-medium" : "font-normal")}
              >
                {item.issue}
              </Text>
              {item.current && (
                <View className="bg-accent px-[10px] py-1 rounded-xl">
                  <Text className="text-surface text-xs font-semibold">
                    Current
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Publication Info */}
        <View className="bg-primary rounded-xl p-5 flex-row items-center">
          <View
            className="w-12 h-12 rounded-full items-center justify-center mr-4 bg-white/15"
          >
            <Ionicons color={primaryForeground} name="time-outline" size={24} />
          </View>
          <View className="flex-1">
            <Text className="text-primary-foreground text-[15px] font-semibold mb-1">
              Published Quarterly
            </Text>
            <Text className="text-accent text-[13px]">
              New issues released in Spring, Summer, Autumn, and Winter
            </Text>
          </View>
        </View>

        {/* Website Link */}
        <View className="mt-5">
          <ExternalLinkButton
            label="View on Website"
            url="https://ugc.com/about-3"
            variant="subtle"
          />
        </View>
      </ScrollView>
    </View>
  );
}

function ContentItem({
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
      className="border-border flex-row items-start py-3"
      style={{
        borderBottomWidth: isLast ? 0 : 1,
      }}
    >
      <View className="bg-accent/20 w-9 h-9 rounded-full items-center justify-center mr-3">
        <Ionicons color={accent} name={icon} size={18} />
      </View>
      <View className="flex-1">
        <Text className="text-foreground text-[15px] font-medium mb-[2px]">
          {title}
        </Text>
        <Text className="text-muted text-[13px]">
          {description}
        </Text>
      </View>
    </View>
  );
}
