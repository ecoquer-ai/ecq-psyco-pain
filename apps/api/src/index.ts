import { config } from "./config";
import { buildApp } from "./app";
import { logger } from "./lib/logger";

async function main() {
  const app = await buildApp();

  try {
    await app.listen({ port: config.port, host: config.host });
    logger.info(`Neuropi API listening on http://${config.host}:${config.port}`);
  } catch (err) {
    logger.error("Failed to start server", err);
    process.exit(1);
  }
}

void main();
