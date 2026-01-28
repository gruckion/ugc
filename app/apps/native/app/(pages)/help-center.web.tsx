import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
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
		<ScrollView style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
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
			<View
				style={{
					paddingTop: 64,
					paddingBottom: 80,
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
							name="help-buoy-outline"
							size={36}
						/>
					</View>
					<Text
						style={{
							fontSize: isMobile ? 32 : 44,
							fontWeight: "700",
							color: THEME_COLORS.primaryForeground,
							textAlign: "center",
							marginBottom: 12,
						}}
					>
						How can we help you?
					</Text>
					<Text
						style={{
							fontSize: 18,
							color: "#a0a0a0",
							textAlign: "center",
							marginBottom: 32,
						}}
					>
						Search our knowledge base or browse topics below
					</Text>

					{/* Search Bar */}
					<View
						style={{
							width: "100%",
							maxWidth: 600,
							flexDirection: "row",
							alignItems: "center",
							backgroundColor: THEME_COLORS.background,
							borderRadius: 12,
							paddingHorizontal: 20,
							paddingVertical: 4,
							borderWidth: 2,
							borderColor: searchFocused
								? THEME_COLORS.primary
								: "transparent",
						}}
					>
						<Ionicons
							color={THEME_COLORS.muted}
							name="search-outline"
							size={22}
						/>
						<TextInput
							onBlur={() => setSearchFocused(false)}
							onChangeText={setSearchQuery}
							onFocus={() => setSearchFocused(true)}
							placeholder="Search for articles, guides, and more..."
							placeholderTextColor={THEME_COLORS.muted}
							style={[
								{
									flex: 1,
									paddingVertical: 16,
									paddingHorizontal: 12,
									fontSize: 16,
									color: THEME_COLORS.foreground,
								},
								// Remove native focus outline since container has custom focus indicator
								{ outline: "none" } as any,
							]}
							value={searchQuery}
						/>
						{searchQuery.length > 0 && (
							<Pressable onPress={() => setSearchQuery("")}>
								<Ionicons
									color={THEME_COLORS.muted}
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
				style={{
					paddingHorizontal: 24,
					marginTop: -40,
				}}
			>
				<View
					style={{
						maxWidth: 900,
						marginHorizontal: "auto",
						width: "100%",
						flexDirection: isMobile ? "column" : "row",
						gap: 16,
					}}
				>
					{QUICK_ACTIONS.map((action) => (
						<Link asChild href={action.href as any} key={action.title}>
							<Pressable
								style={{
									flex: 1,
									backgroundColor: THEME_COLORS.background,
									borderRadius: 12,
									borderWidth: 1,
									borderColor: THEME_COLORS.border,
									overflow: "hidden",
								}}
							>
								{({ hovered }) => (
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											padding: 20,
											gap: 16,
											backgroundColor: hovered
												? THEME_COLORS.sectionBackground
												: THEME_COLORS.background,
											borderWidth: hovered ? 0 : 0,
										}}
									>
										<View
											style={{
												width: 48,
												height: 48,
												borderRadius: 12,
												backgroundColor: hovered
													? THEME_COLORS.primary
													: `${THEME_COLORS.primary}15`,
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Ionicons
												color={
													hovered
														? THEME_COLORS.primaryForeground
														: THEME_COLORS.primary
												}
												name={action.icon}
												size={24}
											/>
										</View>
										<View style={{ flex: 1 }}>
											<Text
												style={{
													fontSize: 16,
													fontWeight: "600",
													color: THEME_COLORS.foreground,
													marginBottom: 4,
												}}
											>
												{action.title}
											</Text>
											<Text
												style={{
													fontSize: 13,
													color: THEME_COLORS.muted,
												}}
											>
												{action.description}
											</Text>
										</View>
										<Ionicons
											color={
												hovered ? THEME_COLORS.primary : THEME_COLORS.muted
											}
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
			<View
				style={{
					paddingVertical: 64,
					paddingHorizontal: 24,
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
							fontSize: 28,
							fontWeight: "700",
							color: THEME_COLORS.foreground,
							textAlign: "center",
							marginBottom: 12,
						}}
					>
						Browse by Topic
					</Text>
					<Text
						style={{
							fontSize: 16,
							color: THEME_COLORS.muted,
							textAlign: "center",
							marginBottom: 40,
						}}
					>
						Find answers organized by category
					</Text>

					<View
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							gap: 20,
							justifyContent: "center",
						}}
					>
						{HELP_TOPICS.map((topic) => (
							<Pressable
								key={topic.title}
								style={({ hovered }) => ({
									width: isMobile ? "100%" : isTablet ? "47%" : "31%",
									maxWidth: 380,
									padding: 28,
									borderRadius: 16,
									backgroundColor: THEME_COLORS.background,
									borderWidth: 1,
									borderColor: hovered ? topic.color : THEME_COLORS.border,
								})}
							>
								{({ hovered }) => (
									<>
										<View
											style={{
												width: 56,
												height: 56,
												borderRadius: 16,
												backgroundColor: `${topic.color}15`,
												alignItems: "center",
												justifyContent: "center",
												marginBottom: 20,
											}}
										>
											<Ionicons
												color={topic.color}
												name={topic.icon}
												size={28}
											/>
										</View>
										<Text
											style={{
												fontSize: 20,
												fontWeight: "600",
												color: THEME_COLORS.foreground,
												marginBottom: 8,
											}}
										>
											{topic.title}
										</Text>
										<Text
											style={{
												fontSize: 14,
												color: THEME_COLORS.muted,
												lineHeight: 22,
												marginBottom: 16,
											}}
										>
											{topic.description}
										</Text>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<Text
												style={{
													fontSize: 13,
													color: THEME_COLORS.muted,
												}}
											>
												{topic.articles} articles
											</Text>
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
													gap: 4,
												}}
											>
												<Text
													style={{
														fontSize: 14,
														fontWeight: "500",
														color: hovered ? topic.color : THEME_COLORS.primary,
													}}
												>
													Browse
												</Text>
												<Ionicons
													color={hovered ? topic.color : THEME_COLORS.primary}
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
			<View
				style={{
					paddingVertical: 64,
					paddingHorizontal: 24,
					backgroundColor: THEME_COLORS.sectionBackground,
				}}
			>
				<View
					style={{
						maxWidth: 800,
						marginHorizontal: "auto",
						width: "100%",
					}}
				>
					<Text
						style={{
							fontSize: 28,
							fontWeight: "700",
							color: THEME_COLORS.foreground,
							textAlign: "center",
							marginBottom: 12,
						}}
					>
						Popular Articles
					</Text>
					<Text
						style={{
							fontSize: 16,
							color: THEME_COLORS.muted,
							textAlign: "center",
							marginBottom: 40,
						}}
					>
						Most viewed help articles this week
					</Text>

					<View
						style={{
							backgroundColor: THEME_COLORS.background,
							borderRadius: 16,
							borderWidth: 1,
							borderColor: THEME_COLORS.border,
							overflow: "hidden",
						}}
					>
						{POPULAR_ARTICLES.map((article, index) => (
							<Pressable
								key={article.title}
								style={({ hovered }) => ({
									padding: 20,
									borderBottomWidth:
										index < POPULAR_ARTICLES.length - 1 ? 1 : 0,
									borderBottomColor: THEME_COLORS.border,
									backgroundColor: hovered
										? THEME_COLORS.sectionBackground
										: THEME_COLORS.background,
									flexDirection: "row",
									alignItems: "center",
									gap: 16,
								})}
							>
								{({ hovered }) => (
									<>
										<View
											style={{
												width: 40,
												height: 40,
												borderRadius: 20,
												backgroundColor: `${THEME_COLORS.primary}15`,
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Ionicons
												color={THEME_COLORS.primary}
												name="document-text-outline"
												size={20}
											/>
										</View>
										<View style={{ flex: 1 }}>
											<Text
												style={{
													fontSize: 16,
													fontWeight: "500",
													color: THEME_COLORS.foreground,
													marginBottom: 4,
												}}
											>
												{article.title}
											</Text>
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
													gap: 12,
												}}
											>
												<Text
													style={{
														fontSize: 13,
														color: THEME_COLORS.primary,
														fontWeight: "500",
													}}
												>
													{article.category}
												</Text>
												<Text
													style={{
														fontSize: 13,
														color: THEME_COLORS.muted,
													}}
												>
													{article.views} views
												</Text>
											</View>
										</View>
										<Ionicons
											color={
												hovered ? THEME_COLORS.primary : THEME_COLORS.muted
											}
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
			<View
				style={{
					paddingVertical: 64,
					paddingHorizontal: 24,
				}}
			>
				<View
					style={{
						maxWidth: 600,
						marginHorizontal: "auto",
						width: "100%",
						alignItems: "center",
						padding: 40,
						borderRadius: 20,
						backgroundColor: `${THEME_COLORS.primary}08`,
						borderWidth: 1,
						borderColor: `${THEME_COLORS.primary}20`,
					}}
				>
					<Ionicons
						color={THEME_COLORS.primary}
						name="chatbubble-ellipses-outline"
						size={48}
						style={{ marginBottom: 20 }}
					/>
					<Text
						style={{
							fontSize: 24,
							fontWeight: "700",
							color: THEME_COLORS.foreground,
							textAlign: "center",
							marginBottom: 12,
						}}
					>
						Still need help?
					</Text>
					<Text
						style={{
							fontSize: 16,
							color: THEME_COLORS.muted,
							textAlign: "center",
							marginBottom: 24,
							lineHeight: 24,
						}}
					>
						Our support team is available 24/7 to assist you with any questions
						or issues.
					</Text>
					<Link asChild href={"/contact" as any}>
						<Pressable
							style={({ hovered }) => ({
								paddingHorizontal: 32,
								paddingVertical: 14,
								backgroundColor: hovered ? "#19a864" : THEME_COLORS.primary,
								borderRadius: 8,
							})}
						>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "600",
									color: THEME_COLORS.primaryForeground,
								}}
							>
								Contact Support
							</Text>
						</Pressable>
					</Link>
				</View>
			</View>
		</ScrollView>
	);
}
