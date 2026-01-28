import { api } from "@convoexpo-and-nextjs-web-bun-better-auth/backend/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  FadeIn,
  FadeInDown,
  FadeInUp,
  interpolate,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  parseEventDateTime,
  useAddToCalendar,
} from "../../../lib/useAddToCalendar";
import { EVENTS } from "./index";

// Blurhash for event images
const EVENT_BLURHASH = "LKJRyV~qIU-;_3M{ofRj9Fxut7WB";

export default function EventDetail() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const primaryForeground = "#FFFFFF";

  // Auth state
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(api.auth.getCurrentUser, isAuthenticated ? {} : "skip");

  const event = EVENTS.find((e) => e.id === id);

  // RSVP state - reactive query (no useEffect!)
  const existingRsvp = useQuery(
    api.rsvps.getUserRsvpForEvent,
    isAuthenticated && event ? { eventId: event.id } : "skip"
  );
  const hasRsvp = existingRsvp != null;

  // Mutations
  const createRsvp = useMutation(api.rsvps.createRsvp);
  const cancelRsvpMutation = useMutation(api.rsvps.cancelRsvp);

  // Calendar hook
  const { addToCalendar, isLoading: isCalendarLoading } = useAddToCalendar();

  // RSVP form state
  const [formData, setFormData] = useState({
    guests: "1",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  // Animation values
  const scrollY = useSharedValue(0);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-100, 0],
      [1.5, 1],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });

  const handleSubmit = async () => {
    if (!(isAuthenticated && user && event)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const guestCount =
        formData.guests === "5+" ? 5 : Number.parseInt(formData.guests, 10);

      await createRsvp({
        eventId: event.id,
        guests: guestCount,
        notes: formData.notes || undefined,
      });

      Alert.alert(
        "RSVP Confirmed!",
        `Thank you ${user.name}! We've received your RSVP for ${event.title}. A confirmation email has been sent to ${user.email}.`,
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to create RSVP. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelRsvp = () => {
    if (!event) {
      return;
    }

    Alert.alert(
      "Cancel RSVP",
      `Are you sure you want to cancel your RSVP for ${event.title}?`,
      [
        { text: "Keep RSVP", style: "cancel" },
        {
          text: "Cancel RSVP",
          style: "destructive",
          onPress: async () => {
            setIsCancelling(true);
            try {
              await cancelRsvpMutation({ eventId: event.id });
              Alert.alert(
                "RSVP Cancelled",
                "Your RSVP has been cancelled successfully.",
                [{ text: "OK" }]
              );
            } catch (error) {
              Alert.alert(
                "Error",
                error instanceof Error
                  ? error.message
                  : "Failed to cancel RSVP. Please try again.",
                [{ text: "OK" }]
              );
            } finally {
              setIsCancelling(false);
            }
          },
        },
      ]
    );
  };

  const handleAddToCalendar = async () => {
    if (!event) {
      return;
    }

    try {
      const { startDate, endDate } = parseEventDateTime(
        event.dateRange,
        event.time
      );

      const success = await addToCalendar({
        title: `${event.title} - UGC`,
        startDate,
        endDate,
        location: `${event.location}, UGC`,
        notes: event.fullDescription,
        alarmMinutesBefore: 60, // 1 hour reminder
      });

      if (success) {
        Alert.alert(
          "Added to Calendar",
          "The event has been added to your calendar.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error("Error adding to calendar:", error);
    }
  };

  const handleSignIn = () => {
    router.push("/(auth)/landing");
  };

  if (!event) {
    return (
      <View
        className="flex-1 bg-background"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-foreground" style={{ fontSize: 18 }}>
          Event not found
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          onScroll={(e) => {
            scrollY.value = e.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {/* Hero Image */}
          <Animated.View style={headerAnimatedStyle}>
            <Animated.View entering={FadeIn.duration(400)}>
              <Image
                contentFit="cover"
                placeholder={{ blurhash: EVENT_BLURHASH }}
                source={event.image}
                style={{ width: "100%", height: 280 }}
                transition={300}
              />
            </Animated.View>
          </Animated.View>

          {/* Back Button - Fixed Position */}
          <Pressable
            onPress={() => router.back()}
            style={{
              position: "absolute",
              top: insets.top + 12,
              left: 16,
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <Ionicons color={primaryForeground} name="arrow-back" size={24} />
          </Pressable>

          {/* Content Container */}
          <Animated.View
            className="bg-background"
            entering={FadeInUp.delay(200).springify()}
            style={{
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              marginTop: -24,
              paddingTop: 24,
              paddingHorizontal: 20,
              paddingBottom: 32,
            }}
          >
            {/* Event Title & Badge */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 16,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  className="text-foreground"
                  style={{
                    fontSize: 28,
                    fontWeight: "300",
                    fontFamily: "serif",
                    lineHeight: 34,
                  }}
                >
                  {event.title}
                </Text>
              </View>
              {event.type === "special" && (
                <Animated.View
                  className="bg-accent"
                  entering={SlideInRight.delay(400)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                    marginLeft: 12,
                  }}
                >
                  <Text
                    className="text-foreground"
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    Special
                  </Text>
                </Animated.View>
              )}
            </View>

            {/* Event Info Grid */}
            <Animated.View
              className="bg-surface"
              entering={FadeInDown.delay(300).springify()}
              style={{
                borderRadius: 16,
                padding: 16,
                marginBottom: 20,
              }}
            >
              <InfoRow
                icon="calendar-outline"
                label="Date"
                value={event.dateRange}
              />
              <InfoRow icon="time-outline" label="Time" value={event.time} />
              <InfoRow
                icon="location-outline"
                label="Location"
                value={event.location}
              />
              <InfoRow
                icon="pricetag-outline"
                isLast
                label="Price"
                value={`£${event.price} per person`}
              />
            </Animated.View>

            {/* Description */}
            <Animated.View entering={FadeInDown.delay(400).springify()}>
              <Text
                className="text-foreground"
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginBottom: 12,
                }}
              >
                About This Event
              </Text>
              <Text
                className="text-muted"
                style={{
                  fontSize: 15,
                  lineHeight: 24,
                  marginBottom: 24,
                }}
              >
                {event.fullDescription}
              </Text>
            </Animated.View>

            {/* RSVP Section */}
            <Animated.View
              className="bg-primary"
              entering={FadeInDown.delay(500).springify()}
              style={{
                borderRadius: 20,
                padding: 20,
              }}
            >
              {isAuthenticated ? (
                hasRsvp ? (
                  // User has RSVP'd - show confirmation + actions
                  <RsvpConfirmation
                    event={event}
                    existingRsvp={existingRsvp}
                    isCalendarLoading={isCalendarLoading}
                    isCancelling={isCancelling}
                    onAddToCalendar={handleAddToCalendar}
                    onCancelRsvp={handleCancelRsvp}
                  />
                ) : (
                  // User hasn't RSVP'd - show form
                  <RsvpForm
                    event={event}
                    formData={formData}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                    setFormData={setFormData}
                    user={user}
                  />
                )
              ) : (
                // Not authenticated - show sign in prompt
                <SignInPrompt onSignIn={handleSignIn} />
              )}
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// RSVP Confirmation component - shown when user has RSVP'd
function RsvpConfirmation({
  event,
  existingRsvp,
  isCancelling,
  isCalendarLoading,
  onCancelRsvp,
  onAddToCalendar,
}: {
  event: (typeof EVENTS)[0];
  existingRsvp: { guests: number; notes?: string; createdAt: number };
  isCancelling: boolean;
  isCalendarLoading: boolean;
  onCancelRsvp: () => void;
  onAddToCalendar: () => void;
}) {
  const foreground = useThemeColor("foreground");
  const totalPrice = Number.parseInt(event.price, 10) * existingRsvp.guests;

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <View
          className="bg-accent"
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Ionicons color={foreground} name="checkmark-circle" size={28} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            className="text-primary-foreground"
            style={{
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            You're Going!
          </Text>
          <Text
            className="text-accent"
            style={{
              fontSize: 14,
            }}
          >
            RSVP confirmed
          </Text>
        </View>
      </View>

      {/* RSVP Details */}
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>Guests</Text>
          <Text
            className="text-primary-foreground"
            style={{ fontWeight: "500" }}
          >
            {existingRsvp.guests}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>Total</Text>
          <Text
            className="text-primary-foreground"
            style={{ fontWeight: "500" }}
          >
            £{totalPrice}
          </Text>
        </View>
        {existingRsvp.notes && (
          <View style={{ marginTop: 12 }}>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: 4,
              }}
            >
              Notes
            </Text>
            <Text className="text-primary-foreground">
              {existingRsvp.notes}
            </Text>
          </View>
        )}
      </View>

      {/* Add to Calendar Button */}
      <ActionButton
        disabled={isCalendarLoading}
        icon="calendar"
        isLoading={isCalendarLoading}
        label="Add to Calendar"
        onPress={onAddToCalendar}
        variant="primary"
      />

      {/* Cancel RSVP Button */}
      <ActionButton
        disabled={isCancelling}
        icon="close-circle-outline"
        isLoading={isCancelling}
        label="Cancel RSVP"
        onPress={onCancelRsvp}
        style={{ marginTop: 12 }}
        variant="destructive"
      />
    </>
  );
}

// RSVP Form component
function RsvpForm({
  user,
  event,
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
}: {
  user: { name: string; email: string } | null | undefined;
  event: (typeof EVENTS)[0];
  formData: { guests: string; notes: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{ guests: string; notes: string }>
  >;
  isSubmitting: boolean;
  onSubmit: () => void;
}) {
  const accent = useThemeColor("accent");
  const primaryForeground = "#FFFFFF";

  return (
    <>
      <Text
        className="text-primary-foreground"
        style={{
          fontSize: 22,
          fontWeight: "300",
          fontFamily: "serif",
          marginBottom: 4,
        }}
      >
        Reserve Your Spot
      </Text>
      <Text
        className="text-accent"
        style={{
          fontSize: 14,
          marginBottom: 20,
        }}
      >
        Complete the form below to RSVP
      </Text>

      {/* User Info Display */}
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Ionicons
            color={accent}
            name="person-circle-outline"
            size={20}
            style={{ marginRight: 10 }}
          />
          <Text
            className="text-primary-foreground"
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {user?.name || "Loading..."}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            color={accent}
            name="mail-outline"
            size={18}
            style={{ marginRight: 10 }}
          />
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: 14,
            }}
          >
            {user?.email || "Loading..."}
          </Text>
        </View>
      </View>

      {/* Number of Guests */}
      <View style={{ marginBottom: 16 }}>
        <Text
          className="text-accent"
          style={{
            fontSize: 13,
            marginBottom: 8,
            fontWeight: "500",
          }}
        >
          Number of Guests
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {["1", "2", "3", "4", "5+"].map((num) => (
            <GuestButton
              key={num}
              onPress={() => setFormData((prev) => ({ ...prev, guests: num }))}
              selected={formData.guests === num}
              value={num}
            />
          ))}
        </View>
      </View>

      {/* Special Requirements */}
      <View style={{ marginBottom: 20 }}>
        <Text
          className="text-accent"
          style={{
            fontSize: 13,
            marginBottom: 8,
            fontWeight: "500",
          }}
        >
          Special Requirements (Optional)
        </Text>
        <TextInput
          multiline
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, notes: text }))
          }
          placeholder="Dietary requirements, accessibility needs, etc."
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            color: primaryForeground,
            fontSize: 16,
            minHeight: 80,
            textAlignVertical: "top",
          }}
          value={formData.notes}
        />
      </View>

      {/* Submit Button */}
      <SubmitButton
        guests={formData.guests}
        isSubmitting={isSubmitting}
        onPress={onSubmit}
        price={event.price}
      />
    </>
  );
}

// Sign In Prompt component
function SignInPrompt({ onSignIn }: { onSignIn: () => void }) {
  return (
    <>
      <Text
        className="text-primary-foreground"
        style={{
          fontSize: 22,
          fontWeight: "300",
          fontFamily: "serif",
          marginBottom: 4,
        }}
      >
        Reserve Your Spot
      </Text>
      <Text
        className="text-accent"
        style={{
          fontSize: 14,
          marginBottom: 20,
        }}
      >
        Sign in to reserve your spot at this event
      </Text>
      <Pressable
        className="bg-primary-foreground"
        onPress={onSignIn}
        style={{
          borderRadius: 14,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <Text
          className="text-foreground"
          style={{
            fontSize: 17,
            fontWeight: "600",
          }}
        >
          Sign In to RSVP
        </Text>
      </Pressable>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
  isLast,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  isLast?: boolean;
}) {
  const accent = useThemeColor("accent");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "rgba(0, 0, 0, 0.06)",
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: `${accent}20`,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        <Ionicons color={accent} name={icon} size={18} />
      </View>
      <View style={{ flex: 1 }}>
        <Text className="text-muted" style={{ fontSize: 12, marginBottom: 2 }}>
          {label}
        </Text>
        <Text
          className="text-foreground"
          style={{
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

function GuestButton({
  value,
  selected,
  onPress,
}: {
  value: string;
  selected: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  // Add fallbacks to handle timing issue where useThemeColor may return "invalid" before theme loads
  const accent = useThemeColor("accent") || "#85b09a";
  const foreground = useThemeColor("foreground") || "#222325";
  const primaryForeground = "#FFFFFF";

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
      }}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: selected ? accent : "rgba(255, 255, 255, 0.1)",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text
          style={{
            color: selected ? foreground : primaryForeground,
            fontSize: 16,
            fontWeight: selected ? "600" : "400",
          }}
        >
          {value}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

function SubmitButton({
  onPress,
  isSubmitting,
  price,
  guests,
}: {
  onPress: () => void;
  isSubmitting: boolean;
  price: string;
  guests: string;
}) {
  const scale = useSharedValue(1);
  // Add fallbacks to handle timing issue where useThemeColor may return "invalid" before theme loads
  const foreground = useThemeColor("foreground") || "#222325";
  const accent = useThemeColor("accent") || "#85b09a";

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const guestCount = guests === "5+" ? 5 : Number.parseInt(guests, 10);
  const totalPrice = Number.parseInt(price, 10) * guestCount;

  return (
    <Pressable
      disabled={isSubmitting}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.98, { damping: 15, stiffness: 400 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
      }}
    >
      <Animated.View
        className="bg-primary-foreground"
        style={[
          animatedStyle,
          {
            borderRadius: 14,
            paddingVertical: 16,
            alignItems: "center",
            opacity: isSubmitting ? 0.7 : 1,
          },
        ]}
      >
        <Text
          style={{
            color: foreground,
            fontSize: 17,
            fontWeight: "600",
          }}
        >
          {isSubmitting ? "Submitting..." : "Confirm RSVP"}
        </Text>
        <Text
          style={{
            color: accent,
            fontSize: 13,
            marginTop: 2,
          }}
        >
          {guestCount} {guestCount === 1 ? "guest" : "guests"} - Total: £
          {totalPrice}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

function ActionButton({
  label,
  icon,
  onPress,
  variant = "primary",
  disabled,
  isLoading,
  style,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  variant?: "primary" | "destructive";
  disabled?: boolean;
  isLoading?: boolean;
  style?: object;
}) {
  const scale = useSharedValue(1);
  // Add fallbacks to handle timing issue where useThemeColor may return "invalid" before theme loads
  const accent = useThemeColor("accent") || "#85b09a";
  const foreground = useThemeColor("foreground") || "#222325";
  const primaryForeground = "#FFFFFF";

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isPrimary = variant === "primary";

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.98, { damping: 15, stiffness: 400 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
      }}
      style={style}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            backgroundColor: isPrimary ? accent : "transparent",
            borderRadius: 14,
            paddingVertical: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            borderWidth: isPrimary ? 0 : 1,
            borderColor: "rgba(255, 255, 255, 0.3)",
            opacity: disabled ? 0.6 : 1,
          },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator
            color={isPrimary ? foreground : primaryForeground}
            size="small"
          />
        ) : (
          <>
            <Ionicons
              color={isPrimary ? foreground : primaryForeground}
              name={icon}
              size={20}
            />
            <Text
              style={{
                color: isPrimary ? foreground : primaryForeground,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {label}
            </Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
}
