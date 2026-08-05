import { Injectable } from "@nestjs/common";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { appConfig } from "../config";

@Injectable()
export class SupabaseService {
  readonly anonClient: SupabaseClient | null;
  readonly serviceClient: SupabaseClient | null;

  constructor() {
    const url = appConfig.supabase.url;
    const anonKey = appConfig.supabase.anonKey;
    const serviceKey = appConfig.supabase.serviceRoleKey;

    this.anonClient =
      url && anonKey
        ? createClient(url, anonKey, {
            auth: { persistSession: false, autoRefreshToken: false },
          })
        : null;

    this.serviceClient =
      url && serviceKey
        ? createClient(url, serviceKey, {
            auth: { persistSession: false, autoRefreshToken: false },
          })
        : null;
  }

  /** Prefer service role for server writes; fall back to anon. */
  get client(): SupabaseClient | null {
    return this.serviceClient ?? this.anonClient;
  }

  isMemoryMode(): boolean {
    return !appConfig.hasSupabase;
  }
}
