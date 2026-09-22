"use client";

import { useState } from "react";
import { Theme } from "../types";

export default function EcommerceProject({ theme }: { theme: Theme }) {
  const [selectedColor, setSelectedColor] = useState<string>("Obsidian");
  const [selectedSize, setSelectedSize] = useState<string>("512 GB");
  const [quantity, setQuantity] = useState<number>(1);
  const [cartCount, setCartCount] = useState<number>(0);
  const [justAdded, setJustAdded] = useState(false);
  const t = theme.vars;

  const colorOptions = [
    { name: "Obsidian", color: t.bg, border: t.border },
    { name: "Accent", color: t.accent, border: t.accent },
    { name: "Titanium", color: t.textMuted, border: t.border },
  ];

  const storageOptions = [
    { label: "256 GB", price: 299 },
    { label: "512 GB", price: 349 },
    { label: "1 TB", price: 429 },
  ];

  const currentOption = storageOptions.find((o) => o.label === selectedSize) || storageOptions[0];
  const totalPrice = currentOption.price * quantity;

  const handleAddToCart = () => {
    setCartCount((c) => c + quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: t.border }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: t.accentSubtle, color: t.accent }}
            >
              E-Commerce Storefront
            </span>
            <span className="text-xs" style={{ color: t.textMuted }}>Live Product Experience</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: t.textPrimary }}>
            Design Hardware & Accessories
          </h2>
        </div>

        {/* Cart Pill */}
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border"
          style={{ borderColor: t.border, background: t.cardBg }}
        >
          <span className="text-xs font-medium" style={{ color: t.textSecondary }}>Bag</span>
          <span
            className="w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center transition-transform"
            style={{
              background: t.accent,
              color: t.accentText,
              transform: justAdded ? "scale(1.2)" : "scale(1)",
            }}
          >
            {cartCount}
          </span>
        </div>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Product Imagery / Visual Hero */}
        <div
          className="lg:col-span-7 rounded-2xl border p-8 flex flex-col justify-between relative overflow-hidden"
          style={{ background: t.cardBg, borderColor: t.border }}
        >
          {/* Top badges */}
          <div className="flex items-center justify-between z-10">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full border"
              style={{ background: t.accentSubtle, color: t.accent, borderColor: t.border }}
            >
              NEW RELEASE
            </span>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: t.successBg, color: t.success }}
            >
              In Stock (Ready to Ship)
            </span>
          </div>

          {/* Device Graphic Canvas */}
          <div className="py-12 flex flex-col items-center justify-center my-auto">
            <div
              className="w-48 h-48 sm:w-60 sm:h-60 rounded-3xl p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 transform hover:rotate-1"
              style={{
                background: `linear-gradient(145deg, ${t.muted}, ${t.cardBg})`,
                border: `2px solid ${t.accent}`,
                boxShadow: `0 20px 40px -15px ${t.accent}40`,
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono tracking-wider font-semibold" style={{ color: t.accent }}>
                  HUE AUDIO PRO
                </span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.accent }} />
              </div>

              <div className="flex items-center justify-center py-4">
                <div
                  className="w-20 h-20 rounded-full border-4 flex items-center justify-center"
                  style={{ borderColor: t.accent, background: t.bg }}
                >
                  <div
                    className="w-10 h-10 rounded-full animate-pulse"
                    style={{ background: t.accentSubtle }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px]" style={{ color: t.textMuted }}>FINISH</p>
                  <p className="text-xs font-semibold" style={{ color: t.textPrimary }}>{selectedColor}</p>
                </div>
                <span className="text-xs font-mono font-bold" style={{ color: t.accent }}>
                  {selectedSize}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center gap-3 pt-4 border-t z-10" style={{ borderColor: t.border }}>
            {["Studio View", "Transducer Specs", "Desk Setup"].map((label, idx) => (
              <button
                key={label}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
                style={{
                  borderColor: idx === 0 ? t.accent : t.border,
                  background: idx === 0 ? t.accentSubtle : t.bg,
                  color: idx === 0 ? t.accent : t.textSecondary,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Checkout & Variant Options */}
        <div
          className="lg:col-span-5 rounded-2xl border p-6 sm:p-7 flex flex-col justify-between"
          style={{ background: t.cardBg, borderColor: t.border }}
        >
          <div className="space-y-5">
            {/* Title & Reviews */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex text-xs" style={{ color: t.warning }}>
                  ★ ★ ★ ★ ★
                </div>
                <span className="text-xs font-semibold" style={{ color: t.textPrimary }}>4.92</span>
                <span className="text-xs" style={{ color: t.textMuted }}>(1,280 reviews)</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-2" style={{ color: t.textPrimary }}>
                Acoustic Studio Monolith
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>
                Precision-milled aluminum reference monitor with ultra-low latency wireless bridge and adaptive DSP tuning.
              </p>
            </div>

            {/* Price section */}
            <div className="p-4 rounded-xl border" style={{ borderColor: t.border, background: t.bg }}>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-mono" style={{ color: t.textPrimary }}>
                  ${totalPrice}
                </span>
                <span className="text-sm line-through font-mono" style={{ color: t.textMuted }}>
                  ${Math.round(totalPrice * 1.25)}
                </span>
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full ml-auto"
                  style={{ background: t.successBg, color: t.success }}
                >
                  Save 20%
                </span>
              </div>
              <p className="text-[11px] mt-1" style={{ color: t.textMuted }}>
                Includes express worldwide delivery & 2-year Apple/VESA warranty.
              </p>
            </div>

            {/* Color Option Selector */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: t.textSecondary }}>
                FINISH: <span style={{ color: t.textPrimary }}>{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {colorOptions.map((opt) => {
                  const isSel = selectedColor === opt.name;
                  return (
                    <button
                      key={opt.name}
                      onClick={() => setSelectedColor(opt.name)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all"
                      style={{
                        borderColor: isSel ? t.accent : t.border,
                        background: isSel ? t.accentSubtle : t.bg,
                        color: isSel ? t.textPrimary : t.textSecondary,
                      }}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border"
                        style={{ background: opt.color, borderColor: opt.border }}
                      />
                      <span>{opt.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Storage Tier Selector */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: t.textSecondary }}>
                MEMORY CAPACITY
              </label>
              <div className="grid grid-cols-3 gap-2">
                {storageOptions.map((opt) => {
                  const isSel = selectedSize === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setSelectedSize(opt.label)}
                      className="p-2.5 rounded-xl border text-center transition-all"
                      style={{
                        borderColor: isSel ? t.accent : t.border,
                        background: isSel ? t.accentSubtle : t.bg,
                      }}
                    >
                      <div className="text-xs font-semibold" style={{ color: isSel ? t.accent : t.textPrimary }}>
                        {opt.label}
                      </div>
                      <div className="text-[10px] font-mono mt-0.5" style={{ color: t.textMuted }}>
                        ${opt.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold" style={{ color: t.textSecondary }}>Quantity</span>
              <div className="flex items-center rounded-lg border overflow-hidden" style={{ borderColor: t.border, background: t.bg }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-xs hover:bg-black/10 transition-colors"
                  style={{ color: t.textPrimary }}
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-mono font-semibold" style={{ color: t.textPrimary }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-xs hover:bg-black/10 transition-colors"
                  style={{ color: t.textPrimary }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-6">
            <button
              id="ecommerce-add-to-cart-btn"
              onClick={handleAddToCart}
              className="w-full py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-lg flex items-center justify-center gap-2 hover:opacity-95"
              style={{
                background: justAdded ? t.success : t.accent,
                color: justAdded ? "#ffffff" : t.accentText,
              }}
            >
              {justAdded ? "✓ Added to Order" : `Add to Cart • $${totalPrice}`}
            </button>
            <p className="text-[10px] text-center" style={{ color: t.textMuted }}>
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
