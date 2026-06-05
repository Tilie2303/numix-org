import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import coinHero from "@/assets/coin-hero.jpg";
import coinDemo from "@/assets/coin-demo.jpg";

type Coin = {
  id: string;
  title: string;
  subtitle: string;
  era: string;
  image: string;
  value: { low: string; high: string };
  rarity: string;
  demand: string;
  confidence: "High Confidence" | "Moderate Confidence" | "Emerging Data";
  explanation: {
    rarity: string;
    value: string;
    demand: string;
    importance: string;
  };
  evidence: {
    auctions: Array<{ house: string; date: string; grade: string; price: string }>;
    references: Array<{ catalog: string; ref: string }>;
    population: { graded: number; finer: number };
  };
  expert: string;
};

const COINS: Record<string, Coin> = {
  "davenport-747": {
    id: "davenport-747",
    title: "Friedrich August I",
    subtitle: "Thaler · 1711 · Davenport 747",
    era: "Electorate of Saxony · Silver",
    image: coinDemo,
    value: { low: "€4,800", high: "€6,200" },
    rarity: "Rare",
    demand: "Strong",
    confidence: "High Confidence",
    explanation: {
      rarity:
        "Struck in limited numbers at the Dresden mint during a transitional reign, surviving specimens in collectable grade rarely exceed three figures worldwide.",
      value:
        "Recent results across four major European auctions cluster tightly between €4,800 and €6,200 for comparable grade, with little dispersion — a sign of a mature, confident market.",
      demand:
        "Saxon thalers of this period remain a cornerstone of German numismatics. Demand from Central European collectors has steadied prices through the last three sale cycles.",
      importance:
        "Friedrich August I — known as August the Strong — reshaped Saxon coinage and the Dresden mint itself. His thalers carry both monetary and historical weight.",
    },
    evidence: {
      auctions: [
        { house: "Künker", date: "Mar 2024", grade: "AU58", price: "€5,400" },
        { house: "Heritage", date: "Jan 2024", grade: "MS61", price: "€6,100" },
        { house: "Spink", date: "Sep 2023", grade: "AU55", price: "€4,900" },
        { house: "Künker", date: "Jun 2023", grade: "AU58", price: "€5,200" },
      ],
      references: [
        { catalog: "Davenport", ref: "747" },
        { catalog: "Schnee", ref: "1006" },
        { catalog: "KM", ref: "#831" },
      ],
      population: { graded: 142, finer: 11 },
    },
    expert:
      "Two principal die varieties exist; the reverse with extended palm fronds is materially scarcer and commands a 30–40% premium when correctly attributed. Population reports favor Künker's grading band as the calibration baseline.",
  },
  "athens-tetradrachm": {
    id: "athens-tetradrachm",
    title: "Tetradrachm of Athens",
    subtitle: "Owl of Athena · c. 450 BC",
    era: "Classical Greece · Silver",
    image: coinHero,
    value: { low: "€1,400", high: "€2,800" },
    rarity: "Iconic",
    demand: "Strong",
    confidence: "High Confidence",
    explanation: {
      rarity:
        "Produced in vast quantities to fund Athenian commerce and naval power, the classical owl tetradrachm survives in meaningful numbers — yet exceptional centering and full crests remain genuinely uncommon.",
      value:
        "The market is deep and liquid. Pricing scales steeply with strike quality and centering rather than nominal grade alone.",
      demand:
        "Universally recognized, the owl is the entry point for serious ancient collections and a permanent fixture of museum acquisitions.",
      importance:
        "The most iconic coin of the ancient world. A direct artifact of Athenian democracy, silver from Laurion, and the economic engine of the 5th century BC.",
    },
    evidence: {
      auctions: [
        { house: "NAC", date: "May 2024", grade: "Choice EF", price: "€2,650" },
        { house: "CNG", date: "Feb 2024", grade: "Good VF", price: "€1,580" },
        { house: "Roma", date: "Nov 2023", grade: "EF", price: "€2,100" },
      ],
      references: [
        { catalog: "SNG Cop.", ref: "31" },
        { catalog: "Kroll", ref: "8" },
        { catalog: "HGC", ref: "4.1597" },
      ],
      population: { graded: 1880, finer: 92 },
    },
    expert:
      "Pre-decadrachm period strikes display tighter pellet borders and a more naturalistic owl. Test cuts reduce value 15–25% but are accepted on circulation-era examples.",
  },
};

export const Route = createFileRoute("/coin/$id")({
  loader: ({ params }) => {
    const coin = COINS[params.id];
    if (!coin) throw notFound();
    return coin;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — RARE` },
          { name: "description", content: `${loaderData.subtitle}. ${loaderData.era}.` },
          { property: "og:title", content: `${loaderData.title} — RARE` },
          { property: "og:description", content: `${loaderData.subtitle}. ${loaderData.era}.` },
          { property: "og:image", content: loaderData.image },
        ]
      : [],
  }),
  component: CoinPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-center">
      <div>
        <div className="font-serif text-3xl">Not in the index yet.</div>
        <Link to="/search" className="mt-6 inline-block text-ice">Return to search →</Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="font-serif text-2xl">Something interrupted the interpretation.</div>
        <Link to="/" className="mt-6 inline-block text-ice">Return home →</Link>
      </div>
    </div>
  ),
});

function CoinPage() {
  const coin = Route.useLoaderData();
  const [showEvidence, setShowEvidence] = useState(false);
  const [showExpert, setShowExpert] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-60 left-1/2 h-[900px] w-[1300px] -translate-x-1/2 aura-hero animate-aura" />

      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-40 pt-8">
        <Link
          to="/search"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition hover:text-ice"
        >
          <ArrowLeft className="size-3" strokeWidth={1.5} />
          Search
        </Link>

        {/* HERO — coin as the product */}
        <section className="mt-12 grid gap-16 md:mt-20 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div className="relative animate-rise">
            <div className="absolute inset-0 -m-20 aura-hero" />
            <img
              src={coin.image}
              alt={coin.title}
              width={1536}
              height={1536}
              className="relative w-full rounded-2xl object-cover"
            />
          </div>

          <div className="flex flex-col justify-center animate-rise delay-1">
            <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              {coin.era}
            </div>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
              {coin.title}
            </h1>
            <div className="mt-3 font-serif text-lg italic text-muted-foreground">
              {coin.subtitle}
            </div>

            {/* Understanding — verdict before data */}
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8">
              <Verdict label="Estimated Value" value={coin.value.low} sub={`– ${coin.value.high}`} />
              <Verdict label="Rarity" value={coin.rarity} />
              <Verdict label="Collector Demand" value={coin.demand} />
              <Verdict label="Confidence" value={coin.confidence} accent />
            </div>
          </div>
        </section>

        {/* Explanation — always visible, human language */}
        <section className="mt-32 grid gap-16 md:grid-cols-[260px_1fr]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Why
            </div>
            <div className="mt-4 font-serif text-3xl">Understanding first.</div>
            <div className="mt-2 text-sm font-light text-muted-foreground">
              In human language. No interpretation required.
            </div>
          </div>

          <div className="space-y-12">
            <Paragraph title="Why this coin is rare" body={coin.explanation.rarity} />
            <Paragraph title="Why we estimate this value" body={coin.explanation.value} />
            <Paragraph title="Why demand is strong" body={coin.explanation.demand} />
            <Paragraph title="Why this coin matters" body={coin.explanation.importance} />
          </div>
        </section>

        {/* Evidence — on demand */}
        <section className="mt-32">
          <Disclosure
            label="Evidence"
            sub="Auction records, references and population data — only when you ask."
            open={showEvidence}
            onToggle={() => setShowEvidence((v) => !v)}
          />
          {showEvidence && (
            <div className="mt-12 grid gap-12 md:grid-cols-[1.4fr_1fr] animate-rise">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Recent results
                </div>
                <div className="mt-5 divide-y divide-border/40">
                  {coin.evidence.auctions.map((a, i) => (
                    <div key={i} className="grid grid-cols-4 items-baseline gap-4 py-4 text-sm">
                      <div className="font-serif text-foreground">{a.house}</div>
                      <div className="text-muted-foreground">{a.date}</div>
                      <div className="text-muted-foreground">{a.grade}</div>
                      <div className="text-right font-serif text-ice">{a.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Catalog references
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    {coin.evidence.references.map((r, i) => (
                      <div key={i} className="flex justify-between border-b border-border/30 pb-2">
                        <span className="text-muted-foreground">{r.catalog}</span>
                        <span className="font-serif">{r.ref}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Population
                  </div>
                  <div className="mt-4 flex items-baseline gap-6">
                    <div>
                      <div className="font-serif text-3xl text-foreground">{coin.evidence.population.graded}</div>
                      <div className="text-xs text-muted-foreground">graded</div>
                    </div>
                    <div>
                      <div className="font-serif text-3xl text-ice">{coin.evidence.population.finer}</div>
                      <div className="text-xs text-muted-foreground">finer known</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Expert */}
        <section className="mt-24">
          <Disclosure
            label="Expert"
            sub="Variant analysis and specialist references for advanced collectors."
            open={showExpert}
            onToggle={() => setShowExpert((v) => !v)}
          />
          {showExpert && (
            <div className="mt-10 max-w-3xl font-serif text-lg leading-relaxed text-foreground/90 animate-rise">
              {coin.expert}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Verdict({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div
        className={`mt-2 font-serif text-3xl leading-tight md:text-4xl ${
          accent ? "text-ice text-aura" : "text-foreground"
        }`}
      >
        {value}
        {sub && <span className="ml-1 text-xl text-muted-foreground">{sub}</span>}
      </div>
    </div>
  );
}

function Paragraph({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className="font-serif text-xl italic text-ice">{title}.</div>
      <p className="mt-3 text-base font-light leading-[1.75] text-foreground/85">{body}</p>
    </div>
  );
}

function Disclosure({
  label,
  sub,
  open,
  onToggle,
}: {
  label: string;
  sub: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="group flex w-full items-center justify-between border-t border-border/40 pt-8 text-left"
    >
      <div>
        <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          {open ? "Hide" : "Reveal"}
        </div>
        <div className="mt-2 font-serif text-3xl text-foreground transition group-hover:text-ice">
          {label}
        </div>
        <div className="mt-2 text-sm font-light text-muted-foreground">{sub}</div>
      </div>
      <ChevronRight
        className={`size-6 text-muted-foreground transition ${open ? "rotate-90 text-ice" : ""}`}
        strokeWidth={1.25}
      />
    </button>
  );
}
