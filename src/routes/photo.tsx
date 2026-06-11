import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Camera, Upload, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/photo")({
  head: () => ({
    meta: [
      { title: "NUMIX — Identify by photo" },
      { name: "description", content: "Upload a photograph of a coin for identification." },
    ],
  }),
  component: PhotoPage,
});

function PhotoPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onFile = (file: File | null) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 aura-hero animate-aura" />
      <SiteHeader />

      <section className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 pt-16 pb-24">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground transition hover:text-ice"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} />
          Back
        </Link>

        <h1 className="font-serif text-[2rem] leading-[1.05] tracking-tight text-foreground md:text-[2.4rem] text-center">
          Identify <span className="italic text-ice text-aura">by photograph.</span>
        </h1>
        <p className="mt-4 max-w-md text-center text-sm text-muted-foreground">
          Upload a clear image of the obverse or reverse. Our visual layer matches it against
          provenance records, auction archives and reference plates.
        </p>

        <div
          onClick={() => inputRef.current?.click()}
          className="group mt-12 flex w-full cursor-pointer flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-border/40 bg-card/40 backdrop-blur-xl px-8 py-16 transition hover:border-ice/40"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-72 rounded-2xl object-contain" />
          ) : (
            <>
              <Camera className="size-10 text-muted-foreground transition group-hover:text-ice" strokeWidth={1.2} />
              <div className="text-center">
                <p className="text-sm text-foreground">Drop a photograph or click to upload</p>
                <p className="mt-1 text-xs text-muted-foreground">JPG · PNG · HEIC · up to 20MB</p>
              </div>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />

          <button
            type="button"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
          >
            <Upload className="size-3.5" strokeWidth={1.5} />
            {preview ? "Choose another" : "Upload image"}
          </button>
        </div>
      </section>
    </div>
  );
}
