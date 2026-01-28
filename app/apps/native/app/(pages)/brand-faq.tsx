import { Text, View } from "react-native";

export default function BrandFAQPage() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
			<Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 8 }}>Brand FAQ</Text>
			<Text style={{ fontSize: 16, color: "#666", textAlign: "center" }}>
				Find answers to common brand questions on the web version.
			</Text>
		</View>
	);
}
