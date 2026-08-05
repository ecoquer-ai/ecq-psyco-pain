import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { appConfig } from "./config";
import { CommonModule } from "./common/common.module";
import { HealthModule } from "./health/health.module";
import { AssessmentsModule } from "./assessments/assessments.module";
import { MeModule } from "./me/me.module";
import { LibraryModule } from "./library/library.module";
import { TherapyModule } from "./therapy/therapy.module";
import { PainLogsModule } from "./pain-logs/pain-logs.module";
import { ReportsModule } from "./reports/reports.module";
import { NotificationsModule } from "./notifications/notifications.module";

@Module({
  imports: [
    CommonModule,
    ThrottlerModule.forRoot([
      {
        ttl: appConfig.rateLimitTtlMs,
        limit: appConfig.rateLimitLimit,
      },
    ]),
    HealthModule,
    AssessmentsModule,
    MeModule,
    LibraryModule,
    TherapyModule,
    PainLogsModule,
    ReportsModule,
    NotificationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
