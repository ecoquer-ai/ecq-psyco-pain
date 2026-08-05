import PDFDocument from "pdfkit";
import {
  BRAND,
  CLINICAL_DISCLAIMER,
  SAFETY_COPY,
  type ProbableProfile,
  type RiskProtectionProfile,
} from "@neuropi/shared";
import type { AssessmentRecord, PainLogRecord } from "../lib/supabase";

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
  /** Base64 PDF when format=pdf; omitted for json. */
  pdfBase64?: string;
  /** Raw bytes when format=pdf (for binary response). */
  pdfBuffer?: Buffer;
  /** Structured payload when format=json, or metadata companion for pdf. */
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
    scores: input.assessment?.scores,
    profiles: input.includeProfiles
      ? profiles.map((p) => ({
          id: p.id,
          titleEs: p.titleEs,
          explanationEs: p.explanationEs,
          whatItDoesNotMeanEs: p.whatItDoesNotMeanEs,
          recommendedActions: p.recommendedActions,
        }))
      : undefined,
    recommendations: input.includeRecommendations
      ? risk?.recommendations
      : undefined,
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

function writePdf(
  input: ReportInput,
  payload: Record<string, unknown>,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      info: {
        Title: `Informe Neuropi — orientación (no diagnóstico)`,
        Author: BRAND.publicName,
        Subject: "Tamizaje y orientación sobre dolor persistente",
      },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const risk = input.assessment?.riskProfile as
      | RiskProtectionProfile
      | undefined;
    const profiles = (input.assessment?.profiles ?? []) as ProbableProfile[];

    doc
      .fontSize(20)
      .fillColor("#1a3a2a")
      .text(BRAND.publicName, { continued: false });
    doc
      .fontSize(11)
      .fillColor("#444444")
      .text(BRAND.tagline)
      .moveDown(0.5);

    doc
      .fontSize(14)
      .fillColor("#000000")
      .text("Informe de orientación clínica", { underline: true })
      .moveDown(0.3);
    doc
      .fontSize(9)
      .fillColor("#666666")
      .text(`Generado: ${payload.generatedAt as string}`)
      .text(`Usuario: ${input.userId}`)
      .moveDown(0.8);

    doc
      .fontSize(10)
      .fillColor("#8B2500")
      .text("Aviso importante", { underline: true })
      .moveDown(0.2);
    doc
      .fontSize(9)
      .fillColor("#333333")
      .text(CLINICAL_DISCLAIMER.es, { align: "justify" })
      .moveDown(0.8);

    if (risk) {
      doc
        .fontSize(11)
        .fillColor("#000000")
        .text("Resumen de orientación")
        .moveDown(0.2);
      doc.fontSize(9).text(risk.summaryEs, { align: "justify" }).moveDown(0.5);

      if (risk.crisisSignal) {
        doc
          .fillColor("#8B0000")
          .text(SAFETY_COPY.crisisMentalEs, { align: "justify" })
          .moveDown(0.5);
      }

      if (risk.redFlagTriggered) {
        doc
          .fillColor("#8B2500")
          .text(SAFETY_COPY.ifYesBodyEs, { align: "justify" })
          .moveDown(0.5);
      }

      doc.fillColor("#000000");
      const scoreEntries = Object.entries(risk.scores).filter(
        ([, v]) => v !== undefined,
      );
      if (scoreEntries.length > 0) {
        doc.fontSize(11).text("Módulos de tamizaje").moveDown(0.2);
        for (const [, scored] of scoreEntries) {
          if (!scored) continue;
          doc
            .fontSize(9)
            .text(
              `• ${scored.instrumentId}: ${scored.rawScore}/${scored.maxScore} — ${scored.band.labelEs}`,
            );
          doc
            .fillColor("#555555")
            .text(`  ${scored.band.guidanceEs}`, { align: "justify" })
            .fillColor("#000000")
            .moveDown(0.2);
        }
        doc.moveDown(0.3);
      }
    }

    if (input.includeProfiles && profiles.length > 0) {
      doc.fontSize(11).text("Perfiles probables (orientación)").moveDown(0.2);
      for (const p of profiles) {
        doc.fontSize(9).fillColor("#000000").text(`• ${p.titleEs}`);
        doc.text(`  ${p.explanationEs}`, { align: "justify" });
        doc
          .fillColor("#555555")
          .text(`  Qué no significa: ${p.whatItDoesNotMeanEs}`, {
            align: "justify",
          })
          .fillColor("#000000")
          .moveDown(0.3);
      }
    }

    if (input.includeRecommendations && risk?.recommendations?.length) {
      doc.fontSize(11).text("Recomendaciones de cuidado").moveDown(0.2);
      for (const rec of risk.recommendations) {
        doc
          .fontSize(9)
          .text(`• [${rec.priority}] ${rec.titleEs}`)
          .text(`  ${rec.bodyEs}`, { align: "justify" })
          .moveDown(0.2);
      }
      doc.moveDown(0.3);
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
              (log.bodyRegions.length
                ? ` — ${log.bodyRegions.join(", ")}`
                : "") +
              (log.flareUp ? " — flare-up" : ""),
          );
      }
      doc.moveDown(0.5);
    }

    doc
      .fontSize(8)
      .fillColor("#666666")
      .text(SAFETY_COPY.chileEmergencyHintEs, { align: "justify" })
      .moveDown(0.5);
    doc
      .fontSize(8)
      .text(
        "Este documento es un apoyo de conversación con tu equipo de salud. Neuropi no diagnostica ni reemplaza la evaluación profesional.",
        { align: "justify" },
      );

    doc.end();
  });
}

export async function generateReport(
  input: ReportInput,
): Promise<ReportResult> {
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
      pageHintEs:
        "PDF profesional de orientación. Incluye descargo: no es diagnóstico.",
    },
  };
}
