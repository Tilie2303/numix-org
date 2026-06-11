import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Camera, Upload, ArrowUpRight, Keyboard } from "lucide-react";
import { useRef, useState } from "react";

export const Route = createFileRoute("/search/photo")({
  head: () => ({
    meta: [
      { title: "NUMIX — Suche per Foto" },
      { name: "description", content: "Seltene Münzen anhand einer Fotografie identifizieren — Bild hochladen oder live aufnehmen." },
    ],
  }),
  component: PhotoSearch,
});

function PhotoSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 aura-hero animate-aura" />
      <SiteHeader />

      <section className="relative z-10 mx-auto flex max-w-3xl flex-col px-6 pt-12 pb-24">
        <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Visuelle Identifikation
        </div>
        <h1 className="mt-5 font-serif text-4xl tracking-tight text-foreground md:text-5xl">
          Suche per <span className="italic text-ice text-aura">Foto.</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          Wählen Sie, wie Sie die Münze vorlegen möchten. Das System liest Umschrift,
          Ikonographie und Fabrik und schlägt darauf eine Zuordnung vor.
        </p>

        {/* ─── TWO-CHOICE PANEL ─── */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* Take a photo */}
          <Link
            to="/search/photo/capture"
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-7 backdrop-blur-xl transition hover:border-aura"
          >
            <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 aura-soft opacity-60" />
            <div className="relative flex size-12 items-center justify-center rounded-full border border-ice/30 bg-ice/[0.06] text-ice">
              <Camera className="size-5" strokeWidth={1.4} />
            </div>
            <div className="relative mt-6 font-serif text-2xl text-foreground transition group-hover:text-ice">
              Foto aufnehmen
            </div>
            <p className="relative mt-2 text-xs leading-relaxed text-muted-foreground">
              Kamera öffnen und die Münze unmittelbar erfassen. Geeignet für Stücke
              in der Hand bei kontrolliertem Licht.
            </p>
            <div className="relative mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ice">
              Kamera öffnen <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
            </div>
          </Link>

          {/* Upload a file */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-7 text-left backdrop-blur-xl transition hover:border-aura"
          >
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 aura-soft opacity-50" />
            <div className="relative flex size-12 items-center justify-center rounded-full border border-border/60 bg-card/40 text-foreground/80">
              <Upload className="size-5" strokeWidth={1.4} />
            </div>
            <div className="relative mt-6 font-serif text-2xl text-foreground transition group-hover:text-ice">
              Fotografie hochladen
            </div>
            <p className="relative mt-2 text-xs leading-relaxed text-muted-foreground">
              Wählen Sie eine bestehende Aufnahme von Avers oder Revers — vom Gerät,
              aus einem Katalogscan oder einem Auktionsarchiv.
            </p>
            <div className="relative mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-foreground/70 transition group-hover:text-ice">
              Datei auswählen <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setPreview(URL.createObjectURL(f));
              }}
            />
          </button>
        </div>

        {/* ─── PREVIEW AFTER UPLOAD ─── */}
        {preview && (
          <div className="mt-10 overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              <span>Gewählte Aufnahme</span>
              <button
                onClick={() => setPreview(null)}
                className="transition hover:text-ice"
              >
                Ersetzen
              </button>
            </div>
            <div className="mt-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-background/60">
              <img src={preview} alt="" className="max-h-full max-w-full object-contain" />
            </div>
            <button
              type="button"
              className="mt-5 w-full rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Identifizieren
            </button>
          </div>
        )}

        {/* ─── GUIDANCE ─── */}
        <div className="mt-14 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <Tip n="01" label="Gleichmäßiges Licht" />
          <Tip n="02" label="Neutraler Hintergrund" />
          <Tip n="03" label="Beide Seiten" />
        </div>

        {/* ─── PREFER TO TYPE ─── */}
        <Link
          to="/search"
          className="group mt-14 mx-auto flex max-w-lg items-center gap-4 rounded-2xl border border-border/50 bg-card/30 p-5 backdrop-blur-xl transition hover:border-aura"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card/40 text-foreground/80 transition group-hover:text-ice">
            <Keyboard className="size-4" strokeWidth={1.4} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-serif text-lg text-foreground transition group-hover:text-ice">
              Lieber tippen?
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              Wechseln Sie zur verfeinerten Textsuche.
            </div>
          </div>
          <div className="inline-flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-[0.28em] text-foreground/70 transition group-hover:text-ice">
            Verfeinerte Suche <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </div>
        </Link>
      </section>
    </div>
  );
}

function Tip({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card/30 px-4 py-3 backdrop-blur-xl">
      <div className="font-serif text-base text-ice">{n}</div>
      <div className="mt-1">{label}</div>
    </div>
  );
}
