export type TranslationMap = { [key: string]: string | TranslationMap };

export type Locale = "zh-CN";

export interface I18nConfig {
  locale: Locale;
  translations: Record<Locale, TranslationMap>;
}
