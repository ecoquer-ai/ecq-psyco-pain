import { randomUUID } from "node:crypto";
import type { FastifyInstance } from "fastify";
import {
  AnswerAssessmentSchema,
  CompleteAssessmentSchema,
  INSTRUMENTS,
  StartAssessmentSchema,
  type AssessmentAnswers,
} from "@neuropi/shared";
import { memory, type AssessmentRecord } from "../lib/supabase";
import { buildContentRecommendations } from "../services/recommendationService";
import {
  scoreAssessmentAnswers,
  summarizeScoresForClient,
} from "../services/scoringService";

function zodErrorPayload(error: { flatten: () => unknown }) {
  return {
    error: "validation_error",
    details: error.flatten(),
  };
}

export async function assessmentRoutes(app: FastifyInstance): Promise<void> {
  app.post(
    "/assessments/start",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const parsed = StartAssessmentSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send(zodErrorPayload(parsed.error));
      }

      const body = parsed.data;
      const id = randomUUID();
      const record: AssessmentRecord = {
        id,
        userId: body.userId ?? request.user.id,
        locale: body.locale,
        includeTraumaModule: body.includeTraumaModule,
        status: "in_progress",
        answers: {},
        startedAt: new Date().toISOString(),
      };
      if (body.themeId) {
        record.themeId = body.themeId;
      }
      memory.assessments.set(id, record);

      const instruments = Object.values(INSTRUMENTS).filter(
        (inst) => inst.id !== "crisis_pap",
      );

      return reply.status(201).send({
        assessmentId: id,
        status: record.status,
        startedAt: record.startedAt,
        locale: record.locale,
        instruments: instruments.map((i) => ({
          id: i.id,
          nameEs: i.nameEs,
          estimatedMinutes: i.estimatedMinutes,
          disclaimerEs: i.disclaimer.es,
          isDiagnostic: i.isDiagnostic,
          isPsychometricScreen: i.isPsychometricScreen,
        })),
        clinicalNoteEs:
          "Este tamizaje orienta; no entrega un diagnóstico clínico. Mecanismos IASP y perfiles son orientadores.",
      });
    },
  );

  app.post(
    "/assessments/:id/answer",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const parsed = AnswerAssessmentSchema.safeParse({
        ...(request.body as object),
        assessmentId: (request.body as { assessmentId?: string })?.assessmentId ?? id,
      });
      if (!parsed.success) {
        return reply.status(400).send(zodErrorPayload(parsed.error));
      }

      if (parsed.data.assessmentId !== id) {
        return reply.status(400).send({
          error: "assessment_id_mismatch",
          message: "El assessmentId del cuerpo no coincide con la ruta.",
        });
      }

      const assessment = memory.assessments.get(id);
      if (!assessment || assessment.userId !== request.user.id) {
        return reply.status(404).send({
          error: "not_found",
          message: "Evaluación no encontrada.",
        });
      }
      if (assessment.status === "completed") {
        return reply.status(409).send({
          error: "already_completed",
          message: "Esta evaluación ya fue completada.",
        });
      }

      assessment.answers[parsed.data.questionId] = parsed.data.value;
      memory.assessments.set(id, assessment);

      return {
        assessmentId: id,
        questionId: parsed.data.questionId,
        instrumentId: parsed.data.instrumentId,
        accepted: true,
        answeredAt: parsed.data.answeredAt ?? new Date().toISOString(),
        answerCount: Object.keys(assessment.answers).length,
      };
    },
  );

  app.post(
    "/assessments/:id/complete",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const parsed = CompleteAssessmentSchema.safeParse({
        ...(request.body as object),
        assessmentId:
          (request.body as { assessmentId?: string })?.assessmentId ?? id,
      });
      if (!parsed.success) {
        return reply.status(400).send(zodErrorPayload(parsed.error));
      }

      if (parsed.data.assessmentId !== id) {
        return reply.status(400).send({
          error: "assessment_id_mismatch",
          message: "El assessmentId del cuerpo no coincide con la ruta.",
        });
      }

      const assessment = memory.assessments.get(id);
      if (!assessment || assessment.userId !== request.user.id) {
        return reply.status(404).send({
          error: "not_found",
          message: "Evaluación no encontrada.",
        });
      }

      const mergedAnswers = {
        ...assessment.answers,
        ...parsed.data.answers,
      } as AssessmentAnswers;

      const scored = scoreAssessmentAnswers(mergedAnswers);
      const contentRecs = buildContentRecommendations(
        scored.riskProfile,
        scored.profiles,
      );

      assessment.answers = mergedAnswers;
      assessment.status = "completed";
      assessment.completedAt =
        parsed.data.completedAt ?? new Date().toISOString();
      assessment.redFlagsAcknowledged = parsed.data.redFlagsAcknowledged;
      assessment.riskProfile = scored.riskProfile;
      assessment.profiles = scored.profiles;
      assessment.scores = scored.riskProfile.scores;
      assessment.recommendations = scored.riskProfile.recommendations;
      memory.assessments.set(id, assessment);

      return {
        assessmentId: id,
        status: assessment.status,
        completedAt: assessment.completedAt,
        result: summarizeScoresForClient(scored),
        contentRecommendations: contentRecs,
      };
    },
  );

  app.get(
    "/assessments/:id/result",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const assessment = memory.assessments.get(id);

      if (!assessment || assessment.userId !== request.user.id) {
        return reply.status(404).send({
          error: "not_found",
          message: "Evaluación no encontrada.",
        });
      }

      if (assessment.status !== "completed" || !assessment.riskProfile) {
        return reply.status(409).send({
          error: "not_completed",
          message: "La evaluación aún no tiene resultado. Complétala primero.",
          status: assessment.status,
        });
      }

      const scored = {
        riskProfile: assessment.riskProfile,
        profiles: assessment.profiles ?? [],
      };

      return {
        assessmentId: id,
        status: assessment.status,
        completedAt: assessment.completedAt,
        result: summarizeScoresForClient(scored),
        contentRecommendations: buildContentRecommendations(
          scored.riskProfile,
          scored.profiles,
        ),
      };
    },
  );
}
