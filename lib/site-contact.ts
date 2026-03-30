/** Single source for business contact details (footer + CTAs). */

export const SITE_SUPPORT_EMAIL = "support@tripeloo.com";

export const SITE_PHONE_DISPLAY = "7066444430";
export const SITE_PHONE_E164 = "+917066444430";

export const SITE_PHONE_TEL = `tel:${SITE_PHONE_E164}`;

/** Digits only (e.g. 917066444430) — wa.me link */
export const SITE_WHATSAPP_HREF = `https://wa.me/${SITE_PHONE_E164.replace(/\D/g, "")}`;

export const SITE_ADDRESS = "South Beach, Calicut, Kerala";

export const SITE_SOCIAL_INSTAGRAM = "https://www.instagram.com/tripelootrips";
export const SITE_SOCIAL_FACEBOOK = "https://www.facebook.com/tripelootrips";

export function siteSocialWhatsAppHref(): string {
  return SITE_WHATSAPP_HREF;
}

export const SITE_SOCIAL = {
  instagram: SITE_SOCIAL_INSTAGRAM,
  facebook: SITE_SOCIAL_FACEBOOK,
  whatsapp: SITE_WHATSAPP_HREF,
} as const;

