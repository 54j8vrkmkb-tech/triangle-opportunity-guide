import type { Metadata } from "next";
import Link from "next/link";
import { getStrongBenefitsOccupations, getSectorName } from "@/lib/data";
import { WizardShell } from "@/app/components/WizardShell";

export const metadata: Metadata = {
  title: "Best benefits & stability",
  description:
    "Triangle occupations at employers known for strong benefits — pensions, federal/state coverage, union protections, stable schedules.",
};

export default function BestBenefitsPage() {
  const results = getStrongBenefitsOccupations();
  return (
    <WizardShell
      eyebrow="Best benefits"
      title="Stable jobs with strong benefits"
      description="Roles whose top employers are federal, state, county, hospital systems, or union shops — the Triangle workplaces with the most predictable benefits, schedules, and pensions."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {results.map((o) => (
          <Link
            key={o.id}
            href={`/occupations/${o.id}`}
            className="group flex flex-col gap-2 rounded-sm border border-[var(--color-border)] bg-white p-4 transition hover:border-[var(--color-brand)] hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
                  {getSectorName(o.sectorId)}
                </div>
                <h3 className="font-display text-lg uppercase tracking-wide text-[var(--color-foreground)] leading-tight group-hover:text-[var(--color-brand)]">
                  {o.title}
                </h3>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-display text-xl text-[var(--color-brand)] tabular-nums leading-none">
                  ${o.wage.median.toFixed(2)}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mt-1">
                  /hr median
                </div>
              </div>
            </div>
            <div className="text-xs text-[var(--color-foreground)] leading-snug">
              <span className="font-bold uppercase tracking-wider text-[10px] text-[var(--color-muted)] block mb-0.5">
                Benefits
              </span>
              {o.jobQuality.benefits}
            </div>
            <div className="text-xs text-[var(--color-foreground)] leading-snug">
              <span className="font-bold uppercase tracking-wider text-[10px] text-[var(--color-muted)] block mb-0.5">
                Schedule
              </span>
              {o.jobQuality.schedule}
            </div>
          </Link>
        ))}
      </div>
      {results.length === 0 && (
        <p className="text-sm text-[var(--color-muted)]">No matches found.</p>
      )}
    </WizardShell>
  );
}
