import { Injectable } from "@nestjs/common";
import type { AssessmentAnswers, ProbableProfileId } from "@neuropi/shared";

export type AssessmentRecord = {
  id: string;
  userId: string;
  locale: string;
  includeTraumaModule: boolean;
  status: "in_progress" | "completed";
  answers: Record<string, unknown>;
  startedAt: string;
  completedAt?: string;
  redFlagsAcknowledged?: boolean;
  riskProfile?: {
    summaryEs?: string;
    crisisSignal?: boolean;
    redFlagTriggered?: boolean;
    scores?: unknown;
    recommendations?: Array<{
      id: string;
      titleEs: string;
      titleEn: string;
      bodyEs: string;
      bodyEn: string;
    }>;
  };
  profiles?: ProbableProfileId[];
  scores?: Record<string, number>;
  recommendations?: Array<{
    id: string;
    titleEs: string;
    titleEn: string;
    bodyEs: string;
    bodyEn: string;
  }>;
};

export type PainLogRecord = {
  id: string;
  userId: string;
  loggedAt: string;
  intensityNrs: number;
  intensityVas?: number;
  bodyRegions: string[];
  activity?: string;
  mood?: number;
  sleepHours?: number;
  medicationTaken?: boolean;
  notes?: string;
  flareUp?: boolean;
  createdAt: string;
};

export type LessonCompletionRecord = {
  id: string;
  userId: string;
  lessonId: string;
  completedAt: string;
};

export type PushTokenRecord = {
  id: string;
  userId: string;
  token: string;
  platform: "ios" | "android" | "web";
  locale?: string;
  timezone?: string;
  updatedAt: string;
};

@Injectable()
export class MemoryStore {
  readonly assessments = new Map<string, AssessmentRecord>();
  readonly painLogs = new Map<string, PainLogRecord>();
  readonly lessonCompletions = new Map<string, LessonCompletionRecord>();
  readonly pushTokens = new Map<string, PushTokenRecord>();
}

export type CompletePayload = {
  assessmentId: string;
  answers: AssessmentAnswers;
  redFlagsAcknowledged: boolean;
  completedAt?: string;
};
