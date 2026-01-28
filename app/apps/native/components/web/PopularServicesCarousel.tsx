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
		<View className="py-16 px-6 bg-surface-raised">
			<View className="max-w-[1200px] mx-auto w-full">
				{/* Header */}
				<View className="flex-row justify-between items-center mb-6">
					<Text className="text-[28px] font-bold text-foreground">
						Popular services
					</Text>

					{/* Navigation Arrows */}
					{isDesktop && POPULAR_SERVICES.length > 4 && (
						<View className="flex-row gap-2">
							<Pressable
								className="w-10 h-10 rounded-full border border-border items-center justify-center hover:border-primary hover:bg-chip-bg"
								onPress={scrollLeft}
							>
								<Ionicons
									className="text-foreground"
									name="chevron-back"
									size={20}
								/>
							</Pressable>
							<Pressable
								className="w-10 h-10 rounded-full border border-border items-center justify-center hover:border-primary hover:bg-chip-bg"
								onPress={scrollRight}
							>
								<Ionicons
									className="text-foreground"
									name="chevron-forward"
									size={20}
								/>
							</Pressable>
						</View>
					)}
				</View>

				{/* Cards */}
				<ScrollView
					contentContainerClassName="py-2 px-1"
					contentContainerStyle={{ gap }}
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
