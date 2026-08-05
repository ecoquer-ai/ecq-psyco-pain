import type { FastifyInstance } from "fastify";
import { BRAND } from "@neuropi/shared";
import { config } from "../config";
import { isMemoryMode } from "../lib/supabase";

export async function healthRoutes(app: FastifyInstance): Promise<void> {
  app.get("/health", async () => {
    return {
      status: "ok",
      service: "@neuropi/api",
      brand: BRAND.publicName,
      technicalName: BRAND.technicalName,
      timestamp: new Date().toISOString(),
      mode: isMemoryMode() ? "memory" : "supabase",
      env: config.nodeEnv,
      clinicalNoteEs:
        "Neuropi orienta y educa; no diagnostica ni reemplaza atención profesional.",
    };
  });
}
