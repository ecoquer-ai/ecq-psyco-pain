import { Controller, Get, Inject, Req, UseGuards } from "@nestjs/common";
import { BRAND, LIBRARY_COUNTS, MILESTONES } from "@neuropi/shared";
import {
  DemoAuthGuard,
  type AuthenticatedUser,
} from "../common/demo-auth.guard";
import { MemoryStore } from "../common/memory.store";

type RequestWithUser = { user: AuthenticatedUser };

@Controller("me")
@UseGuards(DemoAuthGuard)
export class MeController {
  constructor(@Inject(MemoryStore) private readonly memory: MemoryStore) {}

  @Get("dashboard")
  dashboard(@Req() request: RequestWithUser) {
    const userId = request.user.id;

    const painLogs = [...this.memory.painLogs.values()].filter(
      (l) => l.userId === userId,
    );
    const assessments = [...this.memory.assessments.values()].filter(
      (a) => a.userId === userId,
    );
    const completions = [...this.memory.lessonCompletions.values()].filter(
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
        lastAssessmentSummaryEs:
          lastAssessment?.riskProfile?.summaryEs ?? null,
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
  }
}
