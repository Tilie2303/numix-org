import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { AuraField } from "@/components/AuraField";
import { LiveDemo } from "@/components/LiveDemo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RARE — The intelligence layer behind rare coins" },
      {
        name: "description",
        content:
          "RARE interprets rare coins. Understanding first. Evidence on demand. Search by name, ruler, year, reference or photograph.",
      },
      { property: "og:title", content: "RARE — The intelligence layer behind rare coins" },
      {
        property: "og:description",
        content: "Understanding first. Evidence on demand.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      {/* atmospheric ambient light */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 aura-hero animate-aura" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-background to-transparent" />

      <SiteHeader />

      <main className="relative z-10 flex flex-col items-center px-6 pt-16 pb-32 md:pt-28">
        <div className="mb-8 animate-rise text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          The intelligence layer behind rare coins
        </div>

        <h1 className="animate-rise delay-1 max-w-4xl text-center font-serif text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]">
          Identify, understand
          <br />
          <span className="italic text-ice text-aura">and value</span> rare coins.
        </h1>

        <p className="animate-rise delay-2 mt-8 max-w-xl text-center text-base font-light leading-relaxed text-muted-foreground md:text-lg">
          Most platforms hand you data. RARE interprets it first — so you understand
          a coin within seconds, and the evidence is always one breath away.
        </p>

        <div className="mt-14 w-full animate-rise delay-2 flex justify-center">
          <AuraField />
        </div>

        <div className="mt-24 w-full flex justify-center">
          <LiveDemo />
        </div>

        <div className="mt-32 grid w-full max-w-4xl gap-12 text-center md:grid-cols-3 animate-rise delay-4">
          <Principle title="Search" body="A single field. Name, ruler, year, reference or photograph." />
          <Principle title="Understand" body="Value, rarity, demand and confidence — read in seconds." />
          <Principle title="Prove" body="Auctions, populations, provenance — revealed when you ask." />
        </div>
      </main>
    </div>
  );
}

function Principle({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className="font-serif text-2xl text-foreground">{title}</div>
      <div className="mx-auto mt-3 h-px w-8 bg-border" />
      <div className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">{body}</div>
    </div>
  );
}
