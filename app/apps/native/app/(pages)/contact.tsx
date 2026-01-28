import { Text, View } from "react-native";

export default function ContactPage() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
			<Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 8 }}>Contact Us</Text>
			<Text style={{ fontSize: 16, color: "#666", textAlign: "center" }}>
				Get in touch with our team on the web version.
			</Text>
		</View>
	);
}
