import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";

// Fiverr-style theme colors
const THEME_COLORS = {
	primary: "#1DBF73",
	primaryForeground: "#FFFFFF",
	foreground: "#222325",
	muted: "#62646a",
};

export interface PromoBannerProps {
	heading: string;
	subheading: string;
	ctaText: string;
	ctaHref?: string;
	onCtaPress?: () => void;
	videoSrc: string;
	backgroundColor: string;
	variant?: "default" | "pro";
	badge?: string;
}

export function PromoBanner({
	heading,
	subheading,
	ctaText,
	ctaHref,
	onCtaPress,
	videoSrc,
	backgroundColor,
	variant = "default",
	badge,
}: PromoBannerProps) {
	const { isMobile, isTablet } = useResponsive();
	const isCompact = isMobile || isTablet;

	// Text colors based on variant
	const textColor = variant === "pro" ? THEME_COLORS.foreground : "#FFFFFF";
	const subTextColor = variant === "pro" ? THEME_COLORS.muted : "rgba(255, 255, 255, 0.85)";
	const buttonBg = variant === "pro" ? THEME_COLORS.foreground : "#FFFFFF";
	const buttonTextColor = variant === "pro" ? "#FFFFFF" : THEME_COLORS.foreground;

	const CTAButton = (
		<Pressable
			onPress={onCtaPress}
			style={({ hovered }) => ({
				backgroundColor: buttonBg,
				paddingHorizontal: 32,
				paddingVertical: 16,
				borderRadius: 8,
				opacity: hovered ? 0.9 : 1,
				alignSelf: "flex-start",
			})}
		>
			<Text
				style={{
					fontSize: 16,
					fontWeight: "600",
					color: buttonTextColor,
				}}
			>
				{ctaText}
			</Text>
		</Pressable>
	);

	return (
		<View
			style={{
				paddingVertical: 32,
				paddingHorizontal: 24,
			}}
		>
			<View
				style={{
					maxWidth: 1200,
					marginHorizontal: "auto",
					width: "100%",
					backgroundColor: backgroundColor,
					borderRadius: 24,
					overflow: "hidden",
					flexDirection: isCompact ? "column" : "row",
				}}
			>
				{/* Left Content */}
				<View
					style={{
						flex: isCompact ? undefined : 0.6,
						padding: isCompact ? 32 : 48,
						justifyContent: "center",
					}}
				>
					{/* Badge */}
					{badge && (
						<View style={{ marginBottom: 16 }}>
							<Text
								style={{
									fontSize: 24,
									fontWeight: "700",
									color: textColor,
								}}
							>
								<Text style={{ fontWeight: "800" }}>UGP</Text>
								<Text style={{ fontWeight: "300" }}> pro.</Text>
							</Text>
						</View>
					)}

					{/* Heading */}
					<Text
						style={{
							fontSize: isCompact ? 28 : 36,
							fontWeight: "700",
							color: textColor,
							marginBottom: 16,
							lineHeight: isCompact ? 36 : 44,
						}}
					>
						{heading}
					</Text>

					{/* Subheading */}
					<Text
						style={{
							fontSize: isCompact ? 14 : 16,
							color: subTextColor,
							marginBottom: 24,
							lineHeight: isCompact ? 22 : 26,
							maxWidth: 400,
						}}
					>
						{subheading}
					</Text>

					{/* CTA Button */}
					{ctaHref ? (
						<Link asChild href={ctaHref as any}>
							{CTAButton}
						</Link>
					) : (
						CTAButton
					)}
				</View>

				{/* Right Video */}
				<View
					style={{
						flex: isCompact ? undefined : 0.4,
						minHeight: isCompact ? 200 : 300,
						padding: isCompact ? 16 : 24,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<View
						style={{
							width: "100%",
							maxWidth: 400,
							borderRadius: 16,
							overflow: "hidden",
							aspectRatio: 16 / 10,
						}}
					>
						<video
							autoPlay
							loop
							muted
							playsInline
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
							}}
						>
							<source src={videoSrc} type="video/mp4" />
						</video>
					</View>
				</View>
			</View>
		</View>
	);
}

export default PromoBanner;
