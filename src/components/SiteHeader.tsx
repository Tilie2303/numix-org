import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-8 py-6 md:px-14 md:py-8">
      <Link
        to="/"
        className="font-sans text-sm font-light uppercase tracking-[0.55em] text-foreground"
        style={{ fontFeatureSettings: '"ss01"', fontVariationSettings: '"wght" 300' }}
      >
        R<span className="text-ice">A</span>RE
      </Link>
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        By invitation
      </div>
    </header>
  );
}
