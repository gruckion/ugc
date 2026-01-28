import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd } from "@/components/web/SEO";

// Fiverr-style theme colors
const THEME_COLORS = {
	primary: "#1DBF73",
	primaryForeground: "#FFFFFF",
	foreground: "#222325",
	muted: "#62646a",
	border: "#e4e5e7",
	background: "#FFFFFF",
	sectionBackground: "#fafafa",
};

// Blog categories
const CATEGORIES = [
	{ name: "All", count: 24 },
	{ name: "Creator Tips", count: 8 },
	{ name: "Brand Insights", count: 6 },
	{ name: "Industry News", count: 5 },
	{ name: "Platform Updates", count: 5 },
];

// Featured article
const FEATURED_ARTICLE = {
	title: "The Rise of UGC: Why Authentic Content Outperforms Polished Ads in 2026",
	excerpt:
		"New research shows user-generated content drives 4x higher engagement than traditional branded content. Here's what it means for your marketing strategy.",
	category: "Industry News",
	author: "Sarah Chen",
	role: "CEO & Co-founder",
	date: "January 25, 2026",
	readTime: "8 min read",
	image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
};

// Blog articles
const ARTICLES = [
	{
		title: "10 Tips to Level Up Your Product Photography",
		excerpt:
			"Master the art of product photography with these proven techniques used by top UGC creators.",
		category: "Creator Tips",
		author: "Emily Rodriguez",
		date: "January 22, 2026",
		readTime: "5 min read",
		image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80",
	},
	{
		title: "How Brands Are Building Long-Term Creator Relationships",
		excerpt:
			"Learn why the most successful brands are moving beyond one-off campaigns to sustained partnerships.",
		category: "Brand Insights",
		author: "David Park",
		date: "January 20, 2026",
		readTime: "6 min read",
		image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80",
	},
	{
		title: "Platform Update: New Analytics Dashboard",
		excerpt:
			"Introducing powerful new tools to track your content performance and optimize your creator strategy.",
		category: "Platform Updates",
		author: "Marcus Johnson",
		date: "January 18, 2026",
		readTime: "3 min read",
		image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
	},
	{
		title: "The Psychology Behind Effective UGC",
		excerpt:
			"Why do consumers trust content from regular people more than celebrities? The science explained.",
		category: "Industry News",
		author: "Sarah Chen",
		date: "January 15, 2026",
		readTime: "7 min read",
		image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
	},
	{
		title: "Pricing Your Content: A Complete Guide",
		excerpt:
			"From beginner to pro, learn how to price your UGC content fairly and competitively.",
		category: "Creator Tips",
		author: "Emily Rodriguez",
		date: "January 12, 2026",
		readTime: "10 min read",
		image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
	},
	{
		title: "Seasonal Campaign Planning for Q1 2026",
		excerpt:
			"Get ahead of the curve with our comprehensive guide to planning your Q1 creator campaigns.",
		category: "Brand Insights",
		author: "David Park",
		date: "January 10, 2026",
		readTime: "8 min read",
		image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80",
	},
];

// Category colors
const CATEGORY_COLORS: Record<string, string> = {
	"Creator Tips": "#1DBF73",
	"Brand Insights": "#4F46E5",
	"Industry News": "#F59E0B",
	"Platform Updates": "#EC4899",
};

export default function BlogPage() {
	const { isMobile, isTablet } = useResponsive();
	const [selectedCategory, setSelectedCategory] = useState("All");

	const filteredArticles =
		selectedCategory === "All"
			? ARTICLES
			: ARTICLES.filter((a) => a.category === selectedCategory);

	const blogPageJsonLd = createWebPageJsonLd(
		"Blog - UGC Marketplace",
		"Insights, tips, and news for UGC creators and brands.",
		"/blog"
	);

	return (
		<ScrollView style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
			<SEO
				title="Blog"
				description="Stay updated with the latest UGC trends, creator tips, brand insights, and industry news. Learn how to create better content and grow your business."
				path="/blog"
				keywords={[
					"UGC blog",
					"creator tips",
					"content marketing",
					"brand insights",
					"UGC trends",
				]}
				jsonLd={blogPageJsonLd}
			/>

			{/* Hero Section */}
			<View
				style={{
					paddingTop: 64,
					paddingBottom: 48,
					paddingHorizontal: 24,
					backgroundColor: THEME_COLORS.sectionBackground,
				}}
			>
				<View
					style={{
						maxWidth: 1200,
						marginHorizontal: "auto",
						width: "100%",
					}}
				>
					<Text
						style={{
							fontSize: isMobile ? 32 : 48,
							fontWeight: "700",
							color: THEME_COLORS.foreground,
							textAlign: "center",
							marginBottom: 12,
						}}
					>
						Blog
					</Text>
					<Text
						style={{
							fontSize: 18,
							color: THEME_COLORS.muted,
							textAlign: "center",
							maxWidth: 600,
							marginHorizontal: "auto",
							lineHeight: 28,
						}}
					>
						Insights, tips, and updates from the world of user-generated content
						and creator marketing.
					</Text>
				</View>
			</View>

			{/* Featured Article */}
			<View
				style={{
					paddingHorizontal: 24,
					paddingVertical: 48,
				}}
			>
				<View
					style={{
						maxWidth: 1200,
						marginHorizontal: "auto",
						width: "100%",
					}}
				>
					<Pressable
						style={({ hovered }) => ({
							flexDirection: isMobile ? "column" : "row",
							backgroundColor: THEME_COLORS.background,
							borderRadius: 20,
							overflow: "hidden",
							borderWidth: 1,
							borderColor: hovered
								? THEME_COLORS.primary
								: THEME_COLORS.border,
						})}
					>
						{/* Image */}
						<View
							style={{
								width: isMobile ? "100%" : "55%",
								height: isMobile ? 240 : 400,
								backgroundColor: THEME_COLORS.sectionBackground,
							}}
						>
							<Image
								source={{ uri: FEATURED_ARTICLE.image }}
								style={{ width: "100%", height: "100%" }}
								resizeMode="cover"
							/>
						</View>

						{/* Content */}
						<View
							style={{
								flex: 1,
								padding: isMobile ? 24 : 40,
								justifyContent: "center",
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 12,
									marginBottom: 16,
								}}
							>
								<View
									style={{
										paddingHorizontal: 12,
										paddingVertical: 6,
										borderRadius: 6,
										backgroundColor: `${CATEGORY_COLORS[FEATURED_ARTICLE.category] || THEME_COLORS.primary}15`,
									}}
								>
									<Text
										style={{
											fontSize: 12,
											fontWeight: "600",
											color:
												CATEGORY_COLORS[FEATURED_ARTICLE.category] ||
												THEME_COLORS.primary,
											textTransform: "uppercase",
											letterSpacing: 0.5,
										}}
									>
										{FEATURED_ARTICLE.category}
									</Text>
								</View>
								<Text style={{ fontSize: 13, color: THEME_COLORS.muted }}>
									Featured
								</Text>
							</View>

							<Text
								style={{
									fontSize: isMobile ? 24 : 32,
									fontWeight: "700",
									color: THEME_COLORS.foreground,
									marginBottom: 16,
									lineHeight: isMobile ? 32 : 42,
								}}
							>
								{FEATURED_ARTICLE.title}
							</Text>

							<Text
								style={{
									fontSize: 16,
									color: THEME_COLORS.muted,
									lineHeight: 26,
									marginBottom: 24,
								}}
							>
								{FEATURED_ARTICLE.excerpt}
							</Text>

							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 16,
								}}
							>
								<View
									style={{
										width: 44,
										height: 44,
										borderRadius: 22,
										backgroundColor: THEME_COLORS.sectionBackground,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text
										style={{
											fontSize: 16,
											fontWeight: "600",
											color: THEME_COLORS.muted,
										}}
									>
										{FEATURED_ARTICLE.author
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</Text>
								</View>
								<View>
									<Text
										style={{
											fontSize: 14,
											fontWeight: "500",
											color: THEME_COLORS.foreground,
										}}
									>
										{FEATURED_ARTICLE.author}
									</Text>
									<Text style={{ fontSize: 13, color: THEME_COLORS.muted }}>
										{FEATURED_ARTICLE.date} · {FEATURED_ARTICLE.readTime}
									</Text>
								</View>
							</View>
						</View>
					</Pressable>
				</View>
			</View>

			{/* Category Filter */}
			<View
				style={{
					paddingHorizontal: 24,
					paddingBottom: 32,
				}}
			>
				<View
					style={{
						maxWidth: 1200,
						marginHorizontal: "auto",
						width: "100%",
					}}
				>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ gap: 12 }}
					>
						{CATEGORIES.map((category) => (
							<Pressable
								key={category.name}
								onPress={() => setSelectedCategory(category.name)}
								style={({ hovered }) => ({
									paddingHorizontal: 20,
									paddingVertical: 10,
									borderRadius: 100,
									backgroundColor:
										selectedCategory === category.name
											? THEME_COLORS.foreground
											: hovered
												? THEME_COLORS.sectionBackground
												: THEME_COLORS.background,
									borderWidth: 1,
									borderColor:
										selectedCategory === category.name
											? THEME_COLORS.foreground
											: THEME_COLORS.border,
									flexDirection: "row",
									alignItems: "center",
									gap: 8,
								})}
							>
								<Text
									style={{
										fontSize: 14,
										fontWeight: "500",
										color:
											selectedCategory === category.name
												? THEME_COLORS.primaryForeground
												: THEME_COLORS.foreground,
									}}
								>
									{category.name}
								</Text>
								<Text
									style={{
										fontSize: 12,
										color:
											selectedCategory === category.name
												? "rgba(255,255,255,0.7)"
												: THEME_COLORS.muted,
									}}
								>
									{category.count}
								</Text>
							</Pressable>
						))}
					</ScrollView>
				</View>
			</View>

			{/* Articles Grid */}
			<View
				style={{
					paddingHorizontal: 24,
					paddingBottom: 64,
				}}
			>
				<View
					style={{
						maxWidth: 1200,
						marginHorizontal: "auto",
						width: "100%",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							gap: 24,
						}}
					>
						{filteredArticles.map((article) => (
							<Pressable
								key={article.title}
								style={({ hovered }) => ({
									width: isMobile ? "100%" : isTablet ? "48%" : "31%",
									backgroundColor: THEME_COLORS.background,
									borderRadius: 16,
									overflow: "hidden",
									borderWidth: 1,
									borderColor: hovered
										? THEME_COLORS.primary
										: THEME_COLORS.border,
								})}
							>
								{({ hovered }) => (
									<>
										{/* Image */}
										<View
											style={{
												height: 180,
												backgroundColor: THEME_COLORS.sectionBackground,
											}}
										>
											<Image
												source={{ uri: article.image }}
												style={{ width: "100%", height: "100%" }}
												resizeMode="cover"
											/>
										</View>

										{/* Content */}
										<View style={{ padding: 20 }}>
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
													gap: 8,
													marginBottom: 12,
												}}
											>
												<View
													style={{
														paddingHorizontal: 10,
														paddingVertical: 4,
														borderRadius: 4,
														backgroundColor: `${CATEGORY_COLORS[article.category] || THEME_COLORS.primary}15`,
													}}
												>
													<Text
														style={{
															fontSize: 11,
															fontWeight: "600",
															color:
																CATEGORY_COLORS[article.category] ||
																THEME_COLORS.primary,
															textTransform: "uppercase",
															letterSpacing: 0.5,
														}}
													>
														{article.category}
													</Text>
												</View>
												<Text
													style={{ fontSize: 12, color: THEME_COLORS.muted }}
												>
													{article.readTime}
												</Text>
											</View>

											<Text
												style={{
													fontSize: 18,
													fontWeight: "600",
													color: hovered
														? THEME_COLORS.primary
														: THEME_COLORS.foreground,
													marginBottom: 8,
													lineHeight: 26,
												}}
											>
												{article.title}
											</Text>

											<Text
												style={{
													fontSize: 14,
													color: THEME_COLORS.muted,
													lineHeight: 22,
													marginBottom: 16,
												}}
												numberOfLines={2}
											>
												{article.excerpt}
											</Text>

											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
													justifyContent: "space-between",
												}}
											>
												<Text
													style={{ fontSize: 13, color: THEME_COLORS.muted }}
												>
													{article.author}
												</Text>
												<Text
													style={{ fontSize: 12, color: THEME_COLORS.muted }}
												>
													{article.date}
												</Text>
											</View>
										</View>
									</>
								)}
							</Pressable>
						))}
					</View>

					{/* Load More */}
					<View style={{ alignItems: "center", marginTop: 48 }}>
						<Pressable
							style={({ hovered }) => ({
								paddingHorizontal: 32,
								paddingVertical: 14,
								borderRadius: 8,
								backgroundColor: hovered
									? THEME_COLORS.sectionBackground
									: THEME_COLORS.background,
								borderWidth: 1,
								borderColor: THEME_COLORS.border,
								flexDirection: "row",
								alignItems: "center",
								gap: 8,
							})}
						>
							<Text
								style={{
									fontSize: 15,
									fontWeight: "500",
									color: THEME_COLORS.foreground,
								}}
							>
								Load More Articles
							</Text>
							<Ionicons
								color={THEME_COLORS.muted}
								name="arrow-down"
								size={18}
							/>
						</Pressable>
					</View>
				</View>
			</View>

			{/* Newsletter CTA */}
			<View
				style={{
					paddingVertical: 64,
					paddingHorizontal: 24,
					backgroundColor: THEME_COLORS.foreground,
				}}
			>
				<View
					style={{
						maxWidth: 600,
						marginHorizontal: "auto",
						width: "100%",
						alignItems: "center",
					}}
				>
					<Ionicons
						color={THEME_COLORS.primary}
						name="mail-outline"
						size={48}
						style={{ marginBottom: 20 }}
					/>
					<Text
						style={{
							fontSize: 28,
							fontWeight: "700",
							color: THEME_COLORS.primaryForeground,
							textAlign: "center",
							marginBottom: 12,
						}}
					>
						Stay in the loop
					</Text>
					<Text
						style={{
							fontSize: 16,
							color: "#a0a0a0",
							textAlign: "center",
							marginBottom: 32,
							lineHeight: 24,
						}}
					>
						Get the latest creator tips, industry insights, and platform updates
						delivered to your inbox weekly.
					</Text>
					<View
						style={{
							flexDirection: isMobile ? "column" : "row",
							gap: 12,
							width: "100%",
							maxWidth: 400,
						}}
					>
						<View
							style={{
								flex: 1,
								backgroundColor: "rgba(255,255,255,0.1)",
								borderRadius: 8,
								paddingHorizontal: 16,
								paddingVertical: 14,
							}}
						>
							<Text style={{ fontSize: 15, color: "#666" }}>
								Enter your email
							</Text>
						</View>
						<Pressable
							style={({ hovered }) => ({
								paddingHorizontal: 24,
								paddingVertical: 14,
								backgroundColor: hovered ? "#19a864" : THEME_COLORS.primary,
								borderRadius: 8,
							})}
						>
							<Text
								style={{
									fontSize: 15,
									fontWeight: "600",
									color: THEME_COLORS.primaryForeground,
									textAlign: "center",
								}}
							>
								Subscribe
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
