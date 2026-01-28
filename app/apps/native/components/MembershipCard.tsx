import { Dimensions, Image, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

// Card background image (without name, date, secretary)
const MEMBERSHIP_CARD_BG = require("@/assets/images/membership-card.png");

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = screenWidth - 48; // 24px padding on each side
// The original card appears to have roughly 1.6:1 aspect ratio (wider than credit card)
const CARD_HEIGHT = CARD_WIDTH * 0.62;

// Animation constants
const MAX_TILT = 10; // Maximum tilt angle in degrees
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 100,
  mass: 0.5,
};

interface MembershipCardProps {
  memberName: string;
  memberSince?: string;
  secretaryName?: string;
  /** Disable gyroscope animation (useful for accessibility) */
  disableAnimation?: boolean;
}

export function MembershipCard({
  memberName,
  memberSince,
  secretaryName = "H. Senanayake",
  disableAnimation = false,
}: MembershipCardProps) {
  // Format member since date to "Month Year" format
  const formattedDate = memberSince
    ? new Date(memberSince).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      });

  // Use rotation sensor for device orientation
  const rotationSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: "auto",
  });

  // Create animated style that responds to device tilt
  const animatedCardStyle = useAnimatedStyle(() => {
    if (disableAnimation) {
      return {
        transform: [{ perspective: 1000 }],
      };
    }

    const { pitch, roll } = rotationSensor.sensor.value;

    const pitchDegrees = pitch * (180 / Math.PI);
    const rollDegrees = roll * (180 / Math.PI);

    const rotateX = interpolate(
      pitchDegrees,
      [-45, 45],
      [MAX_TILT, -MAX_TILT],
      Extrapolation.CLAMP
    );

    const rotateY = interpolate(
      rollDegrees,
      [-45, 45],
      [-MAX_TILT, MAX_TILT],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { perspective: 1000 },
        { rotateX: withSpring(`${rotateX}deg`, SPRING_CONFIG) },
        { rotateY: withSpring(`${rotateY}deg`, SPRING_CONFIG) },
      ],
    };
  });

  // Create a subtle shadow animation that responds to tilt
  const animatedShadowStyle = useAnimatedStyle(() => {
    if (disableAnimation) {
      return {
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
      };
    }

    const { pitch, roll } = rotationSensor.sensor.value;

    const pitchDegrees = pitch * (180 / Math.PI);
    const rollDegrees = roll * (180 / Math.PI);

    const shadowX = interpolate(
      rollDegrees,
      [-45, 45],
      [6, -6],
      Extrapolation.CLAMP
    );

    const shadowY = interpolate(
      pitchDegrees,
      [-45, 45],
      [-2, 10],
      Extrapolation.CLAMP
    );

    const tiltMagnitude = Math.sqrt(
      pitchDegrees * pitchDegrees + rollDegrees * rollDegrees
    );
    const shadowOpacity = interpolate(
      tiltMagnitude,
      [0, 30],
      [0.2, 0.35],
      Extrapolation.CLAMP
    );

    return {
      shadowOffset: {
        width: withSpring(shadowX, SPRING_CONFIG),
        height: withSpring(shadowY, SPRING_CONFIG),
      },
      shadowOpacity: withSpring(shadowOpacity, SPRING_CONFIG),
    };
  });

  return (
    <Animated.View
      className="self-center"
      style={[
        {
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          elevation: 12,
        },
        animatedShadowStyle,
      ]}
    >
      <Animated.View
        className="flex-1 origin-center"
        style={animatedCardStyle}
      >
        {/* Double border effect */}
        <View className="flex-1 rounded-xl border-[3px] border-border bg-background overflow-hidden">
          <View
            className="flex-1 rounded-lg border-[1.5px] border-border overflow-hidden"
            style={{ margin: 3 }}
          >
            {/* Card background image */}
            <View className="flex-1 relative">
              <Image
                resizeMode="cover"
                source={MEMBERSHIP_CARD_BG}
                className="absolute inset-0 w-full h-full"
              />

              {/* Text overlays */}
              <View
                className="absolute inset-0 justify-between p-4 pb-3"
                style={{ paddingTop: CARD_HEIGHT * 0.52 }}
              >
                {/* Member name - positioned below "This is to introduce" */}
                <View className="items-center">
                  <Text
                    className="text-foreground text-base font-bold tracking-widest text-center"
                    style={{ fontFamily: "serif" }}
                  >
                    {memberName.toUpperCase()}
                  </Text>
                </View>

                {/* Bottom row: Date and Secretary signature */}
                <View className="flex-row justify-between items-end">
                  {/* Date - bottom left, cursive style */}
                  <Text
                    className="text-foreground text-base"
                    style={{ fontFamily: "DancingScript-Regular" }}
                  >
                    {formattedDate}
                  </Text>

                  {/* Secretary signature - bottom right */}
                  <View className="items-center">
                    {/* Name above the line in cursive */}
                    <Text
                      className="text-foreground text-sm mb-0.5"
                      style={{ fontFamily: "DancingScript-Regular" }}
                    >
                      {secretaryName}
                    </Text>
                    {/* Line */}
                    <View className="w-20 h-px bg-foreground" />
                    {/* "Secretary" below the line */}
                    <Text
                      className="text-foreground text-[10px] mt-0.5"
                      style={{ fontFamily: "serif" }}
                    >
                      Secretary
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

export default MembershipCard;
