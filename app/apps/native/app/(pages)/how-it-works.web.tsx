import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd, createBreadcrumbJsonLd } from "@/components/web/SEO";
import { cn } from "@/lib/utils";

// Steps for Brands
const BRAND_STEPS = [
	{
		number: "01",
		title: "Post Your Brief",
		description:
			"Describe your campaign, target audience, and content requirements. Set your budget and timeline.",
		icon: "document-text-outline" as const,
	},
	{
		number: "02",
		title: "Review Applications",
		description:
			"Receive proposals from verified creators. Review portfolios, ratings, and past work to find the perfect match.",
		icon: "people-outline" as const,
	},
	{
		number: "03",
		title: "Secure Payment",
		description:
			"Fund the project with our escrow system. Payment is held securely until you approve the content.",
		icon: "shield-checkmark-outline" as const,
	},
	{
		number: "04",
		title: "Receive Content",
		description:
			"Review deliverables, request revisions if needed, and approve final content. Payment releases automatically.",
		icon: "checkmark-circle-outline" as const,
	},
];

// Steps for Creators
const CREATOR_STEPS = [
	{
		number: "01",
		title: "Create Your Profile",
		description:
			"Showcase your portfolio, set your rates, and define your niche. Let brands discover your unique style.",
		icon: "person-outline" as const,
	},
	{
		number: "02",
		title: "Browse & Apply",
		description:
			"Find briefs that match your expertise. Submit compelling proposals that highlight your relevant experience.",
		icon: "search-outline" as const,
	},
	{
		number: "03",
		title: "Create Content",
		description:
			"Deliver high-quality content according to the brief. Communicate with brands through our platform.",
		icon: "videocam-outline" as const,
	},
	{
		number: "04",
		title: "Get Paid",
		description:
			"Receive payment once your content is approved. Build your reputation with reviews and repeat clients.",
		icon: "wallet-outline" as const,
	},
];

// Platform benefits
const PLATFORM_BENEFITS = [
	{
		title: "Payment Protection",
		description:
			"Escrow system ensures creators get paid and brands receive quality content.",
		icon: "shield-checkmark-outline" as const,
	},
	{
		title: "Verified Creators",
		description:
			"All creators are vetted for quality, authenticity, and professionalism.",
		icon: "checkmark-done-outline" as const,
	},
	{
		title: "Transparent Pricing",
		description:
			"No hidden fees. Clear pricing and service levels from the start.",
		icon: "pricetag-outline" as const,
	},
	{
		title: "Fast Turnaround",
		description: "Average delivery time of 5-7 days. Rush options available.",
		icon: "flash-outline" as const,
	},
	{
		title: "Content Rights",
		description:
			"Clear licensing terms. Full commercial rights included with every delivery.",
		icon: "document-outline" as const,
	},
	{
		title: "Support Team",
		description:
			"Dedicated support for both brands and creators. We're here to help.",
		icon: "chatbubbles-outline" as const,
	},
];

export default function HowItWorksPage() {
	const { isMobile } = useResponsive();
	const { open: openAuthModal } = useAuthModal();

	const howItWorksJsonLd = createWebPageJsonLd(
		"How It Works - UGC Marketplace",
		"Learn how UGC Marketplace connects brands with creators for authentic content.",
		"/how-it-works",
	);

	const breadcrumbJsonLd = createBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "How It Works", path: "/how-it-works" },
	]);

	return (
		<ScrollView className="flex-1 bg-background">
			<SEO
				title="How It Works"
				description="Learn how UGC Marketplace works for brands and creators. Post briefs, find creators, get authentic content with secure payments. Simple 4-step process."
				path="/how-it-works"
				keywords={[
					"how UGC works",
					"creator marketplace process",
					"brand content workflow",
					"UGC platform guide",
					"content creation process",
				]}
				jsonLd={[howItWorksJsonLd, breadcrumbJsonLd]}
			/>

			{/* Hero Section */}
			<View className="pt-12 pb-16 px-6 bg-surface-raised">
				<View className="w-full" style={{ maxWidth: 1200, marginHorizontal: "auto" }}>
					<Text
						className="font-bold text-foreground text-center mb-4"
						style={{ fontSize: isMobile ? 32 : 48 }}
					>
						How It Works
					</Text>
					<Text
						className="text-lg text-muted text-center"
						style={{
							maxWidth: 600,
							marginHorizontal: "auto",
							lineHeight: 28,
						}}
					>
						Connect with the perfect match. Whether you're a brand looking for
						authentic content or a creator ready to showcase your talent.
					</Text>
				</View>
			</View>

			{/* For Brands Section */}
			<View className="py-16 px-6">
				<View className="w-full" style={{ maxWidth: 1200, marginHorizontal: "auto" }}>
					<View className="flex-row items-center justify-center gap-3 mb-12">
						<View
							className="w-12 h-12 items-center justify-center bg-chip-bg"
							style={{
								borderRadius: 24,
							}}
						>
							<Ionicons
								className="text-primary"
								name="business-outline"
								size={24}
							/>
						</View>
						<Text
							className="font-bold text-foreground"
							style={{ fontSize: 28 }}
						>
							For Brands
						</Text>
					</View>

					<View
						className="gap-6"
						style={{ flexDirection: isMobile ? "column" : "row" }}
					>
						{BRAND_STEPS.map((step, index) => (
							<View
								key={step.number}
								className="flex-1 p-6 rounded-xl bg-background border border-border"
							>
								<View className="flex-row items-center gap-3 mb-4">
									<View
										className="w-10 h-10 items-center justify-center bg-primary"
										style={{
											borderRadius: 20,
										}}
									>
										<Text className="text-sm font-bold text-white">
											{step.number}
										</Text>
									</View>
									<Ionicons
										className="text-muted"
										name={step.icon}
										size={24}
									/>
								</View>
								<Text className="text-lg font-semibold text-foreground mb-2">
									{step.title}
								</Text>
								<Text
									className="text-sm text-muted"
									style={{ lineHeight: 22 }}
								>
									{step.description}
								</Text>
								{index < BRAND_STEPS.length - 1 && !isMobile && (
									<View
										style={{
											position: "absolute",
											right: -12,
											top: "50%",
											transform: [{ translateY: -12 }],
										}}
									>
										<Ionicons
											className="text-border"
											name="arrow-forward"
											size={24}
										/>
									</View>
								)}
							</View>
						))}
					</View>

					<View className="items-center mt-8">
						<Link asChild href={"/browse/briefs" as any}>
							<Pressable
								className="flex-row items-center gap-2 rounded-lg bg-primary hover:bg-hover-primary"
								style={{
									paddingHorizontal: 32,
									paddingVertical: 14,
								}}
							>
								<Text className="text-base font-semibold text-white">
									Post a Brief
								</Text>
								<Ionicons
									className="text-white"
									name="arrow-forward"
									size={18}
								/>
							</Pressable>
						</Link>
					</View>
				</View>
			</View>

			{/* For Creators Section */}
			<View className="py-16 px-6 bg-surface-raised">
				<View className="w-full" style={{ maxWidth: 1200, marginHorizontal: "auto" }}>
					<View className="flex-row items-center justify-center gap-3 mb-12">
						<View
							className="w-12 h-12 items-center justify-center bg-info/15"
							style={{
								borderRadius: 24,
							}}
						>
							<Ionicons className="text-info" name="person-outline" size={24} />
						</View>
						<Text
							className="font-bold text-foreground"
							style={{ fontSize: 28 }}
						>
							For Creators
						</Text>
					</View>

					<View
						className="gap-6"
						style={{ flexDirection: isMobile ? "column" : "row" }}
					>
						{CREATOR_STEPS.map((step, index) => (
							<View
								key={step.number}
								className="flex-1 p-6 rounded-xl bg-background border border-border"
							>
								<View className="flex-row items-center gap-3 mb-4">
									<View
										className="w-10 h-10 items-center justify-center bg-info"
										style={{
											borderRadius: 20,
										}}
									>
										<Text className="text-sm font-bold text-white">
											{step.number}
										</Text>
									</View>
									<Ionicons
										className="text-muted"
										name={step.icon}
										size={24}
									/>
								</View>
								<Text className="text-lg font-semibold text-foreground mb-2">
									{step.title}
								</Text>
								<Text
									className="text-sm text-muted"
									style={{ lineHeight: 22 }}
								>
									{step.description}
								</Text>
								{index < CREATOR_STEPS.length - 1 && !isMobile && (
									<View
										style={{
											position: "absolute",
											right: -12,
											top: "50%",
											transform: [{ translateY: -12 }],
										}}
									>
										<Ionicons
											className="text-border"
											name="arrow-forward"
											size={24}
										/>
									</View>
								)}
							</View>
						))}
					</View>

					<View className="items-center mt-8">
						<Link asChild href={"/browse/creators" as any}>
							<Pressable
								className="flex-row items-center gap-2 rounded-lg bg-info hover:bg-blue-600"
								style={{
									paddingHorizontal: 32,
									paddingVertical: 14,
								}}
							>
								<Text className="text-base font-semibold text-white">
									Join as Creator
								</Text>
								<Ionicons
									className="text-white"
									name="arrow-forward"
									size={18}
								/>
							</Pressable>
						</Link>
					</View>
				</View>
			</View>

			{/* Platform Benefits */}
			<View className="py-16 px-6">
				<View className="w-full" style={{ maxWidth: 1200, marginHorizontal: "auto" }}>
					<Text
						className="font-bold text-foreground text-center mb-4"
						style={{ fontSize: 28 }}
					>
						Why Choose Our Platform
					</Text>
					<Text
						className="text-base text-muted text-center mb-12"
						style={{ maxWidth: 600, marginHorizontal: "auto" }}
					>
						Built with trust, transparency, and quality at its core
					</Text>

					<View className="flex-row flex-wrap gap-6 justify-center">
						{PLATFORM_BENEFITS.map((benefit) => (
							<View
								key={benefit.title}
								className="p-6 rounded-xl bg-background border border-border"
								style={{ width: isMobile ? "100%" : 340 }}
							>
								<View
									className="w-12 h-12 items-center justify-center mb-4 bg-chip-bg"
									style={{
										borderRadius: 24,
									}}
								>
									<Ionicons
										className="text-primary"
										name={benefit.icon}
										size={24}
									/>
								</View>
								<Text className="text-lg font-semibold text-foreground mb-2">
									{benefit.title}
								</Text>
								<Text
									className="text-sm text-muted"
									style={{ lineHeight: 22 }}
								>
									{benefit.description}
								</Text>
							</View>
						))}
					</View>
				</View>
			</View>

			{/* CTA Section */}
			<View className="py-16 px-6 bg-cta-bg">
				<View
					className="w-full items-center"
					style={{ maxWidth: 800, marginHorizontal: "auto" }}
				>
					<Text
						className="font-bold text-white text-center mb-4"
						style={{ fontSize: isMobile ? 24 : 32 }}
					>
						Ready to Get Started?
					</Text>
					<Text
						className="text-base text-center mb-8 text-muted"
						style={{ lineHeight: 24 }}
					>
						Join thousands of brands and creators already using our platform
					</Text>
					<View
						className="gap-4"
						style={{ flexDirection: isMobile ? "column" : "row" }}
					>
						<Pressable
							onPress={() => openAuthModal("signup")}
							className="rounded-lg bg-primary hover:bg-hover-primary"
							style={{
								paddingHorizontal: 32,
								paddingVertical: 14,
							}}
						>
							<Text className="text-base font-semibold text-white text-center">
								Sign Up Free
							</Text>
						</Pressable>
						<Link asChild href={"/browse" as any}>
							<Pressable
								className="rounded-lg border border-white/30 hover:border-white"
								style={{
									paddingHorizontal: 32,
									paddingVertical: 14,
								}}
							>
								<Text className="text-base font-semibold text-white text-center">
									Browse Marketplace
								</Text>
							</Pressable>
						</Link>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
