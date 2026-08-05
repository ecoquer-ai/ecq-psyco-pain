import type { FastifyInstance } from "fastify";
import { GenerateReportSchema } from "@neuropi/shared";
import { memory } from "../lib/supabase";
import { generateReport } from "../services/reportService";

export async function reportRoutes(app: FastifyInstance): Promise<void> {
  app.post(
    "/reports/generate",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const parsed = GenerateReportSchema.safeParse(request.body ?? {});
      if (!parsed.success) {
        return reply.status(400).send({
          error: "validation_error",
          details: parsed.error.flatten(),
        });
      }

      const body = parsed.data;
      const userId = body.userId ?? request.user.id;

      let assessment = body.assessmentId
        ? memory.assessments.get(body.assessmentId)
        : undefined;

      if (body.assessmentId && (!assessment || assessment.userId !== userId)) {
        return reply.status(404).send({
          error: "not_found",
          message: "Evaluación no encontrada para el reporte.",
        });
      }

      if (!assessment) {
        assessment = [...memory.assessments.values()]
          .filter((a) => a.userId === userId && a.status === "completed")
          .sort((a, b) =>
            (b.completedAt ?? "").localeCompare(a.completedAt ?? ""),
          )[0];
      }

      let painLogs = [...memory.painLogs.values()].filter(
        (l) => l.userId === userId,
      );
      if (body.dateFrom) {
        painLogs = painLogs.filter((l) => l.loggedAt >= body.dateFrom!);
      }
      if (body.dateTo) {
        painLogs = painLogs.filter((l) => l.loggedAt <= body.dateTo!);
      }

      const result = await generateReport({
        locale: body.locale,
        format: body.format,
        assessment,
        painLogs,
        includePainLogs: body.includePainLogs,
        includeProfiles: body.includeProfiles,
        includeRecommendations: body.includeRecommendations,
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

      // Default: return base64 + metadata (mobile-friendly).
      // Clients can request ?binary=1 for raw PDF buffer response.
      const query = request.query as { binary?: string };
      if (query.binary === "1" && result.pdfBuffer) {
        return reply
          .header("Content-Type", result.contentType)
          .header(
            "Content-Disposition",
            `attachment; filename="${result.filename}"`,
          )
          .send(result.pdfBuffer);
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
    },
  );
}
