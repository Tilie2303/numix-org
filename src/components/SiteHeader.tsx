import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-8 py-6 md:px-14 md:py-8">
      <Link
        to="/"
        aria-label="RARE"
        className="group flex items-baseline font-sans text-xl font-bold uppercase tracking-[0.32em] text-foreground"
      >
        <span>R</span>
        <span
          aria-hidden
          className="relative mx-[0.08em] inline-flex h-[0.95em] w-[0.95em] -translate-y-[0.04em] items-center justify-center self-center rounded-full border-[1.5px] border-foreground"
        >
          <span className="absolute inset-[18%] rounded-full border border-foreground/45" />
          <span className="relative text-[0.55em] font-bold leading-none tracking-normal text-foreground">
            A
          </span>
        </span>
        <span>RE</span>
      </Link>
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        By invitation
      </div>
    </header>
  );
}
