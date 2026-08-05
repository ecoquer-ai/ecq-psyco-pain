import { Controller, Get, Inject } from "@nestjs/common";
import { BRAND } from "@neuropi/shared";
import { appConfig } from "../config";
import { SupabaseService } from "../common/supabase.service";

@Controller("health")
export class HealthController {
  constructor(
    @Inject(SupabaseService) private readonly supabase: SupabaseService,
  ) {}

  @Get()
  getHealth() {
    return {
      status: "ok",
      service: "@neuropi/api-nest",
      brand: BRAND.publicName,
      technicalName: BRAND.technicalName,
      timestamp: new Date().toISOString(),
      mode: this.supabase.isMemoryMode() ? "memory" : "supabase",
      env: appConfig.nodeEnv,
      clinicalNoteEs: "Neuropi orienta y educa; no diagnostica ni reemplaza atención profesional."
    };
  }
}
