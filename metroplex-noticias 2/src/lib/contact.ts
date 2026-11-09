/** Metroplex Noticias public contact channels. */
export const WHATSAPP_NUMBER = "525654310909"; // +52 565 431 0909 (México)
export const WHATSAPP_DISPLAY = "565 431 0909";
export const FACEBOOK_URL = "https://www.facebook.com/metroplex.jrz";
export const YOUTUBE_URL = "https://www.youtube.com/@idea.groupmx";
export const WEBSITE_URL = "https://www.metroplex.com.mx";

export const WHATSAPP_MESSAGES = {
  advertise:
    "Hola Metroplex Noticias, me interesa anunciar mi negocio con ustedes. ¿Me pueden dar información?",
  general: "Hola Metroplex Noticias, me gustaría ponerme en contacto con ustedes.",
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
