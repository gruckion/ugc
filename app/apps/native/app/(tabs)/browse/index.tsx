import { Text, View } from "react-native";

export default function BrowsePage() {
  return (
    <View className="flex-1 justify-center items-center p-6 bg-background">
      <Text className="text-2xl font-semibold mb-2 text-foreground">Browse</Text>
      <Text className="text-base text-muted text-center">
        Browse creators and briefs on the web version.
      </Text>
    </View>
  );
}
