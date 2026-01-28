import { Text, View } from "react-native";

/**
 * A small pill/badge component that indicates the last used login method.
 * Styled similar to Vercel's "Last Used" indicator.
 */
export function LastUsedIndicator() {
	return (
		<View className="bg-primary px-2 py-[3px] rounded-[10px] ml-2">
			<Text className="text-primary-foreground text-[10px] font-semibold uppercase tracking-[0.5px]">
				Last Used
			</Text>
		</View>
	);
}
