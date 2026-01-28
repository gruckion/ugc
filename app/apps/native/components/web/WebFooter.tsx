import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { UGCLogo } from "@/components/UGCLogo";
import { useScrollContext } from "@/contexts/scroll-context";
import { useResponsive } from "@/hooks/useResponsive";

// Fiverr-style theme colors
const THEME_COLORS = {
  primary: "#1DBF73",
  primaryForeground: "#FFFFFF",
  foreground: "#222325",
  muted: "#62646a",
  border: "#e4e5e7",
  background: "#FFFFFF",
  footerBackground: "#1a1a1a",
  footerText: "#b5b6ba",
  footerHeading: "#FFFFFF",
};

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
  icon: keyof typeof Ionicons.glyphMap;
  href: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Twitter", icon: "logo-twitter", href: "#" },
  { platform: "Facebook", icon: "logo-facebook", href: "#" },
  { platform: "LinkedIn", icon: "logo-linkedin", href: "#" },
  { platform: "Instagram", icon: "logo-instagram", href: "#" },
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
    <View
      style={{
        backgroundColor: THEME_COLORS.footerBackground,
        paddingTop: 48,
        paddingBottom: 24,
      }}
    >
      {/* Main Footer Content */}
      <View
        style={{
          maxWidth: 1200,
          marginHorizontal: "auto",
          width: "100%",
          paddingHorizontal: 24,
        }}
      >
        {/* Footer Columns */}
        {showAccordion ? (
          // Mobile: Accordion style
          <View style={{ gap: 0 }}>
            {FOOTER_COLUMNS.map((column) => (
              <View
                key={column.title}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(255,255,255,0.1)",
                }}
              >
                <Pressable
                  onPress={() => toggleSection(column.title)}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 16,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: THEME_COLORS.footerHeading,
                    }}
                  >
                    {column.title}
                  </Text>
                  <Ionicons
                    color={THEME_COLORS.footerText}
                    name={
                      expandedSection === column.title
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={20}
                  />
                </Pressable>
                {expandedSection === column.title && (
                  <View style={{ paddingBottom: 16, gap: 12 }}>
                    {column.links.map((link) => (
                      <Pressable
                        key={link.label}
                        onPress={() => navigateWithScroll(link.href)}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            color: THEME_COLORS.footerText,
                          }}
                        >
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
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 48,
            }}
          >
            {FOOTER_COLUMNS.map((column) => (
              <View
                key={column.title}
                style={{
                  width: `${100 / columns}%`,
                  paddingRight: 24,
                  marginBottom: isTablet ? 32 : 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: THEME_COLORS.footerHeading,
                    marginBottom: 20,
                  }}
                >
                  {column.title}
                </Text>
                <View style={{ gap: 12 }}>
                  {column.links.map((link) => (
                    <Pressable
                      key={link.label}
                      onPress={() => navigateWithScroll(link.href)}
                    >
                      {({ hovered }) => (
                        <Text
                          style={{
                            fontSize: 14,
                            color: hovered
                              ? THEME_COLORS.footerHeading
                              : THEME_COLORS.footerText,
                          }}
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
          style={{
            borderTopWidth: 1,
            borderTopColor: "rgba(255,255,255,0.1)",
            paddingTop: 24,
            marginTop: showAccordion ? 24 : 0,
          }}
        >
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "center" : "center",
              gap: isMobile ? 24 : 0,
            }}
          >
            {/* Logo */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <UGCLogo size={32} />
              <Text
                style={{
                  fontSize: 14,
                  color: THEME_COLORS.footerText,
                }}
              >
                UGC Marketplace
              </Text>
            </View>

            {/* Social Icons */}
            <View
              style={{
                flexDirection: "row",
                gap: 16,
              }}
            >
              {SOCIAL_LINKS.map((social) => (
                <Pressable key={social.platform}>
                  {({ hovered }) => (
                    <Ionicons
                      color={
                        hovered
                          ? THEME_COLORS.footerHeading
                          : THEME_COLORS.footerText
                      }
                      name={social.icon}
                      size={22}
                    />
                  )}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Copyright & Legal */}
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "center" : "center",
              marginTop: 24,
              gap: isMobile ? 16 : 0,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: THEME_COLORS.footerText,
              }}
            >
              © 2026 UGC Marketplace. All rights reserved.
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 24,
              }}
            >
              <Pressable onPress={() => navigateWithScroll("/privacypolicy")}>
                {({ hovered }) => (
                  <Text
                    style={{
                      fontSize: 13,
                      color: hovered
                        ? THEME_COLORS.footerHeading
                        : THEME_COLORS.footerText,
                    }}
                  >
                    Privacy Policy
                  </Text>
                )}
              </Pressable>
              <Pressable onPress={() => navigateWithScroll("/termsofservice")}>
                {({ hovered }) => (
                  <Text
                    style={{
                      fontSize: 13,
                      color: hovered
                        ? THEME_COLORS.footerHeading
                        : THEME_COLORS.footerText,
                    }}
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
