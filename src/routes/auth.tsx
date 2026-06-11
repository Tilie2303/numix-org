import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import numixLogo from "@/assets/numix-logo.png.asset.json";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "NUMIX — Registration / Log in" },
      { name: "description", content: "Access the NUMIX private research terminal." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 aura-hero animate-aura" />

      <SiteHeader />

      <section className="relative z-10 mx-auto flex max-w-md flex-col items-center px-6 pt-20 pb-24">
        <Link to="/" className="mb-10">
          <img src={numixLogo.url} alt="NUMIX" className="h-12 w-auto opacity-90" />
        </Link>

        <h1 className="font-serif text-[2rem] leading-[1.05] tracking-tight text-foreground md:text-[2.4rem] text-center">
          {mode === "login" ? (
            <>Welcome <span className="italic text-ice text-aura">back.</span></>
          ) : (
            <>Request <span className="italic text-ice text-aura">access.</span></>
          )}
        </h1>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {mode === "login"
            ? "Continue to your private research terminal."
            : "Membership is by invitation and review."}
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 w-full space-y-4"
        >
          {mode === "register" && (
            <Field label="Full name" type="text" placeholder="Your name" />
          )}
          <Field label="Email" type="email" placeholder="you@example.com" />
          <Field label="Password" type="password" placeholder="••••••••" />

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            {mode === "login" ? "Log in" : "Request invitation"}
          </button>
        </form>

        <div className="mt-8 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          {mode === "login" ? (
            <button onClick={() => setMode("register")} className="transition hover:text-ice">
              No account · Request access
            </button>
          ) : (
            <button onClick={() => setMode("login")} className="transition hover:text-ice">
              Already a member · Log in
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.24em] text-muted-foreground mb-2">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-full border border-border/40 bg-card/50 backdrop-blur-xl px-5 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-ice/40 transition"
      />
    </label>
  );
}
