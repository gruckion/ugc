import { Link } from "expo-router";
import { Card } from "heroui-native";
import { Pressable, Text, View } from "react-native";

// Theme colors are now defined in global.css and accessed via Tailwind classes

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
            className={`p-0 w-[200px] rounded-xl overflow-hidden ${
              hovered ? "shadow-lg scale-[1.02]" : "shadow-md"
            } transition-all`}
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
            <View className="h-[200px] bg-gray-100">
              <img
                alt={name}
                src={imageUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </View>
          </Card>
        )}
      </Pressable>
    </Link>
  );
}

export default ServiceCard;
