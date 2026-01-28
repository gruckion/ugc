import { Text, View } from "react-native";

// Native fallback for guides page
export default function GuidesPage() {
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				padding: 24,
			}}
		>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "700",
					color: "#222325",
					marginBottom: 12,
					textAlign: "center",
				}}
			>
				Creator Guides
			</Text>
			<Text
				style={{
					fontSize: 16,
					color: "#62646a",
					textAlign: "center",
				}}
			>
				Guides are available on the web version. Visit ugp.com/guides to
				explore our creator resources.
			</Text>
		</View>
	);
}
