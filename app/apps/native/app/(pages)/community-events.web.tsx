import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { SEO, createWebPageJsonLd, createEventJsonLd } from "@/components/web/SEO";

// Fiverr-style theme colors
const THEME_COLORS = {
	primary: "#1DBF73",
	primaryForeground: "#FFFFFF",
	foreground: "#222325",
	muted: "#62646a",
	border: "#e4e5e7",
	background: "#FFFFFF",
	sectionBackground: "#fafafa",
};

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

// Event type colors
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
		<ScrollView style={{ flex: 1, backgroundColor: THEME_COLORS.background }}>
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
				style={{
					paddingTop: 64,
					paddingBottom: 64,
					paddingHorizontal: 24,
					backgroundColor: "#4F46E5",
				}}
			>
				<View
					style={{
						maxWidth: 800,
						marginHorizontal: "auto",
						width: "100%",
						alignItems: "center",
					}}
				>
					<View
						style={{
							width: 72,
							height: 72,
							borderRadius: 36,
							backgroundColor: "rgba(255,255,255,0.2)",
							alignItems: "center",
							justifyContent: "center",
							marginBottom: 24,
						}}
					>
						<Ionicons
							color={THEME_COLORS.primaryForeground}
							name="calendar-outline"
							size={36}
						/>
					</View>
					<Text
						style={{
							fontSize: isMobile ? 32 : 48,
							fontWeight: "700",
							color: THEME_COLORS.primaryForeground,
							textAlign: "center",
							marginBottom: 16,
						}}
					>
						Connect, Learn, Grow
					</Text>
					<Text
						style={{
							fontSize: 18,
							color: "rgba(255,255,255,0.9)",
							textAlign: "center",
							maxWidth: 600,
							lineHeight: 28,
						}}
					>
						Join our community events to learn from experts, connect with fellow
						creators, and level up your skills.
					</Text>
				</View>
			</View>

			{/* Featured Event */}
			<View
				style={{
					paddingHorizontal: 24,
					paddingVertical: 64,
				}}
			>
				<View
					style={{
						maxWidth: 1200,
						marginHorizontal: "auto",
						width: "100%",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 8,
							marginBottom: 20,
						}}
					>
						<Ionicons color="#EC4899" name="star" size={20} />
						<Text
							style={{
								fontSize: 13,
								fontWeight: "600",
								color: "#EC4899",
								textTransform: "uppercase",
								letterSpacing: 1,
							}}
						>
							Featured Event
						</Text>
					</View>

					<View
						style={{
							flexDirection: isMobile ? "column" : "row",
							backgroundColor: THEME_COLORS.background,
							borderRadius: 20,
							overflow: "hidden",
							borderWidth: 1,
							borderColor: THEME_COLORS.border,
						}}
					>
						{/* Image */}
						<View
							style={{
								width: isMobile ? "100%" : "50%",
								height: isMobile ? 240 : 380,
								backgroundColor: THEME_COLORS.sectionBackground,
							}}
						>
							<Image
								source={{ uri: FEATURED_EVENT.image }}
								style={{ width: "100%", height: "100%" }}
								resizeMode="cover"
							/>
						</View>

						{/* Content */}
						<View
							style={{
								flex: 1,
								padding: isMobile ? 24 : 40,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 8,
									marginBottom: 16,
								}}
							>
								<View
									style={{
										paddingHorizontal: 10,
										paddingVertical: 4,
										borderRadius: 4,
										backgroundColor: `${TYPE_COLORS[FEATURED_EVENT.type]}15`,
									}}
								>
									<Text
										style={{
											fontSize: 11,
											fontWeight: "600",
											color: TYPE_COLORS[FEATURED_EVENT.type],
											textTransform: "uppercase",
										}}
									>
										{FEATURED_EVENT.type}
									</Text>
								</View>
								{FEATURED_EVENT.isVirtual && (
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											gap: 4,
										}}
									>
										<Ionicons
											color={THEME_COLORS.muted}
											name="videocam"
											size={14}
										/>
										<Text style={{ fontSize: 12, color: THEME_COLORS.muted }}>
											Virtual
										</Text>
									</View>
								)}
								{FEATURED_EVENT.isInPerson && (
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											gap: 4,
										}}
									>
										<Ionicons
											color={THEME_COLORS.muted}
											name="location"
											size={14}
										/>
										<Text style={{ fontSize: 12, color: THEME_COLORS.muted }}>
											In Person
										</Text>
									</View>
								)}
							</View>

							<Text
								style={{
									fontSize: isMobile ? 24 : 32,
									fontWeight: "700",
									color: THEME_COLORS.foreground,
									marginBottom: 12,
									lineHeight: isMobile ? 32 : 42,
								}}
							>
								{FEATURED_EVENT.title}
							</Text>

							<Text
								style={{
									fontSize: 16,
									color: THEME_COLORS.muted,
									lineHeight: 26,
									marginBottom: 24,
								}}
							>
								{FEATURED_EVENT.description}
							</Text>

							{/* Event Details */}
							<View style={{ gap: 12, marginBottom: 24 }}>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										gap: 12,
									}}
								>
									<Ionicons
										color={THEME_COLORS.primary}
										name="calendar-outline"
										size={20}
									/>
									<Text
										style={{
											fontSize: 15,
											color: THEME_COLORS.foreground,
											fontWeight: "500",
										}}
									>
										{FEATURED_EVENT.date}
									</Text>
								</View>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										gap: 12,
									}}
								>
									<Ionicons
										color={THEME_COLORS.primary}
										name="time-outline"
										size={20}
									/>
									<Text
										style={{
											fontSize: 15,
											color: THEME_COLORS.foreground,
											fontWeight: "500",
										}}
									>
										{FEATURED_EVENT.time}
									</Text>
								</View>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										gap: 12,
									}}
								>
									<Ionicons
										color={THEME_COLORS.primary}
										name="location-outline"
										size={20}
									/>
									<Text
										style={{
											fontSize: 15,
											color: THEME_COLORS.foreground,
											fontWeight: "500",
										}}
									>
										{FEATURED_EVENT.location}
									</Text>
								</View>
							</View>

							{/* Stats */}
							<View
								style={{
									flexDirection: "row",
									gap: 32,
									marginBottom: 24,
								}}
							>
								<View>
									<Text
										style={{
											fontSize: 24,
											fontWeight: "700",
											color: THEME_COLORS.primary,
										}}
									>
										{FEATURED_EVENT.attendees.toLocaleString()}+
									</Text>
									<Text
										style={{ fontSize: 13, color: THEME_COLORS.muted }}
									>
										Expected Attendees
									</Text>
								</View>
								<View>
									<Text
										style={{
											fontSize: 24,
											fontWeight: "700",
											color: THEME_COLORS.primary,
										}}
									>
										{FEATURED_EVENT.speakers}+
									</Text>
									<Text
										style={{ fontSize: 13, color: THEME_COLORS.muted }}
									>
										Speakers
									</Text>
								</View>
							</View>

							<Pressable
								style={({ hovered }) => ({
									paddingHorizontal: 32,
									paddingVertical: 14,
									backgroundColor: hovered ? "#19a864" : THEME_COLORS.primary,
									borderRadius: 8,
									alignSelf: "flex-start",
								})}
							>
								<Text
									style={{
										fontSize: 16,
										fontWeight: "600",
										color: THEME_COLORS.primaryForeground,
									}}
								>
									Register Now
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</View>

			{/* Event Filters */}
			<View
				style={{
					paddingHorizontal: 24,
					paddingBottom: 32,
				}}
			>
				<View
					style={{
						maxWidth: 1200,
						marginHorizontal: "auto",
						width: "100%",
					}}
				>
					<Text
						style={{
							fontSize: 28,
							fontWeight: "700",
							color: THEME_COLORS.foreground,
							marginBottom: 20,
						}}
					>
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
								style={({ hovered }) => ({
									paddingHorizontal: 20,
									paddingVertical: 10,
									borderRadius: 100,
									backgroundColor:
										selectedFilter === filter.value
											? THEME_COLORS.foreground
											: hovered
												? THEME_COLORS.sectionBackground
												: THEME_COLORS.background,
									borderWidth: 1,
									borderColor:
										selectedFilter === filter.value
											? THEME_COLORS.foreground
											: THEME_COLORS.border,
								})}
							>
								<Text
									style={{
										fontSize: 14,
										fontWeight: "500",
										color:
											selectedFilter === filter.value
												? THEME_COLORS.primaryForeground
												: THEME_COLORS.foreground,
									}}
								>
									{filter.name}
								</Text>
							</Pressable>
						))}
					</ScrollView>
				</View>
			</View>

			{/* Events Grid */}
			<View
				style={{
					paddingHorizontal: 24,
					paddingBottom: 64,
				}}
			>
				<View
					style={{
						maxWidth: 1200,
						marginHorizontal: "auto",
						width: "100%",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							gap: 24,
						}}
					>
						{filteredEvents.map((event) => (
							<Pressable
								key={event.title}
								style={({ hovered }) => ({
									width: isMobile ? "100%" : isTablet ? "48%" : "31%",
									backgroundColor: THEME_COLORS.background,
									borderRadius: 16,
									overflow: "hidden",
									borderWidth: 1,
									borderColor: hovered
										? TYPE_COLORS[event.type]
										: THEME_COLORS.border,
								})}
							>
								{({ hovered }) => (
									<>
										{/* Image */}
										<View
											style={{
												height: 160,
												backgroundColor: THEME_COLORS.sectionBackground,
											}}
										>
											<Image
												source={{ uri: event.image }}
												style={{ width: "100%", height: "100%" }}
												resizeMode="cover"
											/>
											<View
												style={{
													position: "absolute",
													top: 12,
													left: 12,
													paddingHorizontal: 10,
													paddingVertical: 4,
													borderRadius: 4,
													backgroundColor: TYPE_COLORS[event.type],
												}}
											>
												<Text
													style={{
														fontSize: 11,
														fontWeight: "600",
														color: THEME_COLORS.primaryForeground,
														textTransform: "uppercase",
													}}
												>
													{event.type}
												</Text>
											</View>
										</View>

										{/* Content */}
										<View style={{ padding: 20 }}>
											<Text
												style={{
													fontSize: 18,
													fontWeight: "600",
													color: hovered
														? TYPE_COLORS[event.type]
														: THEME_COLORS.foreground,
													marginBottom: 8,
													lineHeight: 26,
												}}
											>
												{event.title}
											</Text>

											<Text
												style={{
													fontSize: 14,
													color: THEME_COLORS.muted,
													lineHeight: 22,
													marginBottom: 16,
												}}
												numberOfLines={2}
											>
												{event.description}
											</Text>

											{/* Event Details */}
											<View style={{ gap: 8, marginBottom: 16 }}>
												<View
													style={{
														flexDirection: "row",
														alignItems: "center",
														gap: 8,
													}}
												>
													<Ionicons
														color={THEME_COLORS.muted}
														name="calendar-outline"
														size={16}
													/>
													<Text
														style={{
															fontSize: 13,
															color: THEME_COLORS.foreground,
														}}
													>
														{event.date}
													</Text>
												</View>
												<View
													style={{
														flexDirection: "row",
														alignItems: "center",
														gap: 8,
													}}
												>
													<Ionicons
														color={THEME_COLORS.muted}
														name="time-outline"
														size={16}
													/>
													<Text
														style={{
															fontSize: 13,
															color: THEME_COLORS.foreground,
														}}
													>
														{event.time}
													</Text>
												</View>
												{event.location && (
													<View
														style={{
															flexDirection: "row",
															alignItems: "center",
															gap: 8,
														}}
													>
														<Ionicons
															color={THEME_COLORS.muted}
															name="location-outline"
															size={16}
														/>
														<Text
															style={{
																fontSize: 13,
																color: THEME_COLORS.foreground,
															}}
														>
															{event.location}
														</Text>
													</View>
												)}
											</View>

											{/* Footer */}
											<View
												style={{
													flexDirection: "row",
													justifyContent: "space-between",
													alignItems: "center",
													paddingTop: 16,
													borderTopWidth: 1,
													borderTopColor: THEME_COLORS.border,
												}}
											>
												<View
													style={{
														flexDirection: "row",
														alignItems: "center",
														gap: 4,
													}}
												>
													<Ionicons
														color={THEME_COLORS.muted}
														name="people-outline"
														size={16}
													/>
													<Text
														style={{
															fontSize: 13,
															color: THEME_COLORS.muted,
														}}
													>
														{event.attendees} spots
													</Text>
												</View>
												<View
													style={{
														flexDirection: "row",
														alignItems: "center",
														gap: 4,
													}}
												>
													{event.isVirtual && (
														<Ionicons
															color={THEME_COLORS.primary}
															name="videocam"
															size={16}
														/>
													)}
													{event.isInPerson && (
														<Ionicons
															color={THEME_COLORS.primary}
															name="location"
															size={16}
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
						<View
							style={{
								padding: 48,
								alignItems: "center",
							}}
						>
							<Ionicons
								color={THEME_COLORS.muted}
								name="calendar-outline"
								size={48}
								style={{ marginBottom: 16 }}
							/>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "600",
									color: THEME_COLORS.foreground,
									marginBottom: 8,
								}}
							>
								No events found
							</Text>
							<Text
								style={{
									fontSize: 14,
									color: THEME_COLORS.muted,
								}}
							>
								Try a different filter
							</Text>
						</View>
					)}
				</View>
			</View>

			{/* Past Events */}
			<View
				style={{
					paddingVertical: 64,
					paddingHorizontal: 24,
					backgroundColor: THEME_COLORS.sectionBackground,
				}}
			>
				<View
					style={{
						maxWidth: 1200,
						marginHorizontal: "auto",
						width: "100%",
					}}
				>
					<Text
						style={{
							fontSize: 24,
							fontWeight: "700",
							color: THEME_COLORS.foreground,
							marginBottom: 24,
						}}
					>
						Past Events
					</Text>

					<View
						style={{
							backgroundColor: THEME_COLORS.background,
							borderRadius: 16,
							borderWidth: 1,
							borderColor: THEME_COLORS.border,
							overflow: "hidden",
						}}
					>
						{PAST_EVENTS.map((event, index) => (
							<View
								key={event.title}
								style={{
									padding: 20,
									borderBottomWidth: index < PAST_EVENTS.length - 1 ? 1 : 0,
									borderBottomColor: THEME_COLORS.border,
									flexDirection: isMobile ? "column" : "row",
									alignItems: isMobile ? "flex-start" : "center",
									justifyContent: "space-between",
									gap: 12,
								}}
							>
								<View style={{ flex: 1 }}>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											gap: 8,
											marginBottom: 4,
										}}
									>
										<View
											style={{
												paddingHorizontal: 8,
												paddingVertical: 2,
												borderRadius: 4,
												backgroundColor: `${TYPE_COLORS[event.type]}15`,
											}}
										>
											<Text
												style={{
													fontSize: 10,
													fontWeight: "600",
													color: TYPE_COLORS[event.type],
													textTransform: "uppercase",
												}}
											>
												{event.type}
											</Text>
										</View>
										<Text style={{ fontSize: 13, color: THEME_COLORS.muted }}>
											{event.date}
										</Text>
									</View>
									<Text
										style={{
											fontSize: 16,
											fontWeight: "500",
											color: THEME_COLORS.foreground,
										}}
									>
										{event.title}
									</Text>
								</View>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										gap: 16,
									}}
								>
									<Text style={{ fontSize: 13, color: THEME_COLORS.muted }}>
										{event.attendees} attended
									</Text>
									{event.recording && (
										<Pressable
											style={({ hovered }) => ({
												flexDirection: "row",
												alignItems: "center",
												gap: 6,
												paddingHorizontal: 12,
												paddingVertical: 6,
												borderRadius: 6,
												backgroundColor: hovered
													? THEME_COLORS.sectionBackground
													: "transparent",
												borderWidth: 1,
												borderColor: THEME_COLORS.border,
											})}
										>
											<Ionicons
												color={THEME_COLORS.primary}
												name="play-circle"
												size={16}
											/>
											<Text
												style={{
													fontSize: 13,
													fontWeight: "500",
													color: THEME_COLORS.primary,
												}}
											>
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
			<View
				style={{
					paddingVertical: 64,
					paddingHorizontal: 24,
					backgroundColor: THEME_COLORS.foreground,
				}}
			>
				<View
					style={{
						maxWidth: 600,
						marginHorizontal: "auto",
						width: "100%",
						alignItems: "center",
					}}
				>
					<Ionicons
						color={THEME_COLORS.primary}
						name="notifications-outline"
						size={48}
						style={{ marginBottom: 20 }}
					/>
					<Text
						style={{
							fontSize: 28,
							fontWeight: "700",
							color: THEME_COLORS.primaryForeground,
							textAlign: "center",
							marginBottom: 12,
						}}
					>
						Never Miss an Event
					</Text>
					<Text
						style={{
							fontSize: 16,
							color: "#a0a0a0",
							textAlign: "center",
							marginBottom: 32,
							lineHeight: 24,
						}}
					>
						Subscribe to get notified about upcoming events, webinars, and
						community meetups in your area.
					</Text>
					<View
						style={{
							flexDirection: isMobile ? "column" : "row",
							gap: 12,
							width: "100%",
							maxWidth: 400,
						}}
					>
						<View
							style={{
								flex: 1,
								backgroundColor: "rgba(255,255,255,0.1)",
								borderRadius: 8,
								paddingHorizontal: 16,
								paddingVertical: 14,
							}}
						>
							<Text style={{ fontSize: 15, color: "#666" }}>
								Enter your email
							</Text>
						</View>
						<Pressable
							style={({ hovered }) => ({
								paddingHorizontal: 24,
								paddingVertical: 14,
								backgroundColor: hovered ? "#19a864" : THEME_COLORS.primary,
								borderRadius: 8,
							})}
						>
							<Text
								style={{
									fontSize: 15,
									fontWeight: "600",
									color: THEME_COLORS.primaryForeground,
									textAlign: "center",
								}}
							>
								Subscribe
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
