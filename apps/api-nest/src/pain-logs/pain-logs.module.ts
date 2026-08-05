import { Module } from "@nestjs/common";
import { PainLogsController } from "./pain-logs.controller";

@Module({
  controllers: [PainLogsController],
})
export class PainLogsModule {}
