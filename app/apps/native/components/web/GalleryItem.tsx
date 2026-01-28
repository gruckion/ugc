import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

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
			className="relative w-full rounded-xl overflow-hidden mb-4"
		>
			{/* Image Container with aspect ratio */}
			<View
				className="relative w-full"
				// @ts-expect-error - Web-specific percentage padding for aspect ratio
				style={{
					...getAspectRatioStyle(),
				}}
			>
				<img
					alt={`${category} by ${creatorName}`}
					loading="lazy"
					src={imageUrl}
					className="absolute top-0 left-0 w-full h-full object-cover"
				/>

				{/* Hover Overlay */}
				<View
					className="absolute top-0 left-0 right-0 bottom-0"
					style={{
						opacity: isHovered ? 1 : 0,
						// @ts-ignore - Web-specific transition
						transition: "opacity 0.2s ease-in-out",
					}}
				>
					{/* Gradient Overlay */}
					<View
						className="absolute top-0 left-0 right-0 bottom-0"
						style={{
							// @ts-expect-error - Web-specific gradient property
							background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)",
						}}
					/>

					{/* Save to List Button - Top Right */}
					<Pressable
						onPress={onSave}
						className="absolute top-3 right-3 w-10 h-10 rounded-full items-center justify-center"
						style={({ hovered }) => ({
							backgroundColor: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.2,
							shadowRadius: 4,
						})}
					>
						<Ionicons
							className="text-foreground"
							name="heart-outline"
							size={20}
						/>
					</Pressable>

					{/* Menu Button - Bottom Right */}
					<Pressable
						onPress={onMenuPress}
						className="absolute bottom-3 right-3 w-9 h-9 rounded-full items-center justify-center"
						style={({ hovered }) => ({
							backgroundColor: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
						})}
					>
						<Ionicons
							className="text-foreground"
							name="ellipsis-horizontal"
							size={18}
						/>
					</Pressable>

					{/* Featured In Text - Bottom Left */}
					<View
						className="absolute bottom-3 left-3 right-[60px]"
					>
						<Text
							className="text-sm font-medium text-white"
							style={{
								textShadowColor: "rgba(0, 0, 0, 0.5)",
								textShadowOffset: { width: 0, height: 1 },
								textShadowRadius: 2,
							}}
						>
							Featured in: {category}
						</Text>
						<Text
							className="text-[13px] mt-1"
							style={{
								color: "rgba(255, 255, 255, 0.8)",
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
