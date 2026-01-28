import { api } from "@convoexpo-and-nextjs-web-bun-better-auth/backend/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useConvexAuth, useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MembershipCard } from "@/components/MembershipCard";

export default function MembershipScreen() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { isAuthenticated } = useConvexAuth();
	const user = useQuery(api.auth.getCurrentUser, isAuthenticated ? {} : "skip");

	// Theme colors for Ionicons (which don't support className)
	const foreground = useThemeColor("foreground");
	const accent = useThemeColor("accent");
	const primaryForeground = "#FFFFFF";

	const handleSignIn = () => {
		router.push("/(auth)/landing");
	};

	return (
		<View className="flex-1 bg-background">
			{/* Header */}
			<View
				className="bg-primary px-4 pb-5"
				style={{
					paddingTop: insets.top + 8,
				}}
			>
				<View className="flex-row items-center gap-3">
					<Pressable
						className="h-10 w-10 items-center justify-center rounded-full bg-white/15"
						onPress={() => router.back()}
					>
						<Ionicons color={primaryForeground} name="arrow-back" size={24} />
					</Pressable>
					<Text className="font-light font-serif text-2xl text-primary-foreground">
						Membership Card
					</Text>
				</View>
			</View>

			{/* Content */}
			<View className="flex-1 items-center justify-center px-6">
				{isAuthenticated ? (
					// Logged in - show membership card
					<View className="w-full items-center">
						{/* Membership Card */}
						<MembershipCard
							memberName={user?.name || "Member"}
							memberSince={
								user?._creationTime
									? new Date(user._creationTime).toISOString()
									: undefined
							}
						/>

						{/* Card info */}
						<View
							className="mt-8 w-full rounded-xl bg-surface p-4"
							style={{
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.08,
								shadowRadius: 4,
								elevation: 2,
							}}
						>
							<View className="flex-row items-center gap-3">
								<View
									className="h-11 w-11 items-center justify-center rounded-full bg-accent/20"
								>
									<Ionicons
										color={accent}
										name="information-circle"
										size={24}
									/>
								</View>
								<View className="flex-1">
									<Text className="mb-0.5 text-[15px] font-medium text-foreground">
										Show at entry
									</Text>
									<Text className="text-[13px] text-muted">
										Present this card when visiting the club or reciprocal clubs
									</Text>
								</View>
							</View>
						</View>
					</View>
				) : (
					// Not logged in state
					<View className="items-center px-4">
						<View
							className="mb-6 h-[100px] w-[100px] items-center justify-center rounded-full bg-primary/10"
						>
							<Ionicons color={foreground} name="card" size={48} />
						</View>

						<Text className="mb-3 text-center font-light font-serif text-2xl text-foreground">
							Members Only
						</Text>

						<Text className="mb-8 text-center text-base leading-6 text-muted">
							Sign in to access your digital membership card. Show it when
							visiting the club or any of our 450+ reciprocal clubs worldwide.
						</Text>

						<Pressable
							className="rounded-lg bg-primary px-12 py-4"
							onPress={handleSignIn}
						>
							<Text className="text-base font-medium text-primary-foreground">
								Sign In
							</Text>
						</Pressable>
					</View>
				)}
			</View>

			{/* Bottom padding for safe area */}
			<View style={{ height: insets.bottom + 16 }} />
		</View>
	);
}
