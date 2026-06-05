import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { AuraField } from "@/components/AuraField";
import { LiveDemo } from "@/components/LiveDemo";
import editorialUnderstanding from "@/assets/editorial-understanding.jpg";
import editorialEvidence from "@/assets/editorial-evidence.jpg";
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
          The Intelligence
          <br />
          <span className="italic text-ice text-aura">Behind Rarity.</span>
        </h1>

        <div className="mt-12 w-full animate-rise delay-2 flex justify-center">
          <AuraField />
        </div>
      </section>

      {/* ───────── LIVE DEMO ───────── */}
      <section className="relative z-10 flex justify-center px-6 pb-36">
        <LiveDemo />
      </section>



      {/* ───────── UNDERSTANDING ───────── */}
      <EditorialChapter
        image={editorialUnderstanding}
        statement={<>Understanding,<br /><span className="italic text-ice">before data.</span></>}
        align="left"
      />

      {/* ───────── EVIDENCE ───────── */}
      <EditorialChapter
        image={editorialEvidence}
        statement={<>Evidence,<br /><span className="italic text-ice">when you ask.</span></>}
        align="right"
      />


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
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden md:h-[70vh]">
        <img
          src={image}
          alt=""
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* top fade into page */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
        {/* bottom anchor — heavy on mobile so the statement always reads, lighter on desktop */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-background via-background/85 to-transparent md:h-[55%] md:via-background/40" />

        <div
          className={`absolute inset-0 flex items-end px-7 pb-16 md:items-center md:px-24 md:pb-0 ${
            align === "right" ? "md:justify-end" : "md:justify-start"
          }`}
        >
          <div className="max-w-xl">
            <h3
              className="font-serif text-[2.1rem] leading-[1.02] tracking-tight text-foreground md:text-[2.4rem]"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
            >
              {statement}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

