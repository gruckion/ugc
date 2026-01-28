import { Pressable, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { cn } from "@/lib/utils";

export function JoinCTASection() {
	const { isMobile } = useResponsive();
	const { open: openAuthModal } = useAuthModal();

	const handleJoinClick = () => {
		openAuthModal("signup");
	};

	return (
		<View className="py-20 px-6 bg-cta-bg">
			<View className="max-w-[800px] mx-auto w-full items-center">
				{/* Main Heading */}
				<Text
					className={cn(
						"font-bold text-center mb-8 text-white",
						isMobile ? "text-[32px] leading-[40px]" : "text-[48px] leading-[58px]",
					)}
				>
					Freelance services at your{" "}
					<span
						style={{
							backgroundImage: "linear-gradient(90deg, #ff7b54, #ffb347)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
						}}
					>
						fingertips
					</span>
				</Text>

				{/* Join Button */}
				<Pressable
					onPress={handleJoinClick}
					className="px-10 py-4 rounded-lg bg-white hover:opacity-90"
					style={({ hovered }) => ({
						transform: [{ scale: hovered ? 1.02 : 1 }],
					})}
				>
					<Text className="text-lg font-semibold text-black">
						Join UGC
					</Text>
				</Pressable>
			</View>
		</View>
	);
}

export default JoinCTASection;
