import { Text, View } from "react-native";

export default function BlogPage() {
	return (
		<View className="flex-1 justify-center items-center p-6 bg-background">
			<Text className="text-2xl font-semibold mb-2 text-foreground">Blog</Text>
			<Text className="text-base text-muted text-center">
				Read our latest articles and insights on the web version.
			</Text>
		</View>
	);
}
