import { Text, View } from "react-native";

export default function HowItWorksPage() {
	return (
		<View className="flex-1 justify-center items-center p-6 bg-background">
			<Text className="text-2xl font-semibold mb-2 text-foreground">How It Works</Text>
			<Text className="text-base text-muted text-center">
				Discover how our platform works on the web version.
			</Text>
		</View>
	);
}
