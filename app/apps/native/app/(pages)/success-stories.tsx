import { Text, View } from "react-native";

export default function SuccessStoriesPage() {
	return (
		<View className="flex-1 justify-center items-center p-6 bg-background">
			<Text className="text-2xl font-semibold mb-2 text-foreground">Success Stories</Text>
			<Text className="text-base text-muted text-center">
				Read creator and brand success stories on the web version.
			</Text>
		</View>
	);
}
