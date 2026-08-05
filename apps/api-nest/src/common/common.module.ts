import { Global, Module } from "@nestjs/common";
import { DemoAuthGuard } from "./demo-auth.guard";
import { MemoryStore } from "./memory.store";
import { SupabaseService } from "./supabase.service";

@Global()
@Module({
  providers: [MemoryStore, SupabaseService, DemoAuthGuard],
  exports: [MemoryStore, SupabaseService, DemoAuthGuard],
})
export class CommonModule {}
