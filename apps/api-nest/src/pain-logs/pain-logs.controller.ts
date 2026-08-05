import { randomUUID } from "node:crypto";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PainLogSchema } from "@neuropi/shared";
import {
  DemoAuthGuard,
  type AuthenticatedUser,
} from "../common/demo-auth.guard";
import { MemoryStore } from "../common/memory.store";

type RequestWithUser = { user: AuthenticatedUser };

@Controller("pain-logs")
@UseGuards(DemoAuthGuard)
export class PainLogsController {
  constructor(@Inject(MemoryStore) private readonly memory: MemoryStore) {}

  @Post()
  @HttpCode(201)
  create(@Body() body: unknown, @Req() request: RequestWithUser) {
    const parsed = PainLogSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({
        error: "validation_error",
        details: parsed.error.flatten(),
      });
    }

    const data = parsed.data;
    const id = randomUUID();
    const record = {
      id,
      userId: data.userId ?? request.user.id,
      loggedAt: data.loggedAt,
      intensityNrs: data.intensityNrs,
      intensityVas: data.intensityVas,
      bodyRegions: data.bodyRegions,
      activity: data.activity,
      mood: data.mood,
      sleepHours: data.sleepHours,
      medicationTaken: data.medicationTaken,
      notes: data.notes,
      flareUp: data.flareUp,
      createdAt: new Date().toISOString(),
    };
    this.memory.painLogs.set(id, record);

    return {
      id: record.id,
      loggedAt: record.loggedAt,
      intensityNrs: record.intensityNrs,
      bodyRegions: record.bodyRegions,
      clinicalNoteEs:
        "Registro guardado. Sirve para observar patrones; no diagnostica la causa del dolor.",
    };
  }

  @Get("summary")
  summary(@Req() request: RequestWithUser) {
    const userId = request.user.id;
    const logs = [...this.memory.painLogs.values()]
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
      countTotal: logs.length,
      countLast14Days: last14.length,
      avgIntensityLast14: avg,
      flareUpsLast14: flareUps,
      topRegions,
      recent: logs.slice(0, 10).map((l) => ({
        id: l.id,
        loggedAt: l.loggedAt,
        intensityNrs: l.intensityNrs,
        bodyRegions: l.bodyRegions,
        flareUp: l.flareUp ?? false,
      })),
      clinicalNoteEs:
        "Resumen orientador de registros. No establece diagnóstico ni causa del dolor.",
    };
  }
}
