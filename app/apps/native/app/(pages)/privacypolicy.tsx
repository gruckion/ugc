import { ScrollView, Text, View } from "react-native";

export default function PrivacyPolicyPage() {
	return (
		<ScrollView
			contentContainerStyle={{ padding: 20 }}
			className="flex-1 bg-background"
		>
			<Text className="text-2xl font-bold text-foreground mb-2">
				Privacy Policy
			</Text>
			<Text className="text-xs text-muted mb-6">
				Last Updated: January 2026
			</Text>

			<View className="gap-5">
				<Text className="text-sm text-muted leading-[22px]">
					UGC Marketplace is committed to protecting your privacy. This policy
					explains how we collect, use, and safeguard your information.
				</Text>

				<View>
					<Text className="text-base font-semibold text-foreground mb-2">
						Information We Collect
					</Text>
					<Text className="text-sm text-muted leading-[22px]">
						We collect information you provide (name, email, profile info,
						payment details) and information collected automatically (device
						info, IP address, usage data).
					</Text>
				</View>

				<View>
					<Text className="text-base font-semibold text-foreground mb-2">
						How We Use Information
					</Text>
					<Text className="text-sm text-muted leading-[22px]">
						We use your information to provide services, process transactions,
						send communications, and improve our platform.
					</Text>
				</View>

				<View>
					<Text className="text-base font-semibold text-foreground mb-2">
						Information Sharing
					</Text>
					<Text className="text-sm text-muted leading-[22px]">
						We share information with other users as needed for the platform to
						function, with service providers, and when required by law.
					</Text>
				</View>

				<View>
					<Text className="text-base font-semibold text-foreground mb-2">
						Your Rights
					</Text>
					<Text className="text-sm text-muted leading-[22px]">
						You may request access, correction, or deletion of your personal
						information by contacting us.
					</Text>
				</View>

				<View>
					<Text className="text-base font-semibold text-foreground mb-2">
						Contact
					</Text>
					<Text className="text-sm text-muted leading-[22px]">
						Questions? Contact us at privacy@ugcmarketplace.com
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}
