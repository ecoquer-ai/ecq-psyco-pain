import Fastify from "fastify";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { config } from "./config";
import { logger } from "./lib/logger";
import { isMemoryMode } from "./lib/supabase";
import { registerAuth } from "./plugins/auth";
import { registerCors } from "./plugins/cors";
import { healthRoutes } from "./routes/health";
import { meRoutes } from "./routes/me";
import { assessmentRoutes } from "./routes/assessments";
import { painLogRoutes } from "./routes/painLogs";
import { therapyRoutes } from "./routes/therapy";
import { libraryRoutes } from "./routes/library";
import { reportRoutes } from "./routes/reports";
import { notificationRoutes } from "./routes/notifications";

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: config.logLevel,
    },
    trustProxy: true,
  });

  await registerCors(app);

  await app.register(helmet, {
    global: true,
    contentSecurityPolicy: false,
  });

  await app.register(rateLimit, {
    max: config.rateLimit.max,
    timeWindow: config.rateLimit.timeWindow,
  });

  await registerAuth(app);

  await app.register(healthRoutes);
  await app.register(meRoutes);
  await app.register(assessmentRoutes);
  await app.register(painLogRoutes);
  await app.register(therapyRoutes);
  await app.register(libraryRoutes);
  await app.register(reportRoutes);
  await app.register(notificationRoutes);

  app.setErrorHandler((error: Error & { statusCode?: number }, _request, reply) => {
    const statusCode =
      typeof error.statusCode === "number" ? error.statusCode : 500;
    logger.error("Unhandled error", {
      message: error.message,
      statusCode,
    });
    void reply.status(statusCode).send({
      error: statusCode >= 500 ? "internal_error" : "request_error",
      message:
        statusCode >= 500
          ? "Error interno del servidor."
          : error.message || "Solicitud inválida.",
    });
  });

  app.addHook("onReady", async () => {
    logger.info("Neuropi API ready", {
      mode: isMemoryMode() ? "memory" : "supabase",
      port: config.port,
    });
  });

  return app;
}
