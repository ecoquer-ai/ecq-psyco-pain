import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  LIBRARY_CATALOG,
  getLibraryItemsByType,
  type LibraryItem,
  type LibraryItemType,
} from "@neuropi/shared";
import { Card, Chip, Screen, Text, useTheme } from "@neuropi/ui";
import { OfflineBanner } from "@/components/OfflineBanner";
import { useSettingsStore } from "@/store/settingsStore";

type FilterId = "all" | "video_lesson" | "audio_lesson";

type Row =
  | { kind: "header"; id: string; title: string; hint?: string }
  | { kind: "item"; id: string; item: LibraryItem };

export default function LibraryScreen() {
  const { t } = useTranslation();
  const { colors, space } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const [filter, setFilter] = useState<FilterId>("all");

  const typeIcon = (type: LibraryItemType) => {
    if (type === "video_lesson") return "videocam-outline" as const;
    if (type === "audio_lesson" || type === "meditation" || type === "breathing")
      return "headset-outline" as const;
    return "document-text-outline" as const;
  };

  const rows = useMemo((): Row[] => {
    const out: Row[] = [];
    if (filter === "all" || filter === "video_lesson") {
      const videos = getLibraryItemsByType("video_lesson");
      out.push({
        kind: "header",
        id: "h-videos",
        title: t("library.videosSection"),
        hint: t("library.videosHint"),
      });
      for (const item of videos) {
        out.push({ kind: "item", id: item.id, item });
      }
    }
    if (filter === "all" || filter === "audio_lesson") {
      const audios =
        filter === "audio_lesson"
          ? getLibraryItemsByType("audio_lesson")
          : LIBRARY_CATALOG.filter((i) => i.type !== "video_lesson");
      out.push({
        kind: "header",
        id: "h-audio",
        title: t("library.audioSection"),
      });
      for (const item of audios) {
        out.push({ kind: "item", id: item.id, item });
      }
    }
    return out;
  }, [filter, t]);

  return (
    <Screen scroll={false} contentStyle={{ paddingBottom: 0 }}>
      <View style={{ flex: 1, gap: space("md") }}>
        <OfflineBanner />
        <Text variant="title" style={{ letterSpacing: 0.2 }}>
          {t("library.title")}
        </Text>
        <Text
          variant="body"
          muted
          style={{ lineHeight: 26, letterSpacing: 0.2 }}
        >
          {t("library.subtitle")}
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space("sm") }}>
          <Chip
            label={t("library.filterAll")}
            selected={filter === "all"}
            onPress={() => setFilter("all")}
          />
          <Chip
            label={t("library.filterVideos")}
            selected={filter === "video_lesson"}
            onPress={() => setFilter("video_lesson")}
          />
          <Chip
            label={t("library.filterAudio")}
            selected={filter === "audio_lesson"}
            onPress={() => setFilter("audio_lesson")}
          />
        </View>

        <View style={{ flex: 1, minHeight: 320 }}>
          <FlatList
            data={rows}
            keyExtractor={(row) => row.id}
            contentContainerStyle={{ paddingBottom: space("xxl") }}
            renderItem={({ item: row }) => {
              if (row.kind === "header") {
                return (
                  <View
                    style={{
                      gap: space("xs"),
                      marginTop: space("lg"),
                      marginBottom: space("sm"),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: space("sm"),
                      }}
                    >
                      <Ionicons
                        name={
                          row.id === "h-videos" ? "videocam" : "headset-outline"
                        }
                        size={20}
                        color={colors.primary}
                      />
                      <Text variant="subtitle">{row.title}</Text>
                    </View>
                    {row.hint ? (
                      <Text variant="caption" muted>
                        {row.hint}
                      </Text>
                    ) : null}
                  </View>
                );
              }

              const item = row.item;
              return (
                <Card
                  style={{ marginBottom: space("sm") }}
                  onPress={() => router.push(`/library/${item.id}`)}
                  accessibilityLabel={
                    language === "en" ? item.titleEn : item.titleEs
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: space("sm"),
                    }}
                  >
                    <Ionicons
                      name={typeIcon(item.type)}
                      size={18}
                      color={colors.textMuted}
                    />
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text variant="label">
                        {language === "en" ? item.titleEn : item.titleEs}
                        {item.isDemo ? ` · ${t("library.demo")}` : ""}
                      </Text>
                      <Text variant="caption" muted>
                        {language === "en" ? item.summaryEn : item.summaryEs}
                        {item.durationMin ? ` · ${item.durationMin} min` : ""}
                      </Text>
                    </View>
                  </View>
                </Card>
              );
            }}
          />
        </View>
      </View>
    </Screen>
  );
}
