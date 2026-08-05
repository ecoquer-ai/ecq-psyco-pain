import { config } from "../config";

type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function shouldLog(level: LogLevel): boolean {
  if (config.logLevel === "silent") return false;
  if (config.logLevel === "trace" || config.logLevel === "fatal") {
    return true;
  }
  const configured = LEVEL_ORDER[config.logLevel as LogLevel] ?? 20;
  return LEVEL_ORDER[level] >= configured;
}

function write(level: LogLevel, message: string, meta?: unknown): void {
  if (!shouldLog(level)) return;
  const payload = {
    level,
    time: new Date().toISOString(),
    msg: message,
    ...(meta !== undefined ? { meta } : {}),
  };
  const line = JSON.stringify(payload);
  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  debug: (message: string, meta?: unknown) => write("debug", message, meta),
  info: (message: string, meta?: unknown) => write("info", message, meta),
  warn: (message: string, meta?: unknown) => write("warn", message, meta),
  error: (message: string, meta?: unknown) => write("error", message, meta),
};
