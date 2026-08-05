import { config as loadDotenv } from "dotenv";
import { z } from "zod";

loadDotenv();

const ConfigSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3333),
  HOST: z.string().default("0.0.0.0"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(200),
  RATE_LIMIT_TIME_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  SUPABASE_URL: z.string().default(""),
  SUPABASE_ANON_KEY: z.string().default(""),
  SUPABASE_SERVICE_ROLE_KEY: z.string().default(""),
  CORS_ORIGIN: z.string().default("*"),
});

const parsed = ConfigSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.flatten());
  throw new Error("Invalid environment configuration");
}

const env = parsed.data;

const supabaseUrl = env.SUPABASE_URL.trim() || undefined;
const supabaseAnonKey = env.SUPABASE_ANON_KEY.trim() || undefined;
const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY.trim() || undefined;

if (supabaseUrl) {
  const urlCheck = z.string().url().safeParse(supabaseUrl);
  if (!urlCheck.success) {
    throw new Error("SUPABASE_URL must be a valid URL when provided");
  }
}

export const config = {
  port: env.PORT,
  host: env.HOST,
  nodeEnv: env.NODE_ENV,
  logLevel: env.LOG_LEVEL,
  rateLimit: {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_TIME_WINDOW_MS,
  },
  supabase: {
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
    serviceRoleKey: supabaseServiceRoleKey,
  },
  corsOrigin: env.CORS_ORIGIN,
  /** True when URL + at least one key are present. */
  hasSupabase: Boolean(
    supabaseUrl && (supabaseAnonKey || supabaseServiceRoleKey),
  ),
} as const;

export type AppConfig = typeof config;
