import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/useResponsive";
import { Link } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

/* ── Root ── */
export function PromoBannerRoot({
	children,
	className,
}: { children: ReactNode; className?: string }) {
	const { isMobile, isTablet } = useResponsive();
	const isCompact = isMobile || isTablet;

	return (
		<View className="px-6 py-8">
			<View
				className={cn(
					"mx-auto w-full max-w-[1200px] overflow-hidden rounded-3xl",
					isCompact ? "flex-col" : "flex-row",
					className,
				)}
			>
				{children}
			</View>
		</View>
	);
}

/* ── Content (left column) ── */
export function PromoBannerContent({ children }: { children: ReactNode }) {
	const { isMobile, isTablet } = useResponsive();
	const isCompact = isMobile || isTablet;

	return (
		<View
			className={cn(
				"justify-center",
				isCompact ? "p-8" : "flex-[0.6] p-12",
			)}
		>
			{children}
		</View>
	);
}

/* ── Badge ── */
export function PromoBannerBadge({
	className,
}: { className?: string }) {
	return (
		<View className="mb-4">
			<Text className={cn("text-2xl font-bold", className)}>
				<Text className="font-extrabold">UGC</Text>
				<Text className="font-light"> pro.</Text>
			</Text>
		</View>
	);
}

/* ── Heading ── */
export function PromoBannerHeading({
	children,
	className,
}: { children: ReactNode; className?: string }) {
	const { isMobile, isTablet } = useResponsive();
	const isCompact = isMobile || isTablet;

	return (
		<Text
			className={cn(
				"mb-4 font-bold",
				isCompact ? "text-[28px] leading-9" : "text-4xl leading-[44px]",
				className,
			)}
		>
			{children}
		</Text>
	);
}

/* ── Description ── */
export function PromoBannerDescription({
	children,
	className,
}: { children: ReactNode; className?: string }) {
	const { isMobile, isTablet } = useResponsive();
	const isCompact = isMobile || isTablet;

	return (
		<Text
			className={cn(
				"mb-6 max-w-[400px]",
				isCompact ? "text-sm leading-[22px]" : "text-base leading-[26px]",
				className,
			)}
		>
			{children}
		</Text>
	);
}

/* ── CTA Button ── */
export function PromoBannerCTA({
	label,
	href,
	onPress,
	className,
	textClassName,
}: {
	label: string;
	href?: string;
	onPress?: () => void;
	className?: string;
	textClassName?: string;
}) {
	const button = (
		<Pressable
			className={cn(
				"self-start rounded-lg px-8 py-4 hover:opacity-90",
				className,
			)}
			onPress={onPress}
		>
			<Text className={cn("text-base font-semibold", textClassName)}>
				{label}
			</Text>
		</Pressable>
	);

	if (href) {
		return (
			<Link asChild href={href as any}>
				{button}
			</Link>
		);
	}

	return button;
}

/* ── Media (right column) ── */
export function PromoBannerMedia({ children }: { children: ReactNode }) {
	const { isMobile, isTablet } = useResponsive();
	const isCompact = isMobile || isTablet;

	return (
		<View
			className={cn(
				"items-center justify-center",
				isCompact ? "min-h-[200px] p-4" : "min-h-[300px] flex-[0.4] p-6",
			)}
		>
			{children}
		</View>
	);
}

/* ── Video ── */
export function PromoBannerVideo({ src }: { src: string }) {
	return (
		<View className="aspect-[16/10] w-full max-w-[400px] overflow-hidden rounded-2xl">
			<video
				autoPlay
				loop
				muted
				playsInline
				className="h-full w-full object-cover"
			>
				<source src={src} type="video/mp4" />
			</video>
		</View>
	);
}
