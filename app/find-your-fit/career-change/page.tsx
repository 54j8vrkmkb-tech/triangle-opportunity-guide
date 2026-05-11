import type { Metadata } from "next";
import Link from "next/link";
import {
  getCareerChangeMatches,
  getOccupation,
  getSectorName,
  getStartingRolesForPastSector,
  PAST_SECTORS,
  resolveBackground,
  sectors,
} from "@/lib/data";
import { WizardShell } from "@/app/components/WizardShell";

export const metadata: Metadata = {
  title: "Change careers",
  description:
    "Share what you've done before — including common no-degree jobs from any sector — and we'll match you with Triangle occupations where your skills carry over.",
};

function normalizePast(p: string | string[] | undefined): string[] {
  if (!p) return [];
  return Array.isArray(p) ? p : [p];
}

function PickerForm({ selected }: { selected: string[] }) {
  const selectedSet = new Set(selected);
  return (
    <form
      method="get"
      action="/find-your-fit/career-change"
      className="rounded-sm border border-[var(--color-border)] bg-white p-5"
    >
      <fieldset>
        <legend className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
          Pick the past jobs that fit your experience
        </legend>
        <p className="text-xs text-[var(--color-muted)] mt-1">
          Select roles you&apos;ve held — from any sector, including jobs
          outside the Triangle Opportunity Guide&apos;s six profiled sectors.
          We&apos;ll match where the skills carry over.
        </p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          {PAST_SECTORS.map((ps) => {
            const starting = getStartingRolesForPastSector(ps.id);
            if (!starting.length) return null;
            return (
              <div key={ps.id}>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-foreground)] border-b-2 border-[var(--color-accent-yellow)] pb-1 mb-2">
                  {ps.name}
                </div>
                <ul className="space-y-1.5">
                  {starting.map((r) => (
                    <li key={r.id}>
                      <label className="flex items-start gap-2 text-sm text-[var(--color-foreground)] cursor-pointer">
                        <input
                          type="checkbox"
                          name="past"
                          value={r.id}
                          defaultChecked={selectedSet.has(r.id)}
                          className="mt-0.5 h-4 w-4 accent-[var(--color-brand)]"
                        />
                        <span className="leading-snug">{r.title}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Already in a Triangle Opportunity Guide profiled role?
          </div>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            Add any of the 26 profiled occupations you&apos;ve held.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            {sectors.map((s) => {
              const profiled = s.occupationIds
                .map((id) => getOccupation(id))
                .filter((o): o is NonNullable<ReturnType<typeof getOccupation>> => Boolean(o));
              return (
                <div key={s.id}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)] border-b border-[var(--color-border)] pb-1 mb-2">
                    {s.name}
                  </div>
                  <ul className="space-y-1.5">
                    {profiled.map((o) => (
                      <li key={o.id}>
                        <label className="flex items-start gap-2 text-sm text-[var(--color-foreground)] cursor-pointer">
                          <input
                            type="checkbox"
                            name="past"
                            value={o.id}
                            defaultChecked={selectedSet.has(o.id)}
                            className="mt-0.5 h-4 w-4 accent-[var(--color-brand)]"
                          />
                          <span className="leading-snug">{o.title}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </fieldset>

      <div className="mt-6 flex flex-wrap gap-3 items-center">
        <button
          type="submit"
          className="inline-flex items-center rounded-sm bg-[var(--color-brand)] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[var(--color-brand-hover)]"
        >
          Match me to roles →
        </button>
        {selected.length > 0 && (
          <Link
            href="/find-your-fit/career-change"
            className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
          >
            Clear selections
          </Link>
        )}
      </div>
    </form>
  );
}

export default async function CareerChangePage({
  searchParams,
}: {
  searchParams: Promise<{ past?: string | string[] }>;
}) {
  const { past } = await searchParams;
  const selected = normalizePast(past);
  const matches = getCareerChangeMatches(selected);
  const background = resolveBackground(selected);

  return (
    <WizardShell
      eyebrow="Change careers"
      title="Where your experience can take you"
      description="Many Triangle workers move between fields more easily than they think. Tell us your past work — including common jobs people hold without a four-year degree — and we'll surface profiled occupations where the skills carry over."
    >
      <PickerForm selected={selected} />

      {background.length > 0 && (
        <div className="mt-8">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            Your background
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {background.map((entry) => {
              const isStarting = entry.kind === "starting";
              const label =
                entry.kind === "occupation"
                  ? entry.occupation.title
                  : entry.startingRole.title;
              return (
                <span
                  key={isStarting ? entry.startingRole.id : entry.occupation.id}
                  className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                    isStarting
                      ? "bg-[var(--color-accent-yellow)] text-[var(--color-foreground)]"
                      : "bg-[var(--color-foreground)] text-white"
                  }`}
                >
                  {isStarting && (
                    <span className="text-[9px] opacity-70">Common job</span>
                  )}
                  {label}
                </span>
              );
            })}
          </div>

          {matches.length > 0 ? (
            <>
              <h2 className="mt-8 font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
                Matched occupations
              </h2>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                Ranked by how well your past jobs connect to each option.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {matches.map(({ occupation: o, reasons }) => (
                  <Link
                    key={o.id}
                    href={`/occupations/${o.id}`}
                    className="group flex flex-col gap-3 rounded-sm border border-[var(--color-border)] bg-white p-4 transition hover:border-[var(--color-brand)] hover:shadow-md sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
                        {getSectorName(o.sectorId)}
                      </div>
                      <h3 className="font-display text-xl uppercase tracking-wide text-[var(--color-foreground)] leading-tight group-hover:text-[var(--color-brand)]">
                        {o.title}
                      </h3>
                      <ul className="mt-2 space-y-0.5">
                        {reasons.map((r, i) => (
                          <li
                            key={i}
                            className="text-xs text-[var(--color-foreground)] flex gap-1.5"
                          >
                            <span className="text-[var(--color-brand)] font-bold">
                              ▸
                            </span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="shrink-0 sm:text-right">
                      <div className="font-display text-2xl text-[var(--color-brand)] tabular-nums leading-none">
                        ${o.wage.median.toFixed(2)}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mt-1">
                        /hr median
                      </div>
                      <div className="mt-2 text-[10px] uppercase tracking-wider text-[var(--color-foreground)] font-bold">
                        {o.tags.entry}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              No direct matches yet. Try adding more past jobs, or browse all
              sectors from the homepage.
            </p>
          )}
        </div>
      )}
    </WizardShell>
  );
}
