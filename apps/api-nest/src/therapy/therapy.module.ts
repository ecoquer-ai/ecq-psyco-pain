import { Module } from "@nestjs/common";
import { TherapyController } from "./therapy.controller";

@Module({
  controllers: [TherapyController],
})
export class TherapyModule {}
