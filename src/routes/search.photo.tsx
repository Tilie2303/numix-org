import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Camera, Upload } from "lucide-react";
import { useRef, useState } from "react";

export const Route = createFileRoute("/search/photo")({
  head: () => ({
    meta: [
      { title: "NUMIX — Search by photo" },
      { name: "description", content: "Identify rare coins by uploading a photograph." },
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
      <section className="relative z-10 mx-auto flex max-w-2xl flex-col px-6 pt-12 pb-24">
        <h1 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl">
          Search by <span className="italic text-ice text-aura">photo.</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Upload an obverse or reverse image. The system will read the legend, the iconography and the fabric.
        </p>

        <Link
          to="/search/photo/capture"
          className="mt-10 inline-flex items-center justify-center gap-3 rounded-full border border-ice/40 bg-ice/[0.06] px-6 py-3 text-sm text-ice shadow-[0_0_0_1px_oklch(0.78_0.11_238/0.18),0_0_24px_-8px_oklch(0.78_0.11_238/0.55)] transition hover:bg-ice/[0.12]"
        >
          <Camera className="size-4" strokeWidth={1.5} />
          Open camera
        </Link>

        <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <span className="h-px flex-1 bg-border/40" />
          or upload a file
          <span className="h-px flex-1 bg-border/40" />
        </div>

        <div className="mt-6">
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
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="group relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-dashed border-border/60 bg-card/30 backdrop-blur-xl transition hover:border-aura"
          >
            {preview ? (
              <img src={preview} alt="" className="absolute inset-0 h-full w-full object-contain" />
            ) : (
              <>
                <div className="absolute inset-0 aura-soft" />
                <Camera className="relative size-10 text-muted-foreground" strokeWidth={1} />
                <div className="relative font-serif text-xl text-foreground">
                  Place the coin here
                </div>
                <div className="relative inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Upload className="size-3.5" strokeWidth={1.5} />
                  Drop a photograph or click to select
                </div>
              </>
            )}
          </button>

          <div className="mt-8 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            <Tip n="01" label="Even light" />
            <Tip n="02" label="Black field" />
            <Tip n="03" label="Both sides" />
          </div>

          {preview && (
            <button
              type="submit"
              className="mt-10 w-full rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Identify
            </button>
          )}
        </div>

        <div className="mt-12 text-center text-xs text-muted-foreground">
          Prefer to type?{" "}
          <Link to="/search" className="transition hover:text-ice">
            Refined search
          </Link>
        </div>
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
