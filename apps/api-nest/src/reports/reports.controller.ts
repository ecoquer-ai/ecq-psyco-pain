import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  NotFoundException,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { GenerateReportSchema } from "@neuropi/shared";
import {
  DemoAuthGuard,
  type AuthenticatedUser,
} from "../common/demo-auth.guard";
import { MemoryStore } from "../common/memory.store";
import { generateReport } from "./report.service";

type RequestWithUser = { user: AuthenticatedUser };

@Controller("reports")
@UseGuards(DemoAuthGuard)
export class ReportsController {
  constructor(@Inject(MemoryStore) private readonly memory: MemoryStore) {}

  @Post("generate")
  async generate(
    @Body() body: unknown,
    @Req() request: RequestWithUser,
    @Query("binary") _binary?: string,
  ) {
    const parsed = GenerateReportSchema.safeParse(body ?? {});
    if (!parsed.success) {
      throw new BadRequestException({
        error: "validation_error",
        details: parsed.error.flatten(),
      });
    }

    const payload = parsed.data;
    const userId = payload.userId ?? request.user.id;

    let assessment = payload.assessmentId
      ? this.memory.assessments.get(payload.assessmentId)
      : undefined;

    if (payload.assessmentId && (!assessment || assessment.userId !== userId)) {
      throw new NotFoundException({
        error: "not_found",
        message: "Evaluación no encontrada para el reporte.",
      });
    }

    if (!assessment) {
      assessment = [...this.memory.assessments.values()]
        .filter((a) => a.userId === userId && a.status === "completed")
        .sort((a, b) => (b.completedAt ?? "").localeCompare(a.completedAt ?? ""))[0];
    }

    let painLogs = [...this.memory.painLogs.values()].filter((l) => l.userId === userId);
    if (payload.dateFrom) {
      painLogs = painLogs.filter((l) => l.loggedAt >= payload.dateFrom!);
    }
    if (payload.dateTo) {
      painLogs = painLogs.filter((l) => l.loggedAt <= payload.dateTo!);
    }

    const result = await generateReport({
      locale: payload.locale,
      format: payload.format,
      assessment,
      painLogs,
      includePainLogs: payload.includePainLogs,
      includeProfiles: payload.includeProfiles,
      includeRecommendations: payload.includeRecommendations,
      userId,
    });

    if (result.format === "json") {
      return {
        format: "json",
        generatedAt: result.generatedAt,
        filename: result.filename,
        data: result.data,
      };
    }

    return {
      format: "pdf",
      generatedAt: result.generatedAt,
      filename: result.filename,
      contentType: result.contentType,
      pdfBase64: result.pdfBase64,
      metadata: result.data,
      clinicalNoteEs:
        "Informe de orientación para conversar con tu equipo de salud. No constituye un diagnóstico.",
    };
  }
}
