import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Camera } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { RefineSheet } from "@/components/RefineSheet";

type SearchParams = { q?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search — RARE" },
      { name: "description", content: "Search rare coins by name, ruler, year, catalog reference or photograph." },
    ],
  }),
  component: SearchPage,
});

const SUGGESTIONS = [
  {
    id: "davenport-747",
    title: "Friedrich August I · 1711 · Davenport 747",
    meta: "Saxony Thaler · Silver · Rare",
  },
  {
    id: "athens-tetradrachm",
    title: "Tetradrachm of Athens · c. 450 BC",
    meta: "Owl of Athena · Silver · Iconic",
  },
  {
    id: "aureus-augustus",
    title: "Aureus of Augustus · 19–18 BC",
    meta: "Roman Imperial · Gold · Very Rare",
  },
  {
    id: "ducat-venice",
    title: "Ducat of Venice · Doge Andrea Gritti · 1523",
    meta: "Venetian Republic · Gold · Scarce",
  },
];

function SearchPage() {
  const { q } = Route.useSearch();
  const [value, setValue] = useState(q ?? "");
  const navigate = useNavigate();

  const filtered = value.trim()
    ? SUGGESTIONS.filter((s) => s.title.toLowerCase().includes(value.toLowerCase()))
    : SUGGESTIONS;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 aura-soft" />

      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-32">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/search", search: { q: value } });
          }}
          className="relative animate-rise"
        >
          <div className="absolute inset-0 -m-16 aura-field pointer-events-none" />
          <div className="relative flex items-center gap-3 rounded-full border-aura bg-card/40 backdrop-blur-xl pl-6 pr-2 py-2">
            <Search className="size-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="A coin, a ruler, a year…"
              className="flex-1 bg-transparent py-3 text-base font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-center gap-7 text-xs text-muted-foreground animate-rise delay-1">
          <button className="inline-flex items-center gap-2 transition hover:text-ice">
            <Camera className="size-3.5" strokeWidth={1.5} /> By photo
          </button>
          <span className="opacity-30">·</span>
          <RefineSheet
            trigger={
              <button className="inline-flex items-center gap-2 transition hover:text-ice">
                <SlidersHorizontal className="size-3.5" strokeWidth={1.5} />
                Advanced
              </button>
            }
          />
        </div>

        <div className="mt-20 animate-rise delay-2">


          <div className="mt-6 divide-y divide-border/40">
            {filtered.map((s) => (
              <Link
                key={s.id}
                to="/coin/$id"
                params={{ id: s.id }}
                className="group flex items-center justify-between gap-6 py-6 transition"
              >
                <div>
                  <div className="font-serif text-xl text-foreground transition group-hover:text-ice">
                    {s.title}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.meta}</div>
                </div>
                <span className="text-ice opacity-0 transition group-hover:opacity-100">→</span>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No matches yet. Try a ruler, year or reference.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Refinement({ label, hint }: { label: string; hint: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">{label}</div>
      <div className="mt-2 text-sm font-light text-foreground">{hint}</div>
    </div>
  );
}
