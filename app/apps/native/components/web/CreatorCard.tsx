import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Card } from "heroui-native";
import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";

/**
 * Generates a deterministic color pair based on a string (e.g., name).
 * Returns accessible background and text colors in the same hue family.
 * The background is a light tint and the text is a darker shade for WCAG compliance.
 */
function getAvatarColors(name: string): { bg: string; text: string } {
  // Simple hash function to get consistent number from string
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }

  // Use hash to pick a hue (0-360)
  const hue = Math.abs(hash) % 360;

  // Return light background (high lightness, low saturation) and dark text (low lightness, medium saturation)
  // This ensures WCAG AA compliance (4.5:1 contrast ratio)
  return {
    bg: `hsl(${hue}, 65%, 90%)`, // Light pastel background
    text: `hsl(${hue}, 70%, 30%)`, // Dark saturated text
  };
}

// Level badge style mappings
const LEVEL_STYLES = {
  new: { bgClass: "bg-chip-muted-bg", textClass: "text-chip-muted-text" },
  rising: { bgClass: "bg-amber-100", textClass: "text-amber-800" },
  established: { bgClass: "bg-blue-100", textClass: "text-blue-800" },
  pro: { bgClass: "bg-green-100", textClass: "text-green-800" },
};

const LEVEL_LABELS = {
  new: "New",
  rising: "Rising",
  established: "Established",
  pro: "Pro",
};

export interface CreatorCardProps {
  /** Creator ID for navigation */
  id: string;
  /** Creator display name */
  name: string;
  /** Profile image URL */
  avatarUrl?: string;
  /** Creator tagline/bio */
  tagline: string;
  /** Creator niches/categories */
  niches: string[];
  /** Trust score (0-100) */
  trustScore?: number;
  /** Experience level */
  level?: "new" | "rising" | "established" | "pro";
  /** Starting rate */
  startingRate?: number;
  /** Currency */
  currency?: string;
  /** Completed briefs count */
  completedBriefs?: number;
  /** Average response time */
  avgResponseTime?: string;
  /** Press handler (alternative to href navigation) */
  onPress?: () => void;
}

export function CreatorCard({
  id,
  name,
  avatarUrl,
  tagline,
  niches,
  trustScore,
  level = "new",
  startingRate,
  currency = "$",
  completedBriefs,
  avgResponseTime,
  onPress,
}: CreatorCardProps) {
  const levelStyles = LEVEL_STYLES[level];
  const levelLabel = LEVEL_LABELS[level];

  const avatarColors = getAvatarColors(name);

  const CardContent = ({ hovered = false }: { hovered?: boolean }) => (
    <Card
      className={cn(
        "w-[300px] p-5 rounded-xl overflow-hidden bg-background border border-border transition-all",
        hovered ? "shadow-lg -translate-y-1" : "shadow-sm",
      )}
    >
      {/* Header with Avatar */}
      <View className="flex-row items-center gap-3 mb-4">
        {/* Avatar */}
        <View className="relative">
          {avatarUrl ? (
            <Image
              className="w-14 h-14 rounded-full"
              contentFit="cover"
              source={{ uri: avatarUrl }}
            />
          ) : (
            <View
              className="w-14 h-14 rounded-full items-center justify-center"
              style={{ backgroundColor: avatarColors.bg }}
            >
              <Text
                className="text-xl font-semibold"
                style={{ color: avatarColors.text }}
              >
                {name.charAt(0)}
              </Text>
            </View>
          )}
          {/* Pro Badge */}
          {level === "pro" && (
            <View className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary items-center justify-center border-2 border-background">
              <Ionicons color="white" name="checkmark" size={12} />
            </View>
          )}
        </View>

        {/* Name & Level */}
        <View className="flex-1 min-w-0">
          <Text className="text-base font-semibold text-foreground mb-1" numberOfLines={1}>
            {name}
          </Text>
          <View className="flex-row items-center gap-2">
            <View className={cn("px-2 py-0.5 rounded-lg", levelStyles.bgClass)}>
              <Text className={cn("text-xs font-semibold", levelStyles.textClass)}>
                {levelLabel}
              </Text>
            </View>
            {trustScore !== undefined && (
              <View className="flex-row items-center gap-1">
                <Ionicons className="text-star" name="star" size={12} />
                <Text className="text-xs text-muted font-medium">{trustScore}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Tagline */}
      <Text className="text-sm text-muted mb-3 leading-5" numberOfLines={2}>
        {tagline}
      </Text>

      {/* Niches */}
      <View className="flex-row flex-wrap gap-1.5 mb-4">
        {niches.slice(0, 3).map((niche) => (
          <View key={niche} className="bg-chip-muted-bg px-2.5 py-1 rounded-xl">
            <Text className="text-xs text-foreground">{niche}</Text>
          </View>
        ))}
      </View>

      {/* Stats */}
      <View className="flex-row justify-between pt-3 border-t border-border">
        {completedBriefs !== undefined && (
          <View className="items-center">
            <Text className="text-base font-semibold text-foreground">
              {completedBriefs}
            </Text>
            <Text className="text-xs text-muted">Completed</Text>
          </View>
        )}
        {avgResponseTime && (
          <View className="items-center">
            <Text className="text-base font-semibold text-foreground">
              {avgResponseTime}
            </Text>
            <Text className="text-xs text-muted">Response</Text>
          </View>
        )}
        {startingRate !== undefined && (
          <View className="items-center">
            <Text className="text-base font-semibold text-foreground">
              {currency}
              {startingRate}
            </Text>
            <Text className="text-xs text-muted">Starting</Text>
          </View>
        )}
      </View>
    </Card>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {({ hovered }) => <CardContent hovered={hovered} />}
      </Pressable>
    );
  }

  return (
    <Link asChild href={`/browse/creators/${id}` as any}>
      <Pressable>
        {({ hovered }) => <CardContent hovered={hovered} />}
      </Pressable>
    </Link>
  );
}

export default CreatorCard;
