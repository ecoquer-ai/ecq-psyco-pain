import type { Milestone } from "@neuropi/shared";
import { View } from "react-native";
import { Card, ProgressBar, Text, useTheme } from "@neuropi/ui";

type Props = {
  milestone: Milestone;
  completedLessonIds: string[];
  language?: "es" | "en";
  onPress?: () => void;
};

export function MilestoneCard({
  milestone,
  completedLessonIds,
  language = "es",
  onPress,
}: Props) {
  const { space } = useTheme();
  const title = language === "en" ? milestone.titleEn : milestone.titleEs;
  const description =
    language === "en" ? milestone.descriptionEn : milestone.descriptionEs;
  const done = milestone.lessons.filter((l) =>
    completedLessonIds.includes(l.id),
  ).length;
  const progress =
    milestone.lessons.length === 0 ? 0 : done / milestone.lessons.length;

  return (
    <Card
      onPress={onPress}
      accessibilityLabel={title}
      style={{ marginBottom: space("md") }}
    >
      <View style={{ gap: space("sm") }}>
        <Text variant="caption" muted>
          Hito {milestone.order}
        </Text>
        <Text variant="subtitle">{title}</Text>
        <Text variant="body" muted>
          {description}
        </Text>
        <ProgressBar
          value={progress}
          label={`${done}/${milestone.lessons.length}`}
        />
      </View>
    </Card>
  );
}
