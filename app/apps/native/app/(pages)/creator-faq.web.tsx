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
		<ScrollView className="flex-1 bg-background">
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
			<View className="px-6 py-16 bg-primary">
				<View className="mx-auto w-full items-center" style={{ maxWidth: 800 }}>
					<View
						className="mb-6 items-center justify-center rounded-full"
						style={{
							width: 72,
							height: 72,
							backgroundColor: "rgba(255,255,255,0.2)",
						}}
					>
						<Ionicons
							name="videocam-outline"
							size={36}
							className="text-primary-foreground"
						/>
					</View>
					<Text
						className="mb-3 text-center font-bold text-white"
						style={{ fontSize: isMobile ? 32 : 44 }}
					>
						Creator FAQ
					</Text>
					<Text
						className="text-center text-lg"
						style={{
							color: "rgba(255,255,255,0.9)",
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
			<View className="px-6 py-16">
				<View
					className={cn(
						"mx-auto w-full gap-12",
						isMobile ? "flex-col" : "flex-row"
					)}
					style={{ maxWidth: 1200 }}
				>
					{/* FAQ Accordion */}
					<View className="flex-1">
						{FAQ_CATEGORIES.map((category) => (
							<View
								key={category.title}
								className={cn(
									"mb-4 overflow-hidden rounded-2xl border",
									expandedCategory === category.title
										? "border-primary"
										: "border-border"
								)}
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
											? { backgroundColor: "rgba(29,191,115,0.03)" }
											: undefined
									}
								>
									<View
										className="items-center justify-center rounded-xl"
										style={{
											width: 48,
											height: 48,
											backgroundColor:
												expandedCategory === category.title
													? "#1DBF73"
													: "rgba(29,191,115,0.08)",
										}}
									>
										<Ionicons
											color={
												expandedCategory === category.title
													? "#FFFFFF"
													: "#1DBF73"
											}
											name={category.icon}
											size={24}
										/>
									</View>
									<View className="flex-1">
										<Text className="text-lg font-semibold text-foreground">
											{category.title}
										</Text>
										<Text
											className="text-sm text-muted"
											style={{ marginTop: 2 }}
										>
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
																? "#1DBF73"
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
															className="text-muted"
															style={{
																fontSize: 15,
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
						className="gap-6"
						style={{ width: isMobile ? "100%" : 320 }}
					>
						{/* Related Resources */}
						<View className="rounded-2xl border border-border bg-surface-raised p-6">
							<Text className="mb-5 text-lg font-semibold text-foreground">
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
														"items-center justify-center",
														isHovered ? "bg-primary" : "bg-background"
													)}
													style={{
														width: 40,
														height: 40,
														borderRadius: 10,
													}}
												>
													<Ionicons
														color={
															isHovered
																? "#FFFFFF"
																: "#1DBF73"
														}
														name={resource.icon}
														size={20}
													/>
												</View>
												<View className="flex-1">
													<Text
														className={cn(
															"font-medium",
															isHovered ? "text-primary" : "text-foreground"
														)}
														style={{ fontSize: 15 }}
													>
														{resource.title}
													</Text>
													<Text
														className="text-muted"
														style={{ fontSize: 13 }}
													>
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

						{/* Pro Tips Card */}
						<View
							className="rounded-2xl border p-6"
							style={{
								backgroundColor: "rgba(29,191,115,0.03)",
								borderColor: "rgba(29,191,115,0.12)",
							}}
						>
							<View className="mb-4 flex-row items-center gap-3">
								<Ionicons
									name="bulb-outline"
									size={24}
									className="text-primary"
								/>
								<Text className="text-lg font-semibold text-foreground">
									Pro Tips
								</Text>
							</View>
							<View className="gap-3">
								{[
									"Complete your profile 100% to get 3x more visibility",
									"Respond to briefs within 24 hours for higher acceptance rates",
									"Include a personal video introduction in your portfolio",
								].map((tip, index) => (
									<View
										key={index}
										className="flex-row items-start gap-2"
									>
										<Ionicons
											name="checkmark-circle"
											size={18}
											style={{ marginTop: 2 }}
											className="text-primary"
										/>
										<Text
											className="flex-1 text-sm text-muted"
											style={{ lineHeight: 22 }}
										>
											{tip}
										</Text>
									</View>
								))}
							</View>
						</View>

						{/* CTA Card */}
						<View className="rounded-2xl p-6 bg-foreground">
							<Text className="mb-2 text-lg font-semibold text-white">
								Ready to start creating?
							</Text>
							<Text
								className="mb-5 text-sm text-muted"
								style={{ lineHeight: 22 }}
							>
								Join thousands of creators earning on our platform.
							</Text>
							<Pressable
								onPress={() => openAuthModal("signup")}
								className="items-center rounded-lg bg-primary hover:bg-hover-primary"
								style={{ padding: 14 }}
							>
								<Text
									className="font-semibold text-white"
									style={{ fontSize: 15 }}
								>
									Become a Creator
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</View>

			{/* Bottom CTA */}
			<View className="bg-surface-raised px-6 py-16">
				<View className="mx-auto w-full items-center" style={{ maxWidth: 600 }}>
					<Ionicons
						name="chatbubble-ellipses-outline"
						size={48}
						className="mb-5 text-primary"
					/>
					<Text className="mb-3 text-center text-2xl font-bold text-foreground">
						Still have questions?
					</Text>
					<Text
						className="mb-6 text-center text-base text-muted"
						style={{ lineHeight: 24 }}
					>
						Our creator success team is here to help you succeed.
					</Text>
					<Link asChild href={"/contact" as any}>
						<Pressable
							className="rounded-lg px-8 py-3.5 bg-primary hover:bg-hover-primary"
						>
							<Text className="text-base font-semibold text-white">
								Contact Creator Support
							</Text>
						</Pressable>
					</Link>
				</View>
			</View>
		</ScrollView>
	);
}
