import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Fit",
  description:
    "Answer a couple quick questions and we'll surface Triangle occupations that match your situation.",
};

type Path = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  whoFor: string;
};

const PATHS: Path[] = [
  {
    href: "/find-your-fit/quiz",
    eyebrow: "Quiz",
    title: "Take the job-fit quiz",
    description:
      "Answer 6 quick questions about pay, schedule, county, indoor vs outdoor, and what you actually enjoy. We rank every Triangle role to fit your answers.",
    whoFor: "You want a personalized shortlist in under a minute.",
  },
  {
    href: "/find-your-fit/fast-good-job",
    eyebrow: "Fast",
    title: "A good job, fast",
    description:
      "Roles you can enter through a short certificate, apprenticeship, or on-the-job training — and that still pay a real wage with growing demand.",
    whoFor: "You need to start earning soon.",
  },
  {
    href: "/find-your-fit/career-change",
    eyebrow: "Switch",
    title: "Change careers",
    description:
      "Tell us what you've done before — from any sector. We'll match it against Triangle roles where your existing skills carry over.",
    whoFor: "You have experience and want a new direction.",
  },
  {
    href: "/find-your-fit/level-up",
    eyebrow: "Grow",
    title: "Level up from where I am",
    description:
      "Pick the role you have now and see the higher-paying next steps in the same sector — with wages, training, and timelines.",
    whoFor: "You're already in a role and want to grow.",
  },
  {
    href: "/find-your-fit/best-benefits",
    eyebrow: "Stable",
    title: "Best benefits & stability",
    description:
      "Triangle employers known for strong benefits — pensions, federal/state coverage, union protections, and stable schedules.",
    whoFor: "You're prioritizing benefits, security, or schedule.",
  },
];

export default function FindYourFitPage() {
  return (
    <>
      <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
            The wizard
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl uppercase tracking-tight text-[var(--color-foreground)] leading-[1.05]">
            Find Your Fit
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl">
            Pick the path that sounds most like your situation. We&apos;ll
            narrow down the Triangle occupations that fit and link straight to
            training programs.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col rounded-sm border border-[var(--color-border)] bg-white p-6 transition hover:border-[var(--color-brand)] hover:shadow-md"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
                {p.eyebrow}
              </div>
              <h2 className="mt-1 font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)] leading-tight group-hover:text-[var(--color-brand)]">
                {p.title}
              </h2>
              <p className="mt-3 text-sm text-[var(--color-foreground)] leading-relaxed">
                {p.description}
              </p>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-xs italic text-[var(--color-muted)]">
                  {p.whoFor}
                </span>
                <span className="text-sm font-bold uppercase tracking-wide text-[var(--color-brand)] group-hover:text-[var(--color-brand-hover)]">
                  Start →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-xs text-[var(--color-muted)] max-w-2xl">
          Results are sourced from the Triangle Opportunity Guide&apos;s 26
          profiled occupations. None require a four-year degree.
        </p>
      </section>
    </>
  );
}
