"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-red-600">
          Om Wood Carving
        </Link>

        {/* Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <Link href="/about" className="hover:text-red-600">About Us</Link>
          <Link href="/shop" className="hover:text-red-600">Shop</Link>
          <Link href="/gallery" className="hover:text-red-600">Gallery</Link>
          <Link href="/blog" className="hover:text-red-600">Our Blog</Link>
          <Link href="/contact" className="hover:text-red-600">Contact Us</Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link href="/contact" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg flex flex-col space-y-2 px-4 py-3">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link href="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link href="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>Our Blog</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
        </div>
      )}
    </nav>
  );
}
