import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd } from "@/components/web/SEO";
import { cn } from "@/lib/utils";

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
		<ScrollView className="flex-1 bg-background">
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
			<View className="px-6 py-16 bg-foreground">
				<View className="w-full items-center" style={{ maxWidth: 800, marginHorizontal: "auto" }}>
					<View
						className="items-center justify-center mb-6"
						style={{
							width: 72,
							height: 72,
							borderRadius: 36,
							backgroundColor: "rgba(29,191,115,0.125)",
						}}
					>
						<Ionicons
							className="text-primary"
							name="trophy-outline"
							size={36}
						/>
					</View>
					<Text
						className="font-bold text-center mb-4 text-primary-foreground"
						style={{
							fontSize: isMobile ? 32 : 48,
						}}
					>
						Real Stories, Real Results
					</Text>
					<Text
						className="text-lg text-center text-muted"
						style={{
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
			<View className="px-6 py-16 bg-surface-raised">
				<View className="w-full" style={{ maxWidth: 1200, marginHorizontal: "auto" }}>
					<Text
						className="font-semibold uppercase text-center mb-4 text-primary tracking-[1px]"
						style={{
							fontSize: 13,
						}}
					>
						Featured Story
					</Text>

					<View
						className="overflow-hidden bg-background rounded-[20px] border border-border"
						style={{
							flexDirection: isMobile ? "column" : "row",
						}}
					>
						{/* Image */}
						<View
							className="bg-surface-raised"
							style={{
								width: isMobile ? "100%" : "45%",
								height: isMobile ? 280 : 420,
							}}
						>
							<Image
								source={{ uri: FEATURED_STORY.image }}
								className="w-full h-full"
								resizeMode="cover"
							/>
						</View>

						{/* Content */}
						<View
							className="flex-1 justify-center"
							style={{ padding: isMobile ? 24 : 40 }}
						>
							<View className="flex-row items-center gap-2 mb-4">
								<View
									className="py-1 bg-chip-bg rounded"
									style={{
										paddingHorizontal: 10,
									}}
								>
									<Text
										className="font-semibold uppercase text-primary"
										style={{
											fontSize: 11,
										}}
									>
										Brand Story
									</Text>
								</View>
								<Text className="text-muted" style={{ fontSize: 13 }}>
									{FEATURED_STORY.industry}
								</Text>
							</View>

							<Text
								className="font-bold mb-4 text-foreground"
								style={{
									fontSize: isMobile ? 24 : 28,
									lineHeight: isMobile ? 32 : 38,
								}}
							>
								{FEATURED_STORY.title}
							</Text>

							<Text
								className="text-base italic mb-6 text-muted"
								style={{
									lineHeight: 26,
								}}
							>
								"{FEATURED_STORY.quote}"
							</Text>

							<View className="flex-row items-center gap-3 mb-6">
								<View
									className="items-center justify-center bg-surface-raised"
									style={{
										width: 44,
										height: 44,
										borderRadius: 22,
									}}
								>
									<Ionicons
										className="text-primary"
										name="business"
										size={20}
									/>
								</View>
								<View>
									<Text
										className="font-semibold text-foreground"
										style={{
											fontSize: 15,
										}}
									>
										{FEATURED_STORY.author}
									</Text>
									<Text className="text-muted" style={{ fontSize: 13 }}>
										{FEATURED_STORY.role}, {FEATURED_STORY.name}
									</Text>
								</View>
							</View>

							{/* Metrics */}
							<View
								className="flex-row flex-wrap gap-6 pt-5 border-t border-border"
							>
								{FEATURED_STORY.metrics.map((metric) => (
									<View key={metric.label}>
										<Text
											className="font-bold text-primary"
											style={{
												fontSize: 28,
											}}
										>
											{metric.value}
										</Text>
										<Text
											className="text-muted"
											style={{
												fontSize: 13,
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
			<View className="px-6 pt-12 pb-8">
				<View className="w-full" style={{ maxWidth: 1200, marginHorizontal: "auto" }}>
					<View
						className="justify-between gap-4"
						style={{
							flexDirection: isMobile ? "column" : "row",
							alignItems: isMobile ? "stretch" : "center",
						}}
					>
						{/* Type Filter */}
						<View className="flex-row gap-2">
							{FILTERS.map((filter) => (
								<Pressable
									key={filter.value}
									onPress={() => setSelectedFilter(filter.value)}
									className={cn(
										"rounded-lg border",
										selectedFilter === filter.value
											? "bg-primary border-primary"
											: "bg-background border-border hover:bg-surface-raised"
									)}
									style={{
										paddingHorizontal: 20,
										paddingVertical: 10,
									}}
								>
									<Text
										className={cn(
											"text-sm font-medium",
											selectedFilter === filter.value
												? "text-primary-foreground"
												: "text-foreground"
										)}
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
									className={cn(
										"rounded-full",
										selectedIndustry === industry
											? "bg-foreground"
											: "hover:bg-surface-raised"
									)}
									style={{
										paddingHorizontal: 16,
										paddingVertical: 8,
									}}
								>
									<Text
										className={cn(
											"font-medium",
											selectedIndustry === industry
												? "text-primary-foreground"
												: "text-muted"
										)}
										style={{
											fontSize: 13,
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
			<View className="px-6 pb-16">
				<View className="w-full" style={{ maxWidth: 1200, marginHorizontal: "auto" }}>
					<View className="flex-row flex-wrap gap-6">
						{filteredStories.map((story) => (
							<View
								key={story.name}
								className="overflow-hidden bg-background rounded-2xl border border-border"
								style={{
									width: isMobile ? "100%" : isTablet ? "48%" : "31%",
								}}
							>
								{/* Image */}
								<View
									className="bg-surface-raised"
									style={{
										height: 200,
									}}
								>
									<Image
										source={{ uri: story.image }}
										className="w-full h-full"
										resizeMode="cover"
									/>
									<View
										className="absolute py-1 rounded"
										style={{
											top: 12,
											left: 12,
											paddingHorizontal: 10,
											backgroundColor:
												story.type === "creator"
													? "#1DBF73"
													: "#4F46E5",
										}}
									>
										<Text
											className="font-semibold uppercase text-primary-foreground"
											style={{
												fontSize: 11,
											}}
										>
											{story.type}
										</Text>
									</View>
								</View>

								{/* Content */}
								<View className="p-6">
									<Text
										className="text-lg font-semibold mb-2 text-foreground"
										style={{
											lineHeight: 26,
										}}
									>
										{story.title}
									</Text>

									<Text
										className="text-sm italic mb-4 text-muted"
										style={{
											lineHeight: 22,
										}}
										numberOfLines={3}
									>
										"{story.quote}"
									</Text>

									<View className="flex-row items-center gap-2 mb-4">
										<Text className="text-sm font-medium text-foreground">
											{story.name}
										</Text>
										<Text className="text-muted">·</Text>
										<Text
											className="text-muted"
											style={{
												fontSize: 13,
											}}
										>
											{story.industry}
										</Text>
									</View>

									{/* Metrics */}
									<View className="flex-row justify-between pt-4 border-t border-border">
										{story.metrics.map((metric) => (
											<View key={metric.label} className="items-center">
												<Text
													className="text-lg font-bold"
													style={{
														color:
															story.type === "creator"
																? "#1DBF73"
																: "#4F46E5",
													}}
												>
													{metric.value}
												</Text>
												<Text
													className="text-muted"
													style={{
														fontSize: 11,
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
						<View className="p-12 items-center">
							<Ionicons
								className="text-muted mb-4"
								name="search-outline"
								size={48}
							/>
							<Text className="text-lg font-semibold mb-2 text-foreground">
								No stories found
							</Text>
							<Text className="text-sm text-muted">
								Try adjusting your filters
							</Text>
						</View>
					)}
				</View>
			</View>

			{/* CTA Section */}
			<View className="py-16 px-6 bg-primary">
				<View className="w-full items-center" style={{ maxWidth: 800, marginHorizontal: "auto" }}>
					<Text
						className="font-bold text-center mb-4 text-primary-foreground"
						style={{
							fontSize: isMobile ? 28 : 36,
						}}
					>
						Write Your Success Story
					</Text>
					<Text
						className="text-lg text-center mb-8 text-white/90"
						style={{
							lineHeight: 28,
							maxWidth: 500,
						}}
					>
						Join thousands of creators and brands achieving extraordinary
						results on our platform.
					</Text>
					<View
						className="gap-4"
						style={{ flexDirection: isMobile ? "column" : "row" }}
					>
						<Pressable
							onPress={() => openAuthModal("signup")}
							className="rounded-lg bg-white hover:bg-white/95"
							style={{
								paddingHorizontal: 32,
								paddingVertical: 14,
							}}
						>
							<Text className="text-base font-semibold text-center text-primary">
								Start as a Creator
							</Text>
						</Pressable>
						<Pressable
							onPress={() => openAuthModal("signup")}
							className="rounded-lg border-2 border-white/50 hover:border-primary-foreground"
							style={{
								paddingHorizontal: 32,
								paddingVertical: 14,
							}}
						>
							<Text className="text-base font-semibold text-center text-primary-foreground">
								Post a Brief
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
