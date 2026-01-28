import { Text, View } from "react-native";

export default function CreatorFAQPage() {
	return (
		<View className="flex-1 justify-center items-center p-6 bg-background">
			<Text className="text-2xl font-semibold mb-2 text-foreground">Creator FAQ</Text>
			<Text className="text-base text-muted text-center">
				Find answers to common creator questions on the web version.
			</Text>
		</View>
	);
}
