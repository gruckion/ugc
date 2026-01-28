import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createFAQPageJsonLd } from "@/components/web/SEO";
import { cn } from "@/lib/utils";

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

// Accent color used throughout this page
const ACCENT_COLOR = "#4F46E5";
const ACCENT_HOVER = "#4338CA";

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
		<ScrollView className="flex-1 bg-background">
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
				className="py-16 px-6"
				style={{ backgroundColor: ACCENT_COLOR }}
			>
				<View className="max-w-[800px] mx-auto w-full items-center">
					<View
						className="w-[72px] h-[72px] rounded-full items-center justify-center mb-6"
						style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
					>
						<Ionicons
							name="business-outline"
							size={36}
							className="text-primary-foreground"
						/>
					</View>
					<Text
						className="font-bold text-center mb-3 text-primary-foreground"
						style={{ fontSize: isMobile ? 32 : 44 }}
					>
						Brand FAQ
					</Text>
					<Text
						className="text-lg text-center max-w-[600px]"
						style={{
							color: "rgba(255,255,255,0.9)",
							lineHeight: 28,
						}}
					>
						Everything you need to know about working with creators, managing
						campaigns, and getting great UGC content for your brand.
					</Text>
				</View>
			</View>

			{/* Stats Bar */}
			<View className="py-6 px-6 bg-foreground">
				<View
					className="max-w-[600px] mx-auto w-full justify-around items-center"
					style={{
						flexDirection: isMobile ? "column" : "row",
						gap: isMobile ? 20 : 0,
					}}
				>
					{BRAND_STATS.map((stat) => (
						<View key={stat.label} className="items-center">
							<Text className="text-[32px] font-bold text-primary">
								{stat.value}
							</Text>
							<Text
								className="text-[13px] uppercase tracking-wide text-muted"
								style={{ letterSpacing: 1 }}
							>
								{stat.label}
							</Text>
						</View>
					))}
				</View>
			</View>

			{/* Main Content */}
			<View className="py-16 px-6">
				<View
					className="max-w-[1200px] mx-auto w-full gap-12"
					style={{ flexDirection: isMobile ? "column" : "row" }}
				>
					{/* FAQ Accordion */}
					<View className="flex-1">
						{FAQ_CATEGORIES.map((category) => (
							<View
								key={category.title}
								className={cn(
									"mb-4 rounded-2xl overflow-hidden border",
									expandedCategory === category.title
										? ""
										: "border-border"
								)}
								style={{
									borderColor:
										expandedCategory === category.title
											? ACCENT_COLOR
											: undefined,
								}}
							>
								{/* Category Header */}
								<Pressable
									onPress={() => toggleCategory(category.title)}
									className={cn(
										"flex-row items-center gap-4 p-6",
										expandedCategory === category.title
											? ""
											: "bg-background hover:bg-surface-raised"
									)}
									style={
										expandedCategory === category.title
											? { backgroundColor: `${ACCENT_COLOR}08` }
											: undefined
									}
								>
									<View
										className="w-12 h-12 rounded-xl items-center justify-center"
										style={{
											backgroundColor:
												expandedCategory === category.title
													? ACCENT_COLOR
													: `${ACCENT_COLOR}15`,
										}}
									>
										<Ionicons
											color={
												expandedCategory === category.title
													? "#FFFFFF"
													: ACCENT_COLOR
											}
											name={category.icon}
											size={24}
										/>
									</View>
									<View className="flex-1">
										<Text className="text-lg font-semibold text-foreground">
											{category.title}
										</Text>
										<Text className="text-sm text-muted mt-0.5">
											{category.questions.length} questions
										</Text>
									</View>
									<Ionicons
										name={
											expandedCategory === category.title
												? "chevron-up"
												: "chevron-down"
										}
										size={24}
										className="text-muted"
									/>
								</Pressable>

								{/* Questions */}
								{expandedCategory === category.title && (
									<View className="border-t border-border">
										{category.questions.map((item, questionIndex) => (
											<View
												key={item.question}
												className={cn(
													questionIndex < category.questions.length - 1
														? "border-b border-border"
														: ""
												)}
											>
												<Pressable
													onPress={() => toggleQuestion(item.question)}
													className="flex-row items-start gap-3 p-5 pl-6 bg-background hover:bg-surface-raised"
												>
													<Ionicons
														color={
															expandedQuestions.has(item.question)
																? ACCENT_COLOR
																: undefined
														}
														name={
															expandedQuestions.has(item.question)
																? "remove-circle"
																: "add-circle"
														}
														size={22}
														style={{ marginTop: 2 }}
														className={cn(
															expandedQuestions.has(item.question)
																? ""
																: "text-muted"
														)}
													/>
													<Text
														className="flex-1 text-base font-medium text-foreground"
														style={{ lineHeight: 24 }}
													>
														{item.question}
													</Text>
												</Pressable>

												{expandedQuestions.has(item.question) && (
													<View
														className="px-6 pb-5"
														style={{ paddingLeft: 58 }}
													>
														<Text
															className="text-[15px] text-muted"
															style={{ lineHeight: 26 }}
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
						className="gap-6"
						style={{ width: isMobile ? "100%" : 320 }}
					>
						{/* Related Resources */}
						<View className="p-6 rounded-2xl bg-surface-raised border border-border">
							<Text className="text-lg font-semibold text-foreground mb-5">
								Related Resources
							</Text>
							{RELATED_RESOURCES.map((resource, index) => (
								<Link
									asChild
									href={resource.href as any}
									key={resource.title}
								>
									<Pressable
										className={cn(
											"flex-row items-center gap-3 py-3",
											index > 0 ? "border-t border-border" : ""
										)}
									>
										{({ hovered: isHovered }) => (
											<>
												<View
													className={cn(
														"w-10 h-10 rounded-[10px] items-center justify-center",
														isHovered ? "" : "bg-background"
													)}
													style={
														isHovered
															? { backgroundColor: ACCENT_COLOR }
															: undefined
													}
												>
													<Ionicons
														color={
															isHovered
																? "#FFFFFF"
																: ACCENT_COLOR
														}
														name={resource.icon}
														size={20}
													/>
												</View>
												<View className="flex-1">
													<Text
														className={cn(
															"text-[15px] font-medium",
															isHovered ? "" : "text-foreground"
														)}
														style={
															isHovered
																? { color: ACCENT_COLOR }
																: undefined
														}
													>
														{resource.title}
													</Text>
													<Text className="text-[13px] text-muted">
														{resource.description}
													</Text>
												</View>
												<Ionicons
													name="chevron-forward"
													size={18}
													className="text-muted"
												/>
											</>
										)}
									</Pressable>
								</Link>
							))}
						</View>

						{/* Benefits Card */}
						<View
							className="p-6 rounded-2xl"
							style={{
								backgroundColor: `${ACCENT_COLOR}08`,
								borderWidth: 1,
								borderColor: `${ACCENT_COLOR}20`,
							}}
						>
							<View className="flex-row items-center gap-3 mb-4">
								<Ionicons
									color={ACCENT_COLOR}
									name="star-outline"
									size={24}
								/>
								<Text className="text-lg font-semibold text-foreground">
									Why Brands Choose Us
								</Text>
							</View>
							<View className="gap-3">
								{[
									"Verified creators with proven track records",
									"Secure escrow payments protect your investment",
									"Dedicated support for Enterprise accounts",
								].map((benefit, index) => (
									<View
										key={index}
										className="flex-row items-start gap-2"
									>
										<Ionicons
											color={ACCENT_COLOR}
											name="checkmark-circle"
											size={18}
											style={{ marginTop: 2 }}
										/>
										<Text
											className="flex-1 text-sm text-muted"
											style={{ lineHeight: 22 }}
										>
											{benefit}
										</Text>
									</View>
								))}
							</View>
						</View>

						{/* CTA Card */}
						<View
							className="p-6 rounded-2xl"
							style={{ backgroundColor: ACCENT_COLOR }}
						>
							<Text className="text-lg font-semibold mb-2 text-primary-foreground">
								Ready to get started?
							</Text>
							<Text
								className="text-sm mb-5"
								style={{
									color: "rgba(255,255,255,0.8)",
									lineHeight: 22,
								}}
							>
								Post your first brief and connect with top creators today.
							</Text>
							<Pressable
								onPress={() => openAuthModal("signup")}
								className="items-center"
								style={({ hovered }) => ({
									padding: 14,
									borderRadius: 8,
									backgroundColor: hovered
										? "rgba(255,255,255,0.95)"
										: "#FFFFFF",
								})}
							>
								<Text
									className="text-[15px] font-semibold"
									style={{ color: ACCENT_COLOR }}
								>
									Post a Brief
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</View>

			{/* Bottom CTA */}
			<View className="py-16 px-6 bg-surface-raised">
				<View className="max-w-[600px] mx-auto w-full items-center">
					<Ionicons
						color={ACCENT_COLOR}
						name="headset-outline"
						size={48}
						className="mb-5"
					/>
					<Text className="text-2xl font-bold text-foreground text-center mb-3">
						Need personalized help?
					</Text>
					<Text
						className="text-base text-muted text-center mb-6"
						style={{ lineHeight: 24 }}
					>
						Our brand partnerships team is ready to help you find the perfect
						creators.
					</Text>
					<Link asChild href={"/contact" as any}>
						<Pressable
							style={({ hovered }) => ({
								paddingHorizontal: 32,
								paddingVertical: 14,
								backgroundColor: hovered ? ACCENT_HOVER : ACCENT_COLOR,
								borderRadius: 8,
							})}
						>
							<Text className="text-base font-semibold text-primary-foreground">
								Contact Brand Support
							</Text>
						</Pressable>
					</Link>
				</View>
			</View>
		</ScrollView>
	);
}
