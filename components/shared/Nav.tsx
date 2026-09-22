import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa6";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-300" style={{ borderColor: "var(--th-border, #27272a)", background: "color-mix(in srgb, var(--th-bg, #09090b) 80%, transparent)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow transition-transform group-hover:scale-105"
            style={{
              background: "var(--th-accent, #ff8c00)",
              color: "var(--th-accent-text, #000000)",
            }}
          >
            H
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight" style={{ color: "var(--th-text-primary, #ffffff)" }}>
              Hue
            </span>
            <span className="text-[11px] font-mono ml-2 px-1.5 py-0.5 rounded border hidden sm:inline" style={{ borderColor: "var(--th-border, #27272a)", color: "var(--th-text-muted, #71717a)" }}>
              Studio 2.0
            </span>
          </div>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-3">
          <Link
            className="p-2 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "var(--th-text-secondary, #a1a1aa)" }}
            href="https://ilotus.dev"
            target="_blank"
            rel="noopener noreferrer"
            title="Portfolio"
          >
            <FaLink size={18} />
          </Link>
          <Link
            className="p-2 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "var(--th-text-secondary, #a1a1aa)" }}
            href="https://github.com/thamarai-titan/hue"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
          >
            <FaGithub size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}