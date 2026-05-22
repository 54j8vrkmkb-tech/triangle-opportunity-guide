import type { Metadata } from "next";
import Link from "next/link";
import { GlossaryView } from "@/app/components/Glossary";
import { AudienceNote } from "@/app/components/AudienceNote";

export const metadata: Metadata = {
  title: "Definitions",
  description:
    "Standardized definitions for demand, entry-level, automation risk, and criminal-record accessibility tags used throughout the Triangle Opportunity Guide.",
};

export default function GlossaryPage() {
  return (
    <>
      <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:py-12">
          <nav className="text-xs text-[var(--color-muted)]">
            <Link href="/" className="hover:text-[var(--color-brand)]">
              Home
            </Link>{" "}
            <span className="text-[var(--color-border)]">/</span>{" "}
            <span className="text-[var(--color-foreground)] font-semibold">
              Definitions
            </span>
          </nav>
          <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            Reference
          </div>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl uppercase tracking-tight text-[var(--color-foreground)] leading-[1.05]">
            How to read the data
          </h1>
          <p className="mt-3 text-base text-[var(--color-muted)] leading-relaxed max-w-2xl">
            Every sector and occupation page uses the same vocabulary so you
            can compare roles like-for-like. Definitions below explain what
            we mean by &ldquo;growing,&rdquo; &ldquo;strong,&rdquo; entry-level
            tiers, automation risk, and criminal-record accessibility.
          </p>
          <div className="mt-4">
            <AudienceNote variant="compact" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 sm:py-12">
        <GlossaryView />
      </section>
    </>
  );
}
