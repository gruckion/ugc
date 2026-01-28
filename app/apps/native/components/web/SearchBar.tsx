import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";

// Fiverr-style theme colors
const THEME_COLORS = {
  primary: "#1DBF73",
  primaryForeground: "#FFFFFF",
  foreground: "#222325",
  muted: "#62646a",
  border: "#e4e5e7",
  background: "#FFFFFF",
};

export interface CategoryOption {
  id: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export interface SearchBarProps {
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Categories for the dropdown */
  categories?: CategoryOption[];
  /** Currently selected category */
  selectedCategory?: string;
  /** Search submit handler */
  onSearch?: (query: string, categoryId?: string) => void;
  /** Category change handler */
  onCategoryChange?: (categoryId: string | undefined) => void;
}

const DEFAULT_CATEGORIES: CategoryOption[] = [
  { id: "all", label: "All Categories", icon: "grid-outline" },
  { id: "lifestyle", label: "Lifestyle", icon: "heart-outline" },
  { id: "tech", label: "Tech & Gadgets", icon: "phone-portrait-outline" },
  { id: "beauty", label: "Beauty", icon: "sparkles-outline" },
  { id: "food", label: "Food & Beverage", icon: "restaurant-outline" },
  { id: "fitness", label: "Fitness", icon: "barbell-outline" },
];

export function SearchBar({
  placeholder,
  categories = DEFAULT_CATEGORIES,
  selectedCategory,
  onSearch,
  onCategoryChange,
}: SearchBarProps) {
  const { width } = useResponsive();

  // Responsive placeholder - CSS cannot change placeholder content, so JS is required
  const responsivePlaceholder =
    placeholder ??
    (width < 480
      ? "Search..."
      : width < 640
        ? "Search creators..."
        : "Search for creators or briefs...");

  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(
    selectedCategory || "all"
  );

  const dropdownRef = useRef<View>(null);
  const buttonRef = useRef<View>(null);

  const selectedCategoryOption = categories.find(
    (c) => c.id === currentCategory
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const buttonNode = buttonRef.current as unknown as HTMLElement;
      const dropdownNode = dropdownRef.current as unknown as HTMLElement;

      if (
        buttonNode &&
        !buttonNode.contains(target) &&
        (!dropdownNode || !dropdownNode.contains(target))
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleSearch = () => {
    onSearch?.(query, currentCategory === "all" ? undefined : currentCategory);
  };

  const handleCategorySelect = (categoryId: string) => {
    setCurrentCategory(categoryId);
    onCategoryChange?.(categoryId === "all" ? undefined : categoryId);
    setIsDropdownOpen(false);
  };

  return (
    <View
      className="search-bar-container"
      style={{
        flexDirection: "row",
        alignItems: "stretch",
        backgroundColor: THEME_COLORS.background,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "transparent",
        maxWidth: 700,
        width: "100%",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `.search-bar-container:focus-within { border-color: ${THEME_COLORS.primary} !important; }`,
        }}
      />

      {/* Category Dropdown - always visible, icon-only on small screens (<640px) */}
      <View ref={buttonRef} style={{ position: "relative", zIndex: 1000 }}>
        <Pressable
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 14,
            gap: 8,
            borderRightWidth: 1,
            borderRightColor: THEME_COLORS.border,
            backgroundColor: "#fafafa",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          {selectedCategoryOption?.icon && (
            <Ionicons
              color={THEME_COLORS.muted}
              name={selectedCategoryOption.icon}
              size={18}
            />
          )}
          <Text
            className="hidden sm:inline"
            style={{
              fontSize: 14,
              color: THEME_COLORS.foreground,
              fontWeight: "500",
            }}
          >
            {selectedCategoryOption?.label || "All Categories"}
          </Text>
          <Ionicons
            color={THEME_COLORS.muted}
            name={isDropdownOpen ? "chevron-up" : "chevron-down"}
            size={16}
          />
        </Pressable>

        {/* Dropdown Menu - simple absolute positioning */}
        {isDropdownOpen && (
          <View
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: 4,
              minWidth: 200,
              backgroundColor: THEME_COLORS.background,
              borderWidth: 1,
              borderColor: THEME_COLORS.border,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
              zIndex: 1000,
            }}
          >
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => handleCategorySelect(category.id)}
                style={({ hovered }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  backgroundColor:
                    currentCategory === category.id
                      ? "#f0fdf4"
                      : hovered
                        ? "#fafafa"
                        : "transparent",
                })}
              >
                {category.icon && (
                  <Ionicons
                    color={
                      currentCategory === category.id
                        ? THEME_COLORS.primary
                        : THEME_COLORS.muted
                    }
                    name={category.icon}
                    size={18}
                  />
                )}
                <Text
                  style={{
                    fontSize: 14,
                    color:
                      currentCategory === category.id
                        ? THEME_COLORS.primary
                        : THEME_COLORS.foreground,
                    fontWeight:
                      currentCategory === category.id ? "600" : "400",
                  }}
                >
                  {category.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Search Input */}
      <View
        style={{
          flex: 1,
          minWidth: 0,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <TextInput
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          placeholder={responsivePlaceholder}
          placeholderTextColor={THEME_COLORS.muted}
          returnKeyType="search"
          style={[
            {
              flex: 1,
              minWidth: 0,
              width: 0,
              fontSize: 15,
              color: THEME_COLORS.foreground,
              paddingVertical: 14,
            },
            // Remove native focus outline since container has custom focus indicator
            { outline: "none" } as any,
          ]}
          value={query}
        />
      </View>

      {/* Search Button */}
      <Pressable
        onPress={handleSearch}
        style={({ pressed }) => ({
          backgroundColor: THEME_COLORS.primary,
          paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? 0.9 : 1,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        })}
      >
        <Ionicons
          color={THEME_COLORS.primaryForeground}
          name="search"
          size={22}
        />
      </Pressable>
    </View>
  );
}

export default SearchBar;
