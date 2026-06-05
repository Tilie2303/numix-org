import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SiteHeader } from "@/components/SiteHeader";
import coinHero from "@/assets/coin-hero.jpg";
import coinDemo from "@/assets/coin-demo.jpg";

type AuctionRecord = {
  house: string;
  date: string;
  grade: string;
  price: string;
  priceNum: number;
  lot?: string;
};

type Coin = {
  id: string;
  title: string;
  subtitle: string;
  era: string;
  image: string;
  value: { low: string; high: string };
  rarity: string;
  demand: string;
  importance: string;
  confidence: "High Confidence" | "Moderate Confidence" | "Emerging Data";
  reasoning: {
    rarity: string;
    value: string;
    demand: string;
    importance: string;
  };
  market: {
    auctions: AuctionRecord[];
    trend: { direction: "up" | "down" | "flat"; pct: string; window: string };
    activity: { lots12m: number; sellThrough: string; medianPremium: string };
  };
  references: Array<{ catalog: string; ref: string; note?: string }>;
  population: {
    ngc: { graded: number; finer: number; topGrade: string };
    pcgs: { graded: number; finer: number; topGrade: string };
    knownExamples?: number;
  };
  provenance: Array<{ year: string; owner: string; detail: string }>;
  expert: {
    dieStudies: string;
    variants: Array<{ name: string; note: string }>;
    literature: Array<{ title: string; author: string; year: string }>;
    notes: string;
  };
};

const COINS: Record<string, Coin> = {
  "davenport-747": {
    id: "davenport-747",
    title: "Friedrich August I",
    subtitle: "Thaler · 1711 · Davenport 747",
    era: "Electorate of Saxony · Silver · Dresden Mint",
    image: coinDemo,
    value: { low: "€4,800", high: "€6,200" },
    rarity: "Rare",
    demand: "Strong",
    importance: "High",
    confidence: "High Confidence",
    reasoning: {
      rarity:
        "Struck in limited numbers at the Dresden mint during a transitional reign, surviving specimens in collectable grade rarely exceed three figures worldwide.",
      value:
        "Recent results across four major European auctions cluster tightly between €4,800 and €6,200 for comparable grade, with little dispersion — a sign of a mature, confident market.",
      demand:
        "Saxon thalers of this period remain a cornerstone of German numismatics. Demand from Central European collectors has steadied prices through the last three sale cycles.",
      importance:
        "Friedrich August I — known as August the Strong — reshaped Saxon coinage and the Dresden mint itself. His thalers carry both monetary and historical weight.",
    },
    market: {
      auctions: [
        { house: "Künker", date: "Mar 2024", grade: "AU58", price: "€5,400", priceNum: 5400, lot: "384" },
        { house: "Heritage", date: "Jan 2024", grade: "MS61", price: "€6,100", priceNum: 6100, lot: "2117" },
        { house: "Spink", date: "Sep 2023", grade: "AU55", price: "€4,900", priceNum: 4900, lot: "94" },
        { house: "Künker", date: "Jun 2023", grade: "AU58", price: "€5,200", priceNum: 5200, lot: "501" },
        { house: "Gorny & Mosch", date: "Mar 2023", grade: "AU53", price: "€4,650", priceNum: 4650, lot: "1842" },
        { house: "Künker", date: "Oct 2022", grade: "AU55", price: "€4,800", priceNum: 4800, lot: "227" },
      ],
      trend: { direction: "up", pct: "+12.4%", window: "24 mo" },
      activity: { lots12m: 7, sellThrough: "100%", medianPremium: "+8% over estimate" },
    },
    references: [
      { catalog: "Davenport", ref: "747", note: "Primary reference" },
      { catalog: "Schnee", ref: "1006" },
      { catalog: "KM", ref: "#831" },
      { catalog: "Kahnt", ref: "298" },
      { catalog: "Merseb.", ref: "1543" },
    ],
    population: {
      ngc: { graded: 84, finer: 7, topGrade: "MS63" },
      pcgs: { graded: 58, finer: 4, topGrade: "MS62" },
      knownExamples: 142,
    },
    provenance: [
      { year: "2024", owner: "Private European Collection", detail: "Acquired Künker Auction 393, Lot 384" },
      { year: "2011", owner: "Horn Collection", detail: "Catalogued in Künker Sale 198" },
      { year: "1978", owner: "Virgil M. Brand Estate", detail: "Inventoried, Chicago" },
      { year: "1923", owner: "Heinrich Buchenau", detail: "Munich, recorded in correspondence" },
    ],
    expert: {
      dieStudies:
        "Two principal die varieties exist; the reverse with extended palm fronds is materially scarcer and commands a 30–40% premium when correctly attributed. Population reports favor Künker's grading band as the calibration baseline.",
      variants: [
        { name: "Extended palm reverse", note: "Scarce — 30–40% premium" },
        { name: "Standard reverse", note: "Most common; basis for comparable sales" },
        { name: "IGN privy mark", note: "Late strike, slightly weaker definition" },
      ],
      literature: [
        { title: "Die sächsischen Münzen 1500–1763", author: "Schnee, G.", year: "1982" },
        { title: "Münzen und Medaillen der albertinischen Linie", author: "Merseburger, O.", year: "1894" },
        { title: "Davenport's European Crowns 1700–1800", author: "Davenport, J.S.", year: "1961" },
      ],
      notes:
        "Specialist literature consistently treats the 1711 issue as a transitional type bridging the 1706 reform and the post-1715 standardisation. Edge inscription quality is a reliable authentication marker.",
    },
  },
  "athens-tetradrachm": {
    id: "athens-tetradrachm",
    title: "Tetradrachm of Athens",
    subtitle: "Owl of Athena · c. 450 BC",
    era: "Classical Greece · Silver · Athens Mint",
    image: coinHero,
    value: { low: "€1,400", high: "€2,800" },
    rarity: "Iconic",
    demand: "Strong",
    importance: "Foundational",
    confidence: "High Confidence",
    reasoning: {
      rarity:
        "Produced in vast quantities to fund Athenian commerce and naval power, the classical owl tetradrachm survives in meaningful numbers — yet exceptional centering and full crests remain genuinely uncommon.",
      value:
        "The market is deep and liquid. Pricing scales steeply with strike quality and centering rather than nominal grade alone.",
      demand:
        "Universally recognized, the owl is the entry point for serious ancient collections and a permanent fixture of museum acquisitions.",
      importance:
        "The most iconic coin of the ancient world. A direct artifact of Athenian democracy, silver from Laurion, and the economic engine of the 5th century BC.",
    },
    market: {
      auctions: [
        { house: "NAC", date: "May 2024", grade: "Choice EF", price: "€2,650", priceNum: 2650, lot: "118" },
        { house: "CNG", date: "Feb 2024", grade: "Good VF", price: "€1,580", priceNum: 1580, lot: "245" },
        { house: "Roma", date: "Nov 2023", grade: "EF", price: "€2,100", priceNum: 2100, lot: "377" },
        { house: "Leu", date: "Aug 2023", grade: "Choice EF", price: "€2,480", priceNum: 2480, lot: "82" },
        { house: "CNG", date: "May 2023", grade: "VF", price: "€1,420", priceNum: 1420, lot: "612" },
      ],
      trend: { direction: "up", pct: "+18.2%", window: "24 mo" },
      activity: { lots12m: 142, sellThrough: "94%", medianPremium: "+11% over estimate" },
    },
    references: [
      { catalog: "SNG Cop.", ref: "31" },
      { catalog: "Kroll", ref: "8", note: "Standard typology" },
      { catalog: "HGC", ref: "4.1597" },
      { catalog: "Sear", ref: "2526" },
      { catalog: "Starr", ref: "Group V.B" },
    ],
    population: {
      ngc: { graded: 1240, finer: 68, topGrade: "MS★" },
      pcgs: { graded: 640, finer: 24, topGrade: "MS" },
      knownExamples: 1880,
    },
    provenance: [
      { year: "2024", owner: "American Private Collection", detail: "NAC Auction 142, Lot 118" },
      { year: "1998", owner: "BCD Collection", detail: "Catalogued and published" },
      { year: "1962", owner: "Hess-Leu Sale", detail: "Lucerne, October 1962" },
    ],
    expert: {
      dieStudies:
        "Pre-decadrachm period strikes display tighter pellet borders and a more naturalistic owl. Test cuts reduce value 15–25% but are accepted on circulation-era examples.",
      variants: [
        { name: "Standardised type (post-454 BC)", note: "Most common; canonical owl" },
        { name: "Transitional series", note: "Looser style; modest premium" },
        { name: "Test-cut examples", note: "Historically interesting; 15–25% discount" },
      ],
      literature: [
        { title: "The Athenian Empire", author: "Meiggs, R.", year: "1972" },
        { title: "The Greek Coins of Athens", author: "Svoronos, J.N.", year: "1923" },
        { title: "Athenian Coinage 480–449 BC", author: "Starr, C.G.", year: "1970" },
      ],
      notes:
        "Style and fabric — not nominal grade — drive premium pricing. Frontal owls (Kroll 15) are a separate, scarcer category and should not be confused with the standard profile type.",
    },
  },
};

export const Route = createFileRoute("/coin/$id")({
  loader: ({ params }): Coin => {
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

type DeepTab = "analysis" | "market" | "references" | "population" | "provenance" | "expert";

const DEEP_TABS: { id: DeepTab; label: string; caption: string }[] = [
  { id: "analysis", label: "Analysis", caption: "Why this coin is what it is." },
  { id: "market", label: "Market", caption: "Auction records and price behaviour." },
  { id: "references", label: "References", caption: "Catalog citations." },
  { id: "population", label: "Population", caption: "NGC, PCGS and known examples." },
  { id: "provenance", label: "Provenance", caption: "Ownership lineage." },
  { id: "expert", label: "Expert", caption: "Die studies, variants, literature." },
];

function CoinPage() {
  const coin = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<DeepTab>("analysis");

  const openAt = (id: DeepTab) => {
    setTab(id);
    setOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-60 left-1/2 h-[900px] w-[1300px] -translate-x-1/2 aura-hero animate-aura" />

      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-5 md:px-8 md:pb-24 md:pt-8">
        <Link
          to="/search"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground transition hover:text-ice md:text-xs md:tracking-[0.22em]"
        >
          <ArrowLeft className="size-3" strokeWidth={1.5} />
          Search
        </Link>

        {/* HERO — coin as the product */}
        <section className="mt-8 grid gap-10 md:mt-16 md:grid-cols-[1.15fr_1fr] md:gap-20">
          <div className="relative animate-rise">
            <div className="absolute inset-0 -m-24 aura-hero" />
            <img
              src={coin.image}
              alt={coin.title}
              width={1536}
              height={1536}
              className="relative w-full rounded-2xl object-cover shadow-[0_30px_120px_-30px_rgba(0,0,0,0.7)]"
            />
          </div>

          <div className="flex flex-col justify-center animate-rise delay-1">
            <div className="text-[9px] uppercase tracking-[0.36em] text-muted-foreground md:text-[10px] md:tracking-[0.32em]">
              {coin.era}
            </div>
            <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.04] tracking-tight md:mt-5 md:text-6xl">
              {coin.title}
            </h1>
            <div className="mt-3 font-serif text-base italic text-muted-foreground md:text-lg">
              {coin.subtitle}
            </div>

            {/* Insights — the 5-second understanding */}
            <div className="mt-9 border-t border-border/40 pt-7 md:mt-10 md:pt-8">
              <div className="text-[9px] uppercase tracking-[0.36em] text-muted-foreground md:text-[10px] md:tracking-[0.32em]">
                Insights
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-6 md:gap-x-6 md:gap-y-7">
                <Verdict label="Estimated Value" value={coin.value.low} sub={`– ${coin.value.high}`} />
                <Verdict label="Rarity" value={coin.rarity} />
                <Verdict label="Collector Demand" value={coin.demand} />
                <Verdict label="Historical Importance" value={coin.importance} />
              </div>
              <div className="mt-6 border-t border-border/40 pt-6 md:mt-7 md:pt-7">
                <div className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground md:text-[10px] md:tracking-[0.22em]">
                  Confidence
                </div>
                <div className="mt-2 font-serif text-xl leading-tight text-ice text-aura md:text-3xl">
                  {coin.confidence}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analysis Preview */}
        <section className="mt-20 grid gap-8 md:mt-32 md:grid-cols-[260px_1fr] md:gap-16">
          <div>
            <div className="text-[9px] uppercase tracking-[0.36em] text-muted-foreground md:text-[10px] md:tracking-[0.32em]">
              Analysis
            </div>
            <div className="mt-3 font-serif text-2xl text-foreground md:text-4xl">
              Understand the rarity.
            </div>
          </div>
          <div className="max-w-2xl">
            <p className="font-serif text-lg leading-[1.55] text-foreground/90 md:text-2xl">
              {coin.reasoning.importance}
            </p>
            <p className="mt-5 text-[13px] font-light leading-[1.75] text-muted-foreground md:mt-6 md:text-sm">
              Reasoning, market data, references, population, provenance and expert research are kept out of sight until you ask for them.
            </p>
          </div>
        </section>

        {/* Single interaction — Explore Deeper */}
        <section className="mt-16 md:mt-24">
          <button
            onClick={() => openAt("analysis")}
            className="group block w-full overflow-hidden rounded-2xl border border-border/50 bg-card/30 text-left transition hover:border-ice/40 hover:bg-card/50"
          >
            <div className="grid items-center gap-5 px-6 py-7 md:grid-cols-[1fr_auto] md:gap-6 md:px-10 md:py-9">
              <div>
                <div className="text-[9px] uppercase tracking-[0.36em] text-muted-foreground md:text-[10px] md:tracking-[0.32em]">
                  Six layers of depth
                </div>
                <div className="mt-2 font-serif text-2xl text-foreground transition group-hover:text-ice md:text-4xl">
                  Explore Deeper
                </div>
                <div className="mt-3 text-[13px] font-light leading-[1.6] text-muted-foreground md:text-sm">
                  Analysis · Market · References · Population · Provenance · Expert
                </div>
              </div>
              <div className="flex size-12 items-center justify-center rounded-full border border-ice/30 text-ice transition group-hover:border-ice group-hover:bg-ice/10 md:size-14">
                <ArrowRight className="size-5" strokeWidth={1.25} />
              </div>
            </div>
          </button>
        </section>
      </main>

      <DeepSheet
        open={open}
        onOpenChange={setOpen}
        tab={tab}
        onTabChange={setTab}
        coin={coin}
      />
    </div>
  );
}

function DeepSheet({
  open,
  onOpenChange,
  tab,
  onTabChange,
  coin,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tab: DeepTab;
  onTabChange: (t: DeepTab) => void;
  coin: Coin;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] rounded-t-3xl border-border/60 bg-background p-0"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-border/40 px-5 pb-4 pt-6 md:px-10 md:pt-8">
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border/80 md:hidden" />
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                  Deeper
                </div>
                <div className="mt-1 font-serif text-2xl text-foreground md:text-3xl">
                  {coin.title}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
              <div className="flex min-w-max gap-x-6 border-b border-transparent md:gap-x-8">
                {DEEP_TABS.map((t) => {
                  const active = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => onTabChange(t.id)}
                      className={`relative pb-3 text-[11px] uppercase tracking-[0.28em] transition ${
                        active ? "text-ice" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.label}
                      {active && (
                        <span className="absolute inset-x-0 -bottom-px h-px bg-ice shadow-[0_0_12px_rgba(180,210,255,0.8)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl px-5 pb-24 pt-10 md:px-10 md:pt-12">
              <div className="mb-8">
                <div className="font-serif text-sm italic text-muted-foreground">
                  {DEEP_TABS.find((t) => t.id === tab)?.caption}
                </div>
              </div>

              {tab === "analysis" && (
                <div className="space-y-10">
                  <Paragraph title="Why this coin is rare" body={coin.reasoning.rarity} />
                  <Paragraph title="Why we estimate this value" body={coin.reasoning.value} />
                  <Paragraph title="Why demand is strong" body={coin.reasoning.demand} />
                  <Paragraph title="Why this coin matters" body={coin.reasoning.importance} />
                </div>
              )}

              {tab === "market" && <MarketSection coin={coin} />}

              {tab === "references" && (
                <div className="grid gap-3 md:grid-cols-2">
                  {coin.references.map((r: Coin["references"][number], i: number) => (
                    <div
                      key={i}
                      className="flex items-baseline justify-between gap-4 rounded-lg border border-border/40 bg-card/40 px-5 py-4 transition hover:border-ice/30 hover:bg-card/70"
                    >
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          {r.catalog}
                        </div>
                        {r.note && (
                          <div className="mt-1 text-xs font-light text-muted-foreground/80">
                            {r.note}
                          </div>
                        )}
                      </div>
                      <div className="font-serif text-2xl text-ice">{r.ref}</div>
                    </div>
                  ))}
                </div>
              )}

              {tab === "population" && <PopulationSection coin={coin} />}

              {tab === "provenance" && (
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-ice/40 via-border/40 to-transparent" />
                  <ol className="space-y-8">
                    {coin.provenance.map((p: Coin["provenance"][number], i: number) => (
                      <li
                        key={i}
                        className="relative grid grid-cols-[40px_80px_1fr] items-baseline gap-4 md:grid-cols-[40px_120px_1fr] md:gap-8"
                      >
                        <span className="relative z-10 mt-1.5 size-3.5 rounded-full border border-ice/40 bg-background shadow-[0_0_16px_rgba(180,210,255,0.4)]" />
                        <span className="font-serif text-2xl text-ice">{p.year}</span>
                        <div>
                          <div className="font-serif text-lg text-foreground">{p.owner}</div>
                          <div className="mt-1 text-sm font-light text-muted-foreground">
                            {p.detail}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {tab === "expert" && <ExpertSection coin={coin} />}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


function Verdict({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-2 font-serif text-2xl leading-tight text-foreground md:text-3xl">
        {value}
        {sub && <span className="ml-1 text-base text-muted-foreground md:text-lg">{sub}</span>}
      </div>
    </div>
  );
}

function Paragraph({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-2xl">
      <div className="font-serif text-xl italic text-ice">{title}.</div>
      <p className="mt-3 text-base font-light leading-[1.75] text-foreground/85">{body}</p>
    </div>
  );
}

function MarketSection({ coin }: { coin: Coin }) {
  const prices = coin.market.auctions.map((a) => a.priceNum);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = Math.max(max - min, 1);

  const TrendIcon =
    coin.market.trend.direction === "up"
      ? TrendingUp
      : coin.market.trend.direction === "down"
      ? TrendingDown
      : Minus;

  return (
    <div className="space-y-14">
      {/* Market activity strip */}
      <div className="grid gap-px overflow-hidden rounded-xl border border-border/40 bg-border/40 md:grid-cols-3">
        <Stat
          label="Price trend"
          value={
            <span className="inline-flex items-center gap-2">
              <TrendIcon className="size-5" strokeWidth={1.5} />
              {coin.market.trend.pct}
            </span>
          }
          sub={coin.market.trend.window}
        />
        <Stat label="Lots in last 12 mo" value={String(coin.market.activity.lots12m)} sub={`${coin.market.activity.sellThrough} sell-through`} />
        <Stat label="Median result" value={coin.market.activity.medianPremium} sub="vs. auction estimate" />
      </div>

      {/* Price history — minimal editorial chart */}
      <div>
        <div className="mb-5 flex items-baseline justify-between">
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Price history
          </div>
          <div className="font-serif text-sm italic text-muted-foreground">
            {coin.market.auctions[coin.market.auctions.length - 1].date} →{" "}
            {coin.market.auctions[0].date}
          </div>
        </div>
        <div className="relative h-40 rounded-xl border border-border/40 bg-card/30 p-4">
          <svg viewBox="0 0 600 140" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="priceFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.12 240)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="oklch(0.72 0.12 240)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const ordered = [...coin.market.auctions].reverse();
              const pts = ordered.map((a, i) => {
                const x = (i / Math.max(ordered.length - 1, 1)) * 600;
                const y = 130 - ((a.priceNum - min) / range) * 110;
                return { x, y, a };
              });
              const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
              const area = `${path} L 600 140 L 0 140 Z`;
              return (
                <>
                  <path d={area} fill="url(#priceFill)" />
                  <path d={path} fill="none" stroke="oklch(0.88 0.05 230)" strokeWidth="1.5" />
                  {pts.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="oklch(0.88 0.05 230)" />
                  ))}
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Auction records table */}
      <div>
        <div className="mb-5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Recent sales
        </div>
        <div className="divide-y divide-border/40">
          <div className="hidden grid-cols-[1.4fr_1fr_0.8fr_0.8fr_1fr] gap-4 pb-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:grid">
            <div>Auction house</div>
            <div>Date</div>
            <div>Grade</div>
            <div>Lot</div>
            <div className="text-right">Result</div>
          </div>
          {coin.market.auctions.map((a, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-4 md:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_1fr] md:items-baseline"
            >
              <div className="font-serif text-base text-foreground md:text-lg">{a.house}</div>
              <div className="order-3 col-span-2 text-xs text-muted-foreground md:order-none md:col-span-1 md:text-sm">
                {a.date}
              </div>
              <div className="order-4 col-span-2 text-xs text-muted-foreground md:order-none md:col-span-1 md:text-sm">
                <span className="md:hidden">Grade · </span>{a.grade}
              </div>
              <div className="order-5 col-span-2 hidden text-sm text-muted-foreground md:block">
                {a.lot ? `#${a.lot}` : "—"}
              </div>
              <div className="text-right font-serif text-lg text-ice md:text-xl">{a.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className="bg-background/40 p-6">
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-3 font-serif text-2xl text-foreground md:text-3xl">{value}</div>
      {sub && <div className="mt-1 text-xs font-light text-muted-foreground">{sub}</div>}
    </div>
  );
}

function PopulationSection({ coin }: { coin: Coin }) {
  const { ngc, pcgs, knownExamples } = coin.population;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <PopCard house="NGC" graded={ngc.graded} finer={ngc.finer} topGrade={ngc.topGrade} />
      <PopCard house="PCGS" graded={pcgs.graded} finer={pcgs.finer} topGrade={pcgs.topGrade} />
      {knownExamples !== undefined && (
        <div className="md:col-span-2 flex items-baseline justify-between rounded-xl border border-border/40 bg-card/30 px-6 py-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Known examples
            </div>
            <div className="mt-1 text-xs font-light text-muted-foreground">
              Across grading services, museums, and published collections
            </div>
          </div>
          <div className="font-serif text-3xl text-ice">{knownExamples}</div>
        </div>
      )}
    </div>
  );
}

function PopCard({
  house,
  graded,
  finer,
  topGrade,
}: {
  house: string;
  graded: number;
  finer: number;
  topGrade: string;
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/30 p-6">
      <div className="flex items-baseline justify-between">
        <div className="font-serif text-xl">{house}</div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Population
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div>
          <div className="font-serif text-3xl text-foreground">{graded}</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Graded
          </div>
        </div>
        <div>
          <div className="font-serif text-3xl text-ice">{finer}</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Finer known
          </div>
        </div>
        <div>
          <div className="font-serif text-3xl text-foreground">{topGrade}</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Top grade
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpertSection({ coin }: { coin: Coin }) {
  const [tab, setTab] = useState<"dies" | "variants" | "literature" | "notes">("dies");
  const tabs = [
    { id: "dies" as const, label: "Die studies" },
    { id: "variants" as const, label: "Variants" },
    { id: "literature" as const, label: "Literature" },
    { id: "notes" as const, label: "Specialist notes" },
  ];
  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border/40 pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`text-[10px] uppercase tracking-[0.32em] transition ${
              tab === t.id ? "text-ice" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
            {tab === t.id && (
              <span className="ml-2 inline-block size-1 rounded-full bg-ice align-middle shadow-[0_0_8px_rgba(180,210,255,0.8)]" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 min-h-[160px]">
        {tab === "dies" && (
          <p className="max-w-2xl font-serif text-lg leading-[1.7] text-foreground/90">
            {coin.expert.dieStudies}
          </p>
        )}
        {tab === "variants" && (
          <ul className="space-y-5">
            {coin.expert.variants.map((v, i) => (
              <li key={i} className="border-b border-border/30 pb-5 last:border-b-0">
                <div className="font-serif text-lg text-foreground">{v.name}</div>
                <div className="mt-1 text-sm font-light text-muted-foreground">{v.note}</div>
              </li>
            ))}
          </ul>
        )}
        {tab === "literature" && (
          <ul className="space-y-5">
            {coin.expert.literature.map((l, i) => (
              <li key={i} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-border/30 pb-5 last:border-b-0">
                <div>
                  <div className="font-serif text-lg italic text-foreground">{l.title}</div>
                  <div className="mt-1 text-sm font-light text-muted-foreground">{l.author}</div>
                </div>
                <div className="font-serif text-ice">{l.year}</div>
              </li>
            ))}
          </ul>
        )}
        {tab === "notes" && (
          <p className="max-w-2xl font-serif text-lg leading-[1.7] text-foreground/90">
            {coin.expert.notes}
          </p>
        )}
      </div>
    </div>
  );
}
