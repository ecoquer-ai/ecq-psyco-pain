import { randomUUID } from "node:crypto";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { getMilestoneById, MILESTONES } from "@neuropi/shared";
import { memory, type LessonCompletionRecord } from "../lib/supabase";

const CompleteLessonSchema = z.object({
  completedAt: z.string().datetime().optional(),
  reflectionNote: z.string().max(2000).optional(),
});

function findLesson(lessonId: string) {
  for (const milestone of MILESTONES) {
    const lesson = milestone.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return { milestone, lesson };
    }
  }
  return null;
}

export async function therapyRoutes(app: FastifyInstance): Promise<void> {
  app.get(
    "/therapy/program",
    { preHandler: [app.authenticate] },
    async (request) => {
      const userId = request.user.id;
      const completions = [...memory.lessonCompletions.values()].filter(
        (c) => c.userId === userId,
      );
      const completedIds = new Set(completions.map((c) => c.lessonId));

      const milestones = MILESTONES.map((m) => {
        const lessons = m.lessons.map((l) => ({
          ...l,
          completed: completedIds.has(l.id),
        }));
        const completedCount = lessons.filter((l) => l.completed).length;
        return {
          id: m.id,
          order: m.order,
          titleEs: m.titleEs,
          titleEn: m.titleEn,
          descriptionEs: m.descriptionEs,
          descriptionEn: m.descriptionEn,
          lessons,
          progress: {
            completed: completedCount,
            total: lessons.length,
            percent:
              lessons.length === 0
                ? 0
                : Math.round((completedCount / lessons.length) * 100),
          },
        };
      });

      const overallCompleted = milestones.reduce(
        (s, m) => s + m.progress.completed,
        0,
      );
      const overallTotal = milestones.reduce((s, m) => s + m.progress.total, 0);

      return {
        milestones,
        progress: {
          completedLessons: overallCompleted,
          totalLessons: overallTotal,
          percent:
            overallTotal === 0
              ? 0
              : Math.round((overallCompleted / overallTotal) * 100),
        },
        clinicalNoteEs:
          "El programa por hitos educa y acompaña. No es psicoterapia clínica ni un diagnóstico.",
      };
    },
  );

  app.post(
    "/therapy/lesson/:id/complete",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { id: lessonId } = request.params as { id: string };
      const parsed = CompleteLessonSchema.safeParse(request.body ?? {});
      if (!parsed.success) {
        return reply.status(400).send({
          error: "validation_error",
          details: parsed.error.flatten(),
        });
      }

      const found = findLesson(lessonId);
      if (!found) {
        return reply.status(404).send({
          error: "not_found",
          message: "Lección no encontrada en el programa.",
        });
      }

      const existing = [...memory.lessonCompletions.values()].find(
        (c) => c.userId === request.user.id && c.lessonId === lessonId,
      );
      if (existing) {
        return {
          alreadyCompleted: true,
          completion: existing,
          lesson: found.lesson,
          milestoneId: found.milestone.id,
        };
      }

      const record: LessonCompletionRecord = {
        id: randomUUID(),
        userId: request.user.id,
        lessonId,
        completedAt: parsed.data.completedAt ?? new Date().toISOString(),
      };
      memory.lessonCompletions.set(record.id, record);

      const milestone = getMilestoneById(found.milestone.id);
      const lessonIds = new Set(milestone?.lessons.map((l) => l.id) ?? []);
      const completedInMilestone = [
        ...memory.lessonCompletions.values(),
      ].filter(
        (c) => c.userId === request.user.id && lessonIds.has(c.lessonId),
      ).length;

      return reply.status(201).send({
        alreadyCompleted: false,
        completion: record,
        lesson: found.lesson,
        milestoneId: found.milestone.id,
        milestoneProgress: {
          completed: completedInMilestone,
          total: milestone?.lessons.length ?? 0,
        },
        clinicalNoteEs:
          "Avance registrado. Celebra el paso; no implica cura ni diagnóstico.",
      });
    },
  );
}
