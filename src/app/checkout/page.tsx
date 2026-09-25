"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    country: "Nepal",
    shippingAddress: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<
    string | null
  >(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setConfirmedOrderNumber(data.orderNumber);
      clearCart();
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  // Order confirmed
  if (confirmedOrderNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center bg-white rounded-2xl border border-wood-100 shadow-lg p-10">
          <CheckCircle2 size={56} className="mx-auto text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-wood-900 mb-2 font-[family-name:var(--font-playfair)]">
            Order Request Received
          </h1>
          <p className="text-wood-500 mb-1">
            Order number:{" "}
            <span className="font-semibold text-wood-800">
              {confirmedOrderNumber}
            </span>
          </p>
          <p className="text-wood-500 leading-relaxed mt-4 mb-8">
            Thank you — we&apos;ve received your order request. Our team will
            reach out by email or phone shortly to confirm details, shipping
            costs, and payment.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-temple-500 text-white font-semibold rounded-lg hover:bg-temple-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <ShoppingBag size={48} className="mx-auto text-wood-200 mb-4" />
          <h1 className="text-2xl font-bold text-wood-900 mb-2 font-[family-name:var(--font-playfair)]">
            Your cart is empty
          </h1>
          <p className="text-wood-500 mb-6">
            Add a few pieces from our collection before checking out.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-temple-500 text-white font-semibold rounded-lg hover:bg-temple-600 transition-colors"
          >
            Browse the Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-wood-900 mb-2 font-[family-name:var(--font-playfair)]">
          Checkout
        </h1>
        <p className="text-wood-500 mb-10">
          Submit your order request — no payment is taken online. Our team
          will follow up to confirm shipping and arrange payment.
        </p>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 bg-white rounded-xl border border-wood-100 shadow-sm p-6 md:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-1">
                  Full Name *
                </label>
                <input
                  required
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-wood-200 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-1">
                  Email *
                </label>
                <input
                  required
                  type="email"
                  name="customerEmail"
                  value={form.customerEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-wood-200 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none transition-colors"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  name="customerPhone"
                  value={form.customerPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-wood-200 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none transition-colors"
                  placeholder="+977 ..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-1">
                  Country *
                </label>
                <input
                  required
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-wood-200 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-wood-700 mb-1">
                Shipping Address *
              </label>
              <textarea
                required
                name="shippingAddress"
                value={form.shippingAddress}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-wood-200 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none transition-colors resize-none"
                placeholder="Street address, city, postal code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-wood-700 mb-1">
                Order Notes
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-wood-200 focus:border-temple-500 focus:ring-2 focus:ring-temple-500/20 outline-none transition-colors resize-none"
                placeholder="Anything else we should know?"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-temple-500 text-white font-semibold rounded-lg hover:bg-temple-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Place Order Request"}
            </button>
          </form>

          {/* Summary */}
          <div className="md:col-span-2">
            <div className="bg-wood-50 rounded-xl border border-wood-100 p-6 sticky top-24">
              <h2 className="font-bold text-wood-900 mb-4 font-[family-name:var(--font-playfair)]">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-wood-100">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-wood-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-wood-400">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-wood-800">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-wood-200 pt-4 flex justify-between items-center">
                <span className="text-wood-600">Total</span>
                <span className="text-xl font-bold text-wood-900">
                  {formatPrice(totalPrice())}
                </span>
              </div>
              <p className="text-xs text-wood-400 mt-3">
                Shipping cost will be confirmed based on your location and
                order size.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
