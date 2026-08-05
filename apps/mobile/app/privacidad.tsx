import { ScrollView, View } from "react-native";
import { Screen, Text, useTheme } from "@neuropi/ui";

export default function PrivacidadScreen() {
  const { space } = useTheme();
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ gap: space("md"), paddingBottom: 48 }}>
        <Text variant="title">Política de privacidad</Text>
        <Text variant="caption" muted>
          Última actualización: 5 de agosto de 2026 · Neuropi · EcoquerAI · Chile
        </Text>
        <Text variant="body">
          Neuropi (“la app”) es un producto de EcoquerAI. Esta política describe cómo
          tratamos datos personales y de salud cuando usas la app móvil, la versión web
          o la API asociada. Contacto: ecoquerai@gmail.com.
        </Text>
        <Section title="1. Qué datos tratamos">
          Cuenta (correo, nombre o apodo, contraseña cifrada por el proveedor de auth).
          Datos de salud que tú ingresas: intensidad y ubicación del dolor, respuestas
          de tamizaje (p. ej. PHQ-9, PSS-10), progreso educativo y preferencias.
          Token de notificaciones si activas recordatorios. Datos técnicos mínimos
          (diagnóstico, seguridad).
        </Section>
        <Section title="2. Para qué">
          Prestar el servicio de tamizaje orientador, psicoeducación y acompañamiento;
          recordar prácticas solo si lo pides; seguridad, soporte y mejora del producto;
          cumplir la ley chilena aplicable.
        </Section>
        <Section title="3. Qué no hacemos">
          No diagnosticamos. No vendemos tus datos. No usamos datos de salud para
          publicidad ni tracking entre apps. No compartimos PHI con redes publicitarias.
        </Section>
        <Section title="4. Encargados">
          Infraestructura: Supabase (auth/base de datos), Railway (API), Vercel (web),
          Expo/EAS (distribución y actualizaciones), Resend (correo transaccional),
          Cloudinary (imágenes de marca, no historias clínicas). Apple y Google para
          distribución en tiendas.
        </Section>
        <Section title="5. Conservación y derechos">
          Conservamos la cuenta mientras esté activa. Puedes solicitar acceso,
          rectificación o eliminación escribiendo a ecoquerai@gmail.com. Ante urgencia
          de salud, usa SAMU 131 o Salud Responde 600 360 7777 — no el correo.
        </Section>
        <Section title="6. Menores">
          Neuropi no está dirigida a menores de 13 años. Si eres adolescente, úsala con
          apoyo de un adulto y de tu equipo de salud.
        </Section>
      </ScrollView>
    </Screen>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  const { space } = useTheme();
  return (
    <View style={{ gap: space("xs") }}>
      <Text variant="subtitle">{title}</Text>
      <Text variant="body">{children}</Text>
    </View>
  );
}
