import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import {
  SITE_ADDRESS,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_E164,
  SITE_SOCIAL,
  SITE_SUPPORT_EMAIL,
} from "@/lib/site-contact";

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-300 py-16 border-t border-brand-500/25">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <BrandLogo variant="footer" className="[&_img]:drop-shadow-lg" />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Tour packages and vacations for travellers from South India — domestic & international —
            with human support end to end.
          </p>
        </div>
        <div>
          <p className="text-white font-semibold text-sm tracking-wide">Explore</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/destinations" className="hover:text-white transition-colors">
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/packages" className="hover:text-white transition-colors">
                Tour packages
              </Link>
            </li>
            <li>
              <Link href="/#best-destination-1" className="hover:text-white transition-colors">
                Featured on home
              </Link>
            </li>
          </ul>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-white font-semibold text-sm tracking-wide">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <ExternalLink href={SITE_SOCIAL.instagram}>Instagram</ExternalLink>
            </li>
            <li>
              <ExternalLink href={SITE_SOCIAL.facebook}>Facebook</ExternalLink>
            </li>
            <li>
              <ExternalLink href={SITE_SOCIAL.whatsapp}>WhatsApp</ExternalLink>
            </li>
          </ul>
          <div className="mt-6 space-y-3 text-sm border-t border-white/10 pt-6">
            <p>
              <span className="text-slate-500">Email: </span>
              <a
                href={`mailto:${SITE_SUPPORT_EMAIL}`}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {SITE_SUPPORT_EMAIL}
              </a>
            </p>
            <p>
              <span className="text-slate-500">Phone: </span>
              <a
                href={`tel:${SITE_PHONE_E164}`}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {SITE_PHONE_DISPLAY}
              </a>
            </p>
            <p className="text-slate-400">
              <span className="text-slate-500">Address:</span>
              <span className="block mt-1 text-slate-300">{SITE_ADDRESS}</span>
            </p>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-600 mt-14">
        © {new Date().getFullYear()} Tripeloo Trips. All rights reserved.
      </p>
    </footer>
  );
}
