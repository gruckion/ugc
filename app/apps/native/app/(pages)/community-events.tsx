import { Text, View } from "react-native";

export default function CommunityEventsPage() {
	return (
		<View className="flex-1 justify-center items-center p-6 bg-background">
			<Text className="text-2xl font-semibold mb-2 text-foreground">Events</Text>
			<Text className="text-base text-muted text-center">
				View upcoming and past events on the web version.
			</Text>
		</View>
	);
}
