import { randomUUID } from "node:crypto";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  BadRequestException,
  NotFoundException,
  ConflictException,
  Inject,
} from "@nestjs/common";
import {
  AnswerAssessmentSchema,
  CompleteAssessmentSchema,
  INSTRUMENTS,
  StartAssessmentSchema,
  buildRiskProtectionProfile,
  type AssessmentAnswers,
} from "@neuropi/shared";
import { DemoAuthGuard, type AuthenticatedUser } from "../common/demo-auth.guard";
import { MemoryStore } from "../common/memory.store";

type RequestWithUser = { user: AuthenticatedUser };

@Controller("assessments")
@UseGuards(DemoAuthGuard)
export class AssessmentsController {
  constructor(@Inject(MemoryStore) private readonly memory: MemoryStore) {}

  @Post("start")
  start(@Body() body: unknown, @Req() request: RequestWithUser) {
    const parsed = StartAssessmentSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ error: "validation_error", details: parsed.error.flatten() });
    }

    const id = randomUUID();
    const record = {
      id,
      userId: parsed.data.userId ?? request.user.id,
      locale: parsed.data.locale,
      includeTraumaModule: parsed.data.includeTraumaModule,
      status: "in_progress" as const,
      answers: {} as Record<string, unknown>,
      startedAt: new Date().toISOString()
    };
    this.memory.assessments.set(id, record);

    const instruments = Object.values(INSTRUMENTS).filter((inst) => inst.id !== "crisis_pap");
    return {
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
        isPsychometricScreen: i.isPsychometricScreen
      })),
      clinicalNoteEs:
        "Este tamizaje orienta; no entrega un diagnóstico clínico. Mecanismos IASP y perfiles son orientadores."
    };
  }

  @Post(":id/answer")
  answer(@Param("id") id: string, @Body() body: unknown, @Req() request: RequestWithUser) {
    const parsed = AnswerAssessmentSchema.safeParse({
      ...(body as object),
      assessmentId: (body as { assessmentId?: string })?.assessmentId ?? id
    });
    if (!parsed.success) {
      throw new BadRequestException({ error: "validation_error", details: parsed.error.flatten() });
    }
    if (parsed.data.assessmentId !== id) {
      throw new BadRequestException({ error: "assessment_id_mismatch" });
    }

    const assessment = this.memory.assessments.get(id);
    if (!assessment || assessment.userId !== request.user.id) {
      throw new NotFoundException({ error: "not_found", message: "Evaluación no encontrada." });
    }
    if (assessment.status === "completed") {
      throw new ConflictException({ error: "already_completed", message: "Esta evaluación ya fue completada." });
    }

    assessment.answers[parsed.data.questionId] = parsed.data.value;
    this.memory.assessments.set(id, assessment);

    return {
      assessmentId: id,
      questionId: parsed.data.questionId,
      instrumentId: parsed.data.instrumentId,
      accepted: true,
      answeredAt: parsed.data.answeredAt ?? new Date().toISOString(),
      answerCount: Object.keys(assessment.answers).length
    };
  }

  @Post(":id/complete")
  complete(@Param("id") id: string, @Body() body: unknown, @Req() request: RequestWithUser) {
    const parsed = CompleteAssessmentSchema.safeParse({
      ...(body as object),
      assessmentId: (body as { assessmentId?: string })?.assessmentId ?? id
    });
    if (!parsed.success) {
      throw new BadRequestException({ error: "validation_error", details: parsed.error.flatten() });
    }
    if (parsed.data.assessmentId !== id) {
      throw new BadRequestException({ error: "assessment_id_mismatch" });
    }

    const assessment = this.memory.assessments.get(id);
    if (!assessment || assessment.userId !== request.user.id) {
      throw new NotFoundException({ error: "not_found", message: "Evaluación no encontrada." });
    }

    const mergedAnswers = { ...assessment.answers, ...parsed.data.answers } as AssessmentAnswers;
    const riskProfile = buildRiskProtectionProfile(mergedAnswers);
    assessment.answers = mergedAnswers;
    assessment.status = "completed";
    assessment.completedAt = parsed.data.completedAt ?? new Date().toISOString();
    assessment.redFlagsAcknowledged = parsed.data.redFlagsAcknowledged;
    assessment.riskProfile = riskProfile;
    assessment.recommendations = riskProfile.recommendations;
    this.memory.assessments.set(id, assessment);

    return {
      assessmentId: id,
      status: assessment.status,
      completedAt: assessment.completedAt,
      result: riskProfile,
      contentRecommendations: riskProfile.recommendations,
    };
  }

  @Get(":id/result")
  result(@Param("id") id: string, @Req() request: RequestWithUser) {
    const assessment = this.memory.assessments.get(id);
    if (!assessment || assessment.userId !== request.user.id) {
      throw new NotFoundException({ error: "not_found", message: "Evaluación no encontrada." });
    }
    if (assessment.status !== "completed") {
      throw new ConflictException({ error: "not_completed", status: assessment.status });
    }
    const result =
      assessment.riskProfile ??
      buildRiskProtectionProfile(assessment.answers as AssessmentAnswers);
    const recommendations =
      assessment.recommendations ??
      (result as { recommendations?: unknown[] }).recommendations ??
      [];
    return {
      assessmentId: id,
      status: assessment.status,
      completedAt: assessment.completedAt,
      result,
      contentRecommendations: recommendations,
    };
  }
}
