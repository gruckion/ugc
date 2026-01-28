import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import {
	Pressable,
	ScrollView,
	type ScrollView as ScrollViewType,
	Text,
	View,
} from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { ServiceCard } from "./ServiceCard";

// Fiverr-style theme colors
const THEME_COLORS = {
	primary: "#1DBF73",
	primaryForeground: "#FFFFFF",
	foreground: "#222325",
	muted: "#62646a",
	border: "#e4e5e7",
	background: "#FFFFFF",
};

interface Service {
	id: string;
	name: string;
	imageUrl: string;
	href: string;
}

const POPULAR_SERVICES: Service[] = [
	{
		id: "1",
		name: "UGC Videos",
		imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
		href: "/browse/creators?service=ugc-videos",
	},
	{
		id: "2",
		name: "Product Reviews",
		imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
		href: "/browse/creators?service=product-reviews",
	},
	{
		id: "3",
		name: "Unboxing Videos",
		imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop",
		href: "/browse/creators?service=unboxing",
	},
	{
		id: "4",
		name: "Social Media Content",
		imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=400&fit=crop",
		href: "/browse/creators?service=social-media",
	},
	{
		id: "5",
		name: "Testimonials",
		imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
		href: "/browse/creators?service=testimonials",
	},
	{
		id: "6",
		name: "Lifestyle Content",
		imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop",
		href: "/browse/creators?service=lifestyle",
	},
	{
		id: "7",
		name: "Tutorial Videos",
		imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=400&fit=crop",
		href: "/browse/creators?service=tutorials",
	},
	{
		id: "8",
		name: "Brand Storytelling",
		imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
		href: "/browse/creators?service=brand-storytelling",
	},
];

export function PopularServicesCarousel() {
	const { isDesktop } = useResponsive();
	const scrollViewRef = useRef<ScrollViewType>(null);
	const gap = 20;

	const scrollLeft = () => {
		scrollViewRef.current?.scrollTo({
			x: 0,
			animated: true,
		});
	};

	const scrollRight = () => {
		scrollViewRef.current?.scrollToEnd({ animated: true });
	};

	return (
		<View
			style={{
				paddingVertical: 64,
				paddingHorizontal: 24,
				backgroundColor: "#fafafa",
			}}
		>
			<View
				style={{
					maxWidth: 1200,
					marginHorizontal: "auto",
					width: "100%",
				}}
			>
				{/* Header */}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 24,
					}}
				>
					<Text
						style={{
							fontSize: 28,
							fontWeight: "700",
							color: THEME_COLORS.foreground,
						}}
					>
						Popular services
					</Text>

					{/* Navigation Arrows */}
					{isDesktop && POPULAR_SERVICES.length > 4 && (
						<View style={{ flexDirection: "row", gap: 8 }}>
							<Pressable
								onPress={scrollLeft}
								style={({ hovered }) => ({
									width: 40,
									height: 40,
									borderRadius: 20,
									borderWidth: 1,
									borderColor: hovered
										? THEME_COLORS.primary
										: THEME_COLORS.border,
									alignItems: "center",
									justifyContent: "center",
									backgroundColor: hovered ? "#f0fdf4" : "transparent",
								})}
							>
								<Ionicons
									color={THEME_COLORS.foreground}
									name="chevron-back"
									size={20}
								/>
							</Pressable>
							<Pressable
								onPress={scrollRight}
								style={({ hovered }) => ({
									width: 40,
									height: 40,
									borderRadius: 20,
									borderWidth: 1,
									borderColor: hovered
										? THEME_COLORS.primary
										: THEME_COLORS.border,
									alignItems: "center",
									justifyContent: "center",
									backgroundColor: hovered ? "#f0fdf4" : "transparent",
								})}
							>
								<Ionicons
									color={THEME_COLORS.foreground}
									name="chevron-forward"
									size={20}
								/>
							</Pressable>
						</View>
					)}
				</View>

				{/* Cards */}
				<ScrollView
					contentContainerStyle={{ gap, paddingVertical: 8, paddingHorizontal: 4 }}
					horizontal
					ref={scrollViewRef}
					showsHorizontalScrollIndicator={false}
					style={{
						// @ts-ignore - Web-specific scroll snap
						scrollSnapType: "x mandatory",
					}}
				>
					{POPULAR_SERVICES.map((service) => (
						<View
							key={service.id}
							style={{
								// @ts-ignore - Web-specific scroll snap
								scrollSnapAlign: "start",
							}}
						>
							<ServiceCard
								href={service.href}
								imageUrl={service.imageUrl}
								name={service.name}
							/>
						</View>
					))}
				</ScrollView>
			</View>
		</View>
	);
}

export default PopularServicesCarousel;
