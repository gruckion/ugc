import { cn } from "@/lib/utils";
import { Text, View } from "react-native";

interface UGCLogoProps {
  /** Size of the logo circle in pixels */
  size?: number;
  /** Optional custom background color className (e.g. "bg-primary") */
  bgClassName?: string;
  /** Optional custom text color className (e.g. "text-primary-foreground") */
  textClassName?: string;
}

/**
 * Simple UGC logo - a green circle with white "UGC" text
 */
export function UGCLogo({
  size = 56,
  bgClassName = "bg-primary",
  textClassName = "text-primary-foreground",
}: UGCLogoProps) {
  // Font size scales with the circle size
  const fontSize = size * 0.32;

  return (
    <View
      className={cn("items-center justify-center rounded-full", bgClassName)}
      style={{
        width: size,
        height: size,
      }}
    >
      <Text
        className={cn("font-bold tracking-[1px]", textClassName)}
        style={{ fontSize }}
      >
        UGC
      </Text>
    </View>
  );
}

export default UGCLogo;
