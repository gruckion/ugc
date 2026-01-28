import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { XIcon } from "@/components/icons/XIcon";
import { UGCLogo } from "@/components/UGCLogo";
import { useScrollContext } from "@/contexts/scroll-context";
import { useResponsive } from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Categories",
    links: [
      { label: "Lifestyle", href: "/browse?category=lifestyle" },
      { label: "Tech & Gadgets", href: "/browse?category=tech" },
      { label: "Beauty", href: "/browse?category=beauty" },
      { label: "Food & Beverage", href: "/browse?category=food" },
      { label: "Fitness", href: "/browse?category=fitness" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Trust & Safety", href: "/about" },
      { label: "Careers", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help-center" },
      { label: "Creator FAQ", href: "/creator-faq" },
      { label: "Brand FAQ", href: "/brand-faq" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Events", href: "/community-events" },
    ],
  },
];

interface SocialLink {
  platform: string;
  icon: keyof typeof Ionicons.glyphMap | "x";
  href: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { platform: "X", icon: "x", href: "https://x.com/idoads" },
  {
    platform: "Facebook",
    icon: "logo-facebook",
    href: "https://facebook.com/idoads",
  },
  {
    platform: "LinkedIn",
    icon: "logo-linkedin",
    href: "https://linkedin.com/company/idoads",
  },
  {
    platform: "Instagram",
    icon: "logo-instagram",
    href: "https://instagram.com/idoads",
  },
];

export function WebFooter() {
  const { isMobile, isTablet } = useResponsive();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const router = useRouter();
  const { scrollToTop } = useScrollContext();

  const showAccordion = isMobile;
  const columns = isTablet ? 2 : 4;

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  const navigateWithScroll = (href: string) => {
    scrollToTop();
    router.push(href as any);
  };

  return (
    <View className="bg-footer-bg pt-12 pb-6">
      {/* Main Footer Content */}
      <View className="max-w-[1200px] mx-auto w-full px-6">
        {/* Footer Columns */}
        {showAccordion ? (
          // Mobile: Accordion style
          <View className="gap-0">
            {FOOTER_COLUMNS.map((column) => (
              <View
                key={column.title}
                className="border-b border-white/10"
              >
                <Pressable
                  onPress={() => toggleSection(column.title)}
                  className="flex-row justify-between items-center py-4"
                >
                  <Text className="text-base font-semibold text-footer-heading">
                    {column.title}
                  </Text>
                  <Ionicons
                    className="text-footer-text"
                    name={
                      expandedSection === column.title
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={20}
                  />
                </Pressable>
                {expandedSection === column.title && (
                  <View className="pb-4 gap-3">
                    {column.links.map((link) => (
                      <Pressable
                        key={link.label}
                        onPress={() => navigateWithScroll(link.href)}
                      >
                        <Text className="text-sm text-footer-text">
                          {link.label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          // Desktop/Tablet: Grid layout
          <View className="flex-row flex-wrap mb-12">
            {FOOTER_COLUMNS.map((column) => (
              <View
                key={column.title}
                className="pr-6"
                style={{
                  width: `${100 / columns}%`,
                  marginBottom: isTablet ? 32 : 0,
                }}
              >
                <Text className="text-base font-semibold mb-5 text-footer-heading">
                  {column.title}
                </Text>
                <View className="gap-3">
                  {column.links.map((link) => (
                    <Pressable
                      key={link.label}
                      onPress={() => navigateWithScroll(link.href)}
                    >
                      {({ hovered }) => (
                        <Text
                          className={cn(
                            "text-sm",
                            hovered
                              ? "text-footer-heading"
                              : "text-footer-text"
                          )}
                        >
                          {link.label}
                        </Text>
                      )}
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Bottom Section */}
        <View
          className="border-t border-white/10 pt-6"
          style={{
            marginTop: showAccordion ? 24 : 0,
          }}
        >
          <View
            className="justify-between items-center"
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 24 : 0,
            }}
          >
            {/* Logo */}
            <View className="flex-row items-center gap-3">
              <UGCLogo size={32} />
              <Text className="text-sm text-footer-text">
                UGC Marketplace
              </Text>
            </View>

            {/* Social Icons */}
            <View className="flex-row gap-4">
              {SOCIAL_LINKS.map((social) => (
                <Pressable
                  key={social.platform}
                  onPress={() => {
                    if (typeof window !== "undefined") {
                      window.open(social.href, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  {({ hovered }) =>
                    social.icon === "x" ? (
                      <XIcon
                        color={
                          hovered
                            ? "var(--footer-heading)"
                            : "var(--footer-text)"
                        }
                        size={22}
                      />
                    ) : (
                      <Ionicons
                        className={cn(
                          hovered
                            ? "text-footer-heading"
                            : "text-footer-text"
                        )}
                        name={social.icon as keyof typeof Ionicons.glyphMap}
                        size={22}
                      />
                    )
                  }
                </Pressable>
              ))}
            </View>
          </View>

          {/* Copyright & Legal */}
          <View
            className="justify-between items-center mt-6"
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 16 : 0,
            }}
          >
            <Text className="text-[13px] text-footer-text">
              © 2026 UGC Marketplace. All rights reserved.
            </Text>
            <View className="flex-row gap-6">
              <Pressable onPress={() => navigateWithScroll("/privacypolicy")}>
                {({ hovered }) => (
                  <Text
                    className={cn(
                      "text-[13px]",
                      hovered
                        ? "text-footer-heading"
                        : "text-footer-text"
                    )}
                  >
                    Privacy Policy
                  </Text>
                )}
              </Pressable>
              <Pressable onPress={() => navigateWithScroll("/termsofservice")}>
                {({ hovered }) => (
                  <Text
                    className={cn(
                      "text-[13px]",
                      hovered
                        ? "text-footer-heading"
                        : "text-footer-text"
                    )}
                  >
                    Terms of Service
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default WebFooter;
