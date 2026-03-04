"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { useCartStore } from "@/store/cart";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggleCart, totalItems } = useCartStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-wood-950/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-gold-400 text-3xl font-bold font-[family-name:var(--font-playfair)]">
            ॐ
          </span>
          <div className="leading-tight">
            <span className="block text-lg font-bold text-white font-[family-name:var(--font-playfair)]">
              Om Wood Carving
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-gold-400">
              Heritage Woodcraft
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-wood-200 hover:text-gold-400 transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold-400 group-hover:w-3/4 transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleCart}
            className="relative p-2 text-wood-200 hover:text-gold-400 transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={22} />
            {mounted && totalItems() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-temple-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {totalItems()}
              </span>
            )}
          </button>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-5 py-2 bg-temple-500 text-white text-sm font-semibold rounded-lg hover:bg-temple-600 transition-colors shadow-lg shadow-temple-500/25"
          >
            Get a Quote
          </Link>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-wood-950/95 backdrop-blur-md border-t border-wood-800 px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-wood-200 hover:text-gold-400 hover:bg-wood-800/50 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block mt-2 text-center px-4 py-3 bg-temple-500 text-white font-semibold rounded-lg hover:bg-temple-600 transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}
