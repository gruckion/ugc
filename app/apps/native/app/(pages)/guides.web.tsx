import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { GuideCard } from "@/components/web/GuideCard";
import { SEO, createWebPageJsonLd } from "@/components/web/SEO";

// Fiverr-style theme colors
const THEME_COLORS = {
	primary: "#1DBF73",
	primaryForeground: "#FFFFFF",
	foreground: "#222325",
	muted: "#62646a",
	background: "#FFFFFF",
	border: "#e4e5e7",
};

// Categories for sidebar
const GUIDE_CATEGORIES = [
	{ id: "writing", label: "Writing & Copywriting Guides" },
	{ id: "design", label: "Graphics & Design Guides" },
	{ id: "marketing", label: "Digital Marketing Guides" },
	{ id: "data", label: "Data Guides" },
	{ id: "business", label: "Business Guides" },
	{ id: "audio", label: "Music & Audio Guides" },
	{ id: "video", label: "Video & Animation Guides" },
	{ id: "programming", label: "Programming & Tech Guides" },
	{ id: "ugc", label: "UGC Creation Guides" },
];

// Popular guides
const POPULAR_GUIDES = [
	{ id: "1", title: "Getting Started with UGC", href: "/guides/getting-started" },
	{ id: "2", title: "How to Price Your Services", href: "/guides/pricing" },
	{ id: "3", title: "Building a Portfolio", href: "/guides/portfolio" },
	{ id: "4", title: "Working with Brands", href: "/guides/working-with-brands" },
	{ id: "5", title: "Content that Converts", href: "/guides/content-converts" },
];

// All guides data
const ALL_GUIDES = [
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
	{
		id: "4",
		title: "The Complete Guide to Pricing Your UGC Services",
		description:
			"Learn how to value your work, negotiate with brands, and build sustainable income as a content creator.",
		imageUrl:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
		category: "Business",
		href: "/guides/pricing-ugc-services",
	},
	{
		id: "5",
		title: "Writing Scripts That Sell",
		description:
			"Master the art of scriptwriting for UGC videos that capture attention and drive conversions.",
		imageUrl:
			"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop",
		category: "Writing & Copywriting",
		href: "/guides/scripts-that-sell",
	},
	{
		id: "6",
		title: "Lighting Techniques for Home Studios",
		description:
			"Create professional-quality content from home with these simple lighting setups and techniques.",
		imageUrl:
			"https://images.unsplash.com/photo-1493119508027-2b584f234d6c?w=600&h=400&fit=crop",
		category: "Video & Animation",
		href: "/guides/home-studio-lighting",
	},
	{
		id: "7",
		title: "Understanding Brand Guidelines",
		description:
			"How to interpret and follow brand guidelines while maintaining your authentic creator voice.",
		imageUrl:
			"https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop",
		category: "Business",
		href: "/guides/brand-guidelines",
	},
	{
		id: "8",
		title: "TikTok Algorithm Deep Dive",
		description:
			"Understand how the TikTok algorithm works and optimize your content for maximum reach.",
		imageUrl:
			"https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=600&h=400&fit=crop",
		category: "Digital Marketing",
		href: "/guides/tiktok-algorithm",
	},
	{
		id: "9",
		title: "Audio Recording for UGC Creators",
		description:
			"Capture crystal-clear audio with affordable equipment and simple recording techniques.",
		imageUrl:
			"https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
		category: "Music & Audio",
		href: "/guides/audio-recording",
	},
];

export default function GuidesPage() {
	const { isMobile, isTablet } = useResponsive();
	const isCompact = isMobile || isTablet;

	const guidesPageJsonLd = createWebPageJsonLd(
		"Guides - UGC Marketplace",
		"Learn how to create great UGC content with our comprehensive guides.",
		"/guides"
	);

	return (
		<View style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
			<SEO
				title="Guides"
				description="Master UGC creation with our comprehensive guides. Learn video production, photography, copywriting, marketing, and more. Free resources for creators and brands."
				path="/guides"
				keywords={[
					"UGC guides",
					"content creation tutorials",
					"creator resources",
					"video production guide",
					"UGC tips",
				]}
				jsonLd={guidesPageJsonLd}
			/>
			<ScrollView>
				<View
					style={{
						maxWidth: 1200,
						marginHorizontal: "auto",
						width: "100%",
						paddingHorizontal: 24,
						paddingVertical: 48,
						flexDirection: isCompact ? "column" : "row",
						gap: 48,
					}}
				>
					{/* Sidebar */}
					<View
						style={{
							width: isCompact ? "100%" : 280,
							flexShrink: 0,
						}}
					>
						{/* Categories */}
						<Text
							style={{
								fontSize: 12,
								fontWeight: "700",
								color: THEME_COLORS.muted,
								letterSpacing: 1,
								marginBottom: 16,
							}}
						>
							CHOOSE YOUR TOPIC
						</Text>
						<View style={{ gap: 4, marginBottom: 32 }}>
							{GUIDE_CATEGORIES.map((category) => (
								<Link
									asChild
									href={`/guides?category=${category.id}` as any}
									key={category.id}
								>
									<Pressable
										style={({ hovered }) => ({
											paddingVertical: 10,
											paddingHorizontal: 12,
											borderRadius: 8,
											backgroundColor: hovered ? "#f5f5f5" : "transparent",
										})}
									>
										<Text
											style={{
												fontSize: 15,
												color: THEME_COLORS.foreground,
											}}
										>
											{category.label}
										</Text>
									</Pressable>
								</Link>
							))}
						</View>

						{/* Popular Guides */}
						<Text
							style={{
								fontSize: 12,
								fontWeight: "700",
								color: THEME_COLORS.muted,
								letterSpacing: 1,
								marginBottom: 16,
							}}
						>
							THE MOST POPULAR GUIDES
						</Text>
						<View style={{ gap: 4 }}>
							{POPULAR_GUIDES.map((guide) => (
								<Link asChild href={guide.href as any} key={guide.id}>
									<Pressable
										style={({ hovered }) => ({
											paddingVertical: 10,
											paddingHorizontal: 12,
											borderRadius: 8,
											backgroundColor: hovered ? "#f5f5f5" : "transparent",
										})}
									>
										{({ hovered }) => (
											<Text
												style={{
													fontSize: 15,
													color: hovered
														? THEME_COLORS.primary
														: THEME_COLORS.foreground,
												}}
											>
												{guide.title}
											</Text>
										)}
									</Pressable>
								</Link>
							))}
						</View>
					</View>

					{/* Main Content */}
					<View style={{ flex: 1 }}>
						{/* Header */}
						<Text
							style={{
								fontSize: 32,
								fontWeight: "700",
								color: THEME_COLORS.foreground,
								marginBottom: 12,
							}}
						>
							Creator Guides & Resources
						</Text>
						<Text
							style={{
								fontSize: 16,
								color: THEME_COLORS.muted,
								marginBottom: 32,
								maxWidth: 600,
								lineHeight: 24,
							}}
						>
							Everything you need to succeed as a UGC creator. From getting
							started to scaling your business, we've got you covered.
						</Text>

						{/* Guides Grid */}
						<View
							style={{
								flexDirection: "row",
								flexWrap: "wrap",
								gap: 24,
							}}
						>
							{ALL_GUIDES.map((guide) => (
								<View
									key={guide.id}
									style={{
										flex: 1,
										minWidth: isMobile ? "100%" : isTablet ? 280 : 300,
										maxWidth: isMobile ? "100%" : isTablet ? "48%" : "31%",
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
			</ScrollView>
		</View>
	);
}
