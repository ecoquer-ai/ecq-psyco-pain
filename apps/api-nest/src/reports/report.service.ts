import PDFDocument from "pdfkit";
import { BRAND, CLINICAL_DISCLAIMER, SAFETY_COPY } from "@neuropi/shared";
import type { AssessmentRecord, PainLogRecord } from "../common/memory.store";

export interface ReportInput {
  locale: "es-CL" | "en";
  format: "pdf" | "json";
  assessment?: AssessmentRecord;
  painLogs: PainLogRecord[];
  includePainLogs: boolean;
  includeProfiles: boolean;
  includeRecommendations: boolean;
  userId: string;
}

export interface ReportResult {
  format: "pdf" | "json";
  generatedAt: string;
  filename: string;
  contentType: string;
  pdfBase64?: string;
  pdfBuffer?: Buffer;
  data: Record<string, unknown>;
}

function collectJsonPayload(input: ReportInput): Record<string, unknown> {
  const risk = input.assessment?.riskProfile;
  const profiles = input.assessment?.profiles ?? [];

  return {
    brand: BRAND.publicName,
    tagline: BRAND.tagline,
    generatedAt: new Date().toISOString(),
    locale: input.locale,
    userId: input.userId,
    disclaimer: CLINICAL_DISCLAIMER.es,
    assessmentId: input.assessment?.id,
    summaryEs: risk?.summaryEs,
    scores: input.assessment?.scores ?? risk?.scores,
    profiles: input.includeProfiles ? profiles : undefined,
    recommendations: input.includeRecommendations ? risk?.recommendations : undefined,
    redFlagTriggered: risk?.redFlagTriggered,
    crisisSignal: risk?.crisisSignal,
    painLogs: input.includePainLogs
      ? input.painLogs.map((l) => ({
          loggedAt: l.loggedAt,
          intensityNrs: l.intensityNrs,
          bodyRegions: l.bodyRegions,
          mood: l.mood,
          sleepHours: l.sleepHours,
          flareUp: l.flareUp,
        }))
      : undefined,
    safetyNoteEs: SAFETY_COPY.chileEmergencyHintEs,
  };
}

function writePdf(input: ReportInput, payload: Record<string, unknown>): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      info: {
        Title: "Informe Neuropi — orientación (no diagnóstico)",
        Author: BRAND.publicName,
        Subject: "Tamizaje y orientación sobre dolor persistente",
      },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const risk = input.assessment?.riskProfile;

    doc.fontSize(20).fillColor("#1a3a2a").text(BRAND.publicName);
    doc.fontSize(11).fillColor("#444444").text(BRAND.tagline).moveDown(0.5);
    doc.fontSize(14).fillColor("#000000").text("Informe de orientación clínica", {
      underline: true,
    });
    doc.moveDown(0.3);
    doc.fontSize(9).fillColor("#666666").text(`Generado: ${String(payload.generatedAt ?? "")}`);
    doc.text(`Usuario: ${input.userId}`).moveDown(0.8);

    doc.fontSize(10).fillColor("#8B2500").text("Aviso importante", { underline: true });
    doc.moveDown(0.2);
    doc.fontSize(9).fillColor("#333333").text(CLINICAL_DISCLAIMER.es, { align: "justify" });
    doc.moveDown(0.8);

    if (risk?.summaryEs) {
      doc.fontSize(11).fillColor("#000000").text("Resumen de orientación").moveDown(0.2);
      doc.fontSize(9).text(risk.summaryEs, { align: "justify" }).moveDown(0.5);
    }

    if (risk?.crisisSignal) {
      doc.fillColor("#8B0000").text(SAFETY_COPY.crisisMentalEs, { align: "justify" }).moveDown(0.5);
    }
    if (risk?.redFlagTriggered) {
      doc.fillColor("#8B2500").text(SAFETY_COPY.ifYesBodyEs, { align: "justify" }).moveDown(0.5);
    }

    const recs = input.includeRecommendations ? risk?.recommendations ?? [] : [];
    if (recs.length > 0) {
      doc.fillColor("#000000").fontSize(11).text("Recomendaciones de cuidado").moveDown(0.2);
      for (const rec of recs) {
        const priority = (rec as { priority?: string }).priority;
        doc
          .fontSize(9)
          .text(priority ? `• [${priority}] ${rec.titleEs}` : `• ${rec.titleEs}`)
          .text(`  ${rec.bodyEs}`, { align: "justify" })
          .moveDown(0.2);
      }
    }

    if (input.includePainLogs && input.painLogs.length > 0) {
      doc.fontSize(11).text("Registro de dolor (resumen)").moveDown(0.2);
      const recent = [...input.painLogs]
        .sort((a, b) => b.loggedAt.localeCompare(a.loggedAt))
        .slice(0, 14);
      for (const log of recent) {
        doc
          .fontSize(8)
          .text(
            `• ${log.loggedAt.slice(0, 16)} — NRS ${log.intensityNrs}/10` +
              (log.bodyRegions.length ? ` — ${log.bodyRegions.join(", ")}` : "") +
              (log.flareUp ? " — flare-up" : ""),
          );
      }
      doc.moveDown(0.5);
    }

    doc.fontSize(8).fillColor("#666666").text(SAFETY_COPY.chileEmergencyHintEs, {
      align: "justify",
    });
    doc.moveDown(0.5);
    doc
      .fontSize(8)
      .text(
        "Este documento es un apoyo de conversación con tu equipo de salud. Neuropi no diagnostica ni reemplaza la evaluación profesional.",
        { align: "justify" },
      );

    doc.end();
  });
}

export async function generateReport(input: ReportInput): Promise<ReportResult> {
  const generatedAt = new Date().toISOString();
  const data = collectJsonPayload(input);
  data.generatedAt = generatedAt;

  if (input.format === "json") {
    return {
      format: "json",
      generatedAt,
      filename: `Neuropi-informe-${generatedAt.slice(0, 10)}.json`,
      contentType: "application/json",
      data,
    };
  }

  const pdfBuffer = await writePdf(input, data);
  return {
    format: "pdf",
    generatedAt,
    filename: `Neuropi-informe-${generatedAt.slice(0, 10)}.pdf`,
    contentType: "application/pdf",
    pdfBuffer,
    pdfBase64: pdfBuffer.toString("base64"),
    data: {
      ...data,
      pageHintEs: "PDF profesional de orientación. Incluye descargo: no es diagnóstico.",
    },
  };
}
