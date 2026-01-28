import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";

// Theme colors
const THEME_COLORS = {
	foreground: "#222325",
	muted: "#62646a",
	border: "#e4e5e7",
	background: "#FFFFFF",
};

interface Category {
	id: string;
	label: string;
	icon: keyof typeof Ionicons.glyphMap;
	href: string;
}

const CATEGORIES: Category[] = [
	{ id: "lifestyle", label: "Lifestyle", icon: "heart-outline", href: "/browse/creators?category=lifestyle" },
	{ id: "tech", label: "Tech & Gadgets", icon: "phone-portrait-outline", href: "/browse/creators?category=tech" },
	{ id: "beauty", label: "Beauty", icon: "sparkles-outline", href: "/browse/creators?category=beauty" },
	{ id: "food", label: "Food & Beverage", icon: "restaurant-outline", href: "/browse/creators?category=food" },
	{ id: "fitness", label: "Fitness", icon: "barbell-outline", href: "/browse/creators?category=fitness" },
	{ id: "fashion", label: "Fashion", icon: "shirt-outline", href: "/browse/creators?category=fashion" },
	{ id: "travel", label: "Travel", icon: "airplane-outline", href: "/browse/creators?category=travel" },
	{ id: "health", label: "Health & Wellness", icon: "medkit-outline", href: "/browse/creators?category=health" },
	{ id: "home", label: "Home & Living", icon: "home-outline", href: "/browse/creators?category=home" },
];

interface CategoryCardProps {
	category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link asChild href={category.href as any}>
			<Pressable
				// @ts-ignore - Web-specific mouse events
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				style={{
					position: "relative",
					backgroundColor: THEME_COLORS.background,
					borderRadius: 8,
					borderWidth: 1,
					borderColor: THEME_COLORS.border,
					padding: 16,
					minHeight: 120,
					overflow: "hidden",
				}}
			>
				{/* Radial gradient glow on hover */}
				<View
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: isHovered ? 1 : 0,
						// @ts-ignore - Web-specific gradient and transition
						background: "radial-gradient(circle at center, rgba(29, 191, 115, 0.12) 0%, rgba(29, 191, 115, 0) 70%)",
						transition: "opacity 0.2s ease-out",
					}}
				/>

				{/* Icon at top-left */}
				<View style={{ marginBottom: 24 }}>
					<Ionicons
						color={THEME_COLORS.foreground}
						name={category.icon}
						size={28}
					/>
				</View>

				{/* Label at bottom-left */}
				<Text
					style={{
						fontSize: 15,
						fontWeight: "500",
						color: THEME_COLORS.foreground,
						lineHeight: 20,
					}}
				>
					{category.label}
				</Text>
			</Pressable>
		</Link>
	);
}

export function CategoryCardsSection() {
	const { isMobile, isTablet } = useResponsive();

	const gap = 16;

	return (
		<View
			style={{
				paddingVertical: 40,
				paddingHorizontal: 24,
				backgroundColor: THEME_COLORS.background,
			}}
		>
			<View
				style={{
					maxWidth: 1200,
					marginHorizontal: "auto",
					width: "100%",
				}}
			>
				{/* Grid layout */}
				<View
					// @ts-ignore - Web-specific CSS grid
					style={{
						display: "grid",
						gridTemplateColumns: isMobile
							? "repeat(2, 1fr)"
							: isTablet
								? "repeat(4, 1fr)"
								: "repeat(9, 1fr)",
						gap: gap,
					}}
				>
					{CATEGORIES.map((category) => (
						<CategoryCard category={category} key={category.id} />
					))}
				</View>
			</View>
		</View>
	);
}

export default CategoryCardsSection;
