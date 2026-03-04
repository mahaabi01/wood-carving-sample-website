import Link from "next/link";
import { CONTACT, SOCIAL, SITE_NAME, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-wood-950 text-wood-300">
      {/* Ornamental border */}
      <div className="ornament-border opacity-40" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gold-400 text-3xl font-bold font-[family-name:var(--font-playfair)]">
                ॐ
              </span>
              <div>
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-playfair)]">
                  {SITE_NAME}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">
                  Heritage Woodcraft
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-wood-400">
              Master artisans preserving centuries of Nepali and Indian temple
              carving traditions. Each piece tells a story of sacred heritage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-wood-400 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-gold-400 mt-0.5">📍</span>
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-400 mt-0.5">📞</span>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-400 mt-0.5">✉️</span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {Object.entries(SOCIAL).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-wood-800 hover:bg-gold-500 text-wood-300 hover:text-wood-950 rounded-full flex items-center justify-center transition-all text-sm capitalize"
                  aria-label={name}
                >
                  {name[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
              Find Us
            </h4>
            <div className="rounded-lg overflow-hidden border border-wood-800">
              <iframe
                src={CONTACT.mapEmbed}
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Om Wood Carving location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-wood-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-wood-500">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p>
            Crafted by{" "}
            <a
              href="https://abilashmaharjan.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:underline"
            >
              Abilash Maharjan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
