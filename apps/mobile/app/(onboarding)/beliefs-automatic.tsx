import { useMemo, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  getQuestionsForInstrument,
  INSTRUMENTS,
} from "@neuropi/shared";
import { Button, ProgressBar, Screen, Text, useTheme } from "@neuropi/ui";
import { QuestionCard } from "@/components/QuestionCard";
import { useAssessmentStore } from "@/store/assessmentStore";
import { useSettingsStore } from "@/store/settingsStore";

const TOTAL_STEPS = 9;
const STEP = 8;

export default function BeliefsAutomaticScreen() {
  const { t } = useTranslation();
  const { space } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const setAnswer = useAssessmentStore((s) => s.setAnswer);
  const answers = useAssessmentStore((s) => s.answers);
  const completeModule = useAssessmentStore((s) => s.completeModule);
  const questions = useMemo(
    () => getQuestionsForInstrument("cbt_automatic_beliefs"),
    [],
  );
  const meta = INSTRUMENTS.cbt_automatic_beliefs;
  const [index, setIndex] = useState(0);
  const question = questions[index];
  const value = question ? answers[question.id] : undefined;
  const canNext =
    !question ||
    question.required === false ||
    (value !== undefined && value !== null);

  const onNext = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    completeModule("cbt_automatic_beliefs");
    router.push("/(onboarding)/beliefs-limiting");
  };

  if (!question) {
    return (
      <Screen>
        <Text variant="body">—</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ProgressBar
        value={STEP / TOTAL_STEPS}
        label={`${STEP} / ${TOTAL_STEPS}`}
      />
      <View style={{ gap: space("lg"), marginTop: space("lg") }}>
        <Text variant="title" style={{ letterSpacing: 0.2 }}>
          {t("onboarding.beliefsAutoTitle")}
        </Text>
        <Text
          variant="body"
          muted
          style={{ lineHeight: 26, letterSpacing: 0.2 }}
        >
          {t("onboarding.beliefsAutoBody")}
        </Text>
        <Text variant="caption" muted>
          {language === "en" ? meta.disclaimer.en : meta.disclaimer.es}
        </Text>
        <ProgressBar
          value={(index + 1) / questions.length}
          label={`${index + 1} / ${questions.length}`}
        />
        <QuestionCard
          question={question}
          value={value as never}
          onChange={(v) => setAnswer(question.id, v as never)}
          language={language}
        />
        <Button
          label={
            index < questions.length - 1
              ? t("common.next")
              : t("common.continue")
          }
          fullWidth
          disabled={!canNext}
          onPress={onNext}
        />
        <Button
          label={t("onboarding.beliefsSkip")}
          variant="ghost"
          fullWidth
          onPress={() => {
            completeModule("cbt_automatic_beliefs");
            router.push("/(onboarding)/beliefs-limiting");
          }}
        />
        <Text variant="caption" muted style={{ textAlign: "center" }}>
          {t("onboarding.beliefsSkipHint")}
        </Text>
      </View>
    </Screen>
  );
}
