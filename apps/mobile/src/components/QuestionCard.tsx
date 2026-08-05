import type { Question } from "@neuropi/shared";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, Chip, Text, useTheme } from "@neuropi/ui";
import { BodyMap } from "@/components/BodyMap";
import { NrsSlider } from "@/components/NrsSlider";

type AnswerValue = string | number | boolean | string[] | undefined;

type Props = {
  question: Question;
  value: AnswerValue;
  onChange: (value: AnswerValue) => void;
  language?: "es" | "en";
};

export function QuestionCard({
  question,
  value,
  onChange,
  language = "es",
}: Props) {
  const { colors, space, radius } = useTheme();
  const text = language === "en" ? question.textEn : question.textEs;
  const help = language === "en" ? question.helpEn : question.helpEs;

  return (
    <View style={[styles.root, { gap: space("lg") }]}>
      <Text variant="subtitle">{text}</Text>
      {help ? (
        <Text variant="caption" muted>
          {help}
        </Text>
      ) : null}

      {(question.type === "nrs" || question.type === "vas") && (
        <NrsSlider
          value={typeof value === "number" ? value : 0}
          onChange={onChange}
          min={question.min ?? 0}
          max={question.max ?? 10}
        />
      )}

      {question.type === "body_map" && (
        <BodyMap
          selected={Array.isArray(value) ? value : []}
          onChange={onChange}
          language={language}
        />
      )}

      {(question.type === "single_choice" ||
        question.type === "likert" ||
        question.type === "boolean") && (
        <View style={[styles.options, { gap: space("sm") }]}>
          {(question.options ?? []).map((opt) => {
            const selected = value === opt.value;
            const label = language === "en" ? opt.labelEn : opt.labelEs;
            return (
              <Chip
                key={String(opt.value)}
                label={label}
                selected={selected}
                onPress={() => onChange(opt.value as AnswerValue)}
                style={{ alignSelf: "stretch" }}
              />
            );
          })}
          {question.type === "boolean" && !question.options?.length ? (
            <View style={{ flexDirection: "row", gap: space("sm") }}>
              <Button
                label={language === "en" ? "Yes" : "Sí"}
                variant={value === true ? "primary" : "secondary"}
                onPress={() => onChange(true)}
              />
              <Button
                label={language === "en" ? "No" : "No"}
                variant={value === false ? "primary" : "secondary"}
                onPress={() => onChange(false)}
              />
            </View>
          ) : null}
        </View>
      )}

      {question.type === "multi_choice" && (
        <View style={[styles.options, { gap: space("sm"), flexDirection: "row", flexWrap: "wrap" }]}>
          {(question.options ?? []).map((opt) => {
            const arr = Array.isArray(value) ? value : [];
            const id = String(opt.value);
            const selected = arr.includes(id);
            const label = language === "en" ? opt.labelEn : opt.labelEs;
            return (
              <Chip
                key={id}
                label={label}
                selected={selected}
                onPress={() => {
                  if (selected) onChange(arr.filter((x) => x !== id));
                  else onChange([...arr, id]);
                }}
              />
            );
          })}
        </View>
      )}

      {question.type === "text" && (
        <TextInput
          value={typeof value === "string" ? value : ""}
          onChangeText={onChange}
          multiline
          placeholder={language === "en" ? "Write briefly…" : "Escribe brevemente…"}
          placeholderTextColor={colors.textMuted}
          style={{
            minHeight: 96,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            borderRadius: radius("md"),
            padding: space("md"),
            color: colors.text,
            textAlignVertical: "top",
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: "100%" },
  options: { width: "100%" },
});
