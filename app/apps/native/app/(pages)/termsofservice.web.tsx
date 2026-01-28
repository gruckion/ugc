import { ScrollView, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd } from "@/components/web/SEO";

export default function TermsOfServicePage() {
	const { isMobile } = useResponsive();

	const tosJsonLd = createWebPageJsonLd(
		"Terms of Service - UGC Marketplace",
		"Terms of Service and user agreement for UGC Marketplace.",
		"/termsofservice",
	);

	return (
		<ScrollView className="flex-1 bg-background">
			<SEO
				title="Terms of Service"
				description="Read the Terms of Service for UGC Marketplace. Understand our user agreement, platform rules, and legal terms for creators and brands."
				path="/termsofservice"
				keywords={["terms of service", "user agreement", "legal terms"]}
				jsonLd={tosJsonLd}
			/>

			{/* Header */}
			<View className="bg-sectionBackground px-6 pb-8 pt-12">
				<View className="mx-auto w-full max-w-[900px]">
					<Text
						className="mb-4 font-bold text-foreground"
						style={{
							fontSize: isMobile ? 32 : 42,
						}}
					>
						Terms of Service
					</Text>
					<Text className="text-sm text-muted">
						Last Updated: January 2026
					</Text>
				</View>
			</View>

			{/* Content */}
			<View className="px-6 py-12">
				<View className="mx-auto w-full max-w-[900px] gap-10">
					{/* Introduction */}
					<View className="gap-4">
						<Text className="text-sm leading-6 text-muted">
							Welcome to UGC Marketplace. The following terms of service
							("Terms"), along with our Community Standards, govern your access
							to and use of the UGC Marketplace website and mobile applications,
							including any content, functionality, and services offered on or
							through ugcmarketplace.com (the "Site").
						</Text>
						<Text className="text-sm leading-6 text-muted">
							Please read the Terms carefully before you start to use the Site.
							By using the Site, registering for an account, or by clicking to
							accept or agree to the Terms when this option is made available to
							you, you accept and agree to be bound and abide by these Terms.
						</Text>
					</View>

					{/* Key Terms */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Key Terms
						</Text>
						<View className="gap-3">
							<Text className="text-sm leading-6 text-muted">
								<Text className="font-semibold text-foreground">
									Brands
								</Text>{" "}
								are users who purchase services on UGC Marketplace.
							</Text>
							<Text className="text-sm leading-6 text-muted">
								<Text className="font-semibold text-foreground">
									Creators
								</Text>{" "}
								are users who offer and perform services through UGC
								Marketplace.
							</Text>
							<Text className="text-sm leading-6 text-muted">
								<Text className="font-semibold text-foreground">
									Services
								</Text>{" "}
								offered on UGC Marketplace include user-generated content
								creation such as videos, photos, reviews, testimonials, and
								other digital content created by Creators for Brands.
							</Text>
							<Text className="text-sm leading-6 text-muted">
								<Text className="font-semibold text-foreground">
									Briefs
								</Text>{" "}
								are service offerings listed by Brands that describe the content
								requirements and compensation.
							</Text>
						</View>
					</View>

					{/* Overview */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Overview
						</Text>
						<View className="gap-3">
							<Text className="text-sm leading-6 text-muted">
								UGC Marketplace facilitates connections between brands seeking
								authentic user-generated content and creators who produce such
								content. Brands may post briefs describing their content needs,
								and Creators may apply to fulfill those briefs. Once a Brand
								selects a Creator and the Creator delivers content meeting the
								brief requirements, payment is released from escrow.
							</Text>
							<Text className="text-sm leading-6 text-muted">
								Services on UGC Marketplace may be offered at a base price set
								by the brief, with options for additional services at additional
								costs. Brands pay UGC Marketplace in advance to create an order.
								Once the order is completed, funds are released to the Creator.
							</Text>
						</View>
					</View>

					{/* Eligibility */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Eligibility
						</Text>
						<Text className="text-sm leading-6 text-muted">
							You may use the Site only if you can form a binding contract with
							UGC Marketplace, and only in compliance with these Terms and all
							applicable laws. You must be at least 18 years old to use the
							Site. If you are accepting these Terms on behalf of a company or
							other legal entity, you represent that you have the authority to
							bind that entity to these Terms.
						</Text>
					</View>

					{/* Account Registration */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Account Registration
						</Text>
						<View className="gap-3">
							<Text className="text-sm leading-6 text-muted">
								To access certain features of the Site, you must register for an
								account. When you register, you agree to provide accurate,
								current, and complete information about yourself. You are
								responsible for maintaining the confidentiality of your account
								credentials and for all activities that occur under your
								account.
							</Text>
							<Text className="text-sm leading-6 text-muted">
								You agree to notify us immediately of any unauthorized use of
								your account. UGC Marketplace will not be liable for any loss
								that you may incur as a result of someone else using your
								password or account.
							</Text>
						</View>
					</View>

					{/* Brands */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Brands
						</Text>
						<View className="gap-3">
							<Text className="text-sm leading-6 text-muted">
								Payment for services is collected by UGC Marketplace at the time
								a brief is accepted by a Creator. Once the order is complete,
								payment will be released to the Creator according to the payment
								terms.
							</Text>
							<Text className="text-sm leading-6 text-muted">
								You may not offer direct payments to Creators outside of the UGC
								Marketplace platform. Doing so is a violation of these Terms and
								may result in the termination of your account.
							</Text>
							<Text className="text-sm leading-6 text-muted">
								When posting a brief, you must provide clear requirements,
								including content type, usage rights, timeline, and any specific
								creative direction. You are responsible for ensuring your briefs
								comply with all applicable laws and regulations.
							</Text>
						</View>
					</View>

					{/* Creators */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Creators
						</Text>
						<View className="gap-3">
							<Text className="text-sm leading-6 text-muted">
								Creators on UGC Marketplace are independent contractors, not
								employees of UGC Marketplace or the Brands. Creators are
								responsible for their own taxes and compliance with applicable
								laws.
							</Text>
							<Text className="text-sm leading-6 text-muted">
								By accepting a brief, you agree to deliver content that meets
								the specified requirements within the agreed timeline. All
								content must be original work created by you, and you must have
								all necessary rights to provide the content to the Brand.
							</Text>
							<Text className="text-sm leading-6 text-muted">
								Payment will be released to your account after the order is
								marked as complete and any applicable review period has passed.
								UGC Marketplace charges a service fee on each transaction, which
								will be deducted from your earnings.
							</Text>
						</View>
					</View>

					{/* Content Rights */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Content Rights and Licenses
						</Text>
						<View className="gap-3">
							<Text className="text-sm leading-6 text-muted">
								Upon completion of an order and release of payment, Creators
								grant Brands the license to use the delivered content as
								specified in the brief. The specific usage rights (social media,
								advertising, perpetual use, etc.) will be outlined in each
								brief.
							</Text>
							<Text className="text-sm leading-6 text-muted">
								Unless otherwise specified in the brief, Creators retain the
								right to use delivered content in their portfolios.
							</Text>
						</View>
					</View>

					{/* Prohibited Uses */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Prohibited Uses
						</Text>
						<Text className="text-sm leading-6 text-muted">
							You agree not to use the Site:
						</Text>
						<View className="gap-2 pl-4">
							{[
								"For any unlawful purpose or in violation of any applicable laws",
								"To harass, abuse, or harm another person",
								"To impersonate any person or entity",
								"To send spam or unsolicited messages",
								"To interfere with or disrupt the Site or servers",
								"To attempt to gain unauthorized access to any portion of the Site",
								"To scrape or collect user data without permission",
								"To post false, misleading, or fraudulent content",
								"To circumvent payment or avoid platform fees",
							].map((item, index) => (
								<View key={index} className="flex-row gap-2">
									<Text className="text-muted">•</Text>
									<Text className="flex-1 text-sm leading-6 text-muted">
										{item}
									</Text>
								</View>
							))}
						</View>
					</View>

					{/* Dispute Resolution */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Dispute Resolution
						</Text>
						<Text className="text-sm leading-6 text-muted">
							If a dispute arises between a Brand and Creator, both parties
							should first attempt to resolve the issue directly. If a
							resolution cannot be reached, either party may request mediation
							through UGC Marketplace's dispute resolution process. Our team
							will review the order details, communications, and delivered
							content to make a fair determination.
						</Text>
					</View>

					{/* Refunds and Cancellations */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Refunds and Cancellations
						</Text>
						<View className="gap-3">
							<Text className="text-sm leading-6 text-muted">
								Orders may be cancelled by mutual agreement between the Brand
								and Creator. If a Creator fails to deliver within the agreed
								timeline without valid reason, the Brand may be entitled to a
								refund.
							</Text>
							<Text className="text-sm leading-6 text-muted">
								Refund requests are evaluated on a case-by-case basis. UGC
								Marketplace reserves the right to make the final determination
								on refund eligibility.
							</Text>
						</View>
					</View>

					{/* Limitation of Liability */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Limitation of Liability
						</Text>
						<Text className="text-sm leading-6 text-muted">
							TO THE FULLEST EXTENT PERMITTED BY LAW, UGC MARKETPLACE SHALL NOT
							BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
							PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
							INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE,
							GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS
							TO OR USE OF OR INABILITY TO ACCESS OR USE THE SITE.
						</Text>
					</View>

					{/* Indemnification */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Indemnification
						</Text>
						<Text className="text-sm leading-6 text-muted">
							You agree to indemnify and hold harmless UGC Marketplace and its
							officers, directors, employees, and agents from any claims,
							liabilities, damages, losses, and expenses, including reasonable
							attorney's fees, arising out of or in any way connected with your
							access to or use of the Site, your violation of these Terms, or
							your violation of any third-party rights.
						</Text>
					</View>

					{/* Termination */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Termination
						</Text>
						<Text className="text-sm leading-6 text-muted">
							We may terminate or suspend your account and access to the Site
							immediately, without prior notice or liability, for any reason,
							including if you breach these Terms. Upon termination, your right
							to use the Site will cease immediately. All provisions of these
							Terms which by their nature should survive termination shall
							survive.
						</Text>
					</View>

					{/* Modifications */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Modifications to Terms
						</Text>
						<Text className="text-sm leading-6 text-muted">
							We reserve the right to modify these Terms at any time. We will
							provide notice of significant changes by posting the new Terms on
							the Site and updating the "Last Updated" date. Your continued use
							of the Site after such changes constitutes your acceptance of the
							new Terms.
						</Text>
					</View>

					{/* Governing Law */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Governing Law
						</Text>
						<Text className="text-sm leading-6 text-muted">
							These Terms shall be governed by and construed in accordance with
							the laws of the United States, without regard to its conflict of
							law provisions. Any disputes arising under these Terms shall be
							resolved in the courts located in the United States.
						</Text>
					</View>

					{/* Contact */}
					<View className="gap-4">
						<Text className="text-[22px] font-bold text-foreground">
							Contact Us
						</Text>
						<Text className="text-sm leading-6 text-muted">
							If you have any questions about these Terms, please contact us at
							legal@ugcmarketplace.com.
						</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
