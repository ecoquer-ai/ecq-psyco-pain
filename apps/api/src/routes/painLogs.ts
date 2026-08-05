import { randomUUID } from "node:crypto";
import type { FastifyInstance } from "fastify";
import { PainLogSchema } from "@neuropi/shared";
import { memory, type PainLogRecord } from "../lib/supabase";

function zodErrorPayload(error: { flatten: () => unknown }) {
  return {
    error: "validation_error",
    details: error.flatten(),
  };
}

export async function painLogRoutes(app: FastifyInstance): Promise<void> {
  app.post(
    "/pain-logs",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const parsed = PainLogSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send(zodErrorPayload(parsed.error));
      }

      const body = parsed.data;
      const id = randomUUID();
      const record: PainLogRecord = {
        id,
        userId: body.userId ?? request.user.id,
        loggedAt: body.loggedAt,
        intensityNrs: body.intensityNrs,
        intensityVas: body.intensityVas,
        bodyRegions: body.bodyRegions,
        activity: body.activity,
        mood: body.mood,
        sleepHours: body.sleepHours,
        medicationTaken: body.medicationTaken,
        notes: body.notes,
        flareUp: body.flareUp,
        createdAt: new Date().toISOString(),
      };
      memory.painLogs.set(id, record);

      return reply.status(201).send({
        id: record.id,
        loggedAt: record.loggedAt,
        intensityNrs: record.intensityNrs,
        bodyRegions: record.bodyRegions,
        clinicalNoteEs:
          "Registro guardado. Sirve para observar patrones; no diagnostica la causa del dolor.",
      });
    },
  );

  app.get(
    "/pain-logs/summary",
    { preHandler: [app.authenticate] },
    async (request) => {
      const userId = request.user.id;
      const logs = [...memory.painLogs.values()]
        .filter((l) => l.userId === userId)
        .sort((a, b) => b.loggedAt.localeCompare(a.loggedAt));

      const last14 = logs.filter((l) => {
        const t = Date.parse(l.loggedAt);
        return Number.isFinite(t) && Date.now() - t < 14 * 24 * 60 * 60 * 1000;
      });

      const avg =
        last14.length === 0
          ? null
          : Math.round(
              (last14.reduce((s, l) => s + l.intensityNrs, 0) / last14.length) *
                10,
            ) / 10;

      const flareUps = last14.filter((l) => l.flareUp).length;
      const regionCounts = new Map<string, number>();
      for (const log of last14) {
        for (const region of log.bodyRegions) {
          regionCounts.set(region, (regionCounts.get(region) ?? 0) + 1);
        }
      }
      const topRegions = [...regionCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([region, count]) => ({ region, count }));

      return {
        totalLogs: logs.length,
        windowDays: 14,
        logsInWindow: last14.length,
        avgIntensityNrs: avg,
        flareUpCount: flareUps,
        topRegions,
        recent: logs.slice(0, 10).map((l) => ({
          id: l.id,
          loggedAt: l.loggedAt,
          intensityNrs: l.intensityNrs,
          bodyRegions: l.bodyRegions,
          mood: l.mood,
          flareUp: l.flareUp,
        })),
        clinicalNoteEs:
          "Este resumen ayuda a conversar con tu equipo de salud. No interpreta por sí solo un diagnóstico.",
      };
    },
  );
}
