import { ScrollView, Text, View } from "react-native";

export default function TermsOfServicePage() {
	return (
		<ScrollView
			contentContainerStyle={{ padding: 20 }}
			className="flex-1 bg-background"
		>
			<Text className="text-2xl font-bold text-foreground mb-2">
				Terms of Service
			</Text>
			<Text className="text-xs text-muted mb-6">
				Last Updated: January 2026
			</Text>

			<View className="gap-5">
				<Text className="text-sm text-muted leading-[22px]">
					Welcome to UGC Marketplace. These terms govern your access to and use
					of our website and mobile applications.
				</Text>

				<View>
					<Text className="text-base font-semibold text-foreground mb-2">
						Key Terms
					</Text>
					<Text className="text-sm text-muted leading-[22px]">
						Brands are users who purchase services. Creators are users who offer
						and perform services. Services include user-generated content such
						as videos, photos, and reviews.
					</Text>
				</View>

				<View>
					<Text className="text-base font-semibold text-foreground mb-2">
						Eligibility
					</Text>
					<Text className="text-sm text-muted leading-[22px]">
						You must be at least 18 years old to use the Site. By using the
						Site, you agree to be bound by these Terms.
					</Text>
				</View>

				<View>
					<Text className="text-base font-semibold text-foreground mb-2">
						Account Registration
					</Text>
					<Text className="text-sm text-muted leading-[22px]">
						You agree to provide accurate information when registering and are
						responsible for maintaining the confidentiality of your account.
					</Text>
				</View>

				<View>
					<Text className="text-base font-semibold text-foreground mb-2">
						Payments
					</Text>
					<Text className="text-sm text-muted leading-[22px]">
						Payment is collected when a brief is accepted. You may not offer
						direct payments outside of the platform.
					</Text>
				</View>

				<View>
					<Text className="text-base font-semibold text-foreground mb-2">
						Contact
					</Text>
					<Text className="text-sm text-muted leading-[22px]">
						Questions? Contact us at legal@ugcmarketplace.com
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}
