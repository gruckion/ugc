import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type AuthModalView =
  | "signin"
  | "signup"
  | "email-signin"
  | "email-signup"
  | "forgot-password";

interface AuthModalContextType {
  isOpen: boolean;
  view: AuthModalView;
  open: (initialView: "signin" | "signup") => void;
  close: () => void;
  setView: (view: AuthModalView) => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

export const AuthModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthModalView>("signin");

  const open = useCallback((initialView: "signin" | "signup") => {
    setView(initialView);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Reset view after close animation
    setTimeout(() => {
      setView("signin");
    }, 300);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      view,
      open,
      close,
      setView,
    }),
    [isOpen, view, open, close]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
};

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return context;
}
