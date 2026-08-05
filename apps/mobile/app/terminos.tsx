import { ScrollView, View } from "react-native";
import { Screen, Text, useTheme } from "@neuropi/ui";

export default function TerminosScreen() {
  const { space } = useTheme();
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ gap: space("md"), paddingBottom: 48 }}>
        <Text variant="title">Términos de uso</Text>
        <Text variant="caption" muted>
          Última actualización: 5 de agosto de 2026 · Neuropi · EcoquerAI · Chile
        </Text>
        <Section title="1. Servicio">
          Neuropi es una herramienta digital de tamizaje orientador, educación y
          acompañamiento para dolor persistente. No es un dispositivo médico, no
          diagnostica, no prescribe y no sustituye evaluación profesional ni urgencias.
        </Section>
        <Section title="2. Responsabilidad de uso">
          Tú decides qué información ingresas. Los puntajes y textos son señales
          educativas, no un juicio clínico sobre ti. Si hay dolor intenso nuevo,
          debilidad súbita, pérdida de control de esfínteres, fiebre con dolor de
          espalda, ideación suicida u otra urgencia, busca atención inmediata.
        </Section>
        <Section title="3. Cuenta">
          Eres responsable de la confidencialidad de tu acceso. No uses la cuenta de
          otra persona para registrar datos de salud ajenos sin base legal.
        </Section>
        <Section title="4. Propiedad">
          La marca Neuropi, el software y los contenidos educativos son de EcoquerAI o
          de sus licenciantes. Los instrumentos citados (p. ej. PHQ-9, PSS-10) se usan
          como tamizaje orientador con la transparencia descrita en la app.
        </Section>
        <Section title="5. Limitación">
          En la máxima medida permitida por la ley chilena, EcoquerAI no responde por
          decisiones de salud tomadas solo con base en la app. El servicio se ofrece
          “tal cual”, con esfuerzo razonable de disponibilidad.
        </Section>
        <Section title="6. Contacto">
          ecoquerai@gmail.com — EcoquerAI, Chile.
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
