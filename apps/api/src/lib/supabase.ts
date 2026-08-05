import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  AssessmentScores,
  CareRecommendation,
  ProbableProfile,
  RiskProtectionProfile,
} from "@neuropi/shared";
import { config } from "../config";
import { logger } from "./logger";

export type AssessmentStatus = "in_progress" | "completed";

export interface AssessmentRecord {
  id: string;
  userId: string;
  locale: "es-CL" | "en";
  themeId?: string;
  includeTraumaModule: boolean;
  status: AssessmentStatus;
  answers: Record<string, unknown>;
  startedAt: string;
  completedAt?: string;
  redFlagsAcknowledged?: boolean;
  riskProfile?: RiskProtectionProfile;
  profiles?: ProbableProfile[];
  scores?: AssessmentScores;
  recommendations?: CareRecommendation[];
}

export interface PainLogRecord {
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
}

export interface LessonCompletionRecord {
  id: string;
  userId: string;
  lessonId: string;
  completedAt: string;
}

export interface PushTokenRecord {
  id: string;
  userId: string;
  token: string;
  platform: "ios" | "android" | "web";
  locale?: "es-CL" | "en";
  timezone?: string;
  updatedAt: string;
}

/** In-memory stores used when Supabase credentials are absent. */
export const memory = {
  assessments: new Map<string, AssessmentRecord>(),
  painLogs: new Map<string, PainLogRecord>(),
  lessonCompletions: new Map<string, LessonCompletionRecord>(),
  pushTokens: new Map<string, PushTokenRecord>(),
};

let anonClient: SupabaseClient | null = null;
let serviceClient: SupabaseClient | null = null;

export function getSupabaseAnon(): SupabaseClient | null {
  if (!config.hasSupabase || !config.supabase.url || !config.supabase.anonKey) {
    return null;
  }
  if (!anonClient) {
    anonClient = createClient(config.supabase.url, config.supabase.anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    logger.info("Supabase anon client initialized");
  }
  return anonClient;
}

export function getSupabaseService(): SupabaseClient | null {
  if (
    !config.hasSupabase ||
    !config.supabase.url ||
    !config.supabase.serviceRoleKey
  ) {
    return null;
  }
  if (!serviceClient) {
    serviceClient = createClient(
      config.supabase.url,
      config.supabase.serviceRoleKey,
      {
        auth: { persistSession: false, autoRefreshToken: false },
      },
    );
    logger.info("Supabase service client initialized");
  }
  return serviceClient;
}

export function isMemoryMode(): boolean {
  return !config.hasSupabase;
}

export const DEMO_USER_ID = "00000000-0000-4000-8000-000000000001";
export const DEMO_USER_EMAIL = "demo@Neuropi.local";
