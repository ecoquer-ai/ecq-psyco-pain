# EAS Update (OTA)

Usamos **EAS Update** (oficial Expo / `expo-updates`), no Revopush, para este producto.

## Preparación

```bash
npm i -g eas-cli
cd apps/mobile
eas login
eas init
```

Completar `extra.eas.projectId` en `app.json`.

## eas.json (ejemplo)

```json
{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "preview": { "distribution": "internal", "channel": "preview" },
    "production": { "channel": "production" }
  },
  "submit": { "production": {} }
}
```

## Publicar update

```bash
cd apps/mobile
eas update --branch production --message "contenido clínico + UX"
```

## Buenas prácticas

- `runtimeVersion` ligado a `appVersion` (ya en app.json).
- Rollouts graduales para cambios de scoring/copy clínico.
- Rollback inmediato si un update introduce copy diagnóstico incorrecto.
- Los cambios nativos (notificaciones permisos, splash) requieren **build nuevo**, no solo OTA.
