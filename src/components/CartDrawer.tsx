"use client";

import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-wood-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-wood-700" />
            <h2 className="text-lg font-bold text-wood-800 font-[family-name:var(--font-playfair)]">
              Your Cart ({items.length})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-wood-100 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-wood-200 mb-4" />
              <p className="text-wood-500 mb-2">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-temple-500 underline text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-wood-50 rounded-xl"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-wood-800 text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-temple-500 font-bold text-sm mt-1">
                      {formatPrice(item.price, item.currency)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 bg-wood-200 rounded flex items-center justify-center hover:bg-wood-300 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 bg-wood-200 rounded flex items-center justify-center hover:bg-wood-300 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-wood-400 hover:text-temple-500 transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-wood-100 px-6 py-4 space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-wood-700">Total</span>
              <span className="text-wood-900">{formatPrice(totalPrice())}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full text-center py-3 bg-temple-500 text-white font-semibold rounded-lg hover:bg-temple-600 transition-colors"
            >
              Checkout
            </Link>
            <button
              onClick={clearCart}
              className="w-full text-center py-2 text-sm text-wood-500 hover:text-temple-500 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
