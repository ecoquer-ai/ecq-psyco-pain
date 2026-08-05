import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import { config } from "../config";

export async function registerCors(app: FastifyInstance): Promise<void> {
  const origin =
    config.corsOrigin === "*"
      ? true
      : config.corsOrigin.split(",").map((o) => o.trim());

  await app.register(cors, {
    origin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  });
}
