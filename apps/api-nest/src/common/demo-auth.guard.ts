import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { appConfig } from "../config";
import { SupabaseService } from "./supabase.service";

export const DEMO_USER_ID = "00000000-0000-4000-8000-000000000001";
export const DEMO_USER_EMAIL = "demo@neuropi.cl";

export type AuthenticatedUser = {
  id: string;
  email?: string;
  isDemo: boolean;
  token: string;
};

type RequestWithUser = {
  headers: Record<string, string | string[] | undefined>;
  user?: AuthenticatedUser;
};

@Injectable()
export class DemoAuthGuard implements CanActivate {
  constructor(
    @Inject(SupabaseService) private readonly supabase: SupabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = request.headers.authorization;
    const value = Array.isArray(authHeader) ? authHeader[0] : authHeader;

    if (!value?.toLowerCase().startsWith("bearer ")) {
      throw new UnauthorizedException({
        error: "unauthorized",
        message: "Se requiere Authorization Bearer.",
      });
    }

    const token = value.slice("Bearer ".length).trim();
    if (!token) {
      throw new UnauthorizedException({
        error: "unauthorized",
        message: "Se requiere Authorization Bearer.",
      });
    }

    if (this.supabase.isMemoryMode() || !appConfig.hasSupabase) {
      if (token === "demo") {
        request.user = {
          id: DEMO_USER_ID,
          email: DEMO_USER_EMAIL,
          isDemo: true,
          token,
        };
        return true;
      }
      throw new UnauthorizedException({
        error: "unauthorized",
        message:
          "Modo demo: usa Authorization: Bearer demo (Supabase no configurado).",
      });
    }

    const client = this.supabase.anonClient;
    if (!client) {
      throw new UnauthorizedException({
        error: "auth_unavailable",
        message: "Servicio de autenticación no disponible.",
      });
    }

    const { data, error } = await client.auth.getUser(token);
    if (error || !data.user) {
      throw new UnauthorizedException({
        error: "unauthorized",
        message: "Token inválido o expirado.",
      });
    }

    request.user = {
      id: data.user.id,
      email: data.user.email,
      isDemo: false,
      token,
    };
    return true;
  }
}
