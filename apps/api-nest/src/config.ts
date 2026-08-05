import { config as loadDotenv } from "dotenv";
import { z } from "zod";

loadDotenv();

const ConfigSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3334),
  HOST: z.string().default("0.0.0.0"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  RATE_LIMIT_TTL_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_LIMIT: z.coerce.number().int().positive().default(200),
  SUPABASE_URL: z.string().default(""),
  SUPABASE_ANON_KEY: z.string().default(""),
  SUPABASE_SERVICE_ROLE_KEY: z.string().default(""),
  CORS_ORIGIN: z.string().default("*")
});

const parsed = ConfigSchema.safeParse(process.env);
if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error("Invalid environment configuration:", parsed.error.flatten());
  throw new Error("Invalid environment configuration");
}

const env = parsed.data;
const supabaseUrl = env.SUPABASE_URL.trim() || undefined;
const supabaseAnonKey = env.SUPABASE_ANON_KEY.trim() || undefined;
const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY.trim() || undefined;

export const appConfig = {
  port: env.PORT,
  host: env.HOST,
  nodeEnv: env.NODE_ENV,
  logLevel: env.LOG_LEVEL,
  rateLimitTtlMs: env.RATE_LIMIT_TTL_MS,
  rateLimitLimit: env.RATE_LIMIT_LIMIT,
  corsOrigin: env.CORS_ORIGIN,
  supabase: {
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
    serviceRoleKey: supabaseServiceRoleKey
  },
  hasSupabase: Boolean(supabaseUrl && (supabaseAnonKey || supabaseServiceRoleKey))
} as const;
