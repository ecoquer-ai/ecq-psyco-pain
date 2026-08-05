import { randomUUID } from "node:crypto";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { z } from "zod";
import { getMilestoneById, MILESTONES } from "@neuropi/shared";
import {
  DemoAuthGuard,
  type AuthenticatedUser,
} from "../common/demo-auth.guard";
import { MemoryStore } from "../common/memory.store";

type RequestWithUser = { user: AuthenticatedUser };

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

@Controller("therapy")
@UseGuards(DemoAuthGuard)
export class TherapyController {
  constructor(@Inject(MemoryStore) private readonly memory: MemoryStore) {}

  @Get("program")
  program(@Req() request: RequestWithUser) {
    const userId = request.user.id;
    const completions = [...this.memory.lessonCompletions.values()].filter(
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
  }

  @Post("lesson/:id/complete")
  @HttpCode(201)
  completeLesson(
    @Param("id") lessonId: string,
    @Body() body: unknown,
    @Req() request: RequestWithUser,
  ) {
    const parsed = CompleteLessonSchema.safeParse(body ?? {});
    if (!parsed.success) {
      throw new BadRequestException({
        error: "validation_error",
        details: parsed.error.flatten(),
      });
    }

    const found = findLesson(lessonId);
    if (!found) {
      throw new NotFoundException({
        error: "not_found",
        message: "Lección no encontrada en el programa.",
      });
    }

    const existing = [...this.memory.lessonCompletions.values()].find(
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

    const record = {
      id: randomUUID(),
      userId: request.user.id,
      lessonId,
      completedAt: parsed.data.completedAt ?? new Date().toISOString(),
    };
    this.memory.lessonCompletions.set(record.id, record);

    const milestone = getMilestoneById(found.milestone.id);
    const lessonIds = new Set(milestone?.lessons.map((l) => l.id) ?? []);
    const completedInMilestone = [
      ...this.memory.lessonCompletions.values(),
    ].filter(
      (c) => c.userId === request.user.id && lessonIds.has(c.lessonId),
    ).length;

    return {
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
    };
  }
}
