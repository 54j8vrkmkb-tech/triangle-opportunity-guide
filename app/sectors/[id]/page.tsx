import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getOccupationsForSector,
  getSector,
  getSectorWageStats,
  sectors,
} from "@/lib/data";
import { StatBlock } from "@/app/components/StatBlock";
import { OccupationCard } from "@/app/components/OccupationCard";
import { EmployerLink } from "@/app/components/EmployerLink";
import { getSectorTheme } from "@/app/components/sectorTheme";

export function generateStaticParams() {
  return sectors.map((s) => ({ id: s.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const sector = getSector(id);
  if (!sector) return { title: "Sector not found" };
  return {
    title: sector.name,
    description: sector.tagline,
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sector = getSector(id);
  if (!sector) notFound();

  const theme = getSectorTheme(sector.id);
  const occupations = getOccupationsForSector(id);
  const wage = getSectorWageStats(id);

  return (
    <>
      <section
        className="border-b-4"
        style={{ backgroundColor: theme.bg, borderColor: theme.color }}
      >
        <div className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
          <nav className="text-xs text-[var(--color-muted)]">
            <Link href="/" className="hover:text-[var(--color-brand)]">
              All sectors
            </Link>{" "}
            <span className="text-[var(--color-border)]">/</span>{" "}
            <span className="text-[var(--color-foreground)] font-semibold">
              {sector.name}
            </span>
          </nav>

          <header className="mt-4 flex items-start gap-4 max-w-3xl">
            <div
              className="shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.color, color: theme.on }}
              aria-hidden
            >
              <theme.Icon className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
            <div className="min-w-0">
              <div
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: theme.colorDark }}
              >
                Sector
              </div>
              <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-[var(--color-foreground)] leading-[1.05]">
                {sector.name}
              </h1>
              <p className="mt-2 text-base sm:text-lg text-[var(--color-muted)] leading-snug">
                {sector.tagline}
              </p>
            </div>
          </header>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {sector.headlineStats.map((stat, i) => (
              <StatBlock key={i} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-12">
        <section>
          <div
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: theme.color }}
          >
            Overview
          </div>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl uppercase tracking-wide text-[var(--color-foreground)]">
            Sector at a Glance
          </h2>
          <p className="mt-3 text-base text-[var(--color-foreground)] leading-relaxed max-w-3xl">
            {sector.summary}
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div
              className="rounded-sm border-2 bg-white p-4"
              style={{ borderColor: theme.color }}
            >
              <dt className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] font-bold">
                Median pay
              </dt>
              <dd
                className="mt-1 font-display text-2xl uppercase tabular-nums"
                style={{ color: theme.color }}
              >
                ${wage.hourlyMedian.toFixed(2)}/hr
              </dd>
              <dd className="text-xs text-[var(--color-muted)]">
                ${Math.round(wage.annualMedian).toLocaleString()}/yr
              </dd>
            </div>
            <div className="rounded-sm border border-[var(--color-border)] bg-white p-4">
              <dt className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] font-bold">
                Wage range
              </dt>
              <dd
                className="mt-1 font-display text-xl uppercase"
                style={{ color: theme.color }}
              >
                {sector.wageRange}
              </dd>
            </div>
            <div className="rounded-sm border border-[var(--color-border)] bg-white p-4">
              <dt className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] font-bold">
                Time to enter
              </dt>
              <dd
                className="mt-1 font-display text-xl uppercase"
                style={{ color: theme.color }}
              >
                {sector.timeToEnter}
              </dd>
            </div>
            <div className="rounded-sm border border-[var(--color-border)] bg-white p-4">
              <dt className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] font-bold">
                Outlook
              </dt>
              <dd
                className="mt-1 font-display text-xl uppercase"
                style={{ color: theme.color }}
              >
                {sector.outlook}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
            Key Employers
          </h2>
          <ul className="mt-3 divide-y divide-[var(--color-border)] rounded-sm border border-[var(--color-border)] bg-white">
            {sector.keyEmployers.map((emp, i) => (
              <li
                key={i}
                className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div>
                  <div className="text-sm">
                    <EmployerLink name={emp.name} />
                  </div>
                  <div className="text-xs text-[var(--color-muted)]">
                    {emp.location}
                  </div>
                </div>
                {emp.note && (
                  <div className="text-xs text-[var(--color-muted-2)] sm:text-right">
                    {emp.note}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
            Occupations in this sector
          </h2>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Sorted by median wage, entry-level roles first.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {occupations.map((occ) => (
              <OccupationCard key={occ.id} occupation={occ} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
