import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

/**
 * Root HTML for Expo web — SEO + safe bottom space for tab labels.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>Neuropi — Nuevo enfoque para el dolor</title>
        <meta
          name="description"
          content="Tamizaje orientador y psicoeducación para dolor persistente. Neuropi orienta; no diagnostica."
        />
        <meta name="theme-color" content="#C45C26" />
        <meta property="og:title" content="Neuropi — Nuevo enfoque para el dolor" />
        <meta
          property="og:description"
          content="Tamizaje orientador y psicoeducación para dolor persistente. Neuropi orienta; no diagnostica."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_CL" />
        <ScrollViewStyleReset />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, #root {
                height: 100%;
                height: 100dvh;
                margin: 0;
                padding: 0;
                overflow: hidden;
              }
              /* Fallback if default tablist still mounts somewhere */
              [role="tablist"] {
                box-sizing: border-box !important;
                overflow: visible !important;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
