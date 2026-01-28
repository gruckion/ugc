import { Link } from "expo-router";
import { Card } from "heroui-native";
import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";

// Category color mappings (dynamic colors require inline style)
const CATEGORY_COLORS: Record<string, string> = {
  "Writing & Copywriting": "#7B68EE",
  "Graphics & Design": "#FF6B6B",
  "Digital Marketing": "#4ECDC4",
  Data: "#45B7D1",
  Business: "#96CEB4",
  "Music & Audio": "#DDA0DD",
  "Video & Animation": "#F7DC6F",
  "Programming & Tech": "#5DADE2",
  UGC: "#1DBF73",
};

export interface GuideCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  href: string;
}

export function GuideCard({
  title,
  description,
  imageUrl,
  category,
  href,
}: GuideCardProps) {
  const categoryColor = CATEGORY_COLORS[category] || "#1DBF73";

  return (
    <Link asChild href={href as any}>
      <Pressable>
        {({ hovered }) => (
          <Card
            className={cn(
              "rounded-xl overflow-hidden bg-background transition-all",
              hovered ? "shadow-lg -translate-y-1" : "shadow-sm",
            )}
          >
            {/* Image Section */}
            <View className="h-40 bg-surface-raised overflow-hidden">
              <img
                alt={title}
                className="w-full h-full object-cover"
                src={imageUrl}
              />
            </View>

            {/* Content Section */}
            <View className="p-4">
              {/* Category Badge - uses dynamic color */}
              <View
                className="px-2.5 py-1 rounded self-start mb-3"
                style={{ backgroundColor: categoryColor }}
              >
                <Text className="text-xs font-semibold text-white uppercase tracking-wide">
                  {category}
                </Text>
              </View>

              {/* Title */}
              <Text
                className="text-base font-bold text-foreground mb-2 leading-6"
                numberOfLines={1}
              >
                {title}
              </Text>

              {/* Description */}
              <Text className="text-sm text-muted leading-5" numberOfLines={2}>
                {description}
              </Text>
            </View>
          </Card>
        )}
      </Pressable>
    </Link>
  );
}

export default GuideCard;
