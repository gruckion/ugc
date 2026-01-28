import { cn } from "@/lib/utils";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

/* ----------------------------- form container ----------------------------- */
export function FormContainer({ children }: { children: React.ReactNode }) {
  return (
    <View
      className="flex-1 bg-background px-6 pt-[100px] gap-4"
    >
      {children}
    </View>
  );
}

/* ------------------------------- form header ------------------------------ */
export default function FormHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <View className="gap-2 mb-2">
      <Text
        className="text-foreground text-[32px] font-light font-serif"
      >
        {title}
      </Text>
      <Text
        className="text-muted text-[15px] leading-[22px]"
      >
        {description}
      </Text>
      {children}
    </View>
  );
}

/* ----------------------------- styled text input -------------------------- */

export interface StyledTextInputProps {
  // Required props
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;

  // Optional native props
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  textContentType?:
    | "emailAddress"
    | "password"
    | "newPassword"
    | "name"
    | "none"
    | "oneTimeCode";
  autoComplete?:
    | "email"
    | "password"
    | "new-password"
    | "name"
    | "off"
    | "one-time-code";

  // Keyboard navigation (React 19 - ref as prop)
  ref?: React.Ref<TextInput>;
  returnKeyType?: TextInputProps["returnKeyType"];
  onSubmitEditing?: TextInputProps["onSubmitEditing"];
  blurOnSubmit?: boolean;
}

export function StyledTextInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  textContentType,
  autoComplete,
  ref,
  returnKeyType,
  onSubmitEditing,
  blurOnSubmit,
}: StyledTextInputProps) {
  return (
    <View className="gap-2">
      <Text
        className="text-foreground text-sm font-medium"
      >
        {label}
      </Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        blurOnSubmit={blurOnSubmit}
        className="border-border bg-surface text-foreground rounded-xl px-4 py-4 text-base border"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor="var(--muted)"
        ref={ref}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        style={{ color: "var(--foreground)" }}
        textContentType={textContentType}
        value={value}
      />
    </View>
  );
}

/* ----------------------------- styled button ------------------------------ */

export interface StyledButtonProps {
  onPress: () => void;
  label: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
}

export function StyledButton({
  onPress,
  label,
  isLoading,
  variant = "primary",
}: StyledButtonProps) {
  const buttonClassName = cn(
    "rounded-xl py-4 items-center",
    variant === "secondary" && "bg-surface border-primary",
    variant === "tertiary" && "bg-transparent",
    variant === "primary" && "bg-primary",
  );

  const textClassName = cn(
    "text-base font-semibold",
    variant === "primary" ? "text-primary-foreground" : "text-foreground",
  );

  return (
    <Pressable
      className={buttonClassName}
      disabled={isLoading}
      onPress={onPress}
      style={{
        opacity: isLoading ? 0.7 : 1,
        borderWidth: variant === "secondary" ? 1 : 0,
      }}
    >
      {isLoading ? (
        <ActivityIndicator
          className={cn(
            variant === "primary" ? "text-primary-foreground" : "text-foreground",
          )}
          size="small"
        />
      ) : (
        <Text className={textClassName}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
