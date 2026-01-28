import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { GuideCard } from "./GuideCard";

// Fiverr-style theme colors
const THEME_COLORS = {
	primary: "#1DBF73",
	primaryForeground: "#FFFFFF",
	foreground: "#222325",
	muted: "#62646a",
	background: "#FFFFFF",
};

interface GuideData {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	category: string;
	href: string;
}

const FEATURED_GUIDES: GuideData[] = [
	{
		id: "1",
		title: "How to Create Engaging UGC Videos That Convert",
		description:
			"Learn the secrets behind creating authentic user-generated content that drives sales and builds brand trust.",
		imageUrl:
			"https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
		category: "UGC",
		href: "/guides/ugc-videos-that-convert",
	},
	{
		id: "2",
		title: "Building Your Personal Brand as a Creator",
		description:
			"Discover how to stand out in a crowded marketplace and attract premium clients to your creator business.",
		imageUrl:
			"https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
		category: "Business",
		href: "/guides/personal-brand-creator",
	},
	{
		id: "3",
		title: "Mastering Product Photography for Social Media",
		description:
			"Essential tips and techniques for capturing stunning product shots that perform well on Instagram and TikTok.",
		imageUrl:
			"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
		category: "Graphics & Design",
		href: "/guides/product-photography-social",
	},
];

export function GuidesSection() {
	const { isMobile, isTablet } = useResponsive();

	// Determine number of columns based on screen size
	const getColumnCount = () => {
		if (isMobile) return 1;
		if (isTablet) return 2;
		return 3;
	};

	const columnCount = getColumnCount();

	return (
		<View
			style={{
				paddingVertical: 64,
				paddingHorizontal: 24,
				backgroundColor: "#fafafa",
			}}
		>
			<View
				style={{
					maxWidth: 1200,
					marginHorizontal: "auto",
					width: "100%",
				}}
			>
				{/* Section Header */}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 32,
					}}
				>
					<Text
						style={{
							fontSize: 28,
							fontWeight: "700",
							color: THEME_COLORS.foreground,
						}}
					>
						Guides to help you grow
					</Text>

					<Link asChild href={"/guides" as any}>
						<Pressable
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 4,
							}}
						>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "600",
									color: THEME_COLORS.primary,
								}}
							>
								See more guides
							</Text>
						</Pressable>
					</Link>
				</View>

				{/* Guides Grid */}
				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						gap: 24,
					}}
				>
					{FEATURED_GUIDES.slice(0, columnCount).map((guide) => (
						<View
							key={guide.id}
							style={{
								flex: 1,
								minWidth: isMobile ? "100%" : 280,
								maxWidth: isMobile ? "100%" : `${100 / columnCount - 2}%`,
							}}
						>
							<GuideCard
								category={guide.category}
								description={guide.description}
								href={guide.href}
								imageUrl={guide.imageUrl}
								title={guide.title}
							/>
						</View>
					))}
				</View>
			</View>
		</View>
	);
}

export default GuidesSection;
