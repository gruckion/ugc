import { Text, View } from "react-native";

export default function HelpCenterPage() {
	return (
		<View className="flex-1 justify-center items-center p-6 bg-background">
			<Text className="text-2xl font-semibold mb-2 text-foreground">Help Center</Text>
			<Text className="text-base text-muted text-center">
				Browse help topics and find answers on the web version.
			</Text>
		</View>
	);
}
