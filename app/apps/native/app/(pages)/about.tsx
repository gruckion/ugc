import { Text, View } from "react-native";

export default function AboutPage() {
	return (
		<View className="flex-1 justify-center items-center p-6 bg-background">
			<Text className="text-2xl font-semibold mb-2 text-foreground">About</Text>
			<Text className="text-base text-muted text-center">
				Learn more about our platform on the web version.
			</Text>
		</View>
	);
}
