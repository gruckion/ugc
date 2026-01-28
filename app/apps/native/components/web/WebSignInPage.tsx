import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { UGCLogo } from "@/components/UGCLogo";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/useResponsive";

interface ValueProp {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const DEFAULT_VALUE_PROPS: ValueProp[] = [
  {
    icon: "checkmark-circle-outline",
    title: "Execution-ready briefs",
    description:
      "Every brief has approved scripts, locked scope, and secured payment before you see it.",
  },
  {
    icon: "shield-checkmark-outline",
    title: "Payment protection",
    description:
      "Full payment secured in escrow before work begins. Auto-release if brands go silent.",
  },
  {
    icon: "star-outline",
    title: "Build your reputation",
    description:
      "Trust scores based on real behavior, not just reviews. Quality over price.",
  },
];

export interface WebSignInPageProps {
  /** Content for the right panel (form) */
  children: React.ReactNode;
  /** Value propositions for left panel */
  valueProps?: ValueProp[];
  /** Title shown in the left panel */
  leftPanelTitle?: string;
}

export function WebSignInPage({
  children,
  valueProps = DEFAULT_VALUE_PROPS,
  leftPanelTitle = "Success starts here",
}: WebSignInPageProps) {
  const { isMobile, isTablet } = useResponsive();
  const showSplitLayout = !(isMobile || isTablet);

  return (
    <View className="flex-1 flex-row">
      {/* Left Panel - Value Props (Desktop Only) */}
      {showSplitLayout && (
        <View
          className="flex-1 p-12 justify-center bg-primary"
        >
          <View className="max-w-[480px]">
            {/* Logo */}
            <View className="mb-12">
              <UGCLogo
                bgClassName="bg-white"
                size={48}
                textClassName="text-primary"
              />
            </View>

            {/* Title */}
            <Text
              className="text-[40px] font-bold mb-8 leading-[48px] text-primary-foreground"
            >
              {leftPanelTitle}
            </Text>

            {/* Value Props */}
            <View className="gap-6">
              {valueProps.map((prop) => (
                <View
                  key={prop.title}
                  className="flex-row gap-4 items-start"
                >
                  <Ionicons
                    className="text-primary-foreground"
                    name={prop.icon}
                    size={24}
                  />
                  <View className="flex-1">
                    <Text
                      className="text-base font-semibold mb-1 text-primary-foreground"
                    >
                      {prop.title}
                    </Text>
                    <Text
                      className="text-sm leading-5 text-primary-foreground/85"
                    >
                      {prop.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Right Panel - Form */}
      <View
        className="flex-1 bg-background"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: isMobile ? 24 : 48,
          }}
        >
          {/* Back to Home Link (Mobile/Tablet) */}
          <View className="mb-8">
            <Link asChild href="/">
              <Pressable className="flex-row items-center gap-2">
                {({ hovered }) => (
                  <>
                    <Ionicons
                      className={cn(
                        hovered ? "text-primary" : "text-muted",
                      )}
                      name="arrow-back"
                      size={20}
                    />
                    <Text
                      className={cn(
                        "text-sm",
                        hovered ? "text-primary" : "text-muted",
                      )}
                    >
                      Back to home
                    </Text>
                  </>
                )}
              </Pressable>
            </Link>
          </View>

          {/* Mobile Logo */}
          {!showSplitLayout && (
            <View className="items-center mb-8">
              <UGCLogo size={56} />
            </View>
          )}

          {/* Form Content */}
          <View className="max-w-[400px] w-full self-center">
            {children}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default WebSignInPage;
