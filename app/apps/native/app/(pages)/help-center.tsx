import { Text, View } from "react-native";

export default function HelpCenterPage() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
			<Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 8 }}>Help Center</Text>
			<Text style={{ fontSize: 16, color: "#666", textAlign: "center" }}>
				Browse help topics and find answers on the web version.
			</Text>
		</View>
	);
}
