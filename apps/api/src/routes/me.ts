import type { FastifyInstance } from "fastify";
import {
  BRAND,
  LIBRARY_COUNTS,
  MILESTONES,
} from "@neuropi/shared";
import { memory } from "../lib/supabase";

export async function meRoutes(app: FastifyInstance): Promise<void> {
  app.get(
    "/me/dashboard",
    { preHandler: [app.authenticate] },
    async (request) => {
      const userId = request.user.id;

      const painLogs = [...memory.painLogs.values()].filter(
        (l) => l.userId === userId,
      );
      const assessments = [...memory.assessments.values()].filter(
        (a) => a.userId === userId,
      );
      const completions = [...memory.lessonCompletions.values()].filter(
        (c) => c.userId === userId,
      );

      const recentLogs = [...painLogs]
        .sort((a, b) => b.loggedAt.localeCompare(a.loggedAt))
        .slice(0, 7);

      const avgIntensity =
        recentLogs.length === 0
          ? null
          : Math.round(
              (recentLogs.reduce((s, l) => s + l.intensityNrs, 0) /
                recentLogs.length) *
                10,
            ) / 10;

      const lastAssessment = [...assessments]
        .filter((a) => a.status === "completed")
        .sort((a, b) =>
          (b.completedAt ?? "").localeCompare(a.completedAt ?? ""),
        )[0];

      const nextMilestone =
        MILESTONES.find((m) => {
          const lessonIds = new Set(m.lessons.map((l) => l.id));
          const done = completions.filter((c) => lessonIds.has(c.lessonId));
          return done.length < m.lessons.length;
        }) ?? MILESTONES[0];

      return {
        brand: BRAND.publicName,
        tagline: BRAND.tagline,
        user: {
          id: userId,
          email: request.user.email,
          isDemo: request.user.isDemo,
        },
        summary: {
          painLogCount: painLogs.length,
          assessmentCount: assessments.length,
          completedLessons: completions.length,
          avgIntensityLast7: avgIntensity,
          lastAssessmentId: lastAssessment?.id ?? null,
          lastAssessmentSummaryEs: lastAssessment?.riskProfile?.summaryEs ?? null,
          crisisSignal: lastAssessment?.riskProfile?.crisisSignal ?? false,
        },
        nextMilestone: nextMilestone
          ? {
              id: nextMilestone.id,
              order: nextMilestone.order,
              titleEs: nextMilestone.titleEs,
              descriptionEs: nextMilestone.descriptionEs,
            }
          : null,
        library: LIBRARY_COUNTS,
        clinicalNoteEs:
          "Este panel resume tu actividad en Neuropi. No es un diagnóstico; es una orientación para seguir cuidándote y, si corresponde, consultar a un profesional.",
        mockFriendly: true,
      };
    },
  );
}
