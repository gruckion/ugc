import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";

const VALUE_PROPS = [
  {
    icon: "checkmark-circle-outline" as const,
    title: "Execution-ready briefs",
    description:
      "Approved scripts, locked scope, and secured payment before you see it.",
  },
  {
    icon: "shield-checkmark-outline" as const,
    title: "Payment protection",
    description:
      "Full payment in escrow before work begins. Auto-release if brands go silent.",
  },
  {
    icon: "star-outline" as const,
    title: "Build your reputation",
    description:
      "Trust scores based on real behavior, not just reviews.",
  },
];

export function AuthModalLeftPanel() {
  return (
    <View className="w-[400px] overflow-hidden">
      {/* Background Image - absolute positioned behind content */}
      <Image
        resizeMode="cover"
        source={require("@/assets/images/auth.png")}
        className="absolute inset-0 h-full w-[400px] bg-[#883748]"
        style={{
          width: 400,
          height: "100%",
        }}
      />

      {/* Gradient overlay - fades from transparent to dark at bottom */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        locations={[0.2, 1]}
        className="absolute inset-0 z-[1]"
        style={{ width: 400, height: "100%" }}
      />

      {/* Content pushed to bottom */}
      <View className="z-[2] flex-1 justify-end p-10">
        {/* Value Props */}
        <View className="gap-5">
          {VALUE_PROPS.map((prop) => (
            <View
              key={prop.title}
              className="flex-row gap-3"
            >
              <Ionicons
                className="mt-0.5 text-white"
                name={prop.icon}
                size={24}
              />
              <View className="flex-1">
                <Text
                  className="mb-1 text-base font-bold text-white"
                >
                  {prop.title}
                </Text>
                <Text
                  className="text-sm font-normal leading-5 text-white/90"
                >
                  {prop.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default AuthModalLeftPanel;
