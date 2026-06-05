import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { AuraField } from "@/components/AuraField";
import { LiveDemo } from "@/components/LiveDemo";
import editorialRevelation from "@/assets/editorial-revelation.jpg";
import editorialLightMetal from "@/assets/editorial-light-metal.jpg";
import editorialVitrine from "@/assets/editorial-vitrine.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RARE — The intelligence layer behind rare coins" },
      { name: "description", content: "Understanding first. Evidence on demand." },
      { property: "og:title", content: "RARE — The intelligence layer behind rare coins" },
      { property: "og:description", content: "Understanding first. Evidence on demand." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 aura-hero animate-aura" />

      <SiteHeader />

      {/* ───────── HERO ───────── */}
      <section className="relative z-10 flex flex-col items-center px-6 pt-16 pb-16 md:pt-20 md:pb-20">
        <h1 className="animate-rise max-w-2xl text-center font-serif text-[2.4rem] leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-[3.6rem]">
          What is rare,
          <br />
          <span className="italic text-ice text-aura">is known.</span>
        </h1>

        <div className="mt-12 w-full animate-rise delay-2 flex justify-center">
          <AuraField />
        </div>
      </section>

      {/* ───────── LIVE DEMO ───────── */}
      <section className="relative z-10 flex justify-center px-6 pb-36">
        <LiveDemo />
      </section>

      {/* ───────── MOOD — Revelation (after the demo) ───────── */}
      <section className="relative z-10 w-full">
        <div className="relative h-[88vh] min-h-[620px] w-full overflow-hidden md:h-screen">
          <img
            src={editorialRevelation}
            alt=""
            loading="lazy"
            width={1920}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />
        </div>
      </section>


      {/* ───────── UNDERSTANDING ───────── */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="font-serif text-[2rem] leading-[1.05] tracking-tight md:text-5xl">
          Understanding,
          <br />
          <span className="italic text-ice text-aura">before data.</span>
        </h2>
      </section>

      {/* ───────── EDITORIAL II ───────── */}
      <EditorialChapter
        image={editorialLightMetal}
        statement={<>Every coin <span className="italic text-ice">a verdict.</span></>}
        align="left"
      />

      {/* ───────── EVIDENCE ───────── */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="font-serif text-[2rem] leading-[1.05] tracking-tight md:text-5xl">
          Evidence,
          <br />
          <span className="italic text-ice text-aura">when you ask.</span>
        </h2>
      </section>

      {/* ───────── EDITORIAL III ───────── */}
      <EditorialChapter
        image={editorialVitrine}
        statement={<>Held <span className="italic text-ice">quietly.</span></>}
        align="right"
      />

      {/* ───────── CLOSING SEARCH ───────── */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pt-28 pb-36 text-center">
        <h2 className="font-serif text-[2rem] leading-[1.05] tracking-tight md:text-5xl">
          <span className="italic text-ice text-aura">Begin.</span>
        </h2>

        <div className="mt-12 flex justify-center">
          <AuraField />
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/30 px-8 py-12 md:px-14">
        <div className="flex items-center justify-between">
          <span className="font-serif text-base tracking-[0.2em] text-foreground">RARE</span>
          <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">By invitation</span>
        </div>
      </footer>
    </div>
  );
}

function EditorialChapter({
  image,
  statement,
  align,
}: {
  image: string;
  statement: React.ReactNode;
  align: "left" | "right";
}) {
  return (
    <section className="relative z-10 w-full">
      <div className="relative h-[80vh] min-h-[560px] w-full overflow-hidden md:h-[92vh]">
        <img
          src={image}
          alt=""
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 bg-background/10" />

        <div
          className={`absolute inset-0 flex items-end px-8 pb-20 md:items-center md:px-24 md:pb-0 ${
            align === "right" ? "md:justify-end" : "md:justify-start"
          }`}
        >
          <div className="max-w-xl">
            <h3 className="font-serif text-[1.75rem] leading-[1.05] tracking-tight text-foreground md:text-[2.4rem]">
              {statement}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
