import { Text, View } from "react-native";

export default function SuccessStoriesPage() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
			<Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 8 }}>Success Stories</Text>
			<Text style={{ fontSize: 16, color: "#666", textAlign: "center" }}>
				Read creator and brand success stories on the web version.
			</Text>
		</View>
	);
}
