import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-red-500 inline-block mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Our Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-red-500 inline-block mb-4">
            Contact Info
          </h3>
          <p>9803845226</p>
          <p>info@omwoodcarving.com</p>
          <p>Lalitpur, Nepal</p>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-red-500 inline-block mb-4">
            Follow Us
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="https://www.tiktok.com/@omwoodcarving"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                href="https://www.tiktok.com/@omwoodcarving"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href="https://www.tiktok.com/@omwoodcarving"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                TikTok
              </Link>
            </li>
            <li>
              <Link
                href="https://www.tiktok.com/@omwoodcarving"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                YouTube
              </Link>
            </li>
          </ul>
        </div>

        {/* Google Map */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-red-500 inline-block mb-4">
            Google Map
          </h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18..."
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white mt-6 pt-4 text-sm text-center flex flex-col sm:flex-row justify-between items-center">
        <p>2025 © All Rights Reserved. One World Catering</p>
        <p>
          Developed By:{" "}
          <Link
            href="https://abilashmaharjan.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:underline"
          >
            Abilash Maharjan{" "}
          </Link>
        </p>
      </div>
    </footer>
  );
}
