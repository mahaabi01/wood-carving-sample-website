// Site-wide constants for Om Wood Carving

export const SITE_NAME = "Om Wood Carving";
export const SITE_TAGLINE =
  "Preserving Nepal's Sacred Heritage Through Master Woodcraft";
export const SITE_DESCRIPTION =
  "Handcrafted Nepali & Indian temple-style wood carvings — doors, windows, sculptures & architectural pieces for collectors, designers & cultural enthusiasts worldwide.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://omwoodcarving.com";

export const CONTACT = {
  phone: "+977 9803845226",
  email: "info@omwoodcarving.com",
  address: "Bungamati, Lalitpur, Nepal",
  // Simple query-based embed (no API key or place-ID needed) — reliably
  // renders a real map centered on the address, unlike a hand-typed `pb=`
  // embed string which silently renders blank if malformed.
  mapEmbed: "https://www.google.com/maps?q=Bungamati,+Lalitpur,+Nepal&output=embed",
};

export const SOCIAL = {
  facebook: "https://www.facebook.com/omwoodcarving",
  instagram: "https://www.instagram.com/omwoodcarving",
  tiktok: "https://www.tiktok.com/@omwoodcarving",
  youtube: "https://www.youtube.com/@omwoodcarving",
};

// Single source of truth for homepage/site-wide stats — used by both
// Hero.tsx and StatsSection.tsx. Update here only.
export const SITE_STATS = [
  { value: "100+", label: "Happy Clients" },
  { value: "30+", label: "Years of Craft" },
  { value: "500+", label: "Pieces Created" },
  { value: "5+", label: "Countries Served" },
] as const;

// Primary nav — kept short and premium-feeling. Blog/Videos live in the
// footer instead (see FOOTER_LINKS) rather than crowding the top bar.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Projects", href: "/projects" },
  { label: "Heritage", href: "/heritage" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Footer link list — everything in NAV_LINKS plus secondary sections.
export const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Projects", href: "/projects" },
  { label: "Heritage", href: "/heritage" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Videos", href: "/video" },
  { label: "Contact", href: "/contact" },
] as const;

export const CURRENCIES = [
  { code: "NPR", symbol: "Rs.", label: "Nepali Rupee" },
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
] as const;
