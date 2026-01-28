import { Ionicons } from "@expo/vector-icons";
import { useConvexAuth } from "convex/react";
import { useEffect } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import {
  type AuthModalView,
  useAuthModal,
} from "@/contexts/auth-modal-context";
import { useResponsive } from "@/hooks/useResponsive";
import { AuthModalEmailForm } from "./AuthModalEmailForm";
import { AuthModalForgotPassword } from "./AuthModalForgotPassword";
import { AuthModalLeftPanel } from "./AuthModalLeftPanel";
import { AuthModalSignInView } from "./AuthModalSignInView";
import { AuthModalSignUpView } from "./AuthModalSignUpView";

const THEME_COLORS = {
  background: "#FFFFFF",
  foreground: "#222325",
};

export function AuthModal() {
  const { isOpen, view, close } = useAuthModal();
  const { isAuthenticated } = useConvexAuth();
  const { isMobile, isTablet } = useResponsive();
  const showSplitLayout = !(isMobile || isTablet);

  // Auto-close modal when user authenticates
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      close();
    }
  }, [isAuthenticated, isOpen, close]);

  // Handle escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  const renderContent = (currentView: AuthModalView) => {
    switch (currentView) {
      case "signin":
        return <AuthModalSignInView />;
      case "signup":
        return <AuthModalSignUpView />;
      case "email-signin":
        return <AuthModalEmailForm mode="signin" />;
      case "email-signup":
        return <AuthModalEmailForm mode="signup" />;
      case "forgot-password":
        return <AuthModalForgotPassword />;
      default:
        return <AuthModalSignInView />;
    }
  };

  return (
    <Modal
      animationType="fade"
      onRequestClose={close}
      transparent
      visible={isOpen}
    >
      {/* Backdrop */}
      <Pressable
        onPress={close}
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? 0 : 24,
        }}
      >
        {/* Modal Container */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            flexDirection: "row",
            backgroundColor: THEME_COLORS.background,
            borderRadius: isMobile ? 0 : 16,
            overflow: "hidden",
            maxWidth: 900,
            width: isMobile ? "100%" : "95%",
            maxHeight: isMobile ? "100%" : "90%",
            height: isMobile ? "100%" : "auto",
            minHeight: isMobile ? undefined : 600,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 24,
            elevation: 10,
          }}
        >
          {/* Left Panel - Desktop Only */}
          {showSplitLayout && <AuthModalLeftPanel />}

          {/* Right Panel - Content */}
          <View style={{ flex: 1 }}>
            {/* Close Button */}
            <View
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 10,
              }}
            >
              <Pressable
                onPress={close}
                style={({ hovered }) => ({
                  padding: 8,
                  borderRadius: 20,
                  backgroundColor: hovered ? "#f0f0f0" : "transparent",
                })}
              >
                <Ionicons
                  color={THEME_COLORS.foreground}
                  name="close"
                  size={24}
                />
              </Pressable>
            </View>

            {/* Scrollable Content */}
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                padding: isMobile ? 24 : 48,
                paddingTop: isMobile ? 64 : 48,
              }}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ maxWidth: 400, width: "100%", alignSelf: "center" }}>
                {renderContent(view)}
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default AuthModal;
