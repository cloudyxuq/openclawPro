import { describe, it, expect, beforeEach } from "vitest";
import { i18n, t } from "../lib/translate.ts";

describe("i18n", () => {
  beforeEach(async () => {
    localStorage.clear();
    await i18n.setLocale("zh-CN");
  });

  it("should return the key if translation is missing", () => {
    expect(t("non.existent.key")).toBe("non.existent.key");
  });

  it("should return the correct zh-CN translation", () => {
    expect(t("common.health")).toBe("健康状况");
  });

  it("should replace parameters correctly", () => {
    expect(t("overview.stats.cronNext", { time: "10:00" })).toBe("下次唤醒 10:00");
  });

  it("should return zh-CN as the locale", () => {
    expect(i18n.getLocale()).toBe("zh-CN");
  });
});
