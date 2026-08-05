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
const STEP = 9;

export default function BeliefsLimitingScreen() {
  const { t } = useTranslation();
  const { space } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const setAnswer = useAssessmentStore((s) => s.setAnswer);
  const answers = useAssessmentStore((s) => s.answers);
  const completeModule = useAssessmentStore((s) => s.completeModule);
  const setOnboardingDone = useSettingsStore((s) => s.setOnboardingDone);
  const questions = useMemo(
    () => getQuestionsForInstrument("cbt_limiting_beliefs"),
    [],
  );
  const meta = INSTRUMENTS.cbt_limiting_beliefs;
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const question = questions[index];
  const value = question ? answers[question.id] : undefined;
  const canNext =
    !question ||
    question.required === false ||
    (value !== undefined && value !== null);

  const finishQuestions = () => {
    completeModule("cbt_limiting_beliefs");
    setOnboardingDone(true);
    setDone(true);
  };

  const onNext = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    finishQuestions();
  };

  if (done) {
    return (
      <Screen>
        <ProgressBar value={1} label={`${TOTAL_STEPS} / ${TOTAL_STEPS}`} />
        <View style={{ gap: space("lg"), marginTop: space("xl") }}>
          <Text variant="title" style={{ letterSpacing: 0.2 }}>
            {t("onboarding.beliefsDoneTitle")}
          </Text>
          <Text
            variant="body"
            style={{ lineHeight: 26, letterSpacing: 0.25 }}
          >
            {t("onboarding.beliefsDoneBody")}
          </Text>
          <Text variant="body" muted style={{ lineHeight: 24 }}>
            {t("onboarding.beliefsSoftCta")}
          </Text>
          <Button
            label={t("onboarding.startUnderstand")}
            fullWidth
            onPress={() => router.replace("/assessment")}
          />
          <Button
            label={t("onboarding.goHome")}
            variant="secondary"
            fullWidth
            onPress={() => router.replace("/(tabs)")}
          />
        </View>
      </Screen>
    );
  }

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
          {t("onboarding.beliefsLimTitle")}
        </Text>
        <Text
          variant="body"
          muted
          style={{ lineHeight: 26, letterSpacing: 0.2 }}
        >
          {t("onboarding.beliefsLimBody")}
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
          onPress={finishQuestions}
        />
        <Text variant="caption" muted style={{ textAlign: "center" }}>
          {t("onboarding.beliefsSkipHint")}
        </Text>
      </View>
    </Screen>
  );
}
