import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-8 py-6 md:px-14 md:py-8">
      <Link
        to="/"
        aria-label="RARE"
        className="font-sans text-[11px] font-medium uppercase tracking-[0.65em] text-foreground"
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
          RARE
        </span>
      </Link>
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        By invitation
      </div>
    </header>
  );
}
