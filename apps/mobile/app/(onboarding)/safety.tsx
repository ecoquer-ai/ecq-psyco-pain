import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { RED_FLAG_ITEMS, SAFETY_COPY } from "@neuropi/shared";
import { Button, Chip, ProgressBar, Screen, Text, useTheme } from "@neuropi/ui";
import { CrisisModal } from "@/components/CrisisModal";

const TOTAL_STEPS = 9;

export default function SafetyScreen() {
  const { t, i18n } = useTranslation();
  const { colors, space, radius } = useTheme();
  const es = i18n.language !== "en";
  const [selected, setSelected] = useState<string[]>([]);
  const [showUrgent, setShowUrgent] = useState(false);
  const [crisisOpen, setCrisisOpen] = useState(false);
  const [helpAcknowledged, setHelpAcknowledged] = useState(false);

  const hasFlags = selected.length > 0;
  const mental = selected.includes("rf_self_harm");

  const openHelp = () => {
    setShowUrgent(true);
    setCrisisOpen(true);
  };

  const closeHelp = () => {
    setCrisisOpen(false);
    setHelpAcknowledged(true);
  };

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      if (id === "rf_self_harm" && !prev.includes(id)) {
        setCrisisOpen(true);
      }
      if (next.length === 0) {
        setHelpAcknowledged(false);
        setShowUrgent(false);
      }
      return next;
    });
  };

  const goConsent = () => {
    router.push("/(onboarding)/consent");
  };

  const onContinueNone = () => {
    if (hasFlags && !helpAcknowledged) {
      openHelp();
      return;
    }
    setShowUrgent(false);
    goConsent();
  };

  return (
    <Screen>
      <CrisisModal
        visible={crisisOpen}
        mentalHealth={mental}
        onClose={closeHelp}
      />
      <ProgressBar value={6 / TOTAL_STEPS} label={`6 / ${TOTAL_STEPS}`} />
      <View style={{ gap: space("lg"), marginTop: space("lg") }}>
        <Text variant="title" style={{ letterSpacing: 0.2 }}>
          {es ? SAFETY_COPY.screenTitleEs : SAFETY_COPY.screenTitleEn}
        </Text>
        <Text
          variant="body"
          muted
          style={{ lineHeight: 26, letterSpacing: 0.2 }}
        >
          {es ? SAFETY_COPY.introEs : SAFETY_COPY.introEn}
        </Text>

        <View style={{ gap: space("sm") }}>
          {RED_FLAG_ITEMS.map((item) => (
            <Chip
              key={item.id}
              label={es ? item.textEs : item.textEn}
              selected={selected.includes(item.id)}
              onPress={() => toggle(item.id)}
              style={{ alignSelf: "stretch" }}
            />
          ))}
        </View>

        {showUrgent || hasFlags ? (
          <View style={{ gap: space("sm") }}>
            <Text variant="subtitle" style={{ color: colors.danger }}>
              {es ? SAFETY_COPY.ifYesTitleEs : SAFETY_COPY.ifYesTitleEn}
            </Text>
            <Text variant="body" style={{ lineHeight: 24 }}>
              {es ? SAFETY_COPY.ifYesBodyEs : SAFETY_COPY.ifYesBodyEn}
            </Text>
            <Text variant="caption" muted style={{ lineHeight: 22 }}>
              {es
                ? SAFETY_COPY.chileEmergencyHintEs
                : SAFETY_COPY.chileEmergencyHintEn}
            </Text>
            {mental ? (
              <Text
                variant="body"
                style={{ color: colors.danger, lineHeight: 24 }}
              >
                {es ? SAFETY_COPY.crisisMentalEs : SAFETY_COPY.crisisMentalEn}
              </Text>
            ) : null}
            <Button
              label={es ? "Ver rutas de ayuda ahora" : "See help pathways now"}
              variant="secondary"
              fullWidth
              onPress={openHelp}
            />
            {!helpAcknowledged ? (
              <Text variant="caption" muted style={{ lineHeight: 20 }}>
                {es
                  ? "Antes de continuar, abre las rutas de ayuda (SAMU / Salud Responde)."
                  : "Before continuing, open the help pathways (SAMU / Salud Responde)."}
              </Text>
            ) : null}
          </View>
        ) : null}

        <View
          style={{
            padding: space("lg"),
            borderRadius: radius("lg"),
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            gap: space("sm"),
            width: "100%",
          }}
        >
          <Text variant="subtitle">
            {es ? SAFETY_COPY.papAbcdeTitleEs : SAFETY_COPY.papAbcdeTitleEn}
          </Text>
          <Text variant="body" muted style={{ lineHeight: 24 }}>
            {es ? SAFETY_COPY.papAbcdeBodyEs : SAFETY_COPY.papAbcdeBodyEn}
          </Text>
          <Text variant="caption" muted>
            {es
              ? SAFETY_COPY.chileCrisisNumbersEs
              : SAFETY_COPY.chileCrisisNumbersEn}
          </Text>
        </View>
      </View>

      <View style={{ gap: space("md"), marginTop: space("xl") }}>
        {!hasFlags ? (
          <Button
            label={es ? SAFETY_COPY.continueCtaEs : SAFETY_COPY.continueCtaEn}
            fullWidth
            onPress={onContinueNone}
          />
        ) : null}
        <Button
          label={es ? SAFETY_COPY.seekCareCtaEs : SAFETY_COPY.seekCareCtaEn}
          variant={hasFlags ? "primary" : "secondary"}
          fullWidth
          onPress={openHelp}
        />
        {hasFlags && helpAcknowledged ? (
          <Button
            label={
              es
                ? "Ya vi las rutas — continuar de todos modos"
                : "I saw the pathways — continue anyway"
            }
            variant="ghost"
            fullWidth
            onPress={goConsent}
          />
        ) : null}
        {hasFlags && !helpAcknowledged ? (
          <Text variant="caption" muted style={{ textAlign: "center" }}>
            {t("common.continue")} —{" "}
            {es
              ? "disponible tras ver rutas de ayuda"
              : "available after viewing help pathways"}
          </Text>
        ) : null}
      </View>
    </Screen>
  );
}
