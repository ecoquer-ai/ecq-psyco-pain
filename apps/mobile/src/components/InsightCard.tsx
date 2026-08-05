import { View } from "react-native";
import { Text, useTheme } from "@neuropi/ui";

type Props = {
  title: string;
  body: string;
};

export function InsightCard({ title, body }: Props) {
  const { colors, space, radius } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius("lg"),
        padding: space("lg"),
        borderWidth: 1,
        borderColor: colors.border,
        gap: space("sm"),
      }}
    >
      <Text variant="label" muted>
        {title}
      </Text>
      <Text variant="body">{body}</Text>
    </View>
  );
}
