import { Ionicons } from "@expo/vector-icons";
import type { StoryObj } from "@storybook/react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { fn } from "storybook/test";
import { CategoryFilter, EVENT_CATEGORIES } from "./CategoryFilter";
import { ExternalLinkButton } from "./ExternalLinkButton";
import FormHeader, {
  FormContainer,
  StyledButton,
  StyledTextInput,
} from "./form";

/* --------------------------------- Sign In Screen --------------------------------- */

export default {
  title: "Screens",
};

export const SignInScreen: StoryObj = {
  render: () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <FormContainer>
        <FormHeader
          description="Sign in to access your membership and exclusive club features"
          title="Welcome Back"
        />

        <StyledTextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          label="Email Address"
          onChangeText={setEmail}
          placeholder="Enter your email"
          textContentType="emailAddress"
          value={email}
        />

        <StyledTextInput
          autoComplete="password"
          label="Password"
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          textContentType="password"
          value={password}
        />

        <View className="mt-2">
          <StyledButton
            isLoading={isLoading}
            label="Sign In"
            onPress={handleSignIn}
          />
        </View>

        <Pressable className="self-center py-2">
          <Text className="text-sm font-medium text-accent">
            Forgot Password?
          </Text>
        </Pressable>

        <View className="mt-6 flex-row items-center justify-center gap-1">
          <Text className="text-sm text-muted">
            Don't have an account?
          </Text>
          <Pressable>
            <Text className="text-sm font-semibold text-accent">
              Sign Up
            </Text>
          </Pressable>
        </View>
      </FormContainer>
    );
  },
};

/* --------------------------------- Sign Up Screen --------------------------------- */

export const SignUpScreen: StoryObj = {
  render: () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <FormContainer>
        <FormHeader
          description="Join UGC and enjoy exclusive member benefits"
          title="Create Account"
        />

        <StyledTextInput
          autoCapitalize="words"
          autoComplete="name"
          label="Full Name"
          onChangeText={setName}
          placeholder="Enter your full name"
          textContentType="name"
          value={name}
        />

        <StyledTextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          label="Email Address"
          onChangeText={setEmail}
          placeholder="Enter your email"
          textContentType="emailAddress"
          value={email}
        />

        <StyledTextInput
          autoComplete="new-password"
          label="Password"
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
          textContentType="newPassword"
          value={password}
        />

        <StyledTextInput
          autoComplete="new-password"
          label="Confirm Password"
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
          textContentType="newPassword"
          value={confirmPassword}
        />

        <View className="mt-2">
          <StyledButton
            isLoading={isLoading}
            label="Create Account"
            onPress={handleSignUp}
          />
        </View>

        <Text
          className="px-5 text-center text-muted text-[13px] leading-5"
        >
          By signing up, you agree to our{" "}
          <Text className="underline text-foreground">
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text className="underline text-foreground">
            Privacy Policy
          </Text>
        </Text>

        <View className="mt-2 flex-row items-center justify-center gap-1">
          <Text className="text-sm text-muted">
            Already have an account?
          </Text>
          <Pressable>
            <Text className="text-sm font-semibold text-accent">
              Sign In
            </Text>
          </Pressable>
        </View>
      </FormContainer>
    );
  },
};

/* --------------------------------- Reset Password Screen --------------------------------- */

export const ResetPasswordScreen: StoryObj = {
  render: () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <FormContainer>
        <FormHeader
          description="Enter your new password to complete the reset"
          title="New Password"
        />

        <StyledTextInput
          autoComplete="new-password"
          label="New Password"
          onChangeText={setPassword}
          placeholder="Enter your new password"
          secureTextEntry
          textContentType="newPassword"
          value={password}
        />

        <StyledTextInput
          autoComplete="new-password"
          label="Confirm Password"
          onChangeText={setConfirmPassword}
          placeholder="Confirm your new password"
          secureTextEntry
          textContentType="newPassword"
          value={confirmPassword}
        />

        <View className="mt-2">
          <StyledButton
            isLoading={isLoading}
            label="Reset Password"
            onPress={handleReset}
          />
        </View>
      </FormContainer>
    );
  },
};

/* --------------------------------- Invalid Link Screen --------------------------------- */

export const InvalidLinkScreen: StoryObj = {
  render: () => (
    <View className="flex-1 justify-center px-6 bg-background">
      <View className="mb-8 items-center">
        <Text
          className="mb-3 font-serif text-center font-light text-foreground text-[28px]"
        >
          Invalid Link
        </Text>
        <Text
          className="text-center text-muted text-[15px] leading-[22px]"
        >
          This reset link has expired or is invalid. Please request a new one.
        </Text>
      </View>
      <Pressable className="items-center rounded-xl py-4 bg-primary">
        <Text className="text-base font-semibold text-primary-foreground">
          Back to Sign In
        </Text>
      </Pressable>
    </View>
  ),
};

/* --------------------------------- Events List Screen --------------------------------- */

const SAMPLE_EVENTS = [
  {
    id: "christmas-lunch-2025",
    title: "Christmas Lunch",
    description: "Enjoy our special festive menu in the Main Dining Room",
    dateRange: "1st - 23rd December",
    type: "seasonal",
    image:
      "https://static.wixstatic.com/media/11062b_7daf34b38d874071a1001caa9dde798f~mv2_d_5616_3744_s_4_2.jpg/v1/fill/w_400,h_300,al_c,q_80/11062b_7daf34b38d874071a1001caa9dde798f~mv2_d_5616_3744_s_4_2.webp",
  },
  {
    id: "wine-tasting",
    title: "Wine Tasting Evening",
    description: "Sample fine wines from our cellar with expert guidance",
    dateRange: "Monthly",
    type: "recurring",
    image:
      "https://static.wixstatic.com/media/da00a6_52bcb81f629b40c383a2f1a09aa1d97e~mv2.jpg/v1/fill/w_400,h_300,al_c,q_80/da00a6_52bcb81f629b40c383a2f1a09aa1d97e~mv2.webp",
  },
];

export const EventsListScreen: StoryObj = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
      null
    );

    const filteredEvents = selectedCategory
      ? SAMPLE_EVENTS.filter((event) => event.type === selectedCategory)
      : SAMPLE_EVENTS;

    return (
      <View className="flex-1 bg-background">
        {/* Header */}
        <View className="px-5 pb-5 pt-[60px] bg-primary">
          <Text
            className="font-serif font-light text-primary-foreground text-[28px]"
          >
            Events
          </Text>
          <Text className="mt-1 text-sm text-accent">
            Upcoming events at UGC
          </Text>
        </View>

        {/* Category Filter */}
        <CategoryFilter
          categories={EVENT_CATEGORIES}
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        >
          {filteredEvents.length === 0 ? (
            <View className="items-center p-8">
              <Ionicons color="#85b09a" name="calendar-outline" size={48} />
              <Text className="mt-4 text-center text-base text-foreground">
                No events found in this category
              </Text>
              <Pressable
                className="mt-3 rounded-lg px-4 py-2 bg-accent"
                onPress={() => setSelectedCategory(null)}
              >
                <Text className="font-medium text-foreground">
                  View All Events
                </Text>
              </Pressable>
            </View>
          ) : (
            filteredEvents.map((event, index) => (
              <EventCardStory
                event={event}
                featured={index === 0 && selectedCategory === null}
                key={event.id}
              />
            ))
          )}

          {/* View Website Link */}
          <ExternalLinkButton
            label="View All Events"
            url="https://ugc.com/events"
            variant="subtle"
          />
        </ScrollView>
      </View>
    );
  },
};

/* Helper component for event card in stories */
function EventCardStory({
  event,
  featured,
}: {
  event: (typeof SAMPLE_EVENTS)[0];
  featured?: boolean;
}) {
  return (
    <Pressable
      className={`mb-4 overflow-hidden rounded-xl shadow ${featured ? "bg-primary" : "bg-surface"}`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Image
        contentFit="cover"
        className="w-full h-[160px]"
        source={event.image}
        transition={200}
      />

      <View className="p-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text
              className={`mb-1 text-lg font-semibold ${featured ? "text-primary-foreground" : "text-foreground"}`}
            >
              {event.title}
            </Text>
            <Text
              className={`text-sm leading-5 ${featured ? "text-accent" : "text-muted"}`}
            >
              {event.description}
            </Text>
          </View>
          {featured && (
            <View className="ml-2 rounded-xl px-2.5 py-1 bg-accent">
              <Text
                className="font-semibold text-foreground text-[11px]"
              >
                Featured
              </Text>
            </View>
          )}
        </View>

        <View className="mt-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5">
            <Ionicons
              color={featured ? "#85b09a" : "#666666"}
              name="calendar-outline"
              size={16}
            />
            <Text
              className={`text-[13px] ${featured ? "text-accent" : "text-muted"}`}
            >
              {event.dateRange}
            </Text>
          </View>

          <View
            className={`rounded-md px-4 py-2 ${featured ? "bg-primary-foreground" : "bg-primary"}`}
          >
            <Text
              className={`font-medium text-[13px] ${featured ? "text-primary" : "text-primary-foreground"}`}
            >
              RSVP
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

/* --------------------------------- Empty Events State --------------------------------- */

export const EventsEmptyState: StoryObj = {
  render: () => (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="px-5 pb-5 pt-[60px] bg-primary">
        <Text
          className="font-serif font-light text-primary-foreground text-[28px]"
        >
          Events
        </Text>
        <Text className="mt-1 text-sm text-accent">
          Upcoming events at UGC
        </Text>
      </View>

      {/* Category Filter with selection */}
      <CategoryFilter
        categories={EVENT_CATEGORIES}
        onSelectCategory={fn()}
        selectedCategory="special"
      />

      {/* Empty State */}
      <View className="flex-1 items-center justify-center p-8">
        <Ionicons color="#85b09a" name="calendar-outline" size={48} />
        <Text className="mt-4 text-center text-base text-foreground">
          No events found in this category
        </Text>
        <Pressable className="mt-3 rounded-lg px-4 py-2 bg-accent">
          <Text className="font-medium text-foreground">
            View All Events
          </Text>
        </Pressable>
      </View>
    </View>
  ),
};
