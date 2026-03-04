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
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.0!2d85.3!3d27.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM2JzAwLjAiTiA4NcKwMTgnMDAuMCJF!5e0!3m2!1sen!2snp!4v1",
};

export const SOCIAL = {
  facebook: "https://www.facebook.com/omwoodcarving",
  instagram: "https://www.instagram.com/omwoodcarving",
  tiktok: "https://www.tiktok.com/@omwoodcarving",
  youtube: "https://www.youtube.com/@omwoodcarving",
};

export const NAV_LINKS = [
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
