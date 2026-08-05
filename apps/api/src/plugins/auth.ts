import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { config } from "../config";
import {
  DEMO_USER_EMAIL,
  DEMO_USER_ID,
  getSupabaseAnon,
  isMemoryMode,
} from "../lib/supabase";
import { logger } from "../lib/logger";

export interface AuthUser {
  id: string;
  email?: string;
  isDemo: boolean;
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }

  interface FastifyRequest {
    user: AuthUser;
  }
}

function extractBearer(authorization?: string): string | null {
  if (!authorization) return null;
  const [scheme, token] = authorization.split(" ");
  if (!scheme || scheme.toLowerCase() !== "bearer" || !token) return null;
  return token.trim();
}

export async function registerAuth(app: FastifyInstance): Promise<void> {
  app.decorateRequest("user", null as unknown as AuthUser);

  app.decorate(
    "authenticate",
    async function authenticate(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<void> {
      const token = extractBearer(request.headers.authorization);

      if (!token) {
        return reply.status(401).send({
          error: "unauthorized",
          message: "Se requiere Authorization Bearer.",
        });
      }

      if (isMemoryMode() || !config.hasSupabase) {
        if (token === "demo") {
          request.user = {
            id: DEMO_USER_ID,
            email: DEMO_USER_EMAIL,
            isDemo: true,
          };
          return;
        }
        return reply.status(401).send({
          error: "unauthorized",
          message:
            "Modo demo: usa Authorization: Bearer demo (Supabase no configurado).",
        });
      }

      const supabase = getSupabaseAnon();
      if (!supabase) {
        return reply.status(503).send({
          error: "auth_unavailable",
          message: "Servicio de autenticación no disponible.",
        });
      }

      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data.user) {
        logger.warn("JWT validation failed", { message: error?.message });
        return reply.status(401).send({
          error: "unauthorized",
          message: "Token inválido o expirado.",
        });
      }

      request.user = {
        id: data.user.id,
        email: data.user.email,
        isDemo: false,
      };
    },
  );
}
