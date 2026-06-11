import { Link } from "@tanstack/react-router";
import numixLogo from "@/assets/numix-logo.png.asset.json";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-8 py-6 md:px-14 md:py-8">
      <Link to="/" aria-label="NUMIX" className="group">
        <img
          src={numixLogo.url}
          alt="NUMIX"
          className="h-14 w-auto md:h-[68px] transition-transform duration-300 group-hover:-translate-y-0.5"
        />
      </Link>
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        By invitation
      </div>
    </header>
  );
}
