import { randomUUID } from "node:crypto";
import { memory, type PushTokenRecord } from "../lib/supabase";
import { logger } from "../lib/logger";

export interface RegisterTokenInput {
  userId: string;
  token: string;
  platform: "ios" | "android" | "web";
  locale?: "es-CL" | "en";
  timezone?: string;
}

export function registerPushToken(input: RegisterTokenInput): PushTokenRecord {
  const existing = [...memory.pushTokens.values()].find(
    (t) => t.userId === input.userId && t.token === input.token,
  );

  if (existing) {
    const updated: PushTokenRecord = {
      ...existing,
      platform: input.platform,
      locale: input.locale,
      timezone: input.timezone,
      updatedAt: new Date().toISOString(),
    };
    memory.pushTokens.set(existing.id, updated);
    return updated;
  }

  const record: PushTokenRecord = {
    id: randomUUID(),
    userId: input.userId,
    token: input.token,
    platform: input.platform,
    locale: input.locale,
    timezone: input.timezone,
    updatedAt: new Date().toISOString(),
  };
  memory.pushTokens.set(record.id, record);
  logger.info("Push token registered", {
    userId: input.userId,
    platform: input.platform,
  });
  return record;
}

export interface TestNotificationResult {
  delivered: boolean;
  mode: "memory" | "queued";
  titleEs: string;
  bodyEs: string;
  tokenCount: number;
  sentAt: string;
}

/**
 * Demo/test notification — logs in memory mode; does not call FCM/APNs.
 */
export function sendTestNotification(userId: string): TestNotificationResult {
  const tokens = [...memory.pushTokens.values()].filter(
    (t) => t.userId === userId,
  );
  const titleEs = "Neuropi — recordatorio suave";
  const bodyEs =
    "Cuando puedas, registra cómo va tu dolor hoy. Esto no es un diagnóstico; es un apoyo para cuidarte.";

  logger.info("Test notification", {
    userId,
    tokenCount: tokens.length,
    titleEs,
  });

  return {
    delivered: tokens.length > 0,
    mode: "memory",
    titleEs,
    bodyEs,
    tokenCount: tokens.length,
    sentAt: new Date().toISOString(),
  };
}
