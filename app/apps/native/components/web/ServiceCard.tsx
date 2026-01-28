import { Link } from "expo-router";
import { Card } from "heroui-native";
import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  name: string;
  imageUrl: string;
  href: string;
}

export function ServiceCard({ name, imageUrl, href }: ServiceCardProps) {
  return (
    <Link asChild href={href as any}>
      <Pressable>
        {({ hovered }) => (
          <Card
            className={cn(
              "p-0 w-[200px] rounded-xl overflow-hidden transition-all",
              hovered ? "shadow-lg scale-[1.02]" : "shadow-md",
            )}
          >
            {/* Header Section */}
            <View className="bg-green-900 py-5 px-4 min-h-20 justify-end">
              <Text
                className="text-lg font-semibold text-white leading-6"
                numberOfLines={2}
              >
                {name}
              </Text>
            </View>

            {/* Image Section */}
            <View className="h-[200px] bg-surface-raised">
              <img
                alt={name}
                src={imageUrl}
                className="w-full h-full object-cover"
              />
            </View>
          </Card>
        )}
      </Pressable>
    </Link>
  );
}

export default ServiceCard;
