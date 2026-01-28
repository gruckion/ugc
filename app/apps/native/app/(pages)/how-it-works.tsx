import { Text, View } from "react-native";

export default function HowItWorksPage() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
			<Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 8 }}>How It Works</Text>
			<Text style={{ fontSize: 16, color: "#666", textAlign: "center" }}>
				Discover how our platform works on the web version.
			</Text>
		</View>
	);
}
