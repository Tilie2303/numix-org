import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-8 py-6 md:px-14 md:py-8">
      <Link to="/" className="font-serif text-xl tracking-[0.2em] text-foreground">
        RARE
      </Link>
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        Understanding first · Evidence on demand
      </div>
    </header>
  );
}
