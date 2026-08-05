import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import es from "./es.json";
import en from "./en.json";

const deviceLang = Localization.getLocales()[0]?.languageCode ?? "es";
const initial = deviceLang.startsWith("en") ? "en" : "es";

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    lng: initial,
    fallbackLng: "es",
    interpolation: { escapeValue: false },
  });
}

export function setAppLanguage(lang: "es" | "en") {
  void i18n.changeLanguage(lang);
}

export default i18n;
