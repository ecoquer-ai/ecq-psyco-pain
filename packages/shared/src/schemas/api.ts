import { z } from "zod";

/**
 * Zod schemas for API payloads shared between mobile and api.
 */

export const StartAssessmentSchema = z.object({
  userId: z.string().uuid().optional(),
  locale: z.enum(["es-CL", "en"]).default("es-CL"),
  themeId: z
    .enum(["amanecer", "bosque", "oceano", "noche", "altoContraste"])
    .optional(),
  includeTraumaModule: z.boolean().default(false),
  consentScreening: z.literal(true),
  acknowledgedDisclaimer: z.literal(true),
});

export type StartAssessment = z.infer<typeof StartAssessmentSchema>;

export const AnswerAssessmentSchema = z.object({
  assessmentId: z.string().uuid(),
  instrumentId: z.string().min(1),
  questionId: z.string().min(1),
  value: z.union([
    z.number(),
    z.string(),
    z.boolean(),
    z.array(z.string()),
    z.null(),
  ]),
  answeredAt: z.string().datetime().optional(),
});

export type AnswerAssessment = z.infer<typeof AnswerAssessmentSchema>;

export const CompleteAssessmentSchema = z.object({
  assessmentId: z.string().uuid(),
  answers: z.record(z.string(), z.unknown()),
  completedAt: z.string().datetime().optional(),
  redFlagsAcknowledged: z.boolean().default(false),
});

export type CompleteAssessment = z.infer<typeof CompleteAssessmentSchema>;

export const PainLogSchema = z.object({
  userId: z.string().uuid().optional(),
  loggedAt: z.string().datetime(),
  intensityNrs: z.number().int().min(0).max(10),
  intensityVas: z.number().min(0).max(100).optional(),
  bodyRegions: z.array(z.string()).default([]),
  activity: z.string().max(200).optional(),
  mood: z.number().int().min(0).max(10).optional(),
  sleepHours: z.number().min(0).max(24).optional(),
  medicationTaken: z.boolean().optional(),
  notes: z.string().max(1000).optional(),
  flareUp: z.boolean().optional(),
});

export type PainLog = z.infer<typeof PainLogSchema>;

export const GenerateReportSchema = z.object({
  userId: z.string().uuid().optional(),
  assessmentId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  includePainLogs: z.boolean().default(true),
  includeProfiles: z.boolean().default(true),
  includeRecommendations: z.boolean().default(true),
  locale: z.enum(["es-CL", "en"]).default("es-CL"),
  format: z.enum(["pdf", "json"]).default("pdf"),
});

export type GenerateReport = z.infer<typeof GenerateReportSchema>;

export const RegisterPushTokenSchema = z.object({
  userId: z.string().uuid().optional(),
  token: z.string().min(8).max(512),
  platform: z.enum(["ios", "android", "web"]),
  locale: z.enum(["es-CL", "en"]).optional(),
  timezone: z.string().max(64).optional(),
});

export type RegisterPushToken = z.infer<typeof RegisterPushTokenSchema>;
