import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

// Fiverr-style theme colors
const THEME_COLORS = {
	primary: "#1DBF73",
	primaryForeground: "#FFFFFF",
	foreground: "#222325",
	muted: "#62646a",
};

export interface GalleryItemProps {
	imageUrl: string;
	category: string;
	creatorName: string;
	aspectRatio?: "portrait" | "landscape" | "square";
	onSave?: () => void;
	onMenuPress?: () => void;
}

export function GalleryItem({
	imageUrl,
	category,
	creatorName,
	aspectRatio = "square",
	onSave,
	onMenuPress,
}: GalleryItemProps) {
	const [isHovered, setIsHovered] = useState(false);

	// Calculate height based on aspect ratio
	const getAspectRatioStyle = () => {
		switch (aspectRatio) {
			case "portrait":
				return { paddingBottom: "133%" }; // 3:4 ratio
			case "landscape":
				return { paddingBottom: "75%" }; // 4:3 ratio
			case "square":
			default:
				return { paddingBottom: "100%" }; // 1:1 ratio
		}
	};

	return (
		<View
			// @ts-ignore - Web-specific events
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				position: "relative",
				width: "100%",
				borderRadius: 12,
				overflow: "hidden",
				marginBottom: 16,
			}}
		>
			{/* Image Container with aspect ratio */}
			<View
				// @ts-ignore - Web-specific percentage padding
				style={{
					position: "relative",
					width: "100%",
					...getAspectRatioStyle(),
				}}
			>
				<img
					alt={`${category} by ${creatorName}`}
					loading="lazy"
					src={imageUrl}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
				/>

				{/* Hover Overlay */}
				<View
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: isHovered ? 1 : 0,
						// @ts-ignore - Web-specific transition
						transition: "opacity 0.2s ease-in-out",
					}}
				>
					{/* Gradient Overlay */}
					<View
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							// @ts-expect-error - Web-specific gradient property
							background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)",
						}}
					/>

					{/* Save to List Button - Top Right */}
					<Pressable
						onPress={onSave}
						style={({ hovered }) => ({
							position: "absolute",
							top: 12,
							right: 12,
							width: 40,
							height: 40,
							borderRadius: 20,
							backgroundColor: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
							alignItems: "center",
							justifyContent: "center",
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.2,
							shadowRadius: 4,
						})}
					>
						<Ionicons
							color={THEME_COLORS.foreground}
							name="heart-outline"
							size={20}
						/>
					</Pressable>

					{/* Menu Button - Bottom Right */}
					<Pressable
						onPress={onMenuPress}
						style={({ hovered }) => ({
							position: "absolute",
							bottom: 12,
							right: 12,
							width: 36,
							height: 36,
							borderRadius: 18,
							backgroundColor: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
							alignItems: "center",
							justifyContent: "center",
						})}
					>
						<Ionicons
							color={THEME_COLORS.foreground}
							name="ellipsis-horizontal"
							size={18}
						/>
					</Pressable>

					{/* Featured In Text - Bottom Left */}
					<View
						style={{
							position: "absolute",
							bottom: 12,
							left: 12,
							right: 60,
						}}
					>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "500",
								color: THEME_COLORS.primaryForeground,
								textShadowColor: "rgba(0, 0, 0, 0.5)",
								textShadowOffset: { width: 0, height: 1 },
								textShadowRadius: 2,
							}}
						>
							Featured in: {category}
						</Text>
						<Text
							style={{
								fontSize: 13,
								color: "rgba(255, 255, 255, 0.8)",
								marginTop: 4,
								textShadowColor: "rgba(0, 0, 0, 0.5)",
								textShadowOffset: { width: 0, height: 1 },
								textShadowRadius: 2,
							}}
						>
							by: {creatorName}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default GalleryItem;
