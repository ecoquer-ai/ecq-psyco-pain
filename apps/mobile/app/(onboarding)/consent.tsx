import { View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { CLINICAL_DISCLAIMER } from "@neuropi/shared";
import {
  Button,
  DisclaimerBanner,
  ProgressBar,
  Screen,
  Text,
  useTheme,
} from "@neuropi/ui";

const TOTAL_STEPS = 9;

export default function ConsentScreen() {
  const { t, i18n } = useTranslation();
  const { space } = useTheme();
  const locale = i18n.language === "en" ? "en" : "es";

  return (
    <Screen>
      <ProgressBar value={7 / TOTAL_STEPS} label={`7 / ${TOTAL_STEPS}`} />
      <View style={{ gap: space("lg"), marginTop: space("xl") }}>
        <Text variant="title" style={{ letterSpacing: 0.2 }}>
          {t("onboarding.consentTitle")}
        </Text>
        <Text variant="body" style={{ lineHeight: 26, letterSpacing: 0.2 }}>
          {t("onboarding.consentBody")}
        </Text>
        <DisclaimerBanner locale={locale} />
        <Text variant="caption" muted style={{ lineHeight: 22 }}>
          {CLINICAL_DISCLAIMER[locale]}
        </Text>
      </View>
      <View style={{ marginTop: space("xxl") }}>
        <Button
          label={t("onboarding.consentAccept")}
          fullWidth
          onPress={() => router.push("/(onboarding)/beliefs-automatic")}
        />
      </View>
    </Screen>
  );
}
