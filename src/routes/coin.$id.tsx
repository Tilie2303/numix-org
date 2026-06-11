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

type GradeDist = { grade: string; pct: number; count: number };
type EstByGrade = { grade: string; gradeNum: number; estimate: number; low: number; high: number; sales: number[] };

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
  specs?: {
    metal?: string;
    weight?: string;
    diameter?: string;
    mint?: string;
    mintYears?: string;
  };
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
    summary?: {
      totalAppearances: number;
      medianPrice: string;
      highestResult: string;
      lowestResult: string;
      mostCommonGrade: string;
    };
    gradeDistribution?: GradeDist[];
    estimatedByGrade?: EstByGrade[];
  };
  references: Array<{ catalog: string; ref: string; note?: string }>;
  population: {
    ngc: { graded: number; finer: number; topGrade: string };
    pcgs: { graded: number; finer: number; topGrade: string };
    knownExamples?: number;
    finestKnown?: string;
    topCensus?: Array<{ grade: string; count: number }>;
  };
  provenance: Array<{ year: string; owner: string; detail: string }>;
  expert: {
    dieStudies: string;
    variants: Array<{ name: string; note: string }>;
    literature: Array<{ title: string; author: string; year: string }>;
    notes: string;
    comparatives?: Array<{ title: string; detail: string }>;
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
    specs: {
      metal: "Silver (.875)",
      weight: "29.10 g",
      diameter: "42 mm",
      mint: "Dresden",
      mintYears: "1711",
    },
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
      summary: {
        totalAppearances: 137,
        medianPrice: "€620",
        highestResult: "€14,500",
        lowestResult: "€180",
        mostCommonGrade: "AU55",
      },
      gradeDistribution: [
        { grade: "VF30", pct: 4, count: 5 },
        { grade: "VF35", pct: 7, count: 10 },
        { grade: "EF40", pct: 11, count: 15 },
        { grade: "EF45", pct: 14, count: 19 },
        { grade: "AU53", pct: 17, count: 23 },
        { grade: "AU55", pct: 21, count: 29 },
        { grade: "AU58", pct: 13, count: 18 },
        { grade: "MS60", pct: 7, count: 10 },
        { grade: "MS62", pct: 4, count: 5 },
        { grade: "MS63", pct: 2, count: 3 },
      ],
      estimatedByGrade: [
        { grade: "VF30", gradeNum: 30, estimate: 240, low: 180, high: 320, sales: [180, 220, 260] },
        { grade: "VF35", gradeNum: 35, estimate: 340, low: 260, high: 440, sales: [280, 310, 360, 400] },
        { grade: "EF40", gradeNum: 40, estimate: 480, low: 360, high: 620, sales: [380, 440, 500, 560, 600] },
        { grade: "EF45", gradeNum: 45, estimate: 720, low: 540, high: 950, sales: [560, 640, 700, 820, 900] },
        { grade: "AU53", gradeNum: 53, estimate: 1100, low: 820, high: 1450, sales: [880, 1000, 1150, 1300] },
        { grade: "AU55", gradeNum: 55, estimate: 1600, low: 1200, high: 2100, sales: [1280, 1450, 1700, 1900, 2050] },
        { grade: "AU58", gradeNum: 58, estimate: 2400, low: 1800, high: 3200, sales: [1900, 2200, 2600, 3000] },
        { grade: "MS60", gradeNum: 60, estimate: 3600, low: 2700, high: 4800, sales: [2800, 3400, 4000, 4600] },
        { grade: "MS62", gradeNum: 62, estimate: 5200, low: 3900, high: 6800, sales: [4100, 4900, 5800, 6500] },
        { grade: "MS63", gradeNum: 63, estimate: 7400, low: 5600, high: 9800, sales: [5800, 6800, 8200, 9400] },
      ],
    },
    references: [
      { catalog: "Davenport", ref: "747", note: "Primary reference" },
      { catalog: "Schnee", ref: "1006" },
      { catalog: "KM", ref: "#831" },
      { catalog: "Kahnt", ref: "298" },
      { catalog: "AKS", ref: "—" },
      { catalog: "Merseb.", ref: "1543" },
    ],
    population: {
      ngc: { graded: 84, finer: 7, topGrade: "MS63" },
      pcgs: { graded: 58, finer: 4, topGrade: "MS62" },
      knownExamples: 142,
      finestKnown: "MS63 (NGC)",
      topCensus: [
        { grade: "MS63", count: 2 },
        { grade: "MS62", count: 5 },
        { grade: "MS61", count: 9 },
        { grade: "AU58", count: 18 },
        { grade: "AU55", count: 29 },
      ],
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
      comparatives: [
        { title: "Künker 393, Lot 384 (Mar 2024)", detail: "AU58, hammer €5,400 — closest comparable" },
        { title: "Heritage 232217, Lot 2117 (Jan 2024)", detail: "MS61, hammer €6,100" },
        { title: "Spink 23103, Lot 94 (Sep 2023)", detail: "AU55, hammer €4,900" },
      ],
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
    specs: {
      metal: "Silver (.965)",
      weight: "17.20 g",
      diameter: "24 mm",
      mint: "Athens",
      mintYears: "c. 454–404 BC",
    },
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
      summary: {
        totalAppearances: 1420,
        medianPrice: "€1,950",
        highestResult: "€48,000",
        lowestResult: "€420",
        mostCommonGrade: "EF",
      },
      gradeDistribution: [
        { grade: "VF", pct: 22, count: 312 },
        { grade: "Good VF", pct: 18, count: 256 },
        { grade: "EF", pct: 28, count: 398 },
        { grade: "Choice EF", pct: 18, count: 256 },
        { grade: "AU", pct: 8, count: 114 },
        { grade: "MS", pct: 4, count: 57 },
        { grade: "MS★", pct: 2, count: 27 },
      ],
      estimatedByGrade: [
        { grade: "VF", gradeNum: 35, estimate: 950, low: 700, high: 1300, sales: [780, 900, 1050, 1200] },
        { grade: "gVF", gradeNum: 40, estimate: 1350, low: 1000, high: 1800, sales: [1100, 1280, 1500, 1700] },
        { grade: "EF", gradeNum: 45, estimate: 2000, low: 1500, high: 2700, sales: [1600, 1850, 2200, 2600] },
        { grade: "cEF", gradeNum: 50, estimate: 2800, low: 2100, high: 3800, sales: [2200, 2600, 3100, 3600] },
        { grade: "AU", gradeNum: 55, estimate: 4500, low: 3300, high: 6100, sales: [3500, 4200, 5200, 6000] },
        { grade: "MS", gradeNum: 60, estimate: 8200, low: 6100, high: 11000, sales: [6500, 7800, 9500, 10800] },
        { grade: "MS★", gradeNum: 65, estimate: 16000, low: 12000, high: 22000, sales: [12500, 15500, 19000, 24000] },
      ],
    },
    references: [
      { catalog: "SNG Cop.", ref: "31" },
      { catalog: "Kroll", ref: "8", note: "Standard typology" },
      { catalog: "HGC", ref: "4.1597" },
      { catalog: "Sear", ref: "2526" },
      { catalog: "Starr", ref: "Group V.B" },
      { catalog: "Krause", ref: "—" },
    ],
    population: {
      ngc: { graded: 1240, finer: 68, topGrade: "MS★" },
      pcgs: { graded: 640, finer: 24, topGrade: "MS" },
      knownExamples: 1880,
      finestKnown: "MS★ (NGC)",
      topCensus: [
        { grade: "MS★", count: 27 },
        { grade: "MS", count: 57 },
        { grade: "Ch AU", count: 96 },
        { grade: "AU", count: 114 },
        { grade: "Ch EF", count: 256 },
      ],
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
      comparatives: [
        { title: "NAC 142, Lot 118 (May 2024)", detail: "Choice EF, hammer €2,650 — strong centering" },
        { title: "Leu 16, Lot 82 (Aug 2023)", detail: "Choice EF, hammer €2,480" },
        { title: "CNG Triton XXVII, Lot 245 (Feb 2024)", detail: "Good VF, hammer €1,580" },
      ],
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
          { title: `${loaderData.title} — NUMIX` },
          { name: "description", content: `${loaderData.subtitle}. ${loaderData.era}.` },
          { property: "og:title", content: `${loaderData.title} — NUMIX` },
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

            {coin.specs && (
              <div className="mt-7 border-t border-border/40 pt-6 md:mt-8 md:pt-7">
                <div className="text-[9px] uppercase tracking-[0.36em] text-muted-foreground md:text-[10px] md:tracking-[0.32em]">
                  Coin Information
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-3 md:gap-x-6 md:gap-y-5">
                  {coin.specs.metal && <Spec label="Metal" value={coin.specs.metal} />}
                  {coin.specs.weight && <Spec label="Weight" value={coin.specs.weight} />}
                  {coin.specs.diameter && <Spec label="Diameter" value={coin.specs.diameter} />}
                  {coin.specs.mint && <Spec label="Mint" value={coin.specs.mint} />}
                  {coin.specs.mintYears && <Spec label="Mint Years" value={coin.specs.mintYears} />}
                  {coin.references[0] && (
                    <Spec
                      label="Catalog Ref."
                      value={`${coin.references[0].catalog} ${coin.references[0].ref}`}
                    />
                  )}
                </dl>
              </div>
            )}



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

              {tab === "references" && (() => {
                const primary = coin.references.find((r) => r.note) ?? coin.references[0];
                const supporting = coin.references.filter((r) => r !== primary);
                return (
                  <div className="space-y-10">
                    <div className="rounded-2xl border border-border/40 bg-card/30 px-6 py-8 md:px-10 md:py-10">
                      <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                        Primary reference
                      </div>
                      <div className="mt-4 flex items-baseline gap-5">
                        <div className="font-serif text-3xl text-foreground md:text-4xl">
                          {primary.catalog}
                        </div>
                        <div className="font-serif text-5xl text-ice text-aura md:text-6xl">
                          {primary.ref}
                        </div>
                      </div>
                      {primary.note && (
                        <p className="mt-4 max-w-xl font-serif text-base italic leading-[1.55] text-muted-foreground md:text-lg">
                          {primary.note}.
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="mb-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        Supporting citations
                      </div>
                      <ul className="divide-y divide-border/40 border-y border-border/40">
                        {supporting.map((r, i) => (
                          <li
                            key={i}
                            className="flex items-baseline justify-between gap-6 py-4"
                          >
                            <span className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                              {r.catalog}
                            </span>
                            <span className="font-serif text-2xl text-foreground">{r.ref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}

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
      <div className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground md:text-[10px] md:tracking-[0.22em]">{label}</div>
      <div className="mt-2 font-serif text-xl leading-tight text-foreground md:text-3xl">
        {value}
        {sub && <span className="ml-1 text-sm text-muted-foreground md:text-lg">{sub}</span>}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground md:text-[10px] md:tracking-[0.22em]">
        {label}
      </dt>
      <dd className="mt-1.5 font-serif text-base text-foreground md:text-lg">{value}</dd>
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

type GradeTier = "top" | "mid" | "base";

function gradeTier(grade: string): GradeTier {
  const g = grade.toLowerCase();
  if (g.includes("ms") || g.includes("choice") || g.includes("mint")) return "top";
  if (g.includes("au") || g.includes("ef") || g.includes("xf")) return "mid";
  return "base";
}

// Grade hierarchy — Mint State reads as Radiant Intelligence Blue,
// About Uncirculated as silver-gray, VF and below as muted dark gray.
const TIER_META: Record<GradeTier, { color: string; label: string; r: number }> = {
  top: { color: "oklch(0.78 0.11 238)", label: "MS · Mint State", r: 6 },
  mid: { color: "oklch(0.78 0.01 250)", label: "AU · About Uncirculated", r: 5 },
  base: { color: "oklch(0.48 0.005 250)", label: "VF and below", r: 4 },
};

function MarketSection({ coin }: { coin: Coin }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Chronological order (oldest → newest) for the chart
  const chrono = [...coin.market.auctions]
    .map((a, originalIndex) => ({ a, originalIndex }))
    .reverse();

  const prices = coin.market.auctions.map((a) => a.priceNum);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = Math.max(max - min, 1);

  const W = 600;
  const H = 180;
  const padL = 36;
  const padR = 16;
  const padT = 18;
  const padB = 28;

  const pts = chrono.map((c, i) => {
    const x = padL + (i / Math.max(chrono.length - 1, 1)) * (W - padL - padR);
    const y = padT + (1 - (c.a.priceNum - min) / range) * (H - padT - padB);
    return { x, y, ...c };
  });

  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${H - padB} L ${pts[0].x} ${H - padB} Z`;

  const activePointIndex =
    hovered !== null ? hovered : selected !== null ? selected : null;
  const activeAuctionIndex =
    activePointIndex !== null ? pts[activePointIndex].originalIndex : null;

  const TrendIcon =
    coin.market.trend.direction === "up"
      ? TrendingUp
      : coin.market.trend.direction === "down"
      ? TrendingDown
      : Minus;

  const onPointActivate = (i: number) => {
    setSelected(i);
    // On mobile open the bottom sheet
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      setSheetOpen(true);
    }
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

  const estimateFor = (priceNum: number) =>
    Math.round(priceNum / 1.08 / 50) * 50;

  // y-axis ticks
  const ticks = [min, min + range / 2, max];

  return (
    <div className="space-y-14">
      {/* MARKET INTELLIGENCE — interpretation first */}
      <div className="rounded-2xl border border-border/40 bg-card/30 px-6 py-7 md:px-8 md:py-8">
        <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Market Intelligence
        </div>
        <p className="mt-4 font-serif text-lg italic leading-[1.55] text-foreground/90 md:text-2xl">
          {coin.market.trend.direction === "up"
            ? `Prices have risen ${coin.market.trend.pct} over the last ${coin.market.trend.window}.`
            : coin.market.trend.direction === "down"
            ? `Prices have softened ${coin.market.trend.pct} over the last ${coin.market.trend.window}.`
            : `Prices have held steady across the last ${coin.market.trend.window}.`}
        </p>
        <ul className="mt-4 space-y-2 text-[13px] font-light leading-[1.7] text-muted-foreground md:text-sm">
          <li>· High-grade examples (MS and finer) consistently command a meaningful premium.</li>
          <li>
            · Recent activity is healthy — {coin.market.activity.lots12m} auction
            appearances in the last 12 months at a {coin.market.activity.sellThrough} sell-through.
          </li>
          <li>
            · Realised prices land {coin.market.activity.medianPremium.toLowerCase()},
            indicating sustained competition among advanced collectors.
          </li>
        </ul>
      </div>

      {/* MARKET SUMMARY — understanding before evidence */}
      {coin.market.summary && (
        <div>
          <div className="mb-5 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Market Summary
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-5">
            <SummaryCell label="Appearances" value={String(coin.market.summary.totalAppearances)} />
            <SummaryCell label="Median Price" value={coin.market.summary.medianPrice} />
            <SummaryCell label="Highest Result" value={coin.market.summary.highestResult} />
            <SummaryCell label="Lowest Result" value={coin.market.summary.lowestResult} />
            <SummaryCell label="Most Common Grade" value={coin.market.summary.mostCommonGrade} />
          </div>
        </div>
      )}

      {/* GRADE DISTRIBUTION */}
      {coin.market.gradeDistribution && (
        <GradeDistributionChart data={coin.market.gradeDistribution} />
      )}

      {/* ESTIMATED VALUE BY GRADE */}
      {coin.market.estimatedByGrade && (
        <EstimatedByGradeChart data={coin.market.estimatedByGrade} />
      )}

      {/* INDICATORS */}
      <div className="grid gap-px overflow-hidden rounded-xl border border-border/40 bg-border/40 md:grid-cols-3">
        <Stat
          label="Market Momentum"
          value={
            <span className="inline-flex items-center gap-2">
              <TrendIcon className="size-5" strokeWidth={1.5} />
              {coin.market.trend.pct}
            </span>
          }
          sub={`Trend over ${coin.market.trend.window}`}
        />
        <Stat
          label="Market Activity"
          value={String(coin.market.activity.lots12m)}
          sub={`Auction appearances in last 12 mo · ${coin.market.activity.sellThrough} sold`}
        />
        <Stat
          label="Auction Performance"
          value={coin.market.activity.medianPremium}
          sub="Median result vs. auction estimate"
        />
      </div>

      {/* PRICE HISTORY — numismatic auction chart */}
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Auction Record
            </div>
            <div className="mt-1 font-serif text-sm italic text-muted-foreground">
              Each point is a real sale. Color reflects grade.
            </div>
          </div>
          <div className="hidden font-serif text-sm italic text-muted-foreground md:block">
            {chrono[0].a.date} → {chrono[chrono.length - 1].a.date}
          </div>
        </div>

        <div className="relative rounded-xl border border-border/40 bg-card/30 p-4">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="h-56 w-full md:h-64"
            onMouseLeave={() => setHovered(null)}
          >
            <defs>
              <linearGradient id="priceFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.12 240)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="oklch(0.72 0.12 240)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* y grid + labels */}
            {ticks.map((t, i) => {
              const y = padT + (1 - (t - min) / range) * (H - padT - padB);
              return (
                <g key={i}>
                  <line
                    x1={padL}
                    x2={W - padR}
                    y1={y}
                    y2={y}
                    stroke="oklch(0.3 0.01 250)"
                    strokeOpacity="0.35"
                    strokeDasharray="2 4"
                  />
                  <text
                    x={padL - 6}
                    y={y + 3}
                    textAnchor="end"
                    fontSize="9"
                    fill="oklch(0.62 0.01 250)"
                    fontFamily="Inter, sans-serif"
                  >
                    €{formatPrice(t)}
                  </text>
                </g>
              );
            })}

            {/* area + line */}
            <path d={areaPath} fill="url(#priceFill)" />
            <path
              d={linePath}
              fill="none"
              stroke="oklch(0.78 0.04 230)"
              strokeOpacity="0.65"
              strokeWidth="1.25"
            />

            {/* x labels (first/middle/last) */}
            {[0, Math.floor(pts.length / 2), pts.length - 1].map((i) => (
              <text
                key={`xl-${i}`}
                x={pts[i].x}
                y={H - 8}
                textAnchor="middle"
                fontSize="9"
                fill="oklch(0.62 0.01 250)"
                fontFamily="Inter, sans-serif"
              >
                {pts[i].a.date}
              </text>
            ))}

            {/* points */}
            {pts.map((p, i) => {
              const tier = gradeTier(p.a.grade);
              const meta = TIER_META[tier];
              const isActive = activePointIndex === i;
              return (
                <g key={i}>
                  {isActive && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={meta.r + 6}
                      fill={meta.color}
                      fillOpacity="0.18"
                    />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={meta.r}
                    fill={meta.color}
                    stroke="oklch(0.12 0.005 250)"
                    strokeWidth="1.5"
                  />
                  {/* invisible hit target */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={16}
                    fill="transparent"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHovered(i)}
                    onClick={() => onPointActivate(i)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Desktop floating card */}
          {activePointIndex !== null && (
            <FloatingAuctionCard
              point={pts[activePointIndex]}
              boxW={W}
              boxH={H}
              estimate={estimateFor(pts[activePointIndex].a.priceNum)}
            />
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {(Object.keys(TIER_META) as GradeTier[]).map((t) => (
            <span key={t} className="inline-flex items-center gap-2">
              <span
                className="inline-block size-2.5 rounded-full"
                style={{ background: TIER_META[t].color }}
              />
              {TIER_META[t].label}
            </span>
          ))}
        </div>
      </div>

      {/* RECENT SALES — connected to chart */}
      <div>
        <div className="mb-5 flex items-baseline justify-between">
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Recent sales
          </div>
          {activeAuctionIndex !== null && (
            <button
              onClick={() => {
                setSelected(null);
                setHovered(null);
              }}
              className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-ice"
            >
              Clear selection
            </button>
          )}
        </div>
        <div className="divide-y divide-border/40">
          <div className="hidden grid-cols-[1.4fr_1fr_0.8fr_0.8fr_1fr] gap-4 pb-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:grid">
            <div>Auction house</div>
            <div>Date</div>
            <div>Grade</div>
            <div>Lot</div>
            <div className="text-right">Result</div>
          </div>
          {coin.market.auctions.map((a, i) => {
            const tier = gradeTier(a.grade);
            const isActive = activeAuctionIndex === i;
            // Map original index back to chart point index
            const chartIndex = pts.findIndex((p) => p.originalIndex === i);
            return (
              <button
                key={i}
                onClick={() => setSelected(chartIndex)}
                onMouseEnter={() => setHovered(chartIndex)}
                onMouseLeave={() => setHovered(null)}
                className={`grid w-full grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-4 text-left transition md:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_1fr] md:items-baseline ${
                  isActive
                    ? "bg-ice/[0.04] px-3 -mx-3 rounded-md"
                    : "hover:bg-card/40 px-3 -mx-3 rounded-md"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block size-2 shrink-0 rounded-full"
                    style={{ background: TIER_META[tier].color }}
                  />
                  <span className="font-serif text-base text-foreground md:text-lg">
                    {a.house}
                  </span>
                </div>
                <div className="order-3 col-span-2 text-xs text-muted-foreground md:order-none md:col-span-1 md:text-sm">
                  {a.date}
                </div>
                <div className="order-4 col-span-2 text-xs text-muted-foreground md:order-none md:col-span-1 md:text-sm">
                  <span className="md:hidden">Grade · </span>
                  {a.grade}
                </div>
                <div className="order-5 col-span-2 hidden text-sm text-muted-foreground md:block">
                  {a.lot ? `#${a.lot}` : "—"}
                </div>
                <div
                  className={`text-right font-serif text-lg md:text-xl ${
                    isActive ? "text-ice text-aura" : "text-ice"
                  }`}
                >
                  {a.price}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile bottom sheet for point detail */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl border-border/60 bg-background p-0 md:hidden"
        >
          {activePointIndex !== null && (
            <AuctionDetail
              record={pts[activePointIndex].a}
              estimate={estimateFor(pts[activePointIndex].a.priceNum)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function FloatingAuctionCard({
  point,
  boxW,
  boxH,
  estimate,
}: {
  point: { x: number; y: number; a: AuctionRecord };
  boxW: number;
  boxH: number;
  estimate: number;
}) {
  const leftPct = (point.x / boxW) * 100;
  const topPct = (point.y / boxH) * 100;
  // Flip card to other side near edges
  const flipX = leftPct > 65;
  const flipY = topPct < 35;
  return (
    <div
      className="pointer-events-none absolute z-10 hidden md:block"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: `translate(${flipX ? "calc(-100% - 14px)" : "14px"}, ${
          flipY ? "10px" : "calc(-100% - 10px)"
        })`,
      }}
    >
      <div className="w-64 rounded-xl border border-ice/30 bg-background/95 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur">
        <div className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
          {point.a.house}
        </div>
        <div className="mt-1 font-serif text-2xl text-ice">{point.a.price}</div>
        <div className="mt-1 text-xs font-light text-muted-foreground">
          Estimate €{new Intl.NumberFormat("en-US").format(estimate)}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border/40 pt-3">
          <Detail label="Sale date" value={point.a.date} />
          <Detail label="Grade" value={point.a.grade} />
          {point.a.lot && <Detail label="Lot" value={`#${point.a.lot}`} />}
        </div>
      </div>
    </div>
  );
}

function AuctionDetail({ record, estimate }: { record: AuctionRecord; estimate: number }) {
  return (
    <div className="px-5 pb-8 pt-6">
      <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border/80" />
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        {record.house}
      </div>
      <div className="mt-2 font-serif text-4xl text-ice">{record.price}</div>
      <div className="mt-1 text-sm font-light text-muted-foreground">
        Estimate €{new Intl.NumberFormat("en-US").format(estimate)}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/40 pt-5">
        <Detail label="Sale date" value={record.date} />
        <Detail label="Grade" value={record.grade} />
        {record.lot && <Detail label="Lot" value={`#${record.lot}`} />}
      </div>
      <div className="mt-6 flex gap-3">
        <button className="flex-1 rounded-md border border-ice/40 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-ice transition hover:bg-ice/10">
          View Lot
        </button>
        <button className="flex-1 rounded-md border border-border/60 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition hover:border-ice/40 hover:text-ice">
          View Images
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground">{label}</div>
      <div className="mt-1 font-serif text-base text-foreground">{value}</div>
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

  // Derive finest known across both services
  const gradeOrder = ["MS", "AU", "EF", "VF", "F", "VG", "G"];
  const parseGrade = (g: string) => {
    const prefix = gradeOrder.find((p) => g.startsWith(p)) || "";
    const num = parseInt(g.replace(/\D/g, ""), 10) || 0;
    return { prefix, num, raw: g };
  };
  const ngcParsed = parseGrade(ngc.topGrade);
  const pcgsParsed = parseGrade(pcgs.topGrade);
  const finest =
    gradeOrder.indexOf(ngcParsed.prefix) > gradeOrder.indexOf(pcgsParsed.prefix)
      ? { grade: ngc.topGrade, count: ngc.finer, source: "NGC" }
      : gradeOrder.indexOf(ngcParsed.prefix) < gradeOrder.indexOf(pcgsParsed.prefix)
        ? { grade: pcgs.topGrade, count: pcgs.finer, source: "PCGS" }
        : ngcParsed.num >= pcgsParsed.num
          ? { grade: ngc.topGrade, count: ngc.finer, source: "NGC" }
          : { grade: pcgs.topGrade, count: pcgs.finer, source: "PCGS" };

  return (
    <div className="space-y-14">
      {/* KNOWN EXAMPLES — dominant conclusion */}
      {knownExamples !== undefined && (
        <div>
          <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Known Examples
          </div>
          <div className="mt-5 font-serif text-7xl leading-none text-ice text-aura md:text-8xl">
            {knownExamples}
          </div>
          <p className="mt-6 max-w-xl font-serif text-lg italic leading-[1.6] text-muted-foreground md:text-xl">
            Across grading services, auction records and documented collections.
            High-grade survivors remain materially scarcer than the headline figure suggests.
          </p>
        </div>
      )}

      {/* FINEST KNOWN — second insight */}
      <div className="border-t border-border/30 pt-10">
        <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Finest Known
        </div>
        <div className="mt-4 flex items-baseline gap-5">
          <div className="font-serif text-5xl text-ice md:text-6xl">{finest.grade}</div>
          <div className="text-sm font-light text-muted-foreground">
            {finest.count} example{finest.count === 1 ? "" : "s"} at the highest recorded grade
          </div>
        </div>
      </div>

      {/* GRADING SERVICES — supporting evidence, minimal */}
      <div className="border-t border-border/30 pt-10">
        <div className="mb-6 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Grading Services
        </div>
        <div className="space-y-6">
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <div className="flex items-baseline gap-4">
              <span className="w-12 text-sm font-medium text-foreground">NGC</span>
              <span className="text-sm text-muted-foreground">{ngc.graded} Certified</span>
            </div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Finest Known
              </span>
              <span className="font-serif text-xl text-ice">{ngc.topGrade}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <div className="flex items-baseline gap-4">
              <span className="w-12 text-sm font-medium text-foreground">PCGS</span>
              <span className="text-sm text-muted-foreground">{pcgs.graded} Certified</span>
            </div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Finest Known
              </span>
              <span className="font-serif text-xl text-ice">{pcgs.topGrade}</span>
            </div>
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
