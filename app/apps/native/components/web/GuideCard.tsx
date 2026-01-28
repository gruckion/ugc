import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

// Fiverr-style theme colors
const THEME_COLORS = {
	primary: "#1DBF73",
	primaryForeground: "#FFFFFF",
	foreground: "#222325",
	muted: "#62646a",
	background: "#FFFFFF",
};

// Category color mappings
const CATEGORY_COLORS: Record<string, string> = {
	"Writing & Copywriting": "#7B68EE",
	"Graphics & Design": "#FF6B6B",
	"Digital Marketing": "#4ECDC4",
	Data: "#45B7D1",
	Business: "#96CEB4",
	"Music & Audio": "#DDA0DD",
	"Video & Animation": "#F7DC6F",
	"Programming & Tech": "#5DADE2",
	UGC: "#1DBF73",
};

export interface GuideCardProps {
	title: string;
	description: string;
	imageUrl: string;
	category: string;
	href: string;
}

export function GuideCard({
	title,
	description,
	imageUrl,
	category,
	href,
}: GuideCardProps) {
	const categoryColor = CATEGORY_COLORS[category] || THEME_COLORS.primary;

	return (
		<Link asChild href={href as any}>
			<Pressable
				style={({ hovered }) => ({
					backgroundColor: THEME_COLORS.background,
					borderRadius: 12,
					overflow: "hidden",
					shadowColor: "#000",
					shadowOffset: { width: 0, height: hovered ? 8 : 2 },
					shadowOpacity: hovered ? 0.12 : 0.06,
					shadowRadius: hovered ? 16 : 8,
					transform: [{ translateY: hovered ? -4 : 0 }],
				})}
			>
				{/* Image Section */}
				<View
					style={{
						height: 160,
						backgroundColor: "#f0f0f0",
						overflow: "hidden",
					}}
				>
					<img
						alt={title}
						src={imageUrl}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</View>

				{/* Content Section */}
				<View style={{ padding: 16 }}>
					{/* Category Badge */}
					<View
						style={{
							backgroundColor: categoryColor,
							paddingHorizontal: 10,
							paddingVertical: 4,
							borderRadius: 4,
							alignSelf: "flex-start",
							marginBottom: 12,
						}}
					>
						<Text
							style={{
								fontSize: 11,
								fontWeight: "600",
								color: THEME_COLORS.primaryForeground,
								textTransform: "uppercase",
								letterSpacing: 0.5,
							}}
						>
							{category}
						</Text>
					</View>

					{/* Title */}
					<Text
						numberOfLines={1}
						style={{
							fontSize: 16,
							fontWeight: "700",
							color: THEME_COLORS.foreground,
							marginBottom: 8,
							lineHeight: 22,
						}}
					>
						{title}
					</Text>

					{/* Description */}
					<Text
						numberOfLines={2}
						style={{
							fontSize: 14,
							color: THEME_COLORS.muted,
							lineHeight: 20,
						}}
					>
						{description}
					</Text>
				</View>
			</Pressable>
		</Link>
	);
}

export default GuideCard;
