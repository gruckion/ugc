import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, Text } from "react-native";

interface ExternalLinkButtonProps {
  label: string;
  url: string;
  variant?: "primary" | "subtle";
}

export function ExternalLinkButton({
  label,
  url,
  variant = "primary",
}: ExternalLinkButtonProps) {
  const handlePress = () => {
    Linking.openURL(url);
  };

  if (variant === "subtle") {
    return (
      <Pressable
        className="flex-row items-center justify-center py-4 gap-1.5"
        onPress={handlePress}
        style={({ pressed }) => ({
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <Text className="text-foreground text-sm font-medium">
          {label}
        </Text>
        <Ionicons className="text-foreground" name="open-outline" size={16} />
      </Pressable>
    );
  }

  return (
    <Pressable
      className="bg-primary py-4 px-6 rounded-lg flex-row items-center justify-center gap-2"
      onPress={handlePress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Text className="text-primary-foreground text-base font-medium">
        {label}
      </Text>
      <Ionicons className="text-primary-foreground" name="open-outline" size={18} />
    </Pressable>
  );
}
