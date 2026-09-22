import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      className="w-full border-t mt-16 transition-colors duration-300"
      style={{
        borderColor: "var(--th-border, #27272a)",
        background: "var(--th-card-bg, #18181b)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span style={{ color: "var(--th-text-secondary, #a1a1aa)" }}>
            Built for developers and designers by
          </span>
          <a
            href="https://ilotus.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
            style={{ color: "var(--th-accent, #ff8c00)" }}
          >
            ilotus
          </a>
        </div>

        <div className="flex items-center gap-4 text-[11px]" style={{ color: "var(--th-text-muted, #71717a)" }}>
          <span>Tip: Press <kbd className="font-mono px-1.5 py-0.5 rounded border" style={{ borderColor: "var(--th-border, #27272a)", background: "var(--th-bg, #09090b)" }}>Space</kbd> anywhere to randomize</span>
          <span>•</span>
          <Link
            href="https://github.com/thamarai-titan/hue"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1"
            style={{ color: "var(--th-text-secondary, #a1a1aa)" }}
          >
            <FaGithub size={14} />
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}