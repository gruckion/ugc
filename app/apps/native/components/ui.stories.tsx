import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { fn } from "storybook/test";
import {
  type Category,
  CategoryFilter,
  EVENT_CATEGORIES,
} from "./CategoryFilter";
import { Container } from "./container";
import { ExternalLinkButton } from "./ExternalLinkButton";
import { LastUsedIndicator } from "./LastUsedIndicator";
import { MembershipCard } from "./MembershipCard";
import { ThemeToggle } from "./theme-toggle";

/* --------------------------------- CategoryFilter Stories --------------------------------- */

const categoryFilterMeta = {
  title: "UI/CategoryFilter",
  component: CategoryFilter,
  tags: ["autodocs"],
  args: {
    categories: EVENT_CATEGORIES,
    selectedCategory: null,
    onSelectCategory: fn(),
  },
} satisfies Meta<typeof CategoryFilter>;

export default categoryFilterMeta;

type CategoryFilterStory = StoryObj<typeof categoryFilterMeta>;

export const DefaultCategories: CategoryFilterStory = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
      null
    );

    return (
      <CategoryFilter
        categories={EVENT_CATEGORIES}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    );
  },
};

export const WithSelection: CategoryFilterStory = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
      "seasonal"
    );

    return (
      <CategoryFilter
        categories={EVENT_CATEGORIES}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    );
  },
};

const MENU_CATEGORIES: Category[] = [
  { id: null, label: "All", icon: "restaurant-outline" },
  { id: "starters", label: "Starters", icon: "leaf-outline" },
  { id: "mains", label: "Mains", icon: "fish-outline" },
  { id: "desserts", label: "Desserts", icon: "ice-cream-outline" },
  { id: "drinks", label: "Drinks", icon: "wine-outline" },
];

export const CustomCategories: CategoryFilterStory = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
      null
    );

    return (
      <CategoryFilter
        categories={MENU_CATEGORIES}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    );
  },
};

/* --------------------------------- MembershipCard Stories --------------------------------- */

export const MembershipCardDefault: StoryObj = {
  render: () => (
    <MembershipCard
      disableAnimation
      memberName="John Smith"
      memberSince="2024-01-15"
      secretaryName="H. Senanayake"
    />
  ),
};

export const MembershipCardLongName: StoryObj = {
  render: () => (
    <MembershipCard
      disableAnimation
      memberName="Sir Charles Montgomery Burns"
      memberSince="2020-06-01"
    />
  ),
};

export const MembershipCardRecentMember: StoryObj = {
  render: () => (
    <MembershipCard
      disableAnimation
      memberName="Alice Johnson"
      memberSince={new Date().toISOString()}
    />
  ),
};

/* --------------------------------- ExternalLinkButton Stories --------------------------------- */

export const ExternalLinkPrimary: StoryObj = {
  render: () => (
    <ExternalLinkButton
      label="Visit Website"
      url="https://example.com"
      variant="primary"
    />
  ),
};

export const ExternalLinkSubtle: StoryObj = {
  render: () => (
    <ExternalLinkButton
      label="View Full Menu"
      url="https://example.com/menu"
      variant="subtle"
    />
  ),
};

export const AllExternalLinkVariants: StoryObj = {
  render: () => (
    <View className="gap-4">
      <ExternalLinkButton
        label="Book a Table"
        url="https://example.com"
        variant="primary"
      />
      <ExternalLinkButton
        label="View Location"
        url="https://maps.google.com"
        variant="subtle"
      />
    </View>
  ),
};

/* --------------------------------- LastUsedIndicator Stories --------------------------------- */

export const LastUsedIndicatorDefault: StoryObj = {
  render: () => (
    <View className="flex-row items-center p-4">
      <Text className="text-foreground text-base">
        Sign in with Google
      </Text>
      <LastUsedIndicator />
    </View>
  ),
};

export const LastUsedIndicatorInContext: StoryObj = {
  render: () => (
    <View className="gap-3">
      <View className="border-border bg-surface flex-row items-center p-4 rounded-xl border">
        <Text className="text-foreground text-base flex-1">
          Continue with Apple
        </Text>
        <LastUsedIndicator />
      </View>
      <View className="border-border bg-surface flex-row items-center p-4 rounded-xl border">
        <Text className="text-foreground text-base flex-1">
          Continue with Google
        </Text>
      </View>
      <View className="border-border bg-surface flex-row items-center p-4 rounded-xl border">
        <Text className="text-foreground text-base flex-1">
          Continue with Email
        </Text>
      </View>
    </View>
  ),
};

/* --------------------------------- Container Stories --------------------------------- */

export const ContainerDefault: StoryObj = {
  render: () => (
    <Container>
      <View className="p-4 gap-4">
        <Text className="text-foreground text-2xl font-bold">
          Container Component
        </Text>
        <Text className="text-muted text-base leading-6">
          The Container component provides consistent padding, safe area insets,
          and a scrollable content area for screens.
        </Text>
        <View className="border-border bg-surface p-4 rounded-xl border">
          <Text className="text-foreground">
            This content is wrapped in a Card-like view inside the Container.
          </Text>
        </View>
      </View>
    </Container>
  ),
};

/* --------------------------------- ThemeToggle Stories --------------------------------- */

export const ThemeToggleDefault: StoryObj = {
  render: () => (
    <View className="flex-row items-center gap-4">
      <Text className="text-foreground text-base">
        Toggle Theme:
      </Text>
      <ThemeToggle />
    </View>
  ),
};

export const ThemeToggleInHeader: StoryObj = {
  render: () => (
    <View className="border-border bg-surface flex-row items-center justify-between p-4 rounded-xl border">
      <Text className="text-foreground text-lg font-semibold">
        Settings
      </Text>
      <ThemeToggle />
    </View>
  ),
};

/* --------------------------------- Combined UI Showcase --------------------------------- */

export const UIShowcase: StoryObj = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
      null
    );

    return (
      <View className="gap-6">
        <View>
          <Text className="text-foreground text-xl font-bold mb-3">
            Category Filter
          </Text>
          <CategoryFilter
            categories={EVENT_CATEGORIES}
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </View>

        <View>
          <Text className="text-foreground text-xl font-bold mb-3">
            Membership Card
          </Text>
          <MembershipCard
            disableAnimation
            memberName="John Smith"
            memberSince="2024-01-15"
          />
        </View>

        <View>
          <Text className="text-foreground text-xl font-bold mb-3">
            External Links
          </Text>
          <View className="gap-3">
            <ExternalLinkButton
              label="Visit Website"
              url="https://example.com"
              variant="primary"
            />
            <ExternalLinkButton
              label="View Location"
              url="https://maps.google.com"
              variant="subtle"
            />
          </View>
        </View>

        <View>
          <Text className="text-foreground text-xl font-bold mb-3">
            Last Used Indicator
          </Text>
          <View className="border-border bg-surface flex-row items-center p-4 rounded-xl border">
            <Text className="text-foreground text-base flex-1">
              Sign in with Apple
            </Text>
            <LastUsedIndicator />
          </View>
        </View>

        <View>
          <Text className="text-foreground text-xl font-bold mb-3">
            Theme Toggle
          </Text>
          <View className="flex-row items-center gap-4">
            <Text className="text-foreground text-base">
              Toggle Theme:
            </Text>
            <ThemeToggle />
          </View>
        </View>
      </View>
    );
  },
};
