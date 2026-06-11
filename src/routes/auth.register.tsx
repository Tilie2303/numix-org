import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/auth/register")({
  head: () => ({
    meta: [
      { title: "NUMIX — Einladung anfragen" },
      { name: "description", content: "Zugang zum privaten NUMIX-Recherche-Terminal anfragen." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 aura-hero animate-aura" />
      <SiteHeader />
      <section className="relative z-10 mx-auto flex max-w-md flex-col px-6 pt-12 pb-24">
        <h1 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl">
          Zugang <span className="italic text-ice text-aura">anfragen.</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          NUMIX wird auf Einladung gewährt. Erzählen Sie uns von Ihrer Sammlung.
        </p>

        <form className="mt-12 space-y-6">
          <Field label="Vollständiger Name" type="text" placeholder="Friedrich August" />
          <Field label="E-Mail" type="email" placeholder="sie@bibliothek.de" />
          <Field label="Sammelschwerpunkt" type="text" placeholder="Sächsische Taler, 17.–18. Jh." />
          <Field label="Passwort" type="password" placeholder="••••••••" />
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Anfrage senden
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Bereits Mitglied?{" "}
          <Link to="/auth/login" className="transition hover:text-ice">
            Anmelden
          </Link>
        </div>
      </section>
    </div>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full rounded-full border border-border/50 bg-card/50 px-5 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/60 backdrop-blur-xl focus:border-aura focus:outline-none"
      />
    </label>
  );
}
