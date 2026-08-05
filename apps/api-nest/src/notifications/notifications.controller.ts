import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { RegisterPushTokenSchema } from "@neuropi/shared";
import { z } from "zod";
import {
  DemoAuthGuard,
  type AuthenticatedUser,
} from "../common/demo-auth.guard";
import { NotificationsService } from "./notifications.service";

const TestNotificationBodySchema = z.object({
  userId: z.string().uuid().optional(),
});

type RequestWithUser = { user: AuthenticatedUser };

@Controller("notifications")
@UseGuards(DemoAuthGuard)
export class NotificationsController {
  constructor(
    @Inject(NotificationsService)
    private readonly notificationsService: NotificationsService,
  ) {}

  @Post("register-token")
  @HttpCode(201)
  registerToken(@Body() body: unknown, @Req() request: RequestWithUser) {
    const parsed = RegisterPushTokenSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({
        error: "validation_error",
        details: parsed.error.flatten(),
      });
    }

    const record = this.notificationsService.registerPushToken({
      userId: parsed.data.userId ?? request.user.id,
      token: parsed.data.token,
      platform: parsed.data.platform,
      locale: parsed.data.locale,
      timezone: parsed.data.timezone,
    });

    return {
      id: record.id,
      platform: record.platform,
      updatedAt: record.updatedAt,
      messageEs: "Token registrado para recordatorios opcionales.",
    };
  }

  @Post("test")
  test(@Body() body: unknown, @Req() request: RequestWithUser) {
    const parsed = TestNotificationBodySchema.safeParse(body ?? {});
    if (!parsed.success) {
      throw new BadRequestException({
        error: "validation_error",
        details: parsed.error.flatten(),
      });
    }

    const userId = parsed.data.userId ?? request.user.id;
    const result = this.notificationsService.sendTestNotification(userId);
    return {
      ...result,
      clinicalNoteEs:
        "Notificación de prueba. Los recordatorios apoyan el cuidado; no diagnostican ni alarmarán sin contexto.",
    };
  }
}
