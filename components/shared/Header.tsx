import Image from "next/image";

export default function Header() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Image
            src="/logo.svg"
            alt="Hue Logo"
            width={36}
            height={36}
            className="rounded-xl p-1 border shadow-sm transition-transform hover:scale-105"
            style={{
              background: "var(--th-card-bg, #141414)",
              borderColor: "var(--th-border, #262626)",
            }}
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: "var(--th-text-primary, #ffffff)" }}>
              # Structure Your Theme.
            </h1>
            <p className="text-xs sm:text-sm font-normal" style={{ color: "var(--th-text-secondary, #a1a1aa)" }}>
              Curated palettes, algorithmic harmony generation & live application testing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span
            className="px-2.5 py-1 rounded-full border font-mono"
            style={{
              background: "var(--th-accent-subtle, rgba(255,140,0,0.12))",
              color: "var(--th-accent, #ff8c00)",
              borderColor: "var(--th-border, #262626)",
            }}
          >
            ⚡ Tailwind v4 Ready
          </span>
          <span
            className="px-2.5 py-1 rounded-full border font-mono hidden sm:inline"
            style={{
              background: "var(--th-card-bg, #141414)",
              color: "var(--th-text-secondary, #a1a1aa)",
              borderColor: "var(--th-border, #262626)",
            }}
          >
            ♿ WCAG Compliant
          </span>
        </div>
      </div>
    </section>
  );
}