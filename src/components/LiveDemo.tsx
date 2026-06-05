import { Link } from "@tanstack/react-router";
import coinDemo from "@/assets/coin-demo.jpg";

export function LiveDemo() {
  return (
    <Link
      to="/coin/$id"
      params={{ id: "davenport-747" }}
      className="group relative block w-full max-w-3xl animate-rise delay-3"
    >
      <div className="absolute inset-0 -m-10 aura-soft pointer-events-none" />

      <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/30 backdrop-blur-xl transition group-hover:border-aura">
        {/* input row */}
        <div className="flex items-center gap-3 border-b border-border/40 px-6 py-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
          Live interpretation
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[180px_1fr] md:p-8">
          <div className="relative">
            <div className="absolute inset-0 -m-4 aura-soft" />
            <img
              src={coinDemo}
              alt="Friedrich August I thaler, 1711"
              width={1024}
              height={1024}
              loading="lazy"
              className="relative aspect-square w-full rounded-xl object-cover"
            />
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Input</div>
              <div className="mt-2 font-serif text-2xl text-foreground md:text-3xl">
                Friedrich August I · 1711 · Davenport 747
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-4">
              <Stat label="Estimated Value" value="€4,800" sub="–€6,200" />
              <Stat label="Rarity" value="Rare" />
              <Stat label="Demand" value="Strong" />
              <Stat label="Confidence" value="High" accent />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Open full interpretation</span>
              <span className="text-ice transition group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Stat({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className={`mt-1.5 font-serif text-xl ${accent ? "text-ice text-aura" : "text-foreground"}`}>
        {value}
        {sub && <span className="text-base text-muted-foreground"> {sub}</span>}
      </div>
    </div>
  );
}
