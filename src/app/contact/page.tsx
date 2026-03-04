"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { CONTACT, SOCIAL } from "@/lib/constants";

const contactInfo = [
  { icon: MapPin, label: "Address", value: CONTACT.address },
  { icon: Phone, label: "Phone", value: CONTACT.phone },
  { icon: Mail, label: "Email", value: CONTACT.email },
  { icon: Clock, label: "Hours", value: "Sun–Fri: 7 AM – 6 PM\nSat: Closed" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <PageBanner
        title="Contact Us"
        subtitle="Have a project in mind? We'd love to hear from you and bring your vision to life."
        imageUrl="/Maindoor/door9.jpg"
      />

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-wood-900 font-[family-name:var(--font-playfair)] mb-2">
                  Get In Touch
                </h2>
                <p className="text-wood-500">
                  Reach out for custom orders, inquiries, or to visit our
                  workshop in Bungamati.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-wood-100 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-temple-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-wood-900">
                        {item.label}
                      </h3>
                      <p className="text-wood-500 text-sm whitespace-pre-line">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-sm font-semibold text-wood-900 mb-3">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {Object.entries(SOCIAL).map(([name, url]) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-wood-100 flex items-center justify-center text-wood-600 hover:bg-temple-500 hover:text-white transition-colors text-sm font-medium capitalize"
                      title={name}
                    >
                      {name.charAt(0).toUpperCase()}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-lg border border-wood-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.2!2d85.29!3d27.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM3JzQ4LjAiTiA4NcKwMTcnMjQuMCJF!5e0!3m2!1sen!2snp!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Om Wood Carving Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl border border-wood-100 p-8"
              >
                <h2 className="text-xl font-bold text-wood-900 font-[family-name:var(--font-playfair)] mb-6">
                  Send Us a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-wood-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-wood-200 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none transition-colors text-wood-900"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-wood-700 mb-1"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-wood-200 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none transition-colors text-wood-900"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-wood-700 mb-1"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-wood-200 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none transition-colors text-wood-900"
                      placeholder="+977 ..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-wood-700 mb-1"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      required
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-wood-200 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none transition-colors text-wood-900 bg-white"
                    >
                      <option value="">Select subject</option>
                      <option value="Custom Order">Custom Order</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Workshop Visit">Workshop Visit</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="General">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-wood-700 mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-wood-200 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none transition-colors text-wood-900 resize-none"
                    placeholder="Tell us about your project or ask your question..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 bg-temple-500 text-white rounded-lg font-medium hover:bg-temple-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>

                {status === "success" && (
                  <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg text-sm text-center">
                    Thank you! Your message has been sent. We&apos;ll get back
                    to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm text-center">
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
