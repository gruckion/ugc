import { Text, View } from "react-native";

export default function ContactPage() {
	return (
		<View className="flex-1 justify-center items-center p-6 bg-background">
			<Text className="text-2xl font-semibold mb-2 text-foreground">Contact Us</Text>
			<Text className="text-base text-muted text-center">
				Get in touch with our team on the web version.
			</Text>
		</View>
	);
}
