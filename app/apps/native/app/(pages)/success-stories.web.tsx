import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
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

// Filter categories
const FILTERS = [
	{ name: "All Stories", value: "all" },
	{ name: "Creators", value: "creator" },
	{ name: "Brands", value: "brand" },
];

// Industry filters
const INDUSTRIES = [
	"All Industries",
	"Beauty",
	"Tech",
	"Food & Beverage",
	"Fashion",
	"Fitness",
	"Home & Living",
];

// Featured success story
const FEATURED_STORY = {
	type: "brand" as const,
	name: "GlowSkin Cosmetics",
	title: "How GlowSkin Increased Conversion Rates by 340% with UGC",
	quote:
		"Working with creators on this platform transformed our marketing. The authentic content resonated with customers in ways our traditional ads never did.",
	author: "Jessica Martinez",
	role: "Marketing Director",
	industry: "Beauty",
	metrics: [
		{ value: "340%", label: "Conversion Increase" },
		{ value: "2.5M", label: "Impressions" },
		{ value: "$50K", label: "Ad Spend Saved" },
	],
	image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
};

// Success stories
const SUCCESS_STORIES = [
	{
		type: "creator" as const,
		name: "Alex Rivera",
		title: "From Side Hustle to Six Figures",
		quote:
			"I started creating UGC content part-time while working my 9-5. Within 18 months, I was earning enough to go full-time. This platform connected me with brands I never could have reached on my own.",
		industry: "Tech",
		metrics: [
			{ value: "$120K", label: "Annual Earnings" },
			{ value: "200+", label: "Projects Completed" },
			{ value: "4.9", label: "Average Rating" },
		],
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
	},
	{
		type: "brand" as const,
		name: "FreshBite Meals",
		title: "Scaling Content Creation 10x Without Growing the Team",
		quote:
			"We needed content for 50 new menu items. Instead of hiring an agency, we worked with 15 creators who delivered faster, cheaper, and more authentic content.",
		industry: "Food & Beverage",
		metrics: [
			{ value: "10x", label: "Content Volume" },
			{ value: "60%", label: "Cost Reduction" },
			{ value: "15", label: "Creators Used" },
		],
		image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
	},
	{
		type: "creator" as const,
		name: "Maya Johnson",
		title: "Building a Sustainable Creative Business",
		quote:
			"As a mom of two, I needed flexibility. UGC lets me work around my family's schedule while doing creative work I love. The consistent income from recurring brand partnerships changed everything.",
		industry: "Fashion",
		metrics: [
			{ value: "8", label: "Recurring Brands" },
			{ value: "25hrs", label: "Weekly Hours" },
			{ value: "$8K", label: "Monthly Average" },
		],
		image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
	},
	{
		type: "brand" as const,
		name: "TechFit Wearables",
		title: "Launching a Product with Zero Traditional Advertising",
		quote:
			"We launched our new fitness tracker entirely through UGC. Real people showing real results was more powerful than any celebrity endorsement could be.",
		industry: "Tech",
		metrics: [
			{ value: "$2M", label: "Launch Revenue" },
			{ value: "500+", label: "Content Pieces" },
			{ value: "0", label: "TV/Print Spend" },
		],
		image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&q=80",
	},
	{
		type: "creator" as const,
		name: "Jordan Chen",
		title: "Turning Photography Skills into a Thriving Career",
		quote:
			"I was struggling as a freelance photographer until I discovered UGC. Now I shoot product content for 10+ brands monthly, with steady income and creative freedom.",
		industry: "Home & Living",
		metrics: [
			{ value: "50+", label: "Brand Partners" },
			{ value: "3 days", label: "Avg. Turnaround" },
			{ value: "100%", label: "Repeat Rate" },
		],
		image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
	},
	{
		type: "brand" as const,
		name: "PureGlow Skincare",
		title: "User-Generated Content Drove 80% of Our Social Growth",
		quote:
			"We repurposed creator content across all our channels. The authentic testimonials built trust faster than anything else we tried.",
		industry: "Beauty",
		metrics: [
			{ value: "80%", label: "Social Growth" },
			{ value: "45K", label: "New Followers" },
			{ value: "12x", label: "Engagement Rate" },
		],
		image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
	},
];

export default function SuccessStoriesPage() {
	const { isMobile, isTablet } = useResponsive();
	const { open: openAuthModal } = useAuthModal();
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [selectedIndustry, setSelectedIndustry] = useState("All Industries");

	const filteredStories = SUCCESS_STORIES.filter((story) => {
		const typeMatch =
			selectedFilter === "all" || story.type === selectedFilter;
		const industryMatch =
			selectedIndustry === "All Industries" ||
			story.industry === selectedIndustry;
		return typeMatch && industryMatch;
	});

	const successStoriesJsonLd = createWebPageJsonLd(
		"Success Stories - UGC Marketplace",
		"Real stories from creators and brands succeeding on UGC Marketplace.",
		"/success-stories"
	);

	return (
		<ScrollView style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
			<SEO
				title="Success Stories"
				description="Discover how creators and brands are succeeding on UGC Marketplace. Read real stories of growth, increased revenue, and successful collaborations."
				path="/success-stories"
				keywords={[
					"UGC success stories",
					"creator testimonials",
					"brand case studies",
					"content marketing results",
				]}
				jsonLd={successStoriesJsonLd}
			/>

			{/* Hero Section */}
			<View
				style={{
					paddingTop: 64,
					paddingBottom: 64,
					paddingHorizontal: 24,
					backgroundColor: THEME_COLORS.foreground,
				}}
			>
				<View
					style={{
						maxWidth: 800,
						marginHorizontal: "auto",
						width: "100%",
						alignItems: "center",
					}}
				>
					<View
						style={{
							width: 72,
							height: 72,
							borderRadius: 36,
							backgroundColor: `${THEME_COLORS.primary}20`,
							alignItems: "center",
							justifyContent: "center",
							marginBottom: 24,
						}}
					>
						<Ionicons
							color={THEME_COLORS.primary}
							name="trophy-outline"
							size={36}
						/>
					</View>
					<Text
						style={{
							fontSize: isMobile ? 32 : 48,
							fontWeight: "700",
							color: THEME_COLORS.primaryForeground,
							textAlign: "center",
							marginBottom: 16,
						}}
					>
						Real Stories, Real Results
					</Text>
					<Text
						style={{
							fontSize: 18,
							color: "#a0a0a0",
							textAlign: "center",
							maxWidth: 600,
							lineHeight: 28,
						}}
					>
						Discover how creators and brands are achieving extraordinary results
						on our platform.
					</Text>
				</View>
			</View>

			{/* Featured Story */}
			<View
				style={{
					paddingHorizontal: 24,
					paddingVertical: 64,
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
							fontSize: 13,
							fontWeight: "600",
							color: THEME_COLORS.primary,
							textTransform: "uppercase",
							letterSpacing: 1,
							marginBottom: 16,
							textAlign: "center",
						}}
					>
						Featured Story
					</Text>

					<View
						style={{
							flexDirection: isMobile ? "column" : "row",
							backgroundColor: THEME_COLORS.background,
							borderRadius: 20,
							overflow: "hidden",
							borderWidth: 1,
							borderColor: THEME_COLORS.border,
						}}
					>
						{/* Image */}
						<View
							style={{
								width: isMobile ? "100%" : "45%",
								height: isMobile ? 280 : 420,
								backgroundColor: THEME_COLORS.sectionBackground,
							}}
						>
							<Image
								source={{ uri: FEATURED_STORY.image }}
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
									gap: 8,
									marginBottom: 16,
								}}
							>
								<View
									style={{
										paddingHorizontal: 10,
										paddingVertical: 4,
										borderRadius: 4,
										backgroundColor: `${THEME_COLORS.primary}15`,
									}}
								>
									<Text
										style={{
											fontSize: 11,
											fontWeight: "600",
											color: THEME_COLORS.primary,
											textTransform: "uppercase",
										}}
									>
										Brand Story
									</Text>
								</View>
								<Text style={{ fontSize: 13, color: THEME_COLORS.muted }}>
									{FEATURED_STORY.industry}
								</Text>
							</View>

							<Text
								style={{
									fontSize: isMobile ? 24 : 28,
									fontWeight: "700",
									color: THEME_COLORS.foreground,
									marginBottom: 16,
									lineHeight: isMobile ? 32 : 38,
								}}
							>
								{FEATURED_STORY.title}
							</Text>

							<Text
								style={{
									fontSize: 16,
									color: THEME_COLORS.muted,
									lineHeight: 26,
									marginBottom: 24,
									fontStyle: "italic",
								}}
							>
								"{FEATURED_STORY.quote}"
							</Text>

							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 12,
									marginBottom: 24,
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
									<Ionicons
										color={THEME_COLORS.primary}
										name="business"
										size={20}
									/>
								</View>
								<View>
									<Text
										style={{
											fontSize: 15,
											fontWeight: "600",
											color: THEME_COLORS.foreground,
										}}
									>
										{FEATURED_STORY.author}
									</Text>
									<Text style={{ fontSize: 13, color: THEME_COLORS.muted }}>
										{FEATURED_STORY.role}, {FEATURED_STORY.name}
									</Text>
								</View>
							</View>

							{/* Metrics */}
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									gap: 24,
									paddingTop: 20,
									borderTopWidth: 1,
									borderTopColor: THEME_COLORS.border,
								}}
							>
								{FEATURED_STORY.metrics.map((metric) => (
									<View key={metric.label}>
										<Text
											style={{
												fontSize: 28,
												fontWeight: "700",
												color: THEME_COLORS.primary,
											}}
										>
											{metric.value}
										</Text>
										<Text
											style={{
												fontSize: 13,
												color: THEME_COLORS.muted,
											}}
										>
											{metric.label}
										</Text>
									</View>
								))}
							</View>
						</View>
					</View>
				</View>
			</View>

			{/* Filters */}
			<View
				style={{
					paddingHorizontal: 24,
					paddingTop: 48,
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
					<View
						style={{
							flexDirection: isMobile ? "column" : "row",
							justifyContent: "space-between",
							alignItems: isMobile ? "stretch" : "center",
							gap: 16,
						}}
					>
						{/* Type Filter */}
						<View style={{ flexDirection: "row", gap: 8 }}>
							{FILTERS.map((filter) => (
								<Pressable
									key={filter.value}
									onPress={() => setSelectedFilter(filter.value)}
									style={({ hovered }) => ({
										paddingHorizontal: 20,
										paddingVertical: 10,
										borderRadius: 8,
										backgroundColor:
											selectedFilter === filter.value
												? THEME_COLORS.primary
												: hovered
													? THEME_COLORS.sectionBackground
													: THEME_COLORS.background,
										borderWidth: 1,
										borderColor:
											selectedFilter === filter.value
												? THEME_COLORS.primary
												: THEME_COLORS.border,
									})}
								>
									<Text
										style={{
											fontSize: 14,
											fontWeight: "500",
											color:
												selectedFilter === filter.value
													? THEME_COLORS.primaryForeground
													: THEME_COLORS.foreground,
										}}
									>
										{filter.name}
									</Text>
								</Pressable>
							))}
						</View>

						{/* Industry Filter */}
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{ gap: 8 }}
						>
							{INDUSTRIES.map((industry) => (
								<Pressable
									key={industry}
									onPress={() => setSelectedIndustry(industry)}
									style={({ hovered }) => ({
										paddingHorizontal: 16,
										paddingVertical: 8,
										borderRadius: 100,
										backgroundColor:
											selectedIndustry === industry
												? THEME_COLORS.foreground
												: hovered
													? THEME_COLORS.sectionBackground
													: "transparent",
									})}
								>
									<Text
										style={{
											fontSize: 13,
											fontWeight: "500",
											color:
												selectedIndustry === industry
													? THEME_COLORS.primaryForeground
													: THEME_COLORS.muted,
										}}
									>
										{industry}
									</Text>
								</Pressable>
							))}
						</ScrollView>
					</View>
				</View>
			</View>

			{/* Stories Grid */}
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
						{filteredStories.map((story) => (
							<View
								key={story.name}
								style={{
									width: isMobile ? "100%" : isTablet ? "48%" : "31%",
									backgroundColor: THEME_COLORS.background,
									borderRadius: 16,
									overflow: "hidden",
									borderWidth: 1,
									borderColor: THEME_COLORS.border,
								}}
							>
								{/* Image */}
								<View
									style={{
										height: 200,
										backgroundColor: THEME_COLORS.sectionBackground,
									}}
								>
									<Image
										source={{ uri: story.image }}
										style={{ width: "100%", height: "100%" }}
										resizeMode="cover"
									/>
									<View
										style={{
											position: "absolute",
											top: 12,
											left: 12,
											paddingHorizontal: 10,
											paddingVertical: 4,
											borderRadius: 4,
											backgroundColor:
												story.type === "creator"
													? THEME_COLORS.primary
													: "#4F46E5",
										}}
									>
										<Text
											style={{
												fontSize: 11,
												fontWeight: "600",
												color: THEME_COLORS.primaryForeground,
												textTransform: "uppercase",
											}}
										>
											{story.type}
										</Text>
									</View>
								</View>

								{/* Content */}
								<View style={{ padding: 24 }}>
									<Text
										style={{
											fontSize: 18,
											fontWeight: "600",
											color: THEME_COLORS.foreground,
											marginBottom: 8,
											lineHeight: 26,
										}}
									>
										{story.title}
									</Text>

									<Text
										style={{
											fontSize: 14,
											color: THEME_COLORS.muted,
											lineHeight: 22,
											marginBottom: 16,
											fontStyle: "italic",
										}}
										numberOfLines={3}
									>
										"{story.quote}"
									</Text>

									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											gap: 8,
											marginBottom: 16,
										}}
									>
										<Text
											style={{
												fontSize: 14,
												fontWeight: "500",
												color: THEME_COLORS.foreground,
											}}
										>
											{story.name}
										</Text>
										<Text style={{ color: THEME_COLORS.muted }}>·</Text>
										<Text
											style={{
												fontSize: 13,
												color: THEME_COLORS.muted,
											}}
										>
											{story.industry}
										</Text>
									</View>

									{/* Metrics */}
									<View
										style={{
											flexDirection: "row",
											justifyContent: "space-between",
											paddingTop: 16,
											borderTopWidth: 1,
											borderTopColor: THEME_COLORS.border,
										}}
									>
										{story.metrics.map((metric) => (
											<View key={metric.label} style={{ alignItems: "center" }}>
												<Text
													style={{
														fontSize: 18,
														fontWeight: "700",
														color:
															story.type === "creator"
																? THEME_COLORS.primary
																: "#4F46E5",
													}}
												>
													{metric.value}
												</Text>
												<Text
													style={{
														fontSize: 11,
														color: THEME_COLORS.muted,
													}}
												>
													{metric.label}
												</Text>
											</View>
										))}
									</View>
								</View>
							</View>
						))}
					</View>

					{filteredStories.length === 0 && (
						<View
							style={{
								padding: 48,
								alignItems: "center",
							}}
						>
							<Ionicons
								color={THEME_COLORS.muted}
								name="search-outline"
								size={48}
								style={{ marginBottom: 16 }}
							/>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "600",
									color: THEME_COLORS.foreground,
									marginBottom: 8,
								}}
							>
								No stories found
							</Text>
							<Text
								style={{
									fontSize: 14,
									color: THEME_COLORS.muted,
								}}
							>
								Try adjusting your filters
							</Text>
						</View>
					)}
				</View>
			</View>

			{/* CTA Section */}
			<View
				style={{
					paddingVertical: 64,
					paddingHorizontal: 24,
					backgroundColor: THEME_COLORS.primary,
				}}
			>
				<View
					style={{
						maxWidth: 800,
						marginHorizontal: "auto",
						width: "100%",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontSize: isMobile ? 28 : 36,
							fontWeight: "700",
							color: THEME_COLORS.primaryForeground,
							textAlign: "center",
							marginBottom: 16,
						}}
					>
						Write Your Success Story
					</Text>
					<Text
						style={{
							fontSize: 18,
							color: "rgba(255,255,255,0.9)",
							textAlign: "center",
							marginBottom: 32,
							lineHeight: 28,
							maxWidth: 500,
						}}
					>
						Join thousands of creators and brands achieving extraordinary
						results on our platform.
					</Text>
					<View
						style={{
							flexDirection: isMobile ? "column" : "row",
							gap: 16,
						}}
					>
						<Pressable
							onPress={() => openAuthModal("signup")}
							style={({ hovered }) => ({
								paddingHorizontal: 32,
								paddingVertical: 14,
								backgroundColor: hovered
									? "rgba(255,255,255,0.95)"
									: THEME_COLORS.primaryForeground,
								borderRadius: 8,
							})}
						>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "600",
									color: THEME_COLORS.primary,
									textAlign: "center",
								}}
							>
								Start as a Creator
							</Text>
						</Pressable>
						<Pressable
							onPress={() => openAuthModal("signup")}
							style={({ hovered }) => ({
								paddingHorizontal: 32,
								paddingVertical: 14,
								backgroundColor: "transparent",
								borderRadius: 8,
								borderWidth: 2,
								borderColor: hovered
									? THEME_COLORS.primaryForeground
									: "rgba(255,255,255,0.5)",
							})}
						>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "600",
									color: THEME_COLORS.primaryForeground,
									textAlign: "center",
								}}
							>
								Post a Brief
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
