import { Modal, View, Linking, Platform, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { SAFETY_COPY } from "@neuropi/shared";
import { Button, Text, useTheme } from "@neuropi/ui";

type Props = {
  visible: boolean;
  onClose: () => void;
  /** Mental-health crisis wording (PHQ-9 / self-harm). */
  mentalHealth?: boolean;
};

export function CrisisModal({ visible, onClose, mentalHealth }: Props) {
  const { i18n } = useTranslation();
  const { colors, space, radius } = useTheme();
  const es = i18n.language !== "en";

  const call = (tel: string) => {
    const url = Platform.select({ ios: `telprompt:${tel}`, default: `tel:${tel}` });
    if (url) Linking.openURL(url).catch(() => undefined);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <View style={[styles.backdrop, { backgroundColor: "rgba(30,20,15,0.55)" }]}>
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.background,
              borderColor: colors.danger,
              borderRadius: radius("xl"),
              padding: space("xl"),
              gap: space("md"),
            },
          ]}
          accessibilityRole="alert"
        >
          <Text variant="title" style={{ color: colors.danger }}>
            {es ? SAFETY_COPY.ifYesTitleEs : SAFETY_COPY.ifYesTitleEn}
          </Text>
          <Text variant="body" style={{ lineHeight: 26 }}>
            {mentalHealth
              ? es
                ? SAFETY_COPY.crisisMentalEs
                : SAFETY_COPY.crisisMentalEn
              : es
                ? SAFETY_COPY.ifYesBodyEs
                : SAFETY_COPY.ifYesBodyEn}
          </Text>
          <Text variant="caption" muted style={{ lineHeight: 22 }}>
            {es
              ? SAFETY_COPY.chileEmergencyHintEs
              : SAFETY_COPY.chileEmergencyHintEn}
          </Text>
          <Button
            label={es ? "Llamar SAMU 131" : "Call SAMU 131"}
            fullWidth
            onPress={() => call("131")}
          />
          <Button
            label={es ? "Salud Responde 600 360 7777" : "Salud Responde 600 360 7777"}
            variant="secondary"
            fullWidth
            onPress={() => call("6003607777")}
          />
          <Button
            label={es ? "Entendido — volver" : "Understood — go back"}
            variant="ghost"
            fullWidth
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  sheet: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    borderWidth: 1.5,
  },
});
