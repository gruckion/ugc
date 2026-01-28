import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";

export interface CategoryTagProps {
  /** Display label for the tag */
  label: string;
  /** Navigation href */
  href: string;
  /** Optional icon name from Ionicons */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Whether this tag is currently active/selected */
  isActive?: boolean;
  /** Optional onPress handler (if not using href navigation) */
  onPress?: () => void;
  /** Size variant */
  size?: "small" | "medium" | "large";
  /** Color variant - light for dark backgrounds */
  variant?: "default" | "light";
}

export function CategoryTag({
  label,
  href,
  icon,
  isActive = false,
  onPress,
  size = "medium",
  variant = "default",
}: CategoryTagProps) {
  const sizeStyles = {
    small: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      fontSize: 12,
      iconSize: 14,
      gap: 4,
    },
    medium: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      fontSize: 14,
      iconSize: 16,
      gap: 6,
    },
    large: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      fontSize: 16,
      iconSize: 18,
      gap: 8,
    },
  };

  const currentSize = sizeStyles[size];

  const isLight = variant === "light";

  const TagContent = ({ hovered = false }: { hovered?: boolean }) => (
    <View
      className={cn(
        "flex-row items-center rounded-[20px] border",
        isActive || hovered
          ? "bg-primary border-primary"
          : isLight
            ? "bg-white/15 border-white/30"
            : "bg-background border-border"
      )}
      style={{
        gap: currentSize.gap,
        paddingHorizontal: currentSize.paddingHorizontal,
        paddingVertical: currentSize.paddingVertical,
      }}
    >
      {icon && (
        <Ionicons
          className={cn(
            isActive || hovered
              ? "text-primary-foreground"
              : isLight
                ? "text-white/80"
                : "text-muted"
          )}
          name={icon}
          size={currentSize.iconSize}
        />
      )}
      <Text
        className={cn(
          "font-medium",
          isActive || hovered
            ? "text-primary-foreground"
            : isLight
              ? "text-white"
              : "text-foreground"
        )}
        style={{
          fontSize: currentSize.fontSize,
        }}
      >
        {label}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {({ hovered }) => <TagContent hovered={hovered} />}
      </Pressable>
    );
  }

  return (
    <Link asChild href={href as any}>
      <Pressable>{({ hovered }) => <TagContent hovered={hovered} />}</Pressable>
    </Link>
  );
}

export default CategoryTag;
