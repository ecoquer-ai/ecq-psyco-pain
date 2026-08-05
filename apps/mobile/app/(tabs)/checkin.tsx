import { useState } from "react";
import { View, TextInput, Platform } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import {
  Button,
  EmptyState,
  Screen,
  Text,
  useTheme,
} from "@neuropi/ui";
import { BodyMap } from "@/components/BodyMap";
import { NrsSlider } from "@/components/NrsSlider";
import { OfflineBanner } from "@/components/OfflineBanner";
import { useJournalStore } from "@/store/journalStore";
import { useSettingsStore } from "@/store/settingsStore";

export default function CheckinScreen() {
  const { t } = useTranslation();
  const { colors, space, radius, reduceMotion } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const entries = useJournalStore((s) => s.entries);
  const addEntry = useJournalStore((s) => s.addEntry);
  const latest = entries[0];

  const [nrs, setNrs] = useState(3);
  const [regions, setRegions] = useState<string[]>([]);
  const [therapyReady, setTherapyReady] = useState("");
  const [saved, setSaved] = useState(false);

  const pulse = async () => {
    if (reduceMotion || Platform.OS === "web") return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      /* haptics unavailable */
    }
  };

  const save = async () => {
    addEntry({
      nrs,
      regions,
      interference: nrs,
      sleep: 5,
      mood: 5,
      stress: 5,
      flareUp: false,
      notes: therapyReady.trim(),
    });
    setTherapyReady("");
    setSaved(true);
    await pulse();
  };

  if (saved || latest) {
    return (
      <Screen>
        <View style={{ gap: space("xl") }}>
          <OfflineBanner />
          <Text variant="title" style={{ letterSpacing: 0.2 }}>
            {t("checkin.savedTitle")}
          </Text>
          <Text
            variant="body"
            muted
            style={{ lineHeight: 26, letterSpacing: 0.2 }}
          >
            {t("checkin.savedBody")}
          </Text>
          {latest ? (
            <Text variant="caption" muted>
              {t("checkin.lastAt", {
                date: new Date(latest.createdAt).toLocaleString(
                  language === "en" ? "en" : "es-CL",
                ),
              })}
              {` · NRS ${latest.nrs}/10`}
            </Text>
          ) : null}
          <Text variant="body" style={{ lineHeight: 26 }}>
            {t("checkin.onceOnlyHint")}
          </Text>
          <Button
            label={t("checkin.ctaPsych")}
            fullWidth
            onPress={() => router.push("/(tabs)/psicoterapia")}
          />
          <Button
            label={t("checkin.ctaProgram")}
            variant="secondary"
            fullWidth
            onPress={() => router.push("/therapy/m1_understand_pain")}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={{ gap: space("xl") }}>
        <OfflineBanner />
        <View style={{ gap: space("sm") }}>
          <Text variant="title" style={{ letterSpacing: 0.2 }}>
            {t("checkin.title")}
          </Text>
          <Text
            variant="body"
            muted
            style={{ lineHeight: 26, letterSpacing: 0.25 }}
          >
            {t("checkin.subtitle")}
          </Text>
          <Text variant="caption" muted style={{ lineHeight: 22 }}>
            {t("checkin.diaryLater")}
          </Text>
        </View>

        <EmptyState
          title={t("checkin.emptyTitle")}
          description={t("checkin.emptyHint")}
        />

        <NrsSlider
          value={nrs}
          onChange={(v) => {
            setNrs(v);
            void pulse();
          }}
          label={t("checkin.nrs")}
        />
        <BodyMap
          selected={regions}
          onChange={setRegions}
          language={language}
        />

        <View style={{ gap: space("sm") }}>
          <Text variant="label">{t("checkin.therapyPrompt")}</Text>
          <TextInput
            accessibilityLabel={t("checkin.therapyPrompt")}
            value={therapyReady}
            onChangeText={setTherapyReady}
            multiline
            placeholder={t("checkin.therapyPlaceholder")}
            placeholderTextColor={colors.textMuted}
            style={{
              minHeight: 96,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.surface,
              borderRadius: radius("md"),
              padding: space("md"),
              color: colors.text,
              fontSize: 17,
              lineHeight: 26,
              letterSpacing: 0.2,
              textAlignVertical: "top",
              fontFamily: "Source Sans 3",
            }}
          />
        </View>

        <Button label={t("checkin.save")} fullWidth onPress={() => void save()} />

        <Button
          label={t("checkin.ctaPsych")}
          variant="secondary"
          fullWidth
          onPress={() => router.push("/(tabs)/psicoterapia")}
        />
      </View>
    </Screen>
  );
}
