import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  buildRiskProtectionProfile,
  getProbableProfile,
  type ProbableProfileId,
} from "@neuropi/shared";
import {
  Button,
  DisclaimerBanner,
  Screen,
  Text,
  useTheme,
} from "@neuropi/ui";
import { InsightCard } from "@/components/InsightCard";
import { CrisisModal } from "@/components/CrisisModal";
import { useAssessmentStore } from "@/store/assessmentStore";
import { useSettingsStore } from "@/store/settingsStore";

const RISK_LABELS: Record<string, { es: string; en: string }> = {
  depressive_symptoms: {
    es: "Señales de ánimo y energía (orientadoras)",
    en: "Mood and energy signals (orienting)",
  },
  high_perceived_stress: {
    es: "Estrés percibido elevado (orientador)",
    en: "Elevated perceived stress (orienting)",
  },
  catastrophic_thinking: {
    es: "Pensamientos automáticos intensos sobre el dolor",
    en: "Intense automatic thoughts about pain",
  },
  fear_avoidance: {
    es: "Miedo o evitación del movimiento",
    en: "Fear or avoidance of movement",
  },
  sleep_disruption: {
    es: "Sueño alterado (pilar de vida)",
    en: "Disrupted sleep (life pillar)",
  },
};

export default function AssessmentResultsScreen() {
  const { t } = useTranslation();
  const { space, colors } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const answers = useAssessmentStore((s) => s.answers);
  const setResultsReady = useAssessmentStore((s) => s.setResultsReady);
  const [crisisOpen, setCrisisOpen] = useState(false);

  useEffect(() => {
    setResultsReady(true);
  }, [setResultsReady]);

  const profile = useMemo(
    () => buildRiskProtectionProfile(answers),
    [answers],
  );

  useEffect(() => {
    if (profile.crisisSignal || profile.redFlagTriggered) {
      setCrisisOpen(true);
    }
  }, [profile.crisisSignal, profile.redFlagTriggered]);

  const primaryId = profile.probableProfileIds[0] as
    | ProbableProfileId
    | undefined;
  const primary = primaryId ? getProbableProfile(primaryId) : null;

  const mechanismIds = profile.probableProfileIds.filter((id) =>
    String(id).startsWith("iasp_"),
  );
  const psychIndicated = profile.probableProfileIds.includes(
    "pain_psychotherapy_indicated" as ProbableProfileId,
  );

  const clinicianQs = [
    language === "en"
      ? "How does my pain fit a biopsychosocial plan that includes pain psychotherapy?"
      : "¿Cómo encaja mi dolor en un plan biopsicosocial que incluya psicoterapia del dolor?",
    language === "en"
      ? "What would improve function even if intensity stays similar?"
      : "¿Qué ayudaría a recuperar función aunque la intensidad sea similar?",
    language === "en"
      ? "When should I seek urgent care again?"
      : "¿Cuándo debo volver a buscar atención urgente?",
  ];

  const labelRisk = (id: string) => {
    const mapped = RISK_LABELS[id];
    if (mapped) return language === "en" ? mapped.en : mapped.es;
    return id.replace(/_/g, " ");
  };

  return (
    <Screen>
      <CrisisModal
        visible={crisisOpen}
        mentalHealth={profile.crisisSignal}
        onClose={() => setCrisisOpen(false)}
      />
      <View style={{ gap: space("xl") }}>
        <Text variant="title" style={{ letterSpacing: 0.2 }}>
          {t("assessment.resultsTitle")}
        </Text>
        <DisclaimerBanner locale={language} />

        {(profile.crisisSignal || profile.redFlagTriggered) && (
          <View style={{ gap: space("sm") }}>
            <Text variant="body" style={{ color: colors.danger, lineHeight: 24 }}>
              {language === "en"
                ? "Some answers suggest prioritizing in-person care now."
                : "Algunas respuestas sugieren priorizar atención en persona ahora."}
            </Text>
            <Button
              label={
                language === "en" ? "See help pathways" : "Ver rutas de ayuda"
              }
              fullWidth
              onPress={() => setCrisisOpen(true)}
            />
          </View>
        )}

        <InsightCard
          title={t("assessment.mostImportant")}
          body={language === "en" ? profile.summaryEn : profile.summaryEs}
        />

        <View style={{ gap: space("sm") }}>
          <Text variant="label" muted>
            {t("assessment.mechanismOrientation")}
          </Text>
          <Text variant="body" style={{ lineHeight: 26, letterSpacing: 0.2 }}>
            {t("assessment.mechanismBody")}
          </Text>
          {mechanismIds.length ? (
            mechanismIds.map((id) => {
              const p = getProbableProfile(id as ProbableProfileId);
              if (!p) return null;
              return (
                <Text key={id} variant="body" muted style={{ lineHeight: 22 }}>
                  · {language === "en" ? p.titleEn : p.titleEs}
                </Text>
              );
            })
          ) : (
            <Text variant="caption" muted>
              {t("assessment.mechanismPending")}
            </Text>
          )}
        </View>

        <View style={{ gap: space("sm") }}>
          <Text variant="label" muted>
            {t("assessment.whyPsych")}
          </Text>
          <Text variant="body" style={{ lineHeight: 26, letterSpacing: 0.2 }}>
            {psychIndicated
              ? t("assessment.whyPsychIndicated")
              : t("assessment.whyPsychGeneral")}
          </Text>
        </View>

        {primary ? (
          <View style={{ gap: space("sm") }}>
            <Text variant="label" muted>
              {t("assessment.whatShows")}
            </Text>
            <Text variant="subtitle">
              {language === "en" ? primary.titleEn : primary.titleEs}
            </Text>
            <Text variant="body" style={{ lineHeight: 26 }}>
              {language === "en"
                ? primary.explanationEn
                : primary.explanationEs}
            </Text>
            <Text variant="label" muted>
              {t("assessment.doesNotMean")}
            </Text>
            <Text variant="body" muted style={{ lineHeight: 24 }}>
              {language === "en"
                ? primary.whatItDoesNotMeanEn
                : primary.whatItDoesNotMeanEs}
            </Text>
          </View>
        ) : (
          <Text variant="body" muted>
            {language === "en"
              ? "Complete a few more modules for richer orientation."
              : "Completa algunos módulos más para una orientación más rica."}
          </Text>
        )}

        <View style={{ gap: space("sm") }}>
          <Text variant="label" muted>
            {t("assessment.riskFactors")}
          </Text>
          {profile.riskFactorIds.length ? (
            profile.riskFactorIds.map((id) => (
              <Text key={id} variant="body">
                · {labelRisk(id)}
              </Text>
            ))
          ) : (
            <Text variant="caption" muted>
              —
            </Text>
          )}
        </View>

        <View style={{ gap: space("sm") }}>
          <Text variant="label" muted>
            {t("assessment.protective")}
          </Text>
          {profile.protectiveFactorIds.length ? (
            profile.protectiveFactorIds.map((id) => (
              <Text key={id} variant="body">
                · {id.replace(/_/g, " ")}
              </Text>
            ))
          ) : (
            <Text variant="caption" muted>
              —
            </Text>
          )}
        </View>

        <View style={{ gap: space("sm") }}>
          <Text variant="label" muted>
            {t("assessment.nextSteps")}
          </Text>
          {profile.recommendations.slice(0, 4).map((r) => (
            <View key={r.id} style={{ gap: space("xs") }}>
              <Text variant="body">
                {language === "en" ? r.titleEn : r.titleEs}
              </Text>
              <Text variant="caption" muted style={{ lineHeight: 20 }}>
                {language === "en" ? r.bodyEn : r.bodyEs}
              </Text>
            </View>
          ))}
          {primary?.recommendedActions.map((a) => (
            <Text key={a} variant="body">
              · {a}
            </Text>
          ))}
        </View>

        <View style={{ gap: space("sm") }}>
          <Text variant="label" muted>
            {t("assessment.clinicianQs")}
          </Text>
          {clinicianQs.map((q) => (
            <Text key={q} variant="body" style={{ lineHeight: 22 }}>
              · {q}
            </Text>
          ))}
        </View>

        <Button
          label={t("psych.ctaProgram")}
          fullWidth
          onPress={() => router.push("/(tabs)/psicoterapia")}
        />
        <Button
          label={t("assessment.pdfCta")}
          variant="secondary"
          fullWidth
          onPress={() => router.push("/report")}
        />
      </View>
    </Screen>
  );
}
