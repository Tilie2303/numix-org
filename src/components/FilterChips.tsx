import { cn } from "@/lib/utils";

export type ChipOption = {
  key: string;
  label: string;
  count?: number;
  swatch?: string;
};

export function FilterChips({
  label,
  options,
  active,
  onToggle,
  onAll,
  totalLabel,
  mode = "filter",
}: {
  label?: string;
  options: ChipOption[];
  active: Set<string>;
  onToggle: (key: string) => void;
  onAll?: () => void;
  totalLabel?: string;
  mode?: "filter" | "focus";
}) {
  const allOn = active.size === options.length;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {label && (
        <span className="mr-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          {label}
        </span>
      )}
      {onAll && (
        <button
          type="button"
          onClick={onAll}
          className={cn(
            "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] transition",
            allOn
              ? "border-border/40 text-muted-foreground hover:text-ice"
              : "border-aura/60 bg-ice/[0.04] text-ice shadow-[0_0_0_1px_oklch(0.78_0.11_238/0.15)]",
          )}
        >
          {allOn ? "All" : "Reset"}
        </button>
      )}
      {options.map((o) => {
        const on = active.has(o.key);

        // Determine chip visual state
        let state: "focused" | "dimmed" | "on" | "off" | "neutral";
        if (mode === "focus") {
          if (allOn) state = "neutral";
          else state = on ? "focused" : "dimmed";
        } else {
          state = on ? "on" : "off";
        }

        const stateClasses = {
          focused:
            "border-ice/50 bg-ice/[0.08] text-ice shadow-[0_0_0_1px_oklch(0.78_0.11_238/0.25),0_0_24px_-6px_oklch(0.78_0.11_238/0.6)] -translate-y-px",
          dimmed:
            "border-border/20 bg-card/[0.08] text-muted-foreground/40 opacity-40 hover:opacity-70 hover:text-foreground/50",
          on: "border-ice/40 bg-ice/[0.06] text-ice shadow-[0_0_0_1px_oklch(0.78_0.11_238/0.18),0_0_18px_-6px_oklch(0.78_0.11_238/0.55)]",
          off: "border-border/40 bg-card/20 text-muted-foreground/70 opacity-70 hover:opacity-100 hover:text-foreground/80",
          neutral:
            "border-border/30 bg-card/15 text-muted-foreground/60 opacity-80 hover:opacity-100 hover:text-foreground/80 hover:border-border/50",
        };

        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onToggle(o.key)}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] tracking-wide transition duration-200",
              stateClasses[state],
            )}
          >
            {o.swatch && (
              <span
                className="inline-block size-2 rounded-full"
                style={{
                  background: o.swatch,
                  boxShadow: state === "focused" ? `0 0 6px ${o.swatch}` : undefined,
                }}
              />
            )}
            <span>
              {mode === "focus" && typeof o.count === "number"
                ? `${o.label} • ${o.count}`
                : o.label}
            </span>
            {mode === "filter" && typeof o.count === "number" && (
              <span className="text-[10px] text-muted-foreground/70">{o.count}</span>
            )}
          </button>
        );
      })}
      {totalLabel && (
        <span className="ml-auto text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {totalLabel}
        </span>
      )}
    </div>
  );
}
