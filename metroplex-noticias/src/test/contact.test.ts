import { describe, expect, it } from "vitest";

import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/contact";

describe("WhatsApp contact", () => {
  it("sends clients to the Metroplex number 565 431 0909 in México", () => {
    expect(whatsappLink()).toBe("https://wa.me/525654310909");
  });

  it("pre-fills the advertising message", () => {
    const url = new URL(whatsappLink(WHATSAPP_MESSAGES.advertise));
    expect(url.pathname).toBe("/525654310909");
    expect(url.searchParams.get("text")).toBe(WHATSAPP_MESSAGES.advertise);
  });
});
