import {
  getLibraryItemById,
  LIBRARY_CATALOG,
  MILESTONES,
  type CareRecommendation,
  type ProbableProfile,
  type RiskProtectionProfile,
} from "@neuropi/shared";

export interface ContentRecommendation {
  kind: "milestone" | "library" | "care";
  id: string;
  titleEs: string;
  reasonEs: string;
  priority: CareRecommendation["priority"] | "routine";
}

/**
 * Maps risk/protection profiles to educational milestones and library items.
 * Language stays prudent: guide and refer, never diagnose.
 */
export function buildContentRecommendations(
  riskProfile: RiskProtectionProfile,
  profiles: ProbableProfile[],
): ContentRecommendation[] {
  const out: ContentRecommendation[] = [];
  const seen = new Set<string>();

  const push = (item: ContentRecommendation) => {
    const key = `${item.kind}:${item.id}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push(item);
  };

  for (const rec of riskProfile.recommendations) {
    push({
      kind: "care",
      id: rec.id,
      titleEs: rec.titleEs,
      reasonEs: rec.bodyEs,
      priority: rec.priority,
    });
  }

  if (riskProfile.probableProfileIds.includes("low_pain_understanding")) {
    const m1 = MILESTONES.find((m) => m.id === "m1_understand_pain");
    if (m1) {
      push({
        kind: "milestone",
        id: m1.id,
        titleEs: m1.titleEs,
        reasonEs:
          "Hay espacio para comprender mejor el dolor persistente. Este hito ofrece psicoeducación clara sin etiquetas diagnósticas.",
        priority: "routine",
      });
    }
    const audio = getLibraryItemById("audio_01");
    if (audio) {
      push({
        kind: "library",
        id: audio.id,
        titleEs: audio.titleEs,
        reasonEs: audio.summaryEs,
        priority: "routine",
      });
    }
  }

  if (riskProfile.probableProfileIds.includes("anxiety_predominant")) {
    const m2 = MILESTONES.find((m) => m.id === "m2_calm_nervous_system");
    if (m2) {
      push({
        kind: "milestone",
        id: m2.id,
        titleEs: m2.titleEs,
        reasonEs:
          "Aparecen señales de preocupación que vale la pena acompañar con regulación. Esto no confirma un trastorno de ansiedad.",
        priority: "soon",
      });
    }
  }

  if (riskProfile.probableProfileIds.includes("persistent_pain_compatible")) {
    push({
      kind: "milestone",
      id: "m1_understand_pain",
      titleEs: "Entender tu dolor",
      reasonEs:
        "Tu patrón es compatible con dolor que persiste. Te sugerimos la ruta por hitos y, cuando puedas, conversarlo con tu equipo de salud.",
      priority: "routine",
    });
  }

  if (profiles.some((p) => p.id === "high_functional_interference")) {
    const pacing = LIBRARY_CATALOG.find((i) => i.id === "audio_12");
    if (pacing) {
      push({
        kind: "library",
        id: pacing.id,
        titleEs: pacing.titleEs,
        reasonEs:
          "La interferencia en la vida diaria sugiere practicar pacing. No es un veredicto permanente.",
        priority: "routine",
      });
    }
  }

  if (out.length === 0) {
    push({
      kind: "milestone",
      id: "m1_understand_pain",
      titleEs: "Entender tu dolor",
      reasonEs:
        "Puedes continuar con educación, registro de dolor y el programa guiado. Si algo cambia, vuelve a evaluar.",
      priority: "routine",
    });
  }

  return out;
}
