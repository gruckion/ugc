import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExternalLinkButton } from "@/components/ExternalLinkButton";
import { UGCLogo } from "@/components/UGCLogo";

export default function About() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	// Theme colors for Ionicons (which don't support className)
	const foreground = useThemeColor("foreground");
	const primaryForeground = "#FFFFFF";

	return (
		<View className="flex-1 bg-background">
			{/* Header */}
			<View
				className="bg-primary px-4 pb-4"
				style={{
					paddingTop: insets.top,
				}}
			>
				<View className="flex-row items-center gap-3">
					<Pressable
						onPress={() => router.back()}
						className="h-10 w-10 items-center justify-center rounded-full bg-white/10"
					>
						<Ionicons color={primaryForeground} name="arrow-back" size={22} />
					</Pressable>
					<Text className="flex-1 font-light font-serif text-xl text-primary-foreground">
						About the Club
					</Text>
				</View>
			</View>

			<ScrollView
				contentContainerStyle={{ paddingBottom: 40 }}
				showsVerticalScrollIndicator={false}
				className="flex-1"
			>
				{/* Hero Section with Logo */}
				<View className="h-[180px] items-center justify-center bg-primary">
					<UGCLogo bgClassName="bg-background" size={80} textClassName="text-primary" />
				</View>

				{/* Title */}
				<View className="items-center px-5 my-6">
					<Text className="text-center text-[26px] font-semibold text-foreground">
						UGC Marketplace
					</Text>
					<Text className="mt-1 text-center text-base text-muted">
						Connect with creators
					</Text>
				</View>

				{/* History Section */}
				<View
					className="mx-4 mb-4 rounded-xl p-5 bg-surface"
					style={{
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.08,
						shadowRadius: 4,
						elevation: 2,
					}}
				>
					<View className="mb-3 flex-row items-center">
						<View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-primary/10">
							<Ionicons color={foreground} name="book-outline" size={18} />
						</View>
						<Text className="text-lg font-semibold text-foreground">
							Our History
						</Text>
					</View>
					<Text className="text-[15px] leading-6 text-muted">
						Originally established in 1895 by Oxbridge graduates who wanted a
						lunch club in the City, the link with the universities remains,
						although membership is now much wider, embracing both sexes and many
						professions.
					</Text>
					<Text className="mt-3 text-[15px] leading-6 text-muted">
						Our current premises at 42 Crutched Friars, which we moved to in
						January 2018, have a rich history of their own - they were once the
						residence of the Spanish Ambassador during the late 18th century.
					</Text>
				</View>

				{/* About Section */}
				<View
					className="mx-4 mb-4 rounded-xl p-5 bg-surface"
					style={{
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.08,
						shadowRadius: 4,
						elevation: 2,
					}}
				>
					<View className="mb-3 flex-row items-center">
						<View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-primary/10">
							<Ionicons
								color={foreground}
								name="restaurant-outline"
								size={18}
							/>
						</View>
						<Text className="text-lg font-semibold text-foreground">
							The Club Today
						</Text>
					</View>
					<Text className="text-[15px] leading-6 text-muted">
						User Generated Content (UGC) provides a platform in the heart of London's
						financial district. It is the ideal place for lunch or simply a
						drink at the bar. UGC offers a first-class meal in discreet
						circumstances for a modest price.
					</Text>
					<Text className="mt-3 text-[15px] leading-6 text-muted">
						Members joining the Club find the atmosphere equally conducive to
						lunching with friends or on their own at the club tables. The food
						is first-class, the wine list comprehensive, and the service
						excellent.
					</Text>
				</View>

				{/* Key Features */}
				<View
					className="mx-4 mb-4 rounded-xl p-5 bg-surface"
					style={{
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.08,
						shadowRadius: 4,
						elevation: 2,
					}}
				>
					<View className="mb-4 flex-row items-center">
						<View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-primary/10">
							<Ionicons color={foreground} name="star-outline" size={18} />
						</View>
						<Text className="text-lg font-semibold text-foreground">
							What We Offer
						</Text>
					</View>

					{/* Feature Items */}
					{[
						{
							icon: "globe-outline" as const,
							title: "Reciprocal Clubs",
							description: "Access to over 450 of the finest clubs worldwide",
						},
						{
							icon: "restaurant-outline" as const,
							title: "Fine Dining",
							description: "First-class cuisine with an excellent wine list",
						},
						{
							icon: "briefcase-outline" as const,
							title: "Business Space",
							description:
								"Comfortable space for business use from early morning",
						},
						{
							icon: "people-outline" as const,
							title: "Networking",
							description:
								"Meet professionals from many fields and backgrounds",
						},
					].map((feature, index) => (
						<View
							key={feature.title}
							className="flex-row items-start"
							style={{
								marginBottom: index < 3 ? 16 : 0,
							}}
						>
							<View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-accent">
								<Ionicons color={foreground} name={feature.icon} size={16} />
							</View>
							<View className="flex-1">
								<Text className="text-[15px] font-semibold text-foreground">
									{feature.title}
								</Text>
								<Text className="mt-0.5 text-sm text-muted">
									{feature.description}
								</Text>
							</View>
						</View>
					))}
				</View>

				{/* Location Section */}
				<View className="mx-4 mb-4 rounded-xl p-5 bg-primary">
					<View className="mb-3 flex-row items-center">
						<View
							className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-white/10"
						>
							<Ionicons
								color={primaryForeground}
								name="location-outline"
								size={18}
							/>
						</View>
						<Text className="text-lg font-semibold text-primary-foreground">
							Visit Us
						</Text>
					</View>

					<Text className="text-base font-medium text-primary-foreground">
						42 Crutched Friars
					</Text>
					<Text className="mt-1 text-[15px] text-accent">
						London EC3N 2AP2
					</Text>

					<View
						className="my-4 bg-white/10"
						style={{ height: 1 }}
					/>

					<View className="flex-row gap-3">
						<Pressable
							className="flex-1 flex-row items-center justify-center gap-2 rounded-lg py-3 bg-accent"
							onPress={() => Linking.openURL("tel:02071676682")}
						>
							<Ionicons color={foreground} name="call" size={18} />
							<Text className="text-[15px] font-medium text-foreground">
								Call Us
							</Text>
						</Pressable>

						<Pressable
							className="flex-1 flex-row items-center justify-center gap-2 rounded-lg py-3 bg-white/10"
							onPress={() =>
								Linking.openURL("mailto:contact@ugc.com")
							}
						>
							<Ionicons color={primaryForeground} name="mail" size={18} />
							<Text className="text-[15px] font-medium text-primary-foreground">
								Email
							</Text>
						</Pressable>
					</View>
				</View>

				{/* Dress Code */}
				<View
					className="mx-4 mb-4 rounded-xl p-5 bg-surface"
					style={{
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.08,
						shadowRadius: 4,
						elevation: 2,
					}}
				>
					<View className="mb-3 flex-row items-center">
						<View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-primary/10">
							<Ionicons color={foreground} name="shirt-outline" size={18} />
						</View>
						<Text className="text-lg font-semibold text-foreground">
							Dress Code
						</Text>
					</View>
					<Text className="text-[15px] leading-6 text-muted">
						In keeping with other private members clubs, the dress code is
						jacket and tie for men and smart dress for ladies. Jeans and
						trainers are not permitted.
					</Text>
				</View>

				{/* Opening Hours */}
				<View
					className="mx-4 mb-4 rounded-xl p-5 bg-surface"
					style={{
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.08,
						shadowRadius: 4,
						elevation: 2,
					}}
				>
					<View className="mb-3 flex-row items-center">
						<View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-primary/10">
							<Ionicons color={foreground} name="time-outline" size={18} />
						</View>
						<Text className="text-lg font-semibold text-foreground">
							Opening Hours
						</Text>
					</View>
					<View className="gap-2">
						<View className="flex-row justify-between">
							<Text className="text-[15px] text-muted">
								Monday - Friday
							</Text>
							<Text className="text-[15px] font-medium text-foreground">
								9:00 AM - 5:00 PM
							</Text>
						</View>
						<View className="flex-row justify-between">
							<Text className="text-[15px] text-muted">
								Lunch Service
							</Text>
							<Text className="text-[15px] font-medium text-foreground">
								12:00 PM - 2:30 PM
							</Text>
						</View>
					</View>
					<Text className="mt-3 text-[13px] italic text-muted">
						Closed between Christmas and New Year
					</Text>
				</View>

				{/* Website Link */}
				<View className="mx-4">
					<ExternalLinkButton
						label="Visit Our Website"
						url="https://ugc.com/"
						variant="primary"
					/>
				</View>
			</ScrollView>
		</View>
	);
}
