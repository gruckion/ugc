import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd } from "@/components/web/SEO";
import { cn } from "@/lib/utils";

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

// Category colors (data-driven, acceptable as inline style exception)
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
		<ScrollView className="flex-1 bg-background">
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
			<View className="bg-sectionBackground px-6 pb-12 pt-16">
				<View className="mx-auto w-full max-w-[1200px]">
					<Text
						className="mb-3 text-center font-bold text-foreground"
						style={{ fontSize: isMobile ? 32 : 48 }}
					>
						Blog
					</Text>
					<Text
						className="mx-auto max-w-[600px] text-center text-lg text-muted"
						style={{ lineHeight: 28 }}
					>
						Insights, tips, and updates from the world of user-generated content
						and creator marketing.
					</Text>
				</View>
			</View>

			{/* Featured Article */}
			<View className="px-6 py-12">
				<View className="mx-auto w-full max-w-[1200px]">
					<Pressable
						className={cn(
							"overflow-hidden rounded-[20px] border bg-background",
							"border-border hover:border-primary"
						)}
						style={{
							flexDirection: isMobile ? "column" : "row",
						}}
					>
						{/* Image */}
						<View
							className="bg-sectionBackground"
							style={{
								width: isMobile ? "100%" : "55%",
								height: isMobile ? 240 : 400,
							}}
						>
							<Image
								source={{ uri: FEATURED_ARTICLE.image }}
								className="h-full w-full"
								resizeMode="cover"
							/>
						</View>

						{/* Content */}
						<View
							className="flex-1 justify-center"
							style={{ padding: isMobile ? 24 : 40 }}
						>
							<View className="mb-4 flex-row items-center gap-3">
								<View
									className="rounded-md px-3 py-1.5"
									style={{
										backgroundColor: `${CATEGORY_COLORS[FEATURED_ARTICLE.category] || "#1DBF73"}15`,
									}}
								>
									<Text
										className="text-xs font-semibold uppercase tracking-wide"
										style={{
											color:
												CATEGORY_COLORS[FEATURED_ARTICLE.category] ||
												"#1DBF73",
										}}
									>
										{FEATURED_ARTICLE.category}
									</Text>
								</View>
								<Text className="text-[13px] text-muted">
									Featured
								</Text>
							</View>

							<Text
								className="mb-4 font-bold text-foreground"
								style={{
									fontSize: isMobile ? 24 : 32,
									lineHeight: isMobile ? 32 : 42,
								}}
							>
								{FEATURED_ARTICLE.title}
							</Text>

							<Text
								className="mb-6 text-base text-muted"
								style={{ lineHeight: 26 }}
							>
								{FEATURED_ARTICLE.excerpt}
							</Text>

							<View className="flex-row items-center gap-4">
								<View
									className="items-center justify-center rounded-full bg-sectionBackground"
									style={{ width: 44, height: 44 }}
								>
									<Text className="text-base font-semibold text-muted">
										{FEATURED_ARTICLE.author
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</Text>
								</View>
								<View>
									<Text className="text-sm font-medium text-foreground">
										{FEATURED_ARTICLE.author}
									</Text>
									<Text className="text-[13px] text-muted">
										{FEATURED_ARTICLE.date} · {FEATURED_ARTICLE.readTime}
									</Text>
								</View>
							</View>
						</View>
					</Pressable>
				</View>
			</View>

			{/* Category Filter */}
			<View className="px-6 pb-8">
				<View className="mx-auto w-full max-w-[1200px]">
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ gap: 12 }}
					>
						{CATEGORIES.map((category) => (
							<Pressable
								key={category.name}
								onPress={() => setSelectedCategory(category.name)}
								className={cn(
									"flex-row items-center gap-2 rounded-full border px-5 py-2.5",
									selectedCategory === category.name
										? "bg-foreground border-foreground"
										: "border-border bg-background hover:bg-surface-raised"
								)}
							>
								<Text
									className={cn(
										"text-sm font-medium",
										selectedCategory === category.name
											? "text-primary-foreground"
											: "text-foreground"
									)}
								>
									{category.name}
								</Text>
								<Text
									className={cn(
										"text-xs",
										selectedCategory === category.name
											? "text-white/70"
											: "text-muted"
									)}
								>
									{category.count}
								</Text>
							</Pressable>
						))}
					</ScrollView>
				</View>
			</View>

			{/* Articles Grid */}
			<View className="px-6 pb-16">
				<View className="mx-auto w-full max-w-[1200px]">
					<View className="flex-row flex-wrap gap-6">
						{filteredArticles.map((article) => (
							<Pressable
								key={article.title}
								className={cn(
									"overflow-hidden rounded-2xl border bg-background",
									"border-border hover:border-primary"
								)}
								style={{
									width: isMobile ? "100%" : isTablet ? "48%" : "31%",
								}}
							>
								{({ hovered }) => (
									<>
										{/* Image */}
										<View
											className="bg-sectionBackground"
											style={{ height: 180 }}
										>
											<Image
												source={{ uri: article.image }}
												className="h-full w-full"
												resizeMode="cover"
											/>
										</View>

										{/* Content */}
										<View className="p-5">
											<View className="mb-3 flex-row items-center gap-2">
												<View
													className="rounded px-2.5 py-1"
													style={{
														backgroundColor: `${CATEGORY_COLORS[article.category] || "#1DBF73"}15`,
													}}
												>
													<Text
														className="font-semibold uppercase tracking-wide"
														style={{
															fontSize: 11,
															color:
																CATEGORY_COLORS[article.category] ||
																"#1DBF73",
														}}
													>
														{article.category}
													</Text>
												</View>
												<Text className="text-xs text-muted">
													{article.readTime}
												</Text>
											</View>

											<Text
												className={cn(
													"mb-2 text-lg font-semibold",
													hovered ? "text-primary" : "text-foreground"
												)}
												style={{ lineHeight: 26 }}
											>
												{article.title}
											</Text>

											<Text
												className="mb-4 text-sm text-muted"
												style={{ lineHeight: 22 }}
												numberOfLines={2}
											>
												{article.excerpt}
											</Text>

											<View className="flex-row items-center justify-between">
												<Text className="text-[13px] text-muted">
													{article.author}
												</Text>
												<Text className="text-xs text-muted">
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
					<View className="mt-12 items-center">
						<Pressable
							className="flex-row items-center gap-2 rounded-lg border border-border bg-background px-8 py-3.5 hover:bg-surface-raised"
						>
							<Text className="font-medium text-foreground text-[15px]">
								Load More Articles
							</Text>
							<Ionicons
								name="arrow-down"
								size={18}
								className="text-muted"
							/>
						</Pressable>
					</View>
				</View>
			</View>

			{/* Newsletter CTA */}
			<View className="bg-foreground px-6 py-16">
				<View className="mx-auto w-full max-w-[600px] items-center">
					<Ionicons
						name="mail-outline"
						size={48}
						className="mb-5 text-primary"
					/>
					<Text
						className="mb-3 text-center text-[28px] font-bold text-primaryForeground"
					>
						Stay in the loop
					</Text>
					<Text
						className="mb-8 text-center text-base text-muted"
						style={{ lineHeight: 24 }}
					>
						Get the latest creator tips, industry insights, and platform updates
						delivered to your inbox weekly.
					</Text>
					<View
						className="w-full max-w-[400px] gap-3"
						style={{ flexDirection: isMobile ? "column" : "row" }}
					>
						<View
							className="flex-1 rounded-lg px-4"
							style={{
								backgroundColor: "rgba(255,255,255,0.1)",
								paddingVertical: 14,
							}}
						>
							<Text className="text-[15px] text-muted">
								Enter your email
							</Text>
						</View>
						<Pressable
							className="rounded-lg px-6 bg-primary hover:bg-hover-primary"
							style={{ paddingVertical: 14 }}
						>
							<Text className="text-center text-[15px] font-semibold text-primaryForeground">
								Subscribe
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
