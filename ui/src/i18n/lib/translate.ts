import { zh_CN } from "../locales/zh-CN.ts";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from "./registry.ts";
import type { Locale, TranslationMap } from "./types.ts";

type Subscriber = (locale: Locale) => void;

export { SUPPORTED_LOCALES, isSupportedLocale };

class I18nManager {
  private locale: Locale = DEFAULT_LOCALE;
  private translations: Record<Locale, TranslationMap> = { [DEFAULT_LOCALE]: zh_CN };
  private subscribers: Set<Subscriber> = new Set();

  constructor() {
    this.loadLocale();
  }

  private resolveInitialLocale(): Locale {
    return DEFAULT_LOCALE;
  }

  private loadLocale() {
    this.locale = DEFAULT_LOCALE;
  }

  public getLocale(): Locale {
    return this.locale;
  }

  public async setLocale(locale: Locale) {
    if (this.locale === locale) {
      return;
    }

    this.locale = locale;
    localStorage.setItem("openclaw.i18n.locale", locale);
    this.notify();
  }

  public registerTranslation(locale: Locale, map: TranslationMap) {
    this.translations[locale] = map;
  }

  public subscribe(sub: Subscriber) {
    this.subscribers.add(sub);
    return () => this.subscribers.delete(sub);
  }

  private notify() {
    this.subscribers.forEach((sub) => sub(this.locale));
  }

  public t(key: string, params?: Record<string, string>): string {
    const keys = key.split(".");
    let value: unknown = this.translations[this.locale];

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = (value as Record<string, unknown>)[k];
      } else {
        value = undefined;
        break;
      }
    }

    if (typeof value !== "string") {
      return key;
    }

    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, k) => params[k] || `{${k}}`);
    }

    return value;
  }
}

export const i18n = new I18nManager();
export const t = (key: string, params?: Record<string, string>) => i18n.t(key, params);
