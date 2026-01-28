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
import { cn } from "@/lib/utils";
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
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-foreground text-lg">Event not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          onScroll={(e) => {
            scrollY.value = e.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          {/* Hero Image */}
          <Animated.View style={headerAnimatedStyle}>
            <Animated.View entering={FadeIn.duration(400)}>
              <Image
                contentFit="cover"
                placeholder={{ blurhash: EVENT_BLURHASH }}
                source={event.image}
                className="w-full h-[280px]"
                transition={300}
              />
            </Animated.View>
          </Animated.View>

          {/* Back Button - Fixed Position */}
          <Pressable
            onPress={() => router.back()}
            className="absolute items-center justify-center z-10 bg-overlay"
            style={{
              top: insets.top + 12,
              left: 16,
              width: 44,
              height: 44,
              borderRadius: 22,
            }}
          >
            <Ionicons color={primaryForeground} name="arrow-back" size={24} />
          </Pressable>

          {/* Content Container */}
          <Animated.View
            className="bg-background px-5 pt-6 pb-8"
            entering={FadeInUp.delay(200).springify()}
            style={{
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              marginTop: -24,
            }}
          >
            {/* Event Title & Badge */}
            <View className="flex-row items-start mb-4">
              <View className="flex-1">
                <Text
                  className="text-foreground text-[28px] font-light font-serif"
                  style={{ lineHeight: 34 }}
                >
                  {event.title}
                </Text>
              </View>
              {event.type === "special" && (
                <Animated.View
                  className="bg-accent px-3 py-1.5 rounded-2xl ml-3"
                  entering={SlideInRight.delay(400)}
                >
                  <Text className="text-foreground text-xs font-semibold">
                    Special
                  </Text>
                </Animated.View>
              )}
            </View>

            {/* Event Info Grid */}
            <Animated.View
              className="bg-surface rounded-2xl p-4 mb-5"
              entering={FadeInDown.delay(300).springify()}
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
              <Text className="text-foreground text-lg font-semibold mb-3">
                About This Event
              </Text>
              <Text
                className="text-muted text-[15px] mb-6"
                style={{ lineHeight: 24 }}
              >
                {event.fullDescription}
              </Text>
            </Animated.View>

            {/* RSVP Section */}
            <Animated.View
              className="bg-primary rounded-[20px] p-5"
              entering={FadeInDown.delay(500).springify()}
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
      <View className="flex-row items-center mb-4">
        <View
          className="bg-accent items-center justify-center mr-3"
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
          }}
        >
          <Ionicons color={foreground} name="checkmark-circle" size={28} />
        </View>
        <View className="flex-1">
          <Text className="text-primary-foreground text-[20px] font-semibold">
            You're Going!
          </Text>
          <Text className="text-accent text-sm">RSVP confirmed</Text>
        </View>
      </View>

      {/* RSVP Details */}
      <View className="rounded-xl p-4 mb-4 bg-white/10">
        <View className="flex-row justify-between mb-2">
          <Text className="text-primary-foreground/70">Guests</Text>
          <Text className="text-primary-foreground font-medium">
            {existingRsvp.guests}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-primary-foreground/70">Total</Text>
          <Text className="text-primary-foreground font-medium">
            £{totalPrice}
          </Text>
        </View>
        {existingRsvp.notes && (
          <View className="mt-3">
            <Text className="mb-1 text-primary-foreground/70">
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
        className="mt-3"
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

  return (
    <>
      <Text
        className="text-primary-foreground mb-1 text-[22px] font-light font-serif"
      >
        Reserve Your Spot
      </Text>
      <Text className="text-accent text-sm mb-5">
        Complete the form below to RSVP
      </Text>

      {/* User Info Display */}
      <View className="rounded-xl p-4 mb-4 bg-white/10">
        <View className="flex-row items-center mb-2">
          <Ionicons
            color={accent}
            name="person-circle-outline"
            size={20}
            style={{ marginRight: 10 }}
          />
          <Text className="text-primary-foreground text-base font-medium">
            {user?.name || "Loading..."}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons
            color={accent}
            name="mail-outline"
            size={18}
            style={{ marginRight: 10 }}
          />
          <Text className="text-sm text-primary-foreground/70">
            {user?.email || "Loading..."}
          </Text>
        </View>
      </View>

      {/* Number of Guests */}
      <View className="mb-4">
        <Text className="text-accent text-[13px] mb-2 font-medium">
          Number of Guests
        </Text>
        <View className="flex-row gap-2.5">
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
      <View className="mb-5">
        <Text className="text-accent text-[13px] mb-2 font-medium">
          Special Requirements (Optional)
        </Text>
        <TextInput
          multiline
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, notes: text }))
          }
          placeholder="Dietary requirements, accessibility needs, etc."
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          className="rounded-xl px-4 text-base text-primary-foreground bg-white/10"
          style={{
            paddingVertical: 14,
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
        className="text-primary-foreground mb-1 text-[22px] font-light font-serif"
      >
        Reserve Your Spot
      </Text>
      <Text className="text-accent text-sm mb-5">
        Sign in to reserve your spot at this event
      </Text>
      <Pressable
        className="bg-primary-foreground items-center rounded-[14px] py-4"
        onPress={onSignIn}
      >
        <Text className="text-foreground text-[17px] font-semibold">
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
      className={cn("flex-row items-center py-3 border-border", !isLast && "border-b")}
    >
      <View
        className="items-center justify-center mr-3 rounded-[10px] bg-accent/20"
        style={{
          width: 36,
          height: 36,
        }}
      >
        <Ionicons color={accent} name={icon} size={18} />
      </View>
      <View className="flex-1">
        <Text className="text-muted text-xs mb-0.5">{label}</Text>
        <Text className="text-foreground text-[15px] font-medium">
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
  const accent = useThemeColor("accent");
  const foreground = useThemeColor("foreground");
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
        className={cn(
          "items-center justify-center rounded-xl",
          selected ? "bg-accent" : "bg-white/10"
        )}
        style={[
          animatedStyle,
          {
            width: 48,
            height: 48,
          },
        ]}
      >
        <Text
          className={cn(
            "text-base",
            selected ? "text-foreground font-semibold" : "text-primary-foreground font-normal"
          )}
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
        className="bg-primary-foreground items-center rounded-[14px] py-4"
        style={[
          animatedStyle,
          { opacity: isSubmitting ? 0.7 : 1 },
        ]}
      >
        <Text className="text-[17px] font-semibold text-foreground">
          {isSubmitting ? "Submitting..." : "Confirm RSVP"}
        </Text>
        <Text className="text-[13px] mt-0.5 text-accent">
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
  className: extraClassName,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  variant?: "primary" | "destructive";
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}) {
  const scale = useSharedValue(1);
  const accent = useThemeColor("accent");
  const foreground = useThemeColor("foreground");
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
      className={extraClassName}
    >
      <Animated.View
        className={cn(
          "flex-row items-center justify-center gap-2 rounded-[14px]",
          isPrimary ? "bg-accent" : "bg-transparent border border-white/30"
        )}
        style={[
          animatedStyle,
          {
            paddingVertical: 14,
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
              className={cn(
                "text-base font-semibold",
                isPrimary ? "text-foreground" : "text-primary-foreground"
              )}
            >
              {label}
            </Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
}
