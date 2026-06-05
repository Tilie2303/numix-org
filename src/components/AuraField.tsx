import { Search, Camera } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { RefineSheet } from "@/components/RefineSheet";

export function AuraField({ minimal = false }: { minimal?: boolean }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const submit = (q?: string) => {
    const query = (q ?? value).trim();
    navigate({ to: "/search", search: query ? { q: query } : {} });
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute inset-0 -m-24 aura-field animate-aura pointer-events-none" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="relative"
      >
        <div className="relative flex items-center gap-3 rounded-full border-aura bg-card/40 backdrop-blur-xl pl-6 pr-2 py-2">
          <Search className="size-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Tetradrachm of Athens, 5th century BC…"
            className="flex-1 bg-transparent py-3 text-base font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Search
          </button>
        </div>
      </form>

      {!minimal && (
        <div className="mt-6 flex items-center justify-center gap-7 text-xs text-muted-foreground">
          <button className="inline-flex items-center gap-2 transition hover:text-ice">
            <Camera className="size-3.5" strokeWidth={1.5} />
            By photo
          </button>
          <span className="opacity-30">·</span>
          <RefineSheet />
        </div>
      )}
    </div>
  );
}
