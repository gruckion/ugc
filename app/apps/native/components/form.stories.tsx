import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";
import { fn } from "storybook/test";
import FormHeader, {
  FormContainer,
  StyledButton,
  StyledTextInput,
} from "./form";

/* --------------------------------- StyledButton Stories --------------------------------- */

const buttonMeta = {
  title: "Form/StyledButton",
  component: StyledButton,
  tags: ["autodocs"],
  args: {
    onPress: fn(),
    label: "Button",
    isLoading: false,
    variant: "primary",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "Visual style variant",
    },
    isLoading: {
      control: "boolean",
      description: "Loading state",
    },
  },
} satisfies Meta<typeof StyledButton>;

export default buttonMeta;

type ButtonStory = StoryObj<typeof buttonMeta>;

export const Primary: ButtonStory = {
  args: {
    label: "Sign In",
    variant: "primary",
  },
};

export const Secondary: ButtonStory = {
  args: {
    label: "Cancel",
    variant: "secondary",
  },
};

export const Tertiary: ButtonStory = {
  args: {
    label: "Forgot Password?",
    variant: "tertiary",
  },
};

export const Loading: ButtonStory = {
  args: {
    label: "Signing In...",
    variant: "primary",
    isLoading: true,
  },
};

export const AllButtonVariants: ButtonStory = {
  render: () => (
    <View className="gap-3">
      <StyledButton label="Primary Button" onPress={fn()} variant="primary" />
      <StyledButton
        label="Secondary Button"
        onPress={fn()}
        variant="secondary"
      />
      <StyledButton label="Tertiary Button" onPress={fn()} variant="tertiary" />
      <StyledButton
        isLoading
        label="Loading..."
        onPress={fn()}
        variant="primary"
      />
    </View>
  ),
};

/* --------------------------------- StyledTextInput Stories --------------------------------- */

export const TextInput: StoryObj = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <StyledTextInput
        label="Email"
        onChangeText={setValue}
        placeholder="Enter your email"
        value={value}
      />
    );
  },
};

export const EmailInput: StoryObj = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <StyledTextInput
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        label="Email Address"
        onChangeText={setValue}
        placeholder="you@example.com"
        textContentType="emailAddress"
        value={value}
      />
    );
  },
};

export const PasswordInput: StoryObj = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <StyledTextInput
        autoCapitalize="none"
        autoComplete="password"
        label="Password"
        onChangeText={setValue}
        placeholder="Enter your password"
        secureTextEntry
        textContentType="password"
        value={value}
      />
    );
  },
};

export const PrefilledInput: StoryObj = {
  render: () => {
    const [value, setValue] = useState("john@example.com");
    return (
      <StyledTextInput
        autoCapitalize="none"
        keyboardType="email-address"
        label="Email"
        onChangeText={setValue}
        placeholder="Enter your email"
        value={value}
      />
    );
  },
};

/* --------------------------------- FormHeader Stories --------------------------------- */

export const Header: StoryObj = {
  render: () => (
    <FormHeader
      description="Welcome back! Please sign in to continue."
      title="Sign In"
    />
  ),
};

export const HeaderWithSubtitle: StoryObj = {
  render: () => (
    <FormHeader
      description="Create an account to access all features of the UGC app."
      title="Create Account"
    />
  ),
};

/* --------------------------------- FormContainer Stories --------------------------------- */

export const Container: StoryObj = {
  render: () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
      <FormContainer>
        <FormHeader
          description="Welcome back! Please sign in to continue."
          title="Sign In"
        />
        <StyledTextInput
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@example.com"
          value={email}
        />
        <StyledTextInput
          label="Password"
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
        />
        <StyledButton label="Sign In" onPress={fn()} variant="primary" />
        <StyledButton
          label="Forgot Password?"
          onPress={fn()}
          variant="tertiary"
        />
      </FormContainer>
    );
  },
};

/* --------------------------------- Complete Form Example --------------------------------- */

export const SignInFormExample: StoryObj = {
  render: () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <View className="gap-4">
        <FormHeader
          description="Welcome back! Please sign in to continue."
          title="Sign In"
        />
        <StyledTextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@example.com"
          textContentType="emailAddress"
          value={email}
        />
        <StyledTextInput
          autoCapitalize="none"
          autoComplete="password"
          label="Password"
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          textContentType="password"
          value={password}
        />
        <StyledButton
          isLoading={isLoading}
          label="Sign In"
          onPress={handleSignIn}
          variant="primary"
        />
        <StyledButton
          label="Need an account? Sign Up"
          onPress={fn()}
          variant="tertiary"
        />
      </View>
    );
  },
};

export const SignUpFormExample: StoryObj = {
  render: () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
      <View className="gap-4">
        <FormHeader
          description="Create an account to get started."
          title="Create Account"
        />
        <StyledTextInput
          autoCapitalize="words"
          autoComplete="name"
          label="Full Name"
          onChangeText={setName}
          placeholder="John Doe"
          textContentType="name"
          value={name}
        />
        <StyledTextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@example.com"
          textContentType="emailAddress"
          value={email}
        />
        <StyledTextInput
          autoCapitalize="none"
          autoComplete="new-password"
          label="Password"
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
          textContentType="newPassword"
          value={password}
        />
        <StyledButton label="Create Account" onPress={fn()} variant="primary" />
        <StyledButton
          label="Already have an account? Sign In"
          onPress={fn()}
          variant="tertiary"
        />
      </View>
    );
  },
};
