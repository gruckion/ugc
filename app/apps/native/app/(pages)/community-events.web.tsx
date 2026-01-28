import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd, createEventJsonLd } from "@/components/web/SEO";
import { cn } from "@/lib/utils";

// Event types
const EVENT_FILTERS = [
	{ name: "All Events", value: "all" },
	{ name: "Webinars", value: "webinar" },
	{ name: "Workshops", value: "workshop" },
	{ name: "Conferences", value: "conference" },
	{ name: "Meetups", value: "meetup" },
];

// Featured event
const FEATURED_EVENT = {
	title: "Creator Summit 2026",
	description:
		"Join us for our annual conference bringing together top creators, leading brands, and industry experts. Learn the latest strategies, network with peers, and take your creator career to the next level.",
	type: "conference",
	date: "March 15-16, 2026",
	time: "9:00 AM - 6:00 PM PST",
	location: "San Francisco, CA + Virtual",
	isVirtual: true,
	isInPerson: true,
	attendees: 2500,
	speakers: 30,
	image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
};

// Upcoming events
const UPCOMING_EVENTS = [
	{
		title: "UGC 101: Getting Started as a Creator",
		description:
			"Learn the fundamentals of creating user-generated content that brands love. Perfect for beginners.",
		type: "webinar",
		date: "February 5, 2026",
		time: "11:00 AM PST",
		isVirtual: true,
		isInPerson: false,
		attendees: 500,
		image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&q=80",
	},
	{
		title: "Advanced Video Production Workshop",
		description:
			"Hands-on workshop covering lighting, sound, and editing techniques for professional UGC.",
		type: "workshop",
		date: "February 12, 2026",
		time: "2:00 PM PST",
		isVirtual: true,
		isInPerson: false,
		attendees: 200,
		image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80",
	},
	{
		title: "NYC Creator Meetup",
		description:
			"Connect with fellow creators in New York City. Networking, portfolio reviews, and good vibes.",
		type: "meetup",
		date: "February 18, 2026",
		time: "6:00 PM EST",
		location: "Brooklyn, NY",
		isVirtual: false,
		isInPerson: true,
		attendees: 75,
		image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=400&q=80",
	},
	{
		title: "Brand Strategy for UGC Campaigns",
		description:
			"Learn how to build effective UGC campaigns from marketing leaders at top brands.",
		type: "webinar",
		date: "February 25, 2026",
		time: "10:00 AM PST",
		isVirtual: true,
		isInPerson: false,
		attendees: 350,
		image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
	},
	{
		title: "LA Creator Workshop: Product Photography",
		description:
			"In-person workshop focused on product photography techniques and lighting setups.",
		type: "workshop",
		date: "March 1, 2026",
		time: "10:00 AM PST",
		location: "Los Angeles, CA",
		isVirtual: false,
		isInPerson: true,
		attendees: 50,
		image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80",
	},
	{
		title: "Pricing and Negotiation Masterclass",
		description:
			"Master the art of pricing your content and negotiating with brands for better deals.",
		type: "webinar",
		date: "March 8, 2026",
		time: "1:00 PM PST",
		isVirtual: true,
		isInPerson: false,
		attendees: 400,
		image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
	},
];

// Past events
const PAST_EVENTS = [
	{
		title: "Creator Year in Review 2025",
		type: "webinar",
		date: "December 15, 2025",
		attendees: 1200,
		recording: true,
	},
	{
		title: "Holiday Content Creation Workshop",
		type: "workshop",
		date: "November 20, 2025",
		attendees: 350,
		recording: true,
	},
	{
		title: "SF Creator Meetup",
		type: "meetup",
		date: "November 8, 2025",
		attendees: 85,
		recording: false,
	},
];

// Event type colors (data-driven, acceptable as inline style exception)
const TYPE_COLORS: Record<string, string> = {
	webinar: "#4F46E5",
	workshop: "#F59E0B",
	conference: "#EC4899",
	meetup: "#1DBF73",
};

export default function CommunityEventsPage() {
	const { isMobile, isTablet } = useResponsive();
	const [selectedFilter, setSelectedFilter] = useState("all");

	const filteredEvents =
		selectedFilter === "all"
			? UPCOMING_EVENTS
			: UPCOMING_EVENTS.filter((e) => e.type === selectedFilter);

	const pageJsonLd = createWebPageJsonLd(
		"Community Events - UGC Marketplace",
		"Join webinars, workshops, and conferences for UGC creators and brands.",
		"/community-events"
	);

	// Create Event schema for featured event
	const featuredEventJsonLd = createEventJsonLd({
		name: FEATURED_EVENT.title,
		description: FEATURED_EVENT.description,
		startDate: "2026-03-15T09:00:00-08:00",
		endDate: "2026-03-16T18:00:00-08:00",
		location: FEATURED_EVENT.location,
		isOnline: FEATURED_EVENT.isVirtual,
	});

	// Create Event schemas for upcoming events
	const upcomingEventsJsonLd = UPCOMING_EVENTS.slice(0, 3).map((event) =>
		createEventJsonLd({
			name: event.title,
			description: event.description,
			startDate: `2026-02-05T${event.time.includes("AM") ? "11:00" : "14:00"}:00-08:00`,
			location: event.location,
			isOnline: event.isVirtual,
		})
	);

	// Combined JSON-LD array
	const eventsJsonLd = [pageJsonLd, featuredEventJsonLd, ...upcomingEventsJsonLd];

	return (
		<ScrollView className="flex-1 bg-background">
			<SEO
				title="Community Events"
				description="Join UGC Marketplace community events. Attend webinars, workshops, conferences, and meetups for creators and brands. Learn, network, and grow your career."
				path="/community-events"
				keywords={[
					"UGC events",
					"creator workshops",
					"content marketing webinars",
					"creator conferences",
					"networking events",
				]}
				jsonLd={eventsJsonLd}
			/>

			{/* Hero Section */}
			<View
				className="px-6 py-16"
				style={{ backgroundColor: "#4F46E5" }}
			>
				<View className="max-w-[800px] mx-auto w-full items-center">
					<View
						className="w-[72px] h-[72px] rounded-full items-center justify-center mb-6"
						style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
					>
						<Ionicons
							name="calendar-outline"
							size={36}
							className="text-primary-foreground"
						/>
					</View>
					<Text
						className="font-bold text-center mb-4 text-primary-foreground"
						style={{ fontSize: isMobile ? 32 : 48 }}
					>
						Connect, Learn, Grow
					</Text>
					<Text
						className="text-lg text-center max-w-[600px]"
						style={{
							color: "rgba(255,255,255,0.9)",
							lineHeight: 28,
						}}
					>
						Join our community events to learn from experts, connect with fellow
						creators, and level up your skills.
					</Text>
				</View>
			</View>

			{/* Featured Event */}
			<View className="px-6 py-16">
				<View className="max-w-[1200px] mx-auto w-full">
					<View className="flex-row items-center gap-2 mb-5">
						<Ionicons color="#EC4899" name="star" size={20} />
						<Text
							className="text-[13px] font-semibold uppercase"
							style={{
								color: "#EC4899",
								letterSpacing: 1,
							}}
						>
							Featured Event
						</Text>
					</View>

					<View
						className="bg-background rounded-[20px] overflow-hidden border border-border"
						style={{
							flexDirection: isMobile ? "column" : "row",
						}}
					>
						{/* Image */}
						<View
							className="bg-sectionBackground"
							style={{
								width: isMobile ? "100%" : "50%",
								height: isMobile ? 240 : 380,
							}}
						>
							<Image
								source={{ uri: FEATURED_EVENT.image }}
								className="w-full h-full"
								resizeMode="cover"
							/>
						</View>

						{/* Content */}
						<View
							className="flex-1"
							style={{
								padding: isMobile ? 24 : 40,
							}}
						>
							<View className="flex-row items-center gap-2 mb-4">
								<View
									className="px-[10px] py-1 rounded"
									style={{
										backgroundColor: `${TYPE_COLORS[FEATURED_EVENT.type]}15`,
									}}
								>
									<Text
										className="text-[11px] font-semibold uppercase"
										style={{
											color: TYPE_COLORS[FEATURED_EVENT.type],
										}}
									>
										{FEATURED_EVENT.type}
									</Text>
								</View>
								{FEATURED_EVENT.isVirtual && (
									<View className="flex-row items-center gap-1">
										<Ionicons
											name="videocam"
											size={14}
											className="text-muted"
										/>
										<Text className="text-xs text-muted">
											Virtual
										</Text>
									</View>
								)}
								{FEATURED_EVENT.isInPerson && (
									<View className="flex-row items-center gap-1">
										<Ionicons
											name="location"
											size={14}
											className="text-muted"
										/>
										<Text className="text-xs text-muted">
											In Person
										</Text>
									</View>
								)}
							</View>

							<Text
								className="font-bold text-foreground mb-3"
								style={{
									fontSize: isMobile ? 24 : 32,
									lineHeight: isMobile ? 32 : 42,
								}}
							>
								{FEATURED_EVENT.title}
							</Text>

							<Text
								className="text-base text-muted mb-6"
								style={{ lineHeight: 26 }}
							>
								{FEATURED_EVENT.description}
							</Text>

							{/* Event Details */}
							<View className="gap-3 mb-6">
								<View className="flex-row items-center gap-3">
									<Ionicons
										name="calendar-outline"
										size={20}
										className="text-primary"
									/>
									<Text className="text-[15px] text-foreground font-medium">
										{FEATURED_EVENT.date}
									</Text>
								</View>
								<View className="flex-row items-center gap-3">
									<Ionicons
										name="time-outline"
										size={20}
										className="text-primary"
									/>
									<Text className="text-[15px] text-foreground font-medium">
										{FEATURED_EVENT.time}
									</Text>
								</View>
								<View className="flex-row items-center gap-3">
									<Ionicons
										name="location-outline"
										size={20}
										className="text-primary"
									/>
									<Text className="text-[15px] text-foreground font-medium">
										{FEATURED_EVENT.location}
									</Text>
								</View>
							</View>

							{/* Stats */}
							<View className="flex-row gap-8 mb-6">
								<View>
									<Text className="text-2xl font-bold text-primary">
										{FEATURED_EVENT.attendees.toLocaleString()}+
									</Text>
									<Text className="text-[13px] text-muted">
										Expected Attendees
									</Text>
								</View>
								<View>
									<Text className="text-2xl font-bold text-primary">
										{FEATURED_EVENT.speakers}+
									</Text>
									<Text className="text-[13px] text-muted">
										Speakers
									</Text>
								</View>
							</View>

							<Pressable
								className="px-8 py-[14px] rounded-lg self-start bg-primary hover:bg-hover-primary"
							>
								<Text className="text-base font-semibold text-primaryForeground">
									Register Now
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</View>

			{/* Event Filters */}
			<View className="px-6 pb-8">
				<View className="max-w-[1200px] mx-auto w-full">
					<Text className="text-[28px] font-bold text-foreground mb-5">
						Upcoming Events
					</Text>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ gap: 8 }}
					>
						{EVENT_FILTERS.map((filter) => (
							<Pressable
								key={filter.value}
								onPress={() => setSelectedFilter(filter.value)}
								className={cn(
									"px-5 py-[10px] rounded-full border",
									selectedFilter === filter.value
										? "bg-foreground border-foreground"
										: "border-border bg-background hover:bg-surface-raised"
								)}
							>
								<Text
									className={cn(
										"text-sm font-medium",
										selectedFilter === filter.value
											? "text-primary-foreground"
											: "text-foreground"
									)}
								>
									{filter.name}
								</Text>
							</Pressable>
						))}
					</ScrollView>
				</View>
			</View>

			{/* Events Grid */}
			<View className="px-6 pb-16">
				<View className="max-w-[1200px] mx-auto w-full">
					<View className="flex-row flex-wrap gap-6">
						{filteredEvents.map((event) => (
							<Pressable
								key={event.title}
								className="rounded-2xl overflow-hidden border border-border bg-background"
								style={({ hovered }) => ({
									width: isMobile ? "100%" : isTablet ? "48%" : "31%",
									borderColor: hovered
										? TYPE_COLORS[event.type]
										: undefined,
								})}
							>
								{({ hovered }) => (
									<>
										{/* Image */}
										<View className="h-[160px] bg-sectionBackground">
											<Image
												source={{ uri: event.image }}
												className="w-full h-full"
												resizeMode="cover"
											/>
											<View
												className="absolute top-3 left-3 px-[10px] py-1 rounded"
												style={{
													backgroundColor: TYPE_COLORS[event.type],
												}}
											>
												<Text className="text-[11px] font-semibold text-primaryForeground uppercase">
													{event.type}
												</Text>
											</View>
										</View>

										{/* Content */}
										<View className="p-5">
											<Text
												className={cn(
													"text-lg font-semibold mb-2",
													hovered ? "" : "text-foreground"
												)}
												style={{
													color: hovered
														? TYPE_COLORS[event.type]
														: undefined,
													lineHeight: 26,
												}}
											>
												{event.title}
											</Text>

											<Text
												className="text-sm text-muted mb-4"
												style={{ lineHeight: 22 }}
												numberOfLines={2}
											>
												{event.description}
											</Text>

											{/* Event Details */}
											<View className="gap-2 mb-4">
												<View className="flex-row items-center gap-2">
													<Ionicons
														name="calendar-outline"
														size={16}
														className="text-muted"
													/>
													<Text className="text-[13px] text-foreground">
														{event.date}
													</Text>
												</View>
												<View className="flex-row items-center gap-2">
													<Ionicons
														name="time-outline"
														size={16}
														className="text-muted"
													/>
													<Text className="text-[13px] text-foreground">
														{event.time}
													</Text>
												</View>
												{event.location && (
													<View className="flex-row items-center gap-2">
														<Ionicons
															name="location-outline"
															size={16}
															className="text-muted"
														/>
														<Text className="text-[13px] text-foreground">
															{event.location}
														</Text>
													</View>
												)}
											</View>

											{/* Footer */}
											<View className="flex-row justify-between items-center pt-4 border-t border-border">
												<View className="flex-row items-center gap-1">
													<Ionicons
														name="people-outline"
														size={16}
														className="text-muted"
													/>
													<Text className="text-[13px] text-muted">
														{event.attendees} spots
													</Text>
												</View>
												<View className="flex-row items-center gap-1">
													{event.isVirtual && (
														<Ionicons
															name="videocam"
															size={16}
															className="text-primary"
														/>
													)}
													{event.isInPerson && (
														<Ionicons
															name="location"
															size={16}
															className="text-primary"
														/>
													)}
												</View>
											</View>
										</View>
									</>
								)}
							</Pressable>
						))}
					</View>

					{filteredEvents.length === 0 && (
						<View className="p-12 items-center">
							<Ionicons
								name="calendar-outline"
								size={48}
								className="mb-4 text-muted"
							/>
							<Text className="text-lg font-semibold text-foreground mb-2">
								No events found
							</Text>
							<Text className="text-sm text-muted">
								Try a different filter
							</Text>
						</View>
					)}
				</View>
			</View>

			{/* Past Events */}
			<View className="py-16 px-6 bg-surface-raised">
				<View className="max-w-[1200px] mx-auto w-full">
					<Text className="text-2xl font-bold text-foreground mb-6">
						Past Events
					</Text>

					<View className="bg-background rounded-2xl border border-border overflow-hidden">
						{PAST_EVENTS.map((event, index) => (
							<View
								key={event.title}
								className={cn(
									"p-5 justify-between gap-3",
									index < PAST_EVENTS.length - 1
										? "border-b border-border"
										: ""
								)}
								style={{
									flexDirection: isMobile ? "column" : "row",
									alignItems: isMobile ? "flex-start" : "center",
								}}
							>
								<View className="flex-1">
									<View className="flex-row items-center gap-2 mb-1">
										<View
											className="px-2 py-[2px] rounded"
											style={{
												backgroundColor: `${TYPE_COLORS[event.type]}15`,
											}}
										>
											<Text
												className="text-[10px] font-semibold uppercase"
												style={{
													color: TYPE_COLORS[event.type],
												}}
											>
												{event.type}
											</Text>
										</View>
										<Text className="text-[13px] text-muted">
											{event.date}
										</Text>
									</View>
									<Text className="text-base font-medium text-foreground">
										{event.title}
									</Text>
								</View>
								<View className="flex-row items-center gap-4">
									<Text className="text-[13px] text-muted">
										{event.attendees} attended
									</Text>
									{event.recording && (
										<Pressable
											className="flex-row items-center gap-[6px] px-3 py-[6px] rounded-md border border-border hover:bg-surface-raised"
										>
											<Ionicons
												name="play-circle"
												size={16}
												className="text-primary"
											/>
											<Text className="text-[13px] font-medium text-primary">
												Watch Recording
											</Text>
										</Pressable>
									)}
								</View>
							</View>
						))}
					</View>
				</View>
			</View>

			{/* Newsletter CTA */}
			<View className="py-16 px-6 bg-foreground">
				<View className="max-w-[600px] mx-auto w-full items-center">
					<Ionicons
						name="notifications-outline"
						size={48}
						className="mb-5 text-primary"
					/>
					<Text className="text-[28px] font-bold text-primaryForeground text-center mb-3">
						Never Miss an Event
					</Text>
					<Text
						className="text-base text-center mb-8 text-muted"
						style={{ lineHeight: 24 }}
					>
						Subscribe to get notified about upcoming events, webinars, and
						community meetups in your area.
					</Text>
					<View
						className="gap-3 w-full max-w-[400px]"
						style={{
							flexDirection: isMobile ? "column" : "row",
						}}
					>
						<View
							className="flex-1 rounded-lg px-4 py-[14px]"
							style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
						>
							<Text className="text-[15px] text-muted">
								Enter your email
							</Text>
						</View>
						<Pressable
							className="px-6 py-[14px] rounded-lg bg-primary hover:bg-hover-primary"
						>
							<Text className="text-[15px] font-semibold text-primaryForeground text-center">
								Subscribe
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
