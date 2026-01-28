import { Text, View } from "react-native";

// Native fallback for guides page
export default function GuidesPage() {
	return (
		<View className="flex-1 items-center justify-center p-6 bg-background">
			<Text className="text-2xl font-bold text-foreground mb-3 text-center">
				Creator Guides
			</Text>
			<Text className="text-base text-muted text-center">
				Guides are available on the web version. Visit ugp.com/guides to
				explore our creator resources.
			</Text>
		</View>
	);
}
