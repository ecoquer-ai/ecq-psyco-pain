import { randomUUID } from "node:crypto";
import { Inject, Injectable } from "@nestjs/common";
import { type PushTokenRecord, MemoryStore } from "../common/memory.store";

export interface RegisterTokenInput {
  userId: string;
  token: string;
  platform: "ios" | "android" | "web";
  locale?: "es-CL" | "en";
  timezone?: string;
}

export interface TestNotificationResult {
  delivered: boolean;
  mode: "memory" | "queued";
  titleEs: string;
  bodyEs: string;
  tokenCount: number;
  sentAt: string;
}

@Injectable()
export class NotificationsService {
  constructor(@Inject(MemoryStore) private readonly memory: MemoryStore) {}

  registerPushToken(input: RegisterTokenInput): PushTokenRecord {
    const existing = [...this.memory.pushTokens.values()].find(
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
      this.memory.pushTokens.set(existing.id, updated);
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
    this.memory.pushTokens.set(record.id, record);
    return record;
  }

  sendTestNotification(userId: string): TestNotificationResult {
    const tokens = [...this.memory.pushTokens.values()].filter(
      (t) => t.userId === userId,
    );
    const titleEs = "Neuropi — recordatorio suave";
    const bodyEs =
      "Cuando puedas, registra cómo va tu dolor hoy. Esto no es un diagnóstico; es un apoyo para cuidarte.";

    return {
      delivered: tokens.length > 0,
      mode: "memory",
      titleEs,
      bodyEs,
      tokenCount: tokens.length,
      sentAt: new Date().toISOString(),
    };
  }
}
