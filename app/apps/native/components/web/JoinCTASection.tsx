import { Pressable, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { useAuthModal } from "@/contexts/auth-modal-context";

// Fiverr-style theme colors
const THEME_COLORS = {
	primaryForeground: "#FFFFFF",
	foreground: "#222325",
};

// CTA background color (dark maroon/burgundy)
const CTA_BACKGROUND = "#4a1942";

export function JoinCTASection() {
	const { isMobile } = useResponsive();
	const { open: openAuthModal } = useAuthModal();

	const handleJoinClick = () => {
		openAuthModal("signup");
	};

	return (
		<View
			style={{
				paddingVertical: 80,
				paddingHorizontal: 24,
				backgroundColor: CTA_BACKGROUND,
			}}
		>
			<View
				style={{
					maxWidth: 800,
					marginHorizontal: "auto",
					width: "100%",
					alignItems: "center",
				}}
			>
				{/* Main Heading */}
				<Text
					style={{
						fontSize: isMobile ? 32 : 48,
						fontWeight: "700",
						color: THEME_COLORS.primaryForeground,
						textAlign: "center",
						marginBottom: 32,
						lineHeight: isMobile ? 40 : 58,
					}}
				>
					Freelance services at your{" "}
					<span
						style={{
							backgroundImage: "linear-gradient(90deg, #ff7b54, #ffb347)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
						}}
					>
						fingertips
					</span>
				</Text>

				{/* Join Button */}
				<Pressable
					onPress={handleJoinClick}
					style={({ hovered }) => ({
						backgroundColor: hovered
							? "rgba(255,255,255,0.9)"
							: THEME_COLORS.primaryForeground,
						paddingHorizontal: 40,
						paddingVertical: 16,
						borderRadius: 8,
						transform: [{ scale: hovered ? 1.02 : 1 }],
					})}
				>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "600",
							color: THEME_COLORS.foreground,
						}}
					>
						Join UGP
					</Text>
				</Pressable>
			</View>
		</View>
	);
}

export default JoinCTASection;
