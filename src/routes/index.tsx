import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { AuraField } from "@/components/AuraField";
import { LiveDemo } from "@/components/LiveDemo";
import editorialGlovedHand from "@/assets/editorial-gloved-hand.jpg";
import editorialLightMetal from "@/assets/editorial-light-metal.jpg";
import editorialVitrine from "@/assets/editorial-vitrine.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RARE — The intelligence layer behind rare coins" },
      {
        name: "description",
        content: "Understanding first. Evidence on demand.",
      },
      { property: "og:title", content: "RARE — The intelligence layer behind rare coins" },
      { property: "og:description", content: "Understanding first. Evidence on demand." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      {/* Hero ambient */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 aura-hero animate-aura" />

      <SiteHeader />

      {/* ───────── HERO ───────── */}
      <section className="relative z-10 flex flex-col items-center px-6 pt-20 pb-40 md:pt-32 md:pb-56">
        <h1 className="animate-rise max-w-5xl text-center font-serif text-6xl leading-[0.95] tracking-tight text-foreground md:text-8xl lg:text-[8.5rem]">
          The rare,
          <br />
          <span className="italic text-ice text-aura">understood.</span>
        </h1>

        <div className="mt-20 w-full animate-rise delay-2 flex justify-center">
          <AuraField />
        </div>
      </section>

      {/* ───────── LIVE DEMO ───────── */}
      <section className="relative z-10 flex justify-center px-6 pb-48">
        <LiveDemo />
      </section>

      {/* ───────── EDITORIAL I — Discovery ───────── */}
      <EditorialChapter
        image={editorialGlovedHand}
        alt="A white-gloved hand revealing a single coin"
        statement={
          <>
            What you hold
            <br />
            is rarely <span className="italic text-ice">what you think.</span>
          </>
        }
        align="right"
      />

      {/* ───────── UNDERSTANDING FIRST ───────── */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-48 text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          I
        </div>
        <h2 className="mt-10 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
          Understanding,
          <br />
          <span className="italic text-ice text-aura">before data.</span>
        </h2>
      </section>

      {/* ───────── EDITORIAL II — Light through metal ───────── */}
      <EditorialChapter
        image={editorialLightMetal}
        alt="An ancient coin emerging from darkness"
        statement={
          <>
            Every coin
            <br />
            carries <span className="italic text-ice">a verdict.</span>
          </>
        }
        align="left"
      />

      {/* ───────── EVIDENCE ON DEMAND ───────── */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-48 text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          II
        </div>
        <h2 className="mt-10 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
          Evidence,
          <br />
          <span className="italic text-ice text-aura">when you ask.</span>
        </h2>
      </section>

      {/* ───────── EDITORIAL III — Private vitrine ───────── */}
      <EditorialChapter
        image={editorialVitrine}
        alt="A private gallery vitrine"
        statement={
          <>
            A private intelligence,
            <br />
            <span className="italic text-ice">held quietly.</span>
          </>
        }
        align="right"
      />

      {/* ───────── MARKET INTELLIGENCE ───────── */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-48 pb-56 text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          III
        </div>
        <h2 className="mt-10 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
          The market,
          <br />
          <span className="italic text-ice text-aura">interpreted.</span>
        </h2>

        <div className="mt-24 flex justify-center">
          <AuraField />
        </div>
      </section>

      {/* ───────── COLOPHON ───────── */}
      <footer className="relative z-10 border-t border-border/30 px-8 py-12 text-[10px] uppercase tracking-[0.32em] text-muted-foreground md:px-14">
        <div className="flex items-center justify-between">
          <span className="font-serif text-base tracking-[0.2em] normal-case text-foreground">RARE</span>
          <span>By invitation</span>
        </div>
      </footer>
    </div>
  );
}

function EditorialChapter({
  image,
  alt,
  statement,
  align,
}: {
  image: string;
  alt: string;
  statement: React.ReactNode;
  align: "left" | "right";
}) {
  return (
    <section className="relative z-10 w-full">
      <div className="relative h-[80vh] min-h-[560px] w-full overflow-hidden md:h-[92vh]">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* edge fade into the page */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 bg-background/10" />

        <div
          className={`absolute inset-0 flex items-end px-8 pb-20 md:items-center md:px-20 md:pb-0 ${
            align === "right" ? "md:justify-end" : "md:justify-start"
          }`}
        >
          <div className="max-w-xl">
            <h3 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
              {statement}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
