import { useCallback, useRef } from "react";
import { ScrollView, View } from "react-native";
import { ScrollContext } from "@/contexts/scroll-context";
import { WebFooter } from "./WebFooter";
import { WebHeader } from "./WebHeader";

// Header height for padding calculation
const HEADER_HEIGHT = 64;

interface WebNavigationShellProps {
  /** Page content */
  children: React.ReactNode;
  /** Whether to show the header */
  showHeader?: boolean;
  /** Whether to show the footer */
  showFooter?: boolean;
}

/**
 * WebNavigationShell - Layout wrapper for web pages
 *
 * Provides consistent header and footer across all web pages.
 * The header is fixed at the top, and content scrolls underneath.
 */
export function WebNavigationShell({
  children,
  showHeader = true,
  showFooter = true,
}: WebNavigationShellProps) {
  const scrollRef = useRef<ScrollView>(null);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollToTop, scrollRef }}>
      <View className="flex-1 bg-background">
        {/* Fixed Header */}
        {showHeader && <WebHeader />}

        {/* Scrollable Content Area */}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: showHeader ? HEADER_HEIGHT : 0,
          }}
          className="flex-1"
        >
          {/* Main Content */}
          {children}

          {/* Footer */}
          {showFooter && <WebFooter />}
        </ScrollView>
      </View>
    </ScrollContext.Provider>
  );
}

export default WebNavigationShell;
