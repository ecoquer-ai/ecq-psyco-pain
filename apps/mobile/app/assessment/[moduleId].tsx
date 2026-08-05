import { useMemo, useState, useEffect } from "react";
import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  INSTRUMENTS,
  getQuestionsForInstrument,
  type InstrumentId,
} from "@neuropi/shared";
import { Button, ProgressBar, Screen, Text, useTheme } from "@neuropi/ui";
import { QuestionCard } from "@/components/QuestionCard";
import { CrisisModal } from "@/components/CrisisModal";
import { useAssessmentStore } from "@/store/assessmentStore";
import { useSettingsStore } from "@/store/settingsStore";
import { nextModuleId } from "@/domain/assessmentFlow";

export default function AssessmentModuleScreen() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const { t } = useTranslation();
  const { space } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const answers = useAssessmentStore((s) => s.answers);
  const setAnswer = useAssessmentStore((s) => s.setAnswer);
  const completeModule = useAssessmentStore((s) => s.completeModule);
  const setResultsReady = useAssessmentStore((s) => s.setResultsReady);

  const id = moduleId as InstrumentId;
  const questions = useMemo(() => getQuestionsForInstrument(id), [id]);
  const meta = INSTRUMENTS[id];

  const [index, setIndex] = useState(0);
  const [crisisOpen, setCrisisOpen] = useState(false);
  const [crisisAck, setCrisisAck] = useState(false);
  const question = questions[index];
  const progress = questions.length ? (index + 1) / questions.length : 0;

  const isPhq9Item9 = id === "phq9" && question?.id === "phq9_9";
  const item9Positive =
    isPhq9Item9 && typeof answers.phq9_9 === "number" && answers.phq9_9 > 0;

  useEffect(() => {
    if (item9Positive && !crisisAck) {
      setCrisisOpen(true);
    }
  }, [item9Positive, crisisAck]);

  if (!meta || !question) {
    return (
      <Screen>
        <Text variant="body">Módulo no encontrado.</Text>
        <Button label={t("common.back")} onPress={() => router.back()} />
      </Screen>
    );
  }

  const value = answers[question.id];
  const canNext =
    question.required === false ||
    (value !== undefined &&
      value !== null &&
      !(Array.isArray(value) && value.length === 0));

  const blockedByCrisis = item9Positive && !crisisAck;

  const finishModule = () => {
    completeModule(id);
    const state = useAssessmentStore.getState();
    const updatedCompleted = state.completedModules.includes(id)
      ? state.completedModules
      : [...state.completedModules, id];
    const next = nextModuleId(updatedCompleted, state.answers);
    if (!next) {
      setResultsReady(true);
      router.replace("/assessment/results");
      return;
    }
    router.replace(`/assessment/${next}`);
  };

  const onNext = () => {
    if (blockedByCrisis) {
      setCrisisOpen(true);
      return;
    }
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
    } else {
      finishModule();
    }
  };

  return (
    <Screen>
      <CrisisModal
        visible={crisisOpen}
        mentalHealth
        onClose={() => {
          setCrisisOpen(false);
          setCrisisAck(true);
        }}
      />
      <View style={{ gap: space("lg") }}>
        <Text variant="caption" muted>
          {language === "en" ? meta.nameEn : meta.nameEs}
        </Text>
        <Text variant="caption" muted style={{ lineHeight: 20 }}>
          {language === "en" ? meta.disclaimer.en : meta.disclaimer.es}
        </Text>
        <ProgressBar
          value={progress}
          label={`${index + 1} / ${questions.length}`}
        />
        <QuestionCard
          question={question}
          value={value as never}
          onChange={(v) => setAnswer(question.id, v as never)}
          language={language}
        />
        {blockedByCrisis ? (
          <Text variant="caption" style={{ lineHeight: 20 }}>
            {language === "en"
              ? "Please review the help pathways before continuing."
              : "Revisa las rutas de ayuda antes de continuar."}
          </Text>
        ) : null}
        <Button
          label={
            blockedByCrisis
              ? language === "en"
                ? "See help pathways"
                : "Ver rutas de ayuda"
              : index < questions.length - 1
                ? t("common.next")
                : t("assessment.complete")
          }
          fullWidth
          disabled={!canNext && !blockedByCrisis}
          onPress={onNext}
        />
      </View>
    </Screen>
  );
}
