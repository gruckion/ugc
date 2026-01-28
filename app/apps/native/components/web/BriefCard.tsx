import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Card } from "heroui-native";
import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";

export interface BriefCardProps {
  /** Brief ID for navigation */
  id: string;
  /** Brief title */
  title: string;
  /** Brand name */
  brandName: string;
  /** Brief description/excerpt */
  description?: string;
  /** Category */
  category: string;
  /** Budget/payment amount */
  budget: number;
  /** Currency symbol */
  currency?: string;
  /** Brief status badge */
  status?: "open" | "in_progress" | "review" | "completed";
  /** Thumbnail image URL */
  thumbnailUrl?: string;
  /** Whether payment is secured */
  paymentSecured?: boolean;
  /** Days until deadline */
  daysRemaining?: number;
  /** Press handler (alternative to href navigation) */
  onPress?: () => void;
}

export function BriefCard({
  id,
  title,
  brandName,
  description,
  category,
  budget,
  currency = "$",
  thumbnailUrl,
  paymentSecured = true,
  daysRemaining,
  onPress,
}: BriefCardProps) {
  const CardContent = ({ hovered = false }: { hovered?: boolean }) => (
    <Card
      className={cn(
        "w-[300px] rounded-xl overflow-hidden bg-background border border-border transition-all",
        hovered ? "shadow-lg -translate-y-1" : "shadow-sm",
      )}
    >
      {/* Thumbnail */}
      {thumbnailUrl ? (
        <Image
          className="w-full h-40"
          contentFit="cover"
          source={{ uri: thumbnailUrl }}
        />
      ) : (
        <View className="w-full h-40 bg-surface-raised items-center justify-center">
          <Ionicons className="text-muted" name="image-outline" size={40} />
        </View>
      )}

      {/* Content */}
      <View className="p-4">
        {/* Category & Payment Badge */}
        <View className="flex-row justify-between items-center mb-3">
          <View className="bg-chip-bg px-2.5 py-1 rounded-xl">
            <Text className="text-xs text-primary font-semibold">{category}</Text>
          </View>
          {paymentSecured && (
            <View className="flex-row items-center gap-1">
              <Ionicons className="text-primary" name="checkmark-circle" size={14} />
              <Text className="text-xs text-primary font-medium">
                Payment Secured
              </Text>
            </View>
          )}
        </View>

        {/* Title */}
        <Text
          className="text-base font-semibold text-foreground mb-1 leading-6"
          numberOfLines={2}
        >
          {title}
        </Text>

        {/* Brand */}
        <Text className="text-sm text-muted mb-2">by {brandName}</Text>

        {/* Description */}
        {description && (
          <Text className="text-sm text-muted mb-3 leading-5" numberOfLines={2}>
            {description}
          </Text>
        )}

        {/* Footer */}
        <View className="flex-row justify-between items-center pt-3 border-t border-border">
          <Text className="text-lg font-bold text-foreground">
            {currency}
            {budget.toLocaleString()}
          </Text>
          {daysRemaining !== undefined && (
            <View className="flex-row items-center gap-1">
              <Ionicons className="text-muted" name="time-outline" size={14} />
              <Text className="text-sm text-muted">{daysRemaining} days left</Text>
            </View>
          )}
        </View>
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
    <Link asChild href={`/browse/briefs/${id}` as any}>
      <Pressable>
        {({ hovered }) => <CardContent hovered={hovered} />}
      </Pressable>
    </Link>
  );
}

export default BriefCard;
