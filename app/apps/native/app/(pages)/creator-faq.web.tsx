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
};

// FAQ Categories with questions
const FAQ_CATEGORIES = [
	{
		title: "Getting Started as a Creator",
		icon: "rocket-outline" as const,
		questions: [
			{
				question: "How do I create my creator profile?",
				answer:
					"To create your profile, sign up for a free account and click 'Become a Creator'. You'll need to fill out your bio, upload portfolio samples, set your rates, and specify your content categories. Make sure to add high-quality examples of your work to attract brands.",
			},
			{
				question: "What types of content can I offer?",
				answer:
					"You can offer various UGC formats including product reviews, unboxing videos, tutorials, lifestyle content, testimonials, social media posts, and more. Choose categories that match your skills and interests for the best results.",
			},
			{
				question: "Do I need professional equipment?",
				answer:
					"While professional equipment can enhance quality, many successful creators use smartphones with good lighting. Focus on clean audio, stable footage, and natural lighting. As you grow, you can invest in better equipment.",
			},
			{
				question: "How long does profile approval take?",
				answer:
					"Profile reviews typically take 24-48 hours. We verify your identity, review your portfolio, and ensure your profile meets our quality standards. You'll receive an email once approved.",
			},
		],
	},
	{
		title: "Setting Your Rates",
		icon: "cash-outline" as const,
		questions: [
			{
				question: "How do I determine my rates?",
				answer:
					"Consider factors like content complexity, usage rights, your experience level, and market rates. New creators typically start at $50-150 per piece, while experienced creators can charge $300+. Check competitor profiles for benchmarks.",
			},
			{
				question: "Can I charge different rates for different content types?",
				answer:
					"Yes! You can set different rates for photos, short videos, long-form content, and add-ons like rush delivery or extended usage rights. This flexibility lets you price based on the work involved.",
			},
			{
				question: "Should I offer package deals?",
				answer:
					"Package deals can attract more clients and increase your average order value. Consider offering bundles like '3 videos for the price of 2.5' or content + revision packages.",
			},
			{
				question: "When can I raise my rates?",
				answer:
					"Consider raising rates after completing 10+ successful projects, receiving consistently positive reviews, or when demand exceeds your availability. Gradual increases (10-20%) are usually well-received.",
			},
		],
	},
	{
		title: "Delivering Content",
		icon: "cloud-upload-outline" as const,
		questions: [
			{
				question: "What are the delivery time expectations?",
				answer:
					"Standard delivery is typically 5-7 business days, but this varies by content type. Always communicate realistic timelines and factor in revision time. Rush orders should be priced accordingly.",
			},
			{
				question: "What file formats should I deliver?",
				answer:
					"Deliver videos in MP4 (H.264) at 1080p minimum, 4K preferred. Photos should be high-resolution JPG or PNG. Always include raw files if specified in the brief. Check brand requirements before starting.",
			},
			{
				question: "How do I handle revision requests?",
				answer:
					"Most briefs include 1-2 rounds of revisions. Read feedback carefully, ask clarifying questions if needed, and deliver revisions promptly. Excessive revision requests may warrant additional compensation.",
			},
			{
				question: "What if I can't meet a deadline?",
				answer:
					"Communicate immediately with the brand if you anticipate delays. Propose a new timeline and explain the situation. Repeated missed deadlines can affect your profile rating.",
			},
		],
	},
	{
		title: "Getting Paid",
		icon: "wallet-outline" as const,
		questions: [
			{
				question: "When do I get paid?",
				answer:
					"Payment is released within 3-5 business days after the brand approves your final delivery. Funds are held in escrow when the brand posts the brief, ensuring you always get paid for approved work.",
			},
			{
				question: "What payment methods are available?",
				answer:
					"We support PayPal, direct bank transfer (ACH), and Stripe. International creators can also use Wise (TransferWise). Set up your preferred method in Account Settings > Payments.",
			},
			{
				question: "What fees do you charge?",
				answer:
					"We charge a 10% platform fee on completed projects. This covers payment processing, dispute resolution, and platform maintenance. The fee is automatically deducted from your earnings.",
			},
			{
				question: "How do I handle taxes?",
				answer:
					"You're responsible for reporting your earnings and paying applicable taxes. We provide annual earnings summaries. Consider consulting a tax professional familiar with freelance income.",
			},
		],
	},
	{
		title: "Growing Your Profile",
		icon: "trending-up-outline" as const,
		questions: [
			{
				question: "How do I get more brand opportunities?",
				answer:
					"Optimize your profile with relevant keywords, maintain high ratings, respond quickly to inquiries, and keep your portfolio fresh. Active creators with complete profiles get 3x more opportunities.",
			},
			{
				question: "What makes a standout portfolio?",
				answer:
					"Include 6-10 diverse, high-quality samples. Show different content styles, products, and scenarios. Update regularly with recent work. Include behind-the-scenes content to show your process.",
			},
			{
				question: "How do reviews affect my visibility?",
				answer:
					"Reviews significantly impact your search ranking and brand trust. Creators with 4.8+ ratings appear in premium placements. Always deliver quality work and maintain professional communication.",
			},
			{
				question: "Can I reach out to brands directly?",
				answer:
					"Yes! You can apply to open briefs that match your skills. Write personalized proposals explaining why you're the perfect fit. Quality applications have much higher success rates than generic ones.",
			},
		],
	},
];

// Related resources
const RELATED_RESOURCES = [
	{
		title: "Brand FAQ",
		description: "Common questions from brands",
		href: "/brand-faq",
		icon: "business-outline" as const,
	},
	{
		title: "Help Center",
		description: "Browse all help topics",
		href: "/help-center",
		icon: "help-buoy-outline" as const,
	},
	{
		title: "Contact Support",
		description: "Get personalized help",
		href: "/contact",
		icon: "chatbubbles-outline" as const,
	},
];

export default function CreatorFAQPage() {
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
	const creatorFaqJsonLd = createFAQPageJsonLd(allFaqs);

	return (
		<ScrollView style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
			<SEO
				title="Creator FAQ"
				description="Frequently asked questions for creators on UGC Marketplace. Learn about getting started, building your profile, payments, working with brands, and growing your career."
				path="/creator-faq"
				keywords={[
					"creator FAQ",
					"UGC creator questions",
					"content creator help",
					"creator earnings",
					"creator tips",
				]}
				jsonLd={creatorFaqJsonLd}
			/>
			{/* Hero Section */}
			<View
				style={{
					paddingTop: 64,
					paddingBottom: 64,
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
							name="videocam-outline"
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
						Creator FAQ
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
						Everything you need to know about creating content, getting paid,
						and growing your creator career on our platform.
					</Text>
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
											? THEME_COLORS.primary
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
												? `${THEME_COLORS.primary}08`
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
													? THEME_COLORS.primary
													: `${THEME_COLORS.primary}15`,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Ionicons
											color={
												expandedCategory === category.title
													? THEME_COLORS.primaryForeground
													: THEME_COLORS.primary
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
																? THEME_COLORS.primary
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
										style={({ hovered }) => ({
											flexDirection: "row",
											alignItems: "center",
											gap: 12,
											paddingVertical: 12,
											borderTopWidth: index > 0 ? 1 : 0,
											borderTopColor: THEME_COLORS.border,
										})}
									>
										{({ hovered: isHovered }) => (
											<>
												<View
													style={{
														width: 40,
														height: 40,
														borderRadius: 10,
														backgroundColor: isHovered
															? THEME_COLORS.primary
															: THEME_COLORS.background,
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													<Ionicons
														color={
															isHovered
																? THEME_COLORS.primaryForeground
																: THEME_COLORS.primary
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
																? THEME_COLORS.primary
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

						{/* Pro Tips Card */}
						<View
							style={{
								padding: 24,
								borderRadius: 16,
								backgroundColor: `${THEME_COLORS.primary}08`,
								borderWidth: 1,
								borderColor: `${THEME_COLORS.primary}20`,
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
									color={THEME_COLORS.primary}
									name="bulb-outline"
									size={24}
								/>
								<Text
									style={{
										fontSize: 18,
										fontWeight: "600",
										color: THEME_COLORS.foreground,
									}}
								>
									Pro Tips
								</Text>
							</View>
							<View style={{ gap: 12 }}>
								{[
									"Complete your profile 100% to get 3x more visibility",
									"Respond to briefs within 24 hours for higher acceptance rates",
									"Include a personal video introduction in your portfolio",
								].map((tip, index) => (
									<View
										key={index}
										style={{
											flexDirection: "row",
											alignItems: "flex-start",
											gap: 8,
										}}
									>
										<Ionicons
											color={THEME_COLORS.primary}
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
											{tip}
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
								backgroundColor: THEME_COLORS.foreground,
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
								Ready to start creating?
							</Text>
							<Text
								style={{
									fontSize: 14,
									color: "#a0a0a0",
									marginBottom: 20,
									lineHeight: 22,
								}}
							>
								Join thousands of creators earning on our platform.
							</Text>
							<Pressable
								onPress={() => openAuthModal("signup")}
								style={({ hovered }) => ({
									padding: 14,
									borderRadius: 8,
									backgroundColor: hovered ? "#19a864" : THEME_COLORS.primary,
									alignItems: "center",
								})}
							>
								<Text
									style={{
										fontSize: 15,
										fontWeight: "600",
										color: THEME_COLORS.primaryForeground,
									}}
								>
									Become a Creator
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
						Still have questions?
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
						Our creator success team is here to help you succeed.
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
								Contact Creator Support
							</Text>
						</Pressable>
					</Link>
				</View>
			</View>
		</ScrollView>
	);
}
