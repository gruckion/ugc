import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createFAQPageJsonLd } from "@/components/web/SEO";

// Fiverr-style theme colors
const THEME_COLORS = {
	primary: "#1DBF73",
	primaryForeground: "#FFFFFF",
	foreground: "#222325",
	muted: "#62646a",
	border: "#e4e5e7",
	background: "#FFFFFF",
	sectionBackground: "#fafafa",
	accent: "#4F46E5",
};

// FAQ Categories with questions
const FAQ_CATEGORIES = [
	{
		title: "Finding the Right Creators",
		icon: "search-outline" as const,
		questions: [
			{
				question: "How do I find creators that match my brand?",
				answer:
					"Use our advanced search filters to find creators by niche, audience demographics, content style, and price range. You can also browse curated collections or post a brief to receive applications from interested creators.",
			},
			{
				question: "Can I see examples of a creator's previous work?",
				answer:
					"Yes! Every creator has a portfolio showcasing their best work, including videos, photos, and campaign results. You can also view their ratings, reviews, and completion statistics from previous brand collaborations.",
			},
			{
				question: "What if I need multiple creators for a campaign?",
				answer:
					"Our platform supports multi-creator campaigns. Post a single brief and select multiple creators, or use our Enterprise plan for managed campaigns with dedicated support and bulk pricing.",
			},
			{
				question: "Can I request custom samples before committing?",
				answer:
					"Many creators offer paid test content options. You can also review their existing portfolio and reviews. For larger campaigns, consider starting with a small test project before scaling up.",
			},
		],
	},
	{
		title: "Brief Creation & Requirements",
		icon: "document-text-outline" as const,
		questions: [
			{
				question: "What should I include in my brief?",
				answer:
					"A great brief includes: product description, target audience, content format (video length, dimensions), key messages, do's and don'ts, example references, and delivery timeline. The more detail you provide, the better results you'll get.",
			},
			{
				question: "Can I set specific requirements for creators?",
				answer:
					"Absolutely! You can specify minimum follower counts, demographic requirements, content style preferences, equipment requirements, and more. You can also require creators to be from specific locations or speak certain languages.",
			},
			{
				question: "How do I share brand assets with creators?",
				answer:
					"Upload brand guidelines, logos, product images, and other assets directly to your brief. Creators can securely access these materials once they accept the project. We support all common file formats.",
			},
			{
				question: "Can I make changes to a brief after posting?",
				answer:
					"You can edit briefs before creators start working. Once work begins, major changes may require creator agreement and potential timeline adjustments. Minor clarifications are always welcome.",
			},
		],
	},
	{
		title: "Pricing & Budgets",
		icon: "pricetag-outline" as const,
		questions: [
			{
				question: "How much does UGC content typically cost?",
				answer:
					"Prices vary based on content type, creator experience, and usage rights. Simple product photos start around $50, while professional video content ranges from $150-500+. Our platform shows transparent pricing upfront.",
			},
			{
				question: "What's included in the creator's price?",
				answer:
					"Typically includes content creation, 1-2 revision rounds, and basic usage rights for social media. Extended usage rights, raw files, whitelisting, and rush delivery may cost extra—these are clearly listed on creator profiles.",
			},
			{
				question: "Is there a minimum budget requirement?",
				answer:
					"No minimum budget required for individual projects. For Enterprise plans with dedicated support and volume discounts, we recommend monthly budgets of $5,000+. Contact our sales team for custom pricing.",
			},
			{
				question: "How does payment protection work?",
				answer:
					"Your payment is held in secure escrow when you post a brief. Funds are only released to creators after you approve the final delivery. This protects both parties and ensures quality work.",
			},
		],
	},
	{
		title: "Review & Approval Process",
		icon: "checkmark-circle-outline" as const,
		questions: [
			{
				question: "How many revisions can I request?",
				answer:
					"Most projects include 1-2 revision rounds as standard. Revisions should address items covered in your original brief. Scope changes or new requirements may incur additional costs—always communicate clearly with your creator.",
			},
			{
				question: "What if I'm not satisfied with the content?",
				answer:
					"Start by communicating specific feedback to your creator. Most issues can be resolved through clear revision requests. If problems persist, our dispute resolution team can mediate. We have a satisfaction guarantee for qualifying cases.",
			},
			{
				question: "How long do I have to review deliveries?",
				answer:
					"You have 7 days to review and request revisions or approve the content. After 7 days without response, the delivery is auto-approved and payment is released. Extensions are available for complex projects.",
			},
			{
				question: "Can I approve some content and request changes on others?",
				answer:
					"Yes! For multi-deliverable projects, you can approve individual pieces while requesting revisions on others. This keeps projects moving forward efficiently.",
			},
		],
	},
	{
		title: "Rights & Usage",
		icon: "shield-outline" as const,
		questions: [
			{
				question: "What usage rights do I get?",
				answer:
					"Standard packages include perpetual usage rights for organic social media. Paid advertising, TV commercials, print materials, and other extended uses require additional licensing—pricing is transparent on each creator's profile.",
			},
			{
				question: "Can I use the content in paid advertisements?",
				answer:
					"Yes, with the appropriate license. Ad usage rights are available as add-ons or included in premium packages. This covers paid social, display ads, and other promotional use. Whitelisting (running ads from creator accounts) is also available.",
			},
			{
				question: "Do I need to credit the creator when using content?",
				answer:
					"For organic social posts, attribution is appreciated but not required unless specified. For testimonials, FTC guidelines may require disclosure. Always check local advertising regulations for your market.",
			},
			{
				question: "Can I edit the content after delivery?",
				answer:
					"Basic editing (trimming, adding music/text overlays) is typically allowed. Substantial modifications may require creator approval. Raw files are often available for additional licensing if you need full editing flexibility.",
			},
		],
	},
];

// Related resources
const RELATED_RESOURCES = [
	{
		title: "Creator FAQ",
		description: "Common creator questions",
		href: "/creator-faq",
		icon: "videocam-outline" as const,
	},
	{
		title: "Help Center",
		description: "Browse all help topics",
		href: "/help-center",
		icon: "help-buoy-outline" as const,
	},
	{
		title: "Contact Sales",
		description: "Enterprise inquiries",
		href: "/contact",
		icon: "briefcase-outline" as const,
	},
];

// Stats for brands
const BRAND_STATS = [
	{ value: "10K+", label: "Brands Trust Us" },
	{ value: "48hr", label: "Avg. Delivery" },
	{ value: "98%", label: "Satisfaction Rate" },
];

export default function BrandFAQPage() {
	const { isMobile } = useResponsive();
	const { open: openAuthModal } = useAuthModal();
	const [expandedCategory, setExpandedCategory] = useState<string | null>(
		FAQ_CATEGORIES[0].title,
	);
	const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
		new Set(),
	);

	const toggleCategory = (title: string) => {
		setExpandedCategory(expandedCategory === title ? null : title);
	};

	const toggleQuestion = (question: string) => {
		const newExpanded = new Set(expandedQuestions);
		if (newExpanded.has(question)) {
			newExpanded.delete(question);
		} else {
			newExpanded.add(question);
		}
		setExpandedQuestions(newExpanded);
	};

	// Extract all FAQs for JSON-LD
	const allFaqs = FAQ_CATEGORIES.flatMap((cat) =>
		cat.questions.map((q) => ({ question: q.question, answer: q.answer }))
	);
	const brandFaqJsonLd = createFAQPageJsonLd(allFaqs);

	return (
		<ScrollView style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
			<SEO
				title="Brand FAQ"
				description="Frequently asked questions for brands using UGC Marketplace. Learn about finding creators, managing projects, payments, content rights, and more."
				path="/brand-faq"
				keywords={[
					"brand FAQ",
					"UGC for brands",
					"hiring creators",
					"content marketing FAQ",
					"brand questions",
				]}
				jsonLd={brandFaqJsonLd}
			/>
			{/* Hero Section */}
			<View
				style={{
					paddingTop: 64,
					paddingBottom: 64,
					paddingHorizontal: 24,
					backgroundColor: THEME_COLORS.accent,
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
							backgroundColor: "rgba(255,255,255,0.2)",
							alignItems: "center",
							justifyContent: "center",
							marginBottom: 24,
						}}
					>
						<Ionicons
							color={THEME_COLORS.primaryForeground}
							name="business-outline"
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
						Brand FAQ
					</Text>
					<Text
						style={{
							fontSize: 18,
							color: "rgba(255,255,255,0.9)",
							textAlign: "center",
							maxWidth: 600,
							lineHeight: 28,
						}}
					>
						Everything you need to know about working with creators, managing
						campaigns, and getting great UGC content for your brand.
					</Text>
				</View>
			</View>

			{/* Stats Bar */}
			<View
				style={{
					paddingVertical: 24,
					paddingHorizontal: 24,
					backgroundColor: THEME_COLORS.foreground,
				}}
			>
				<View
					style={{
						maxWidth: 600,
						marginHorizontal: "auto",
						width: "100%",
						flexDirection: isMobile ? "column" : "row",
						justifyContent: "space-around",
						alignItems: "center",
						gap: isMobile ? 20 : 0,
					}}
				>
					{BRAND_STATS.map((stat) => (
						<View key={stat.label} style={{ alignItems: "center" }}>
							<Text
								style={{
									fontSize: 32,
									fontWeight: "700",
									color: THEME_COLORS.primary,
								}}
							>
								{stat.value}
							</Text>
							<Text
								style={{
									fontSize: 13,
									color: "#a0a0a0",
									textTransform: "uppercase",
									letterSpacing: 1,
								}}
							>
								{stat.label}
							</Text>
						</View>
					))}
				</View>
			</View>

			{/* Main Content */}
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
						flexDirection: isMobile ? "column" : "row",
						gap: 48,
					}}
				>
					{/* FAQ Accordion */}
					<View style={{ flex: 1 }}>
						{FAQ_CATEGORIES.map((category) => (
							<View
								key={category.title}
								style={{
									marginBottom: 16,
									borderRadius: 16,
									borderWidth: 1,
									borderColor:
										expandedCategory === category.title
											? THEME_COLORS.accent
											: THEME_COLORS.border,
									overflow: "hidden",
								}}
							>
								{/* Category Header */}
								<Pressable
									onPress={() => toggleCategory(category.title)}
									style={({ hovered }) => ({
										padding: 24,
										backgroundColor:
											expandedCategory === category.title
												? `${THEME_COLORS.accent}08`
												: hovered
													? THEME_COLORS.sectionBackground
													: THEME_COLORS.background,
										flexDirection: "row",
										alignItems: "center",
										gap: 16,
									})}
								>
									<View
										style={{
											width: 48,
											height: 48,
											borderRadius: 12,
											backgroundColor:
												expandedCategory === category.title
													? THEME_COLORS.accent
													: `${THEME_COLORS.accent}15`,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Ionicons
											color={
												expandedCategory === category.title
													? THEME_COLORS.primaryForeground
													: THEME_COLORS.accent
											}
											name={category.icon}
											size={24}
										/>
									</View>
									<View style={{ flex: 1 }}>
										<Text
											style={{
												fontSize: 18,
												fontWeight: "600",
												color: THEME_COLORS.foreground,
											}}
										>
											{category.title}
										</Text>
										<Text
											style={{
												fontSize: 14,
												color: THEME_COLORS.muted,
												marginTop: 2,
											}}
										>
											{category.questions.length} questions
										</Text>
									</View>
									<Ionicons
										color={THEME_COLORS.muted}
										name={
											expandedCategory === category.title
												? "chevron-up"
												: "chevron-down"
										}
										size={24}
									/>
								</Pressable>

								{/* Questions */}
								{expandedCategory === category.title && (
									<View
										style={{
											borderTopWidth: 1,
											borderTopColor: THEME_COLORS.border,
										}}
									>
										{category.questions.map((item, questionIndex) => (
											<View
												key={item.question}
												style={{
													borderBottomWidth:
														questionIndex < category.questions.length - 1
															? 1
															: 0,
													borderBottomColor: THEME_COLORS.border,
												}}
											>
												<Pressable
													onPress={() => toggleQuestion(item.question)}
													style={({ hovered }) => ({
														padding: 20,
														paddingLeft: 24,
														backgroundColor: hovered
															? THEME_COLORS.sectionBackground
															: THEME_COLORS.background,
														flexDirection: "row",
														alignItems: "flex-start",
														gap: 12,
													})}
												>
													<Ionicons
														color={
															expandedQuestions.has(item.question)
																? THEME_COLORS.accent
																: THEME_COLORS.muted
														}
														name={
															expandedQuestions.has(item.question)
																? "remove-circle"
																: "add-circle"
														}
														size={22}
														style={{ marginTop: 2 }}
													/>
													<Text
														style={{
															flex: 1,
															fontSize: 16,
															fontWeight: "500",
															color: THEME_COLORS.foreground,
															lineHeight: 24,
														}}
													>
														{item.question}
													</Text>
												</Pressable>

												{expandedQuestions.has(item.question) && (
													<View
														style={{
															paddingHorizontal: 24,
															paddingBottom: 20,
															paddingLeft: 58,
														}}
													>
														<Text
															style={{
																fontSize: 15,
																color: THEME_COLORS.muted,
																lineHeight: 26,
															}}
														>
															{item.answer}
														</Text>
													</View>
												)}
											</View>
										))}
									</View>
								)}
							</View>
						))}
					</View>

					{/* Sidebar */}
					<View
						style={{
							width: isMobile ? "100%" : 320,
							gap: 24,
						}}
					>
						{/* Related Resources */}
						<View
							style={{
								padding: 24,
								borderRadius: 16,
								backgroundColor: THEME_COLORS.sectionBackground,
								borderWidth: 1,
								borderColor: THEME_COLORS.border,
							}}
						>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "600",
									color: THEME_COLORS.foreground,
									marginBottom: 20,
								}}
							>
								Related Resources
							</Text>
							{RELATED_RESOURCES.map((resource, index) => (
								<Link
									asChild
									href={resource.href as any}
									key={resource.title}
								>
									<Pressable
										style={{
											flexDirection: "row",
											alignItems: "center",
											gap: 12,
											paddingVertical: 12,
											borderTopWidth: index > 0 ? 1 : 0,
											borderTopColor: THEME_COLORS.border,
										}}
									>
										{({ hovered: isHovered }) => (
											<>
												<View
													style={{
														width: 40,
														height: 40,
														borderRadius: 10,
														backgroundColor: isHovered
															? THEME_COLORS.accent
															: THEME_COLORS.background,
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													<Ionicons
														color={
															isHovered
																? THEME_COLORS.primaryForeground
																: THEME_COLORS.accent
														}
														name={resource.icon}
														size={20}
													/>
												</View>
												<View style={{ flex: 1 }}>
													<Text
														style={{
															fontSize: 15,
															fontWeight: "500",
															color: isHovered
																? THEME_COLORS.accent
																: THEME_COLORS.foreground,
														}}
													>
														{resource.title}
													</Text>
													<Text
														style={{
															fontSize: 13,
															color: THEME_COLORS.muted,
														}}
													>
														{resource.description}
													</Text>
												</View>
												<Ionicons
													color={THEME_COLORS.muted}
													name="chevron-forward"
													size={18}
												/>
											</>
										)}
									</Pressable>
								</Link>
							))}
						</View>

						{/* Benefits Card */}
						<View
							style={{
								padding: 24,
								borderRadius: 16,
								backgroundColor: `${THEME_COLORS.accent}08`,
								borderWidth: 1,
								borderColor: `${THEME_COLORS.accent}20`,
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
								<Ionicons
									color={THEME_COLORS.accent}
									name="star-outline"
									size={24}
								/>
								<Text
									style={{
										fontSize: 18,
										fontWeight: "600",
										color: THEME_COLORS.foreground,
									}}
								>
									Why Brands Choose Us
								</Text>
							</View>
							<View style={{ gap: 12 }}>
								{[
									"Verified creators with proven track records",
									"Secure escrow payments protect your investment",
									"Dedicated support for Enterprise accounts",
								].map((benefit, index) => (
									<View
										key={index}
										style={{
											flexDirection: "row",
											alignItems: "flex-start",
											gap: 8,
										}}
									>
										<Ionicons
											color={THEME_COLORS.accent}
											name="checkmark-circle"
											size={18}
											style={{ marginTop: 2 }}
										/>
										<Text
											style={{
												flex: 1,
												fontSize: 14,
												color: THEME_COLORS.muted,
												lineHeight: 22,
											}}
										>
											{benefit}
										</Text>
									</View>
								))}
							</View>
						</View>

						{/* CTA Card */}
						<View
							style={{
								padding: 24,
								borderRadius: 16,
								backgroundColor: THEME_COLORS.accent,
							}}
						>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "600",
									color: THEME_COLORS.primaryForeground,
									marginBottom: 8,
								}}
							>
								Ready to get started?
							</Text>
							<Text
								style={{
									fontSize: 14,
									color: "rgba(255,255,255,0.8)",
									marginBottom: 20,
									lineHeight: 22,
								}}
							>
								Post your first brief and connect with top creators today.
							</Text>
							<Pressable
								onPress={() => openAuthModal("signup")}
								style={({ hovered }) => ({
									padding: 14,
									borderRadius: 8,
									backgroundColor: hovered
										? "rgba(255,255,255,0.95)"
										: THEME_COLORS.primaryForeground,
									alignItems: "center",
								})}
							>
								<Text
									style={{
										fontSize: 15,
										fontWeight: "600",
										color: THEME_COLORS.accent,
									}}
								>
									Post a Brief
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</View>

			{/* Bottom CTA */}
			<View
				style={{
					paddingVertical: 64,
					paddingHorizontal: 24,
					backgroundColor: THEME_COLORS.sectionBackground,
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
						color={THEME_COLORS.accent}
						name="headset-outline"
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
						Need personalized help?
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
						Our brand partnerships team is ready to help you find the perfect
						creators.
					</Text>
					<Link asChild href={"/contact" as any}>
						<Pressable
							style={({ hovered }) => ({
								paddingHorizontal: 32,
								paddingVertical: 14,
								backgroundColor: hovered ? "#4338CA" : THEME_COLORS.accent,
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
								Contact Brand Support
							</Text>
						</Pressable>
					</Link>
				</View>
			</View>
		</ScrollView>
	);
}
