import type { Metadata } from "next";
import Link from "next/link";
import { EMPLOYER_SPOTLIGHTS } from "@/lib/data";
import { EmployerSpotlightCard } from "@/app/components/EmployerSpotlightCard";

export const metadata: Metadata = {
  title: "Better jobs without a credential",
  description:
    "Triangle-area employers recognized for upward mobility for workers without a four-year degree — locations, what makes them better, and how the work bridges into credentialed roles.",
};

export default function EmployersPage() {
  return (
    <>
      <section className="bg-[var(--color-accent-yellow)] border-b-4 border-[var(--color-foreground)]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
          <nav className="text-xs text-[var(--color-foreground)]/70">
            <Link href="/" className="hover:text-[var(--color-foreground)]">
              Home
            </Link>{" "}
            <span>/</span>{" "}
            <span className="font-semibold">Better jobs without a credential</span>
          </nav>
          <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[var(--color-foreground)]">
            Need a better job now
          </div>
          <h1 className="mt-1 font-display text-4xl sm:text-5xl uppercase tracking-tight text-[var(--color-foreground)] leading-[1.05] max-w-3xl">
            Large Triangle employers offering better jobs <em className="not-italic">today</em> — no credential required
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-foreground)] leading-relaxed max-w-3xl">
            You don&apos;t have to wait for a certificate to land at a high-quality
            employer. These {EMPLOYER_SPOTLIGHTS.length} <strong>large companies</strong> have
            a meaningful Triangle presence and are recognized for paying, promoting, and growing
            workers without a four-year degree — and many cover the cost of a credential later.
          </p>
          <p className="mt-3 text-xs text-[var(--color-foreground)]/80 max-w-3xl">
            Inspired by the{" "}
            <a
              href="https://www.americanopportunityindex.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              American Opportunity Index
            </a>
            , which ranks{" "}
            <strong>large US employers (roughly Fortune-scale)</strong> on hourly-worker
            mobility, wage growth, and access to skill-building. Curated here to companies with
            a real Durham, Wake, Orange, or Johnston County presence.
          </p>
          <p className="mt-3 text-xs text-[var(--color-foreground)]/80 max-w-3xl">
            <strong>Note:</strong> the AOI only tracks large employers. Plenty of{" "}
            <strong>smaller Triangle businesses</strong> — community hospitals, family-owned
            trades shops, local nonprofits, regional manufacturers — also offer high-quality
            jobs without a four-year degree. Check{" "}
            <a
              href="https://www.ncworks.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              NCWorks
            </a>
            , your county chamber of commerce, or local apprenticeship boards for those.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EMPLOYER_SPOTLIGHTS.map((e) => (
            <EmployerSpotlightCard key={e.id} employer={e} />
          ))}
        </div>

        <div className="mt-10 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            What to do with this list
          </div>
          <h2 className="mt-1 font-display text-xl uppercase tracking-wide text-[var(--color-foreground)]">
            Three ways to use it
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-foreground)]">
            <li className="flex gap-2">
              <span className="text-[var(--color-brand)] font-bold">▸</span>
              <span>
                <strong>Apply right now.</strong> Every employer link goes to their
                live careers page. Filter for Triangle locations and entry-level roles.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-brand)] font-bold">▸</span>
              <span>
                <strong>Use their tuition benefit.</strong> Most of these companies pay
                for credentials. Pair the job with one of the certificate or
                apprenticeship pathways on a profiled occupation page.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-brand)] font-bold">▸</span>
              <span>
                <strong>Follow the skill bridge.</strong> Each card lists which TOG-profiled
                occupations the work transfers into. Click any of those tags to see what the
                next step pays and how to get there.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
