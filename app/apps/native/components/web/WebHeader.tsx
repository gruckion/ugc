import { Ionicons } from "@expo/vector-icons";
import { useConvexAuth } from "convex/react";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { UGCLogo } from "@/components/UGCLogo";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { useResponsive } from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";

interface NavItem {
	label: string;
	href: string;
}

const NAV_ITEMS: NavItem[] = [
	{ label: "Browse Creators", href: "/browse/creators" },
	{ label: "How It Works", href: "/how-it-works" },
	{ label: "Pricing", href: "/pricing" },
];

export function WebHeader() {
	const { isMobile, isTablet } = useResponsive();
	const { isAuthenticated } = useConvexAuth();
	const { open: openAuthModal } = useAuthModal();

	// Menu state and animation
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuProgress = useSharedValue(0);

	const openMenu = useCallback(() => {
		setIsMenuOpen(true);
		menuProgress.value = withTiming(1, {
			duration: 300,
			easing: Easing.bezier(0.4, 0, 0.2, 1),
		});
	}, [menuProgress]);

	const closeMenu = useCallback(() => {
		menuProgress.value = withTiming(0, {
			duration: 250,
			easing: Easing.bezier(0.4, 0, 0.2, 1),
		});
		// Delay unmounting until animation completes
		setTimeout(() => setIsMenuOpen(false), 260);
	}, [menuProgress]);

	// Animated styles for menu panel - slides from right
	const menuPanelStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: interpolate(menuProgress.value, [0, 1], [320, 0]),
			},
		],
	}));

	// Animated styles for backdrop
	const backdropStyle = useAnimatedStyle(() => ({
		opacity: menuProgress.value,
	}));

	const showMobileNav = isMobile || isTablet;

	return (
		<View className="absolute top-0 left-0 right-0 z-[1000] border-b border-border bg-background shadow-sm">
			<View className="flex-row items-center justify-between px-6 py-3 max-w-[1200px] mx-auto w-full">
				{/* Logo */}
				<Link asChild href="/">
					<Pressable className="flex-row items-center gap-2">
						<UGCLogo size={36} />
						{!isMobile && (
							<Text className="text-lg font-semibold text-foreground">
								UGC Marketplace
							</Text>
						)}
					</Pressable>
				</Link>

				{/* Desktop Navigation */}
				{!showMobileNav && (
					<View className="flex-row items-center gap-8">
						{NAV_ITEMS.map((item) => (
							<Link asChild href={item.href as any} key={item.href}>
								<Pressable>
									{({ pressed, hovered }) => (
										<Text
											className={cn(
												"text-[15px] font-medium",
												hovered ? "text-primary" : "text-foreground",
												pressed && "opacity-70",
											)}
										>
											{item.label}
										</Text>
									)}
								</Pressable>
							</Link>
						))}
					</View>
				)}

				{/* Auth Buttons (Desktop) */}
				{!showMobileNav && (
					<View className="flex-row items-center gap-3">
						{isAuthenticated ? (
							<Link asChild href="/(tabs)/more">
								<Pressable className="flex-row items-center gap-2">
									<Ionicons
										className="text-foreground"
										name="person-circle-outline"
										size={28}
									/>
								</Pressable>
							</Link>
						) : (
							<>
								<Pressable onPress={() => openAuthModal("signin")}>
									{({ hovered }) => (
										<Text
											className={cn(
												"text-[15px] font-medium",
												hovered ? "text-primary" : "text-foreground",
											)}
										>
											Sign In
										</Text>
									)}
								</Pressable>
								<Pressable
									onPress={() => openAuthModal("signup")}
									className="px-5 py-2.5 rounded-lg bg-primary"
								>
									{({ pressed }) => (
										<Text
											className={cn(
												"text-[15px] font-semibold text-primary-foreground",
												pressed && "opacity-80",
											)}
										>
											Join
										</Text>
									)}
								</Pressable>
							</>
						)}
					</View>
				)}

				{/* Mobile Menu Button */}
				{showMobileNav && (
					<Pressable onPress={isMenuOpen ? closeMenu : openMenu}>
						<Ionicons
							className="text-foreground"
							name={isMenuOpen ? "close" : "menu"}
							size={28}
						/>
					</Pressable>
				)}
			</View>

			{/* Mobile Menu Overlay - Slides from RIGHT (not bottom) */}
			{showMobileNav && isMenuOpen && (
				<View
					className="absolute top-0 left-0 right-0 bottom-0 z-[1001]"
					style={{
						position: "fixed" as any,
					}}
				>
					{/* Backdrop */}
					<Animated.View
						className="absolute top-0 left-0 right-0 bottom-0 bg-black/50"
						style={[backdropStyle]}
					>
						<Pressable className="flex-1" onPress={closeMenu} />
					</Animated.View>

					{/* Menu Panel - Slides from right */}
					<Animated.View
						className="absolute top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-background shadow-lg"
						style={[menuPanelStyle]}
					>
						{/* Close Button */}
						<View className="flex-row justify-end p-4 border-b border-border">
							<Pressable onPress={closeMenu}>
								<Ionicons
									className="text-foreground"
									name="close"
									size={28}
								/>
							</Pressable>
						</View>

						{/* Menu Items */}
						<ScrollView className="flex-1">
							{NAV_ITEMS.map((item) => (
								<Link asChild href={item.href as any} key={item.href}>
									<Pressable
										onPress={closeMenu}
										className="px-6 py-4 border-b border-border"
									>
										<Text className="text-base font-medium text-foreground">
											{item.label}
										</Text>
									</Pressable>
								</Link>
							))}

							{/* Auth Section */}
							<View className="p-6 gap-3">
								{isAuthenticated ? (
									<Link asChild href="/(tabs)/more">
										<Pressable
											onPress={closeMenu}
											className="py-3.5 rounded-lg items-center bg-primary"
										>
											<Text className="text-base font-semibold text-primary-foreground">
												My Account
											</Text>
										</Pressable>
									</Link>
								) : (
									<>
										<Pressable
											onPress={() => {
												closeMenu();
												openAuthModal("signin");
											}}
											className="border border-primary py-3.5 rounded-lg items-center"
										>
											<Text className="text-base font-semibold text-primary">
												Sign In
											</Text>
										</Pressable>
										<Pressable
											onPress={() => {
												closeMenu();
												openAuthModal("signup");
											}}
											className="py-3.5 rounded-lg items-center bg-primary"
										>
											<Text className="text-base font-semibold text-primary-foreground">
												Join
											</Text>
										</Pressable>
									</>
								)}
							</View>
						</ScrollView>
					</Animated.View>
				</View>
			)}
		</View>
	);
}

export default WebHeader;
