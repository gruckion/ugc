import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";

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

  // Calculate dropdown height: each category item is ~44px tall
  const dropdownHeight = categories.length * 44 + 4; // +4 for marginTop

  return (
    <View className="w-full max-w-[700px]">
      <View className="flex-row items-stretch rounded-xl border-2 border-transparent focus-within:border-primary bg-background w-full overflow-visible">

      {/* Category Dropdown - always visible, icon-only on small screens (<640px) */}
      <View ref={buttonRef} className="relative z-[1000]">
        <Pressable
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex-row items-center px-4 py-3.5 gap-2 border-r border-border bg-surface-raised rounded-tl-[10px] rounded-bl-[10px]"
        >
          {selectedCategoryOption?.icon && (
            <Ionicons
              className="text-muted"
              name={selectedCategoryOption.icon}
              size={18}
            />
          )}
          <Text className="hidden sm:inline text-sm font-medium text-foreground">
            {selectedCategoryOption?.label || "All Categories"}
          </Text>
          <Ionicons
            className="text-muted"
            name={isDropdownOpen ? "chevron-up" : "chevron-down"}
            size={16}
          />
        </Pressable>

        {/* Dropdown Menu - simple absolute positioning */}
        {isDropdownOpen && (
          <View
            ref={dropdownRef}
            className="absolute top-full left-0 mt-1 min-w-[200px] border border-border rounded-lg z-[1000] elevation-4 bg-background"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
            }}
          >
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => handleCategorySelect(category.id)}
                className={cn(
                  "flex-row items-center gap-3 px-4 py-3",
                  currentCategory === category.id
                    ? "bg-chip-bg"
                    : "hover:bg-hover-surface"
                )}
              >
                {category.icon && (
                  <Ionicons
                    className={cn(
                      currentCategory === category.id
                        ? "text-primary"
                        : "text-muted"
                    )}
                    name={category.icon}
                    size={18}
                  />
                )}
                <Text
                  className={cn(
                    "text-sm",
                    currentCategory === category.id
                      ? "text-primary font-semibold"
                      : "text-foreground font-normal"
                  )}
                >
                  {category.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Search Input */}
      <View className="flex-1 min-w-0 flex-row items-center px-4">
        <TextInput
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          placeholder={responsivePlaceholder}
          placeholderTextColor="var(--muted)"
          returnKeyType="search"
          className="flex-1 min-w-0 w-0 text-[15px] py-3.5"
          style={[
            {
              color: "var(--foreground)",
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
        className="px-5 items-center justify-center rounded-tr-[10px] rounded-br-[10px] bg-primary active:opacity-90"
      >
        <Ionicons
          className="text-primary-foreground"
          name="search"
          size={22}
        />
      </Pressable>
      </View>
      {/* Spacer to reserve space for dropdown, preventing it from being clipped by parent stacking context */}
      {isDropdownOpen && <View style={{ height: dropdownHeight }} />}
    </View>
  );
}

export default SearchBar;
