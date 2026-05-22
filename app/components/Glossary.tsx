import Link from "next/link";

type GlossaryEntry = {
  term: string;
  short: string;
  detail: string;
};

const ENTRIES: { group: string; items: GlossaryEntry[] }[] = [
  {
    group: "Demand",
    items: [
      {
        term: "Growing demand",
        short: "Above-average projected growth, 2022–2032",
        detail:
          "The role is projected to grow faster than the NC labor market overall (above ~5% growth) per NC LEAD / NCCCS 2022–2032 projections. Translation for navigators: openings are increasing, employers may pay above median to attract talent.",
      },
      {
        term: "Strong demand",
        short: "Healthy hiring volume even if growth is flat",
        detail:
          "The role may not be growing rapidly but employers are hiring consistently — high turnover, retirements, or sustained replacement needs. Often paired with high posting volume on Indeed / NCWorks. Translation: jobs are reliably available.",
      },
      {
        term: "Moderate demand",
        short: "Steady but not expanding",
        detail:
          "Employers hire at a normal cadence; growth roughly matches NC labor market average. Roles are stable but not surging. Translation: workable, but competition for openings may be higher.",
      },
      {
        term: "Accessible entry",
        short: "Low barriers to first job",
        detail:
          "Tag added when entry typically requires no formal credential beyond a short certificate / on-the-job training, and most employers do not require previous experience.",
      },
    ],
  },
  {
    group: "Entry level",
    items: [
      {
        term: "Certificate (weeks–months)",
        short: "Short program, no degree required",
        detail:
          "Typically 4–26 weeks at a community college, NCWorks center, or accredited private trainer. Often eligible for WIOA / Pell aid. Designed for direct entry to work.",
      },
      {
        term: "Certificate 1 year",
        short: "Year-long credential program",
        detail:
          "Community-college certificate of about 30 credit hours. Combines classroom with externship. Often a clean pre-cursor to an associate (AAS) degree.",
      },
      {
        term: "Associate degree (~2 yrs)",
        short: "AAS / AAS-equivalent, ~60 credit hours",
        detail:
          "Required entry for many licensed clinical and skilled-trade roles in NC. Half academic, half technical. Pell- and WIOA-eligible.",
      },
      {
        term: "HS diploma + training",
        short: "High school plus apprenticeship or on-the-job training",
        detail:
          "Examples: registered apprenticeship, employer-paid training, military experience. No college credential required at hire.",
      },
    ],
  },
  {
    group: "Automation risk",
    items: [
      {
        term: "Low risk",
        short: "Hands-on, judgement-based, or regulated work",
        detail:
          "Tasks that resist AI / automation — patient care, building or repair work, public safety, regulated clinical work. Use with confidence in 10-year planning.",
      },
      {
        term: "Medium risk",
        short: "Some routine tasks automatable; core work secure",
        detail:
          "Administrative, scheduling, or data-entry components may shift to AI; the human-judgment portion of the role remains. Likely to see job-content change, not job-loss.",
      },
      {
        term: "High risk",
        short: "Significant displacement plausible",
        detail:
          "Mostly routine cognitive or repetitive tasks; employers may automate aggressively over the next decade. Consider pairing with upskilling into adjacent roles.",
      },
    ],
  },
  {
    group: "Criminal record accessibility",
    items: [
      {
        term: "More accessible — no licensure",
        short: "Most records won&apos;t auto-disqualify",
        detail:
          "Per NC 2019 Freedom to Work Act framing — roles without state licensure boards tend to have fewer automatic disqualifications. Most employers still run a background check; severity and recency matter.",
      },
      {
        term: "Background check required",
        short: "Standard check at hire",
        detail:
          "Employer will run a background check before hire. Not an automatic disqualifier, but some convictions (violent, drug-related, financial) may restrict.",
      },
      {
        term: "Restricted — licensure board",
        short: "Specific convictions can disqualify",
        detail:
          "Roles overseen by NC licensing boards (nursing, contractors, public safety) have explicit disqualification rules. Pre-application counseling strongly recommended.",
      },
    ],
  },
];

export function GlossaryView() {
  return (
    <section className="rounded-sm border border-[var(--color-border)] bg-white p-4 sm:p-5">
      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
        Definitions
      </div>
      <h2 className="mt-1 font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
        How to read the tags
      </h2>
      <p className="mt-1 text-xs text-[var(--color-muted)] max-w-3xl">
        We use the same vocabulary on every sector and occupation page so
        navigators and counselors can compare roles consistently. Definitions
        below are reference standards — actual postings may use different
        words.
      </p>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {ENTRIES.map((g) => (
          <div key={g.group}>
            <div className="font-display text-base uppercase tracking-wide text-[var(--color-foreground)] border-b border-[var(--color-border)] pb-1 mb-3">
              {g.group}
            </div>
            <dl className="space-y-3">
              {g.items.map((e) => (
                <div key={e.term}>
                  <dt className="text-sm font-bold uppercase tracking-wider text-[var(--color-foreground)]">
                    {e.term}
                  </dt>
                  <dd className="text-xs text-[var(--color-muted)] leading-snug">
                    <span className="italic">{e.short}.</span> {e.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GlossaryCallout() {
  return (
    <div className="inline-flex items-center gap-2 text-xs text-[var(--color-muted)]">
      <span>What do these tags mean?</span>
      <Link
        href="/glossary"
        className="font-semibold text-[var(--color-brand)] hover:underline"
      >
        See definitions →
      </Link>
    </div>
  );
}
