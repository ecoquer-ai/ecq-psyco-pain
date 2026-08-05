import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { RegisterPushTokenSchema } from "@neuropi/shared";
import {
  registerPushToken,
  sendTestNotification,
} from "../services/notificationService";

const TestNotificationBodySchema = z.object({
  userId: z.string().uuid().optional(),
});

export async function notificationRoutes(app: FastifyInstance): Promise<void> {
  app.post(
    "/notifications/register-token",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const parsed = RegisterPushTokenSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          error: "validation_error",
          details: parsed.error.flatten(),
        });
      }

      const body = parsed.data;
      const record = registerPushToken({
        userId: body.userId ?? request.user.id,
        token: body.token,
        platform: body.platform,
        locale: body.locale,
        timezone: body.timezone,
      });

      return reply.status(201).send({
        id: record.id,
        platform: record.platform,
        updatedAt: record.updatedAt,
        messageEs: "Token registrado para recordatorios opcionales.",
      });
    },
  );

  app.post(
    "/notifications/test",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const parsed = TestNotificationBodySchema.safeParse(request.body ?? {});
      if (!parsed.success) {
        return reply.status(400).send({
          error: "validation_error",
          details: parsed.error.flatten(),
        });
      }

      const userId = parsed.data.userId ?? request.user.id;
      const result = sendTestNotification(userId);

      return {
        ...result,
        clinicalNoteEs:
          "Notificación de prueba. Los recordatorios apoyan el cuidado; no diagnostican ni alarmarán sin contexto.",
      };
    },
  );
}
