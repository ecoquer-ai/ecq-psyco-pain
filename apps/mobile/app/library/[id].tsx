import { useState } from "react";
import { View, Linking, Pressable } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getLibraryItemById } from "@neuropi/shared";
import { Button, Screen, Text, useTheme } from "@neuropi/ui";
import { useSettingsStore } from "@/store/settingsStore";

export default function LibraryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { space, colors, radius } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const [readMode, setReadMode] = useState(true);
  const item = getLibraryItemById(id);

  if (!item) {
    return (
      <Screen>
        <Text variant="body">Contenido no encontrado.</Text>
      </Screen>
    );
  }

  const title = language === "en" ? item.titleEn : item.titleEs;
  const summary = language === "en" ? item.summaryEn : item.summaryEs;
  const body = (language === "en" ? item.bodyEn : item.bodyEs) || summary;
  const isVideo = item.type === "video_lesson";
  const isAudio =
    item.type === "audio_lesson" ||
    item.type === "meditation" ||
    item.type === "breathing";
  const hasUrl = Boolean(item.url && item.url.length > 0);

  const openMedia = async () => {
    if (!item.url) return;
    await Linking.openURL(item.url);
  };

  return (
    <Screen>
      <Stack.Screen options={{ title }} />
      <View style={{ gap: space("lg") }}>
        <Text variant="title" style={{ letterSpacing: 0.2 }}>
          {title}
        </Text>
        <Text variant="caption" muted>
          {item.type.replace(/_/g, " ")}
          {item.durationMin ? ` · ${item.durationMin} min` : ""}
          {item.isDemo ? ` · ${t("library.demo")}` : ""}
        </Text>
        <Text
          variant="body"
          muted
          style={{ lineHeight: 26, letterSpacing: 0.2 }}
        >
          {summary}
        </Text>

        {isVideo && (
          <View
            style={{
              padding: space("lg"),
              borderRadius: radius("lg"),
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              gap: space("md"),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: space("sm"),
              }}
            >
              <Ionicons name="videocam" size={22} color={colors.primary} />
              <Text variant="label">{t("library.videoPlayer")}</Text>
            </View>
            {hasUrl ? (
              <>
                <Text variant="caption" muted style={{ lineHeight: 20 }}>
                  {t("library.videoOpenHint")}
                </Text>
                <Button
                  label={t("library.playVideo")}
                  fullWidth
                  onPress={openMedia}
                />
              </>
            ) : (
              <Text variant="caption" muted>
                {t("library.videoComingSoon")}
              </Text>
            )}
          </View>
        )}

        {isAudio && (
          <View
            style={{
              padding: space("lg"),
              borderRadius: radius("lg"),
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              gap: space("sm"),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: space("sm"),
              }}
            >
              <Ionicons name="headset" size={22} color={colors.primary} />
              <Text variant="label">{t("library.audioPlayer")}</Text>
            </View>
            {hasUrl ? (
              <Button
                label={t("library.playAudio")}
                variant="secondary"
                fullWidth
                onPress={openMedia}
              />
            ) : (
              <Text variant="caption" muted style={{ lineHeight: 20 }}>
                {t("library.audioStub")}
              </Text>
            )}
            {(item.supportsReadAloud || true) && (
              <Pressable onPress={() => setReadMode(true)}>
                <Text variant="caption" style={{ color: colors.primary }}>
                  {t("library.readAloudHint")}
                </Text>
              </Pressable>
            )}
          </View>
        )}

        <Button
          label={t("library.readMode")}
          variant={readMode ? "primary" : "secondary"}
          fullWidth
          onPress={() => setReadMode((v) => !v)}
        />

        {readMode ? (
          <Text
            variant="body"
            style={{ lineHeight: 28, letterSpacing: 0.25, fontSize: 17 }}
          >
            {body}
          </Text>
        ) : null}
      </View>
    </Screen>
  );
}
