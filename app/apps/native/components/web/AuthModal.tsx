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
        className="flex-1 justify-center items-center bg-black/50"
        onPress={close}
        style={{
          padding: isMobile ? 0 : 24,
        }}
      >
        {/* Modal Container */}
        <Pressable
          className="flex-row bg-background overflow-hidden max-w-[900px]"
          onPress={(e) => e.stopPropagation()}
          style={{
            borderRadius: isMobile ? 0 : 16,
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
          <View className="flex-1">
            {/* Close Button */}
            <View className="absolute top-4 right-4 z-10">
              <Pressable
                className="p-2 rounded-[20px] hover:bg-hover-surface"
                onPress={close}
              >
                <Ionicons
                  className="text-foreground"
                  name="close"
                  size={24}
                />
              </Pressable>
            </View>

            {/* Scrollable Content */}
            <ScrollView
              contentContainerClassName="flex-grow justify-center"
              contentContainerStyle={{
                padding: isMobile ? 24 : 48,
                paddingTop: isMobile ? 64 : 48,
              }}
              showsVerticalScrollIndicator={false}
            >
              <View className="max-w-[400px] w-full self-center">
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
