import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { appConfig } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.setGlobalPrefix("v1");

  const origins =
    appConfig.corsOrigin === "*"
      ? true
      : appConfig.corsOrigin.split(",").map((origin) => origin.trim());
  app.enableCors({
    origin: origins,
    credentials: true
  });

  await app.listen(appConfig.port, appConfig.host);
  // eslint-disable-next-line no-console
  console.log(
    `[api-nest] listening on http://${appConfig.host}:${appConfig.port}/v1 (mode=${appConfig.hasSupabase ? "supabase" : "memory"})`
  );
}

void bootstrap();
