import { Link } from "@tanstack/react-router";
import numixLogo from "@/assets/numix-logo.png.asset.json";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-8 py-6 md:px-14 md:py-8">
      <Link to="/" aria-label="NUMIX" className="group flex items-center gap-3">
        <img
          src={numixLogo.url}
          alt="NUMIX"
          className="h-7 w-auto md:h-8 transition-transform duration-300 group-hover:-translate-y-0.5"
        />
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.5em] text-foreground">
          NUMIX
        </span>
      </Link>
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        By invitation
      </div>
    </header>
  );
}
