import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd } from "@/components/web/SEO";
import { cn } from "@/lib/utils";

// Help topics with icons
const HELP_TOPICS = [
	{
		title: "Getting Started",
		description: "Learn the basics of using our platform",
		icon: "rocket-outline" as const,
		color: "#1DBF73",
		articles: 12,
	},
	{
		title: "Account & Profile",
		description: "Manage your account settings and profile",
		icon: "person-circle-outline" as const,
		color: "#4F46E5",
		articles: 8,
	},
	{
		title: "Payments & Billing",
		description: "Payment methods, invoices, and transactions",
		icon: "card-outline" as const,
		color: "#F59E0B",
		articles: 15,
	},
	{
		title: "Creating Content",
		description: "Tips for creating great UGC content",
		icon: "videocam-outline" as const,
		color: "#EC4899",
		articles: 20,
	},
	{
		title: "Working with Brands",
		description: "Guidelines for brand collaborations",
		icon: "briefcase-outline" as const,
		color: "#06B6D4",
		articles: 10,
	},
	{
		title: "Trust & Safety",
		description: "Security, privacy, and community guidelines",
		icon: "shield-checkmark-outline" as const,
		color: "#8B5CF6",
		articles: 7,
	},
];

// Popular articles
const POPULAR_ARTICLES = [
	{
		title: "How to set up your creator profile",
		category: "Getting Started",
		views: "12.5K",
	},
	{
		title: "Understanding payment schedules and fees",
		category: "Payments",
		views: "8.2K",
	},
	{
		title: "Best practices for responding to briefs",
		category: "Content",
		views: "6.8K",
	},
	{
		title: "How to handle revision requests",
		category: "Working with Brands",
		views: "5.4K",
	},
	{
		title: "Protecting your account with 2FA",
		category: "Trust & Safety",
		views: "4.1K",
	},
];

// Quick action cards
const QUICK_ACTIONS = [
	{
		title: "Contact Support",
		description: "Get help from our team",
		icon: "chatbubbles-outline" as const,
		href: "/contact",
	},
	{
		title: "Creator FAQ",
		description: "Common creator questions",
		icon: "help-circle-outline" as const,
		href: "/creator-faq",
	},
	{
		title: "Brand FAQ",
		description: "Common brand questions",
		icon: "business-outline" as const,
		href: "/brand-faq",
	},
];

export default function HelpCenterPage() {
	const { isMobile, isTablet } = useResponsive();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchFocused, setSearchFocused] = useState(false);

	const columns = isMobile ? 1 : isTablet ? 2 : 3;

	const helpCenterJsonLd = createWebPageJsonLd(
		"Help Center - UGC Marketplace",
		"Find answers to common questions and get support.",
		"/help-center"
	);

	return (
		<ScrollView className="flex-1 bg-background">
			<SEO
				title="Help Center"
				description="Find answers to your questions about UGC Marketplace. Browse help topics, FAQs, and get support for accounts, payments, content creation, and more."
				path="/help-center"
				keywords={[
					"UGC help",
					"support center",
					"FAQ",
					"getting started",
					"platform help",
				]}
				jsonLd={helpCenterJsonLd}
			/>

			{/* Hero Section with Search */}
			<View className="px-6 pt-16 pb-20 bg-foreground">
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
							name="help-buoy-outline"
							size={36}
						/>
					</View>
					<Text
						className="font-bold text-center mb-3 text-primary-foreground"
						style={{
							fontSize: isMobile ? 32 : 44,
						}}
					>
						How can we help you?
					</Text>
					<Text className="text-lg text-center mb-8 text-muted">
						Search our knowledge base or browse topics below
					</Text>

					{/* Search Bar */}
					<View
						className={cn(
							"w-full flex-row items-center bg-background rounded-xl px-5 py-1",
							searchFocused ? "border-2 border-primary" : "border-2 border-transparent"
						)}
						style={{
							maxWidth: 600,
						}}
					>
						<Ionicons
							className="text-muted"
							name="search-outline"
							size={22}
						/>
						<TextInput
							onBlur={() => setSearchFocused(false)}
							onChangeText={setSearchQuery}
							onFocus={() => setSearchFocused(true)}
							placeholder="Search for articles, guides, and more..."
							placeholderTextColor="#62646a"
							className="flex-1 py-4 px-3 text-base text-foreground"
							style={[
								{ outline: "none" } as any,
							]}
							value={searchQuery}
						/>
						{searchQuery.length > 0 && (
							<Pressable onPress={() => setSearchQuery("")}>
								<Ionicons
									className="text-muted"
									name="close-circle"
									size={20}
								/>
							</Pressable>
						)}
					</View>
				</View>
			</View>

			{/* Quick Actions */}
			<View
				className="px-6"
				style={{ marginTop: -40 }}
			>
				<View
					className="w-full gap-4"
					style={{
						maxWidth: 900,
						marginHorizontal: "auto",
						flexDirection: isMobile ? "column" : "row",
					}}
				>
					{QUICK_ACTIONS.map((action) => (
						<Link asChild href={action.href as any} key={action.title}>
							<Pressable className="flex-1 bg-background rounded-xl border border-border overflow-hidden">
								{({ hovered }) => (
									<View
										className={cn(
											"flex-row items-center p-5 gap-4",
											hovered ? "bg-surface-raised" : "bg-background"
										)}
									>
										<View
											className={cn(
												"items-center justify-center rounded-xl",
												hovered ? "bg-primary" : "bg-chip-bg"
											)}
											style={{
												width: 48,
												height: 48,
											}}
										>
											<Ionicons
												className={cn(
													hovered ? "text-primary-foreground" : "text-primary"
												)}
												name={action.icon}
												size={24}
											/>
										</View>
										<View className="flex-1">
											<Text className="text-base font-semibold text-foreground mb-1">
												{action.title}
											</Text>
											<Text
												className="text-muted"
												style={{ fontSize: 13 }}
											>
												{action.description}
											</Text>
										</View>
										<Ionicons
											className={cn(
												hovered ? "text-primary" : "text-muted"
											)}
											name="chevron-forward"
											size={20}
										/>
									</View>
								)}
							</Pressable>
						</Link>
					))}
				</View>
			</View>

			{/* Browse Topics */}
			<View className="py-16 px-6">
				<View
					className="w-full"
					style={{ maxWidth: 1200, marginHorizontal: "auto" }}
				>
					<Text className="text-foreground font-bold text-center mb-3" style={{ fontSize: 28 }}>
						Browse by Topic
					</Text>
					<Text className="text-base text-muted text-center mb-10">
						Find answers organized by category
					</Text>

					<View className="flex-row flex-wrap justify-center" style={{ gap: 20 }}>
						{HELP_TOPICS.map((topic) => (
							<Pressable
								key={topic.title}
								className="bg-background border border-border rounded-2xl"
								style={({ hovered }) => ({
									width: isMobile ? "100%" : isTablet ? "47%" : "31%",
									maxWidth: 380,
									padding: 28,
									borderColor: hovered ? topic.color : undefined,
								})}
							>
								{({ hovered }) => (
									<>
										<View
											className="items-center justify-center rounded-2xl mb-5"
											style={{
												width: 56,
												height: 56,
												backgroundColor: `${topic.color}15`,
											}}
										>
											<Ionicons
												color={topic.color}
												name={topic.icon}
												size={28}
											/>
										</View>
										<Text className="text-xl font-semibold text-foreground mb-2">
											{topic.title}
										</Text>
										<Text
											className="text-sm text-muted mb-4"
											style={{ lineHeight: 22 }}
										>
											{topic.description}
										</Text>
										<View className="flex-row items-center justify-between">
											<Text
												className="text-muted"
												style={{ fontSize: 13 }}
											>
												{topic.articles} articles
											</Text>
											<View className="flex-row items-center gap-1">
												<Text
													className="text-sm font-medium"
													style={{
														color: hovered ? topic.color : undefined,
													}}
												>
													<Text className={cn(!hovered && "text-primary")}>
														Browse
													</Text>
												</Text>
												<Ionicons
													color={hovered ? topic.color : undefined}
													className={cn(!hovered && "text-primary")}
													name="arrow-forward"
													size={16}
												/>
											</View>
										</View>
									</>
								)}
							</Pressable>
						))}
					</View>
				</View>
			</View>

			{/* Popular Articles */}
			<View className="py-16 px-6 bg-surface-raised">
				<View
					className="w-full"
					style={{ maxWidth: 800, marginHorizontal: "auto" }}
				>
					<Text className="text-foreground font-bold text-center mb-3" style={{ fontSize: 28 }}>
						Popular Articles
					</Text>
					<Text className="text-base text-muted text-center mb-10">
						Most viewed help articles this week
					</Text>

					<View className="bg-background rounded-2xl border border-border overflow-hidden">
						{POPULAR_ARTICLES.map((article, index) => (
							<Pressable
								key={article.title}
								className="border-border"
								style={({ hovered }) => ({
									padding: 20,
									borderBottomWidth:
										index < POPULAR_ARTICLES.length - 1 ? 1 : 0,
									backgroundColor: hovered
										? "#fafafa"
										: undefined,
									flexDirection: "row",
									alignItems: "center",
									gap: 16,
								})}
							>
								{({ hovered }) => (
									<>
										<View
											className="items-center justify-center bg-chip-bg"
											style={{
												width: 40,
												height: 40,
												borderRadius: 20,
											}}
										>
											<Ionicons
												className="text-primary"
												name="document-text-outline"
												size={20}
											/>
										</View>
										<View className="flex-1">
											<Text className="text-base font-medium text-foreground mb-1">
												{article.title}
											</Text>
											<View className="flex-row items-center gap-3">
												<Text
													className="font-medium text-primary"
													style={{
														fontSize: 13,
													}}
												>
													{article.category}
												</Text>
												<Text
													className="text-muted"
													style={{ fontSize: 13 }}
												>
													{article.views} views
												</Text>
											</View>
										</View>
										<Ionicons
											className={cn(
												hovered ? "text-primary" : "text-muted"
											)}
											name="chevron-forward"
											size={20}
										/>
									</>
								)}
							</Pressable>
						))}
					</View>
				</View>
			</View>

			{/* Still Need Help CTA */}
			<View className="py-16 px-6">
				<View
					className="w-full items-center p-10 bg-chip-bg border border-primary/20 rounded-[20px]"
					style={{
						maxWidth: 600,
						marginHorizontal: "auto",
					}}
				>
					<Ionicons
						className="text-primary mb-5"
						name="chatbubble-ellipses-outline"
						size={48}
					/>
					<Text className="text-2xl font-bold text-foreground text-center mb-3">
						Still need help?
					</Text>
					<Text
						className="text-base text-muted text-center mb-6"
						style={{ lineHeight: 24 }}
					>
						Our support team is available 24/7 to assist you with any questions
						or issues.
					</Text>
					<Link asChild href={"/contact" as any}>
						<Pressable
							className="px-8 rounded-lg bg-primary hover:bg-hover-primary"
							style={{
								paddingVertical: 14,
							}}
						>
							<Text className="text-base font-semibold text-primary-foreground">
								Contact Support
							</Text>
						</Pressable>
					</Link>
				</View>
			</View>
		</ScrollView>
	);
}
