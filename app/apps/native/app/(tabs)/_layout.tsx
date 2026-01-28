import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useThemeColor } from "heroui-native";

// Fiverr-style theme colors for tab bar
// These match the CSS variables defined in global.css
const THEME_COLORS = {
  primary: "#1DBF73", // Fiverr green
  primaryForeground: "#FFFFFF",
};

export default function TabLayout() {
  const accent = useThemeColor("accent");
  const primary = THEME_COLORS.primary;
  const primaryForeground = THEME_COLORS.primaryForeground;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primaryForeground,
        tabBarInactiveTintColor: accent,
        tabBarStyle: {
          backgroundColor: primary,
          borderTopWidth: 0,
          height: 85,
          paddingTop: 8,
          paddingBottom: 25,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="home-outline" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="mail-outline" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="search-outline" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="receipt-outline" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="ellipsis-horizontal" size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
