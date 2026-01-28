import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

// Fiverr-style theme colors
const THEME_COLORS = {
	primary: "#1DBF73",
	primaryForeground: "#FFFFFF",
	foreground: "#222325",
	muted: "#62646a",
	border: "#e4e5e7",
	background: "#FFFFFF",
	cardHeader: "#1a5c38",
};

export interface ServiceCardProps {
	name: string;
	imageUrl: string;
	href: string;
}

export function ServiceCard({ name, imageUrl, href }: ServiceCardProps) {
	return (
		<Link asChild href={href as any}>
			<Pressable
				style={({ hovered }) => ({
					width: 200,
					borderRadius: 12,
					overflow: "hidden",
					shadowColor: "#000",
					shadowOffset: { width: 0, height: hovered ? 8 : 4 },
					shadowOpacity: hovered ? 0.15 : 0.08,
					shadowRadius: hovered ? 16 : 8,
					transform: [{ scale: hovered ? 1.02 : 1 }],
					backgroundColor: THEME_COLORS.background,
				})}
			>
				{/* Header Section */}
				<View
					style={{
						backgroundColor: THEME_COLORS.cardHeader,
						paddingVertical: 20,
						paddingHorizontal: 16,
						minHeight: 80,
						justifyContent: "flex-end",
						borderTopLeftRadius: 12,
						borderTopRightRadius: 12,
					}}
				>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "600",
							color: THEME_COLORS.primaryForeground,
							lineHeight: 24,
						}}
						numberOfLines={2}
					>
						{name}
					</Text>
				</View>

				{/* Image Section */}
				<View
					style={{
						height: 200,
						backgroundColor: "#f0f0f0",
						borderBottomLeftRadius: 12,
						borderBottomRightRadius: 12,
						overflow: "hidden",
					}}
				>
					<img
						alt={name}
						src={imageUrl}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</View>
			</Pressable>
		</Link>
	);
}

export default ServiceCard;
