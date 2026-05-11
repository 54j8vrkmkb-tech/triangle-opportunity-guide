import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAdjacentOccupations,
  getOccupation,
  getSector,
  getSectorName,
  occupations,
} from "@/lib/data";
import { StatBlock } from "@/app/components/StatBlock";
import { CareerPathway } from "@/app/components/CareerPathway";
import { OccupationCard } from "@/app/components/OccupationCard";
import { TrainingProgramCard } from "@/app/components/TrainingProgramCard";
import { EmployerLink } from "@/app/components/EmployerLink";
import { getSectorTheme } from "@/app/components/sectorTheme";

export function generateStaticParams() {
  return occupations.map((o) => ({ id: o.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const occ = getOccupation(id);
  if (!occ) return { title: "Occupation not found" };
  return {
    title: occ.title,
    description: occ.summary,
  };
}

const BULLET = "▸";

const QUALITY_FIELDS: {
  key: keyof import("@/lib/data").JobQuality;
  label: string;
}[] = [
  { key: "schedule", label: "Schedule" },
  { key: "benefits", label: "Benefits" },
  { key: "advancement", label: "Advancement" },
  { key: "automation", label: "Automation" },
];

function PillTag({
  children,
  bg,
  fg,
}: {
  children: React.ReactNode;
  bg: string;
  fg: string;
}) {
  return (
    <span
      className="inline-flex items-center rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
      style={{ backgroundColor: bg, color: fg }}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  color,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  color?: string;
}) {
  return (
    <div>
      {eyebrow && (
        <div
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: color ?? "var(--color-brand)" }}
        >
          {eyebrow}
        </div>
      )}
      <h2 className="mt-1 font-display text-xl sm:text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-sm text-[var(--color-muted)]">{description}</p>
      )}
    </div>
  );
}

export default async function OccupationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const occ = getOccupation(id);
  if (!occ) notFound();

  const sector = getSector(occ.sectorId);
  const theme = getSectorTheme(occ.sectorId);
  const annual = occ.wage.annualMedian.toLocaleString();
  const { adjacent, lateralFrom } = getAdjacentOccupations(occ.id);
  const hasAdjacent = adjacent.length > 0 || lateralFrom.length > 0;

  return (
    <>
      <section
        className="border-b-4"
        style={{ backgroundColor: theme.bg, borderColor: theme.color }}
      >
        <div className="mx-auto max-w-4xl px-5 py-8 sm:py-12">
          <nav className="text-xs text-[var(--color-muted)]">
            <Link href="/" className="hover:text-[var(--color-brand)]">
              All sectors
            </Link>{" "}
            <span className="text-[var(--color-border)]">/</span>{" "}
            {sector && (
              <>
                <Link
                  href={`/sectors/${sector.id}`}
                  className="hover:text-[var(--color-brand)]"
                >
                  {sector.name}
                </Link>{" "}
                <span className="text-[var(--color-border)]">/</span>{" "}
              </>
            )}
            <span className="text-[var(--color-foreground)] font-semibold">
              {occ.title}
            </span>
          </nav>

          <div className="mt-4 flex items-start gap-4">
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
                {sector?.name}
              </div>
              <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-[var(--color-foreground)] leading-[1.05]">
                {occ.title}
              </h1>
              <p className="mt-2 text-sm italic text-[var(--color-muted)]">
                {occ.settings}
              </p>
            </div>
          </div>

          <div
            className="mt-5 rounded-sm border-2 bg-white p-5"
            style={{ borderColor: theme.color }}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className="font-display text-4xl tabular-nums leading-none"
                style={{ color: theme.color }}
              >
                ${occ.wage.median.toFixed(2)}
                <span className="text-base font-semibold text-[var(--color-muted)]">
                  /hr
                </span>
              </span>
              <span className="text-[var(--color-border)]">|</span>
              <span className="font-display text-2xl text-[var(--color-foreground)] tabular-nums">
                ${annual}
                <span className="text-base font-semibold text-[var(--color-muted)]">
                  /yr
                </span>
              </span>
              <span className="text-[var(--color-border)]">|</span>
              <span className="text-base text-[var(--color-foreground)] font-semibold">
                {occ.wage.msa}
              </span>
            </div>
            <div className="mt-1 text-xs text-[var(--color-muted)]">
              Median wage · {occ.wage.source}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <PillTag bg={theme.color} fg={theme.on}>
              {occ.tags.demand}
            </PillTag>
            <PillTag bg="var(--color-foreground)" fg="#ffffff">
              {occ.tags.automationRisk}
            </PillTag>
            <PillTag bg="var(--color-foreground)" fg="#ffffff">
              {occ.tags.entry}
            </PillTag>
            <PillTag bg="var(--color-foreground)" fg="#ffffff">
              {occ.tags.criminalRecord}
            </PillTag>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5 py-8 sm:py-12">
        <section>
          <SectionHeader
            eyebrow="Overview"
            title="Job at a Glance"
            color={theme.color}
          />
          <p className="mt-3 text-lg text-[var(--color-foreground)] leading-relaxed">
            {occ.summary}
          </p>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <SectionHeader title="By the Numbers" color={theme.color} />
            <div className="mt-3 grid grid-cols-2 gap-2">
              {occ.byTheNumbers.map((stat, i) => (
                <StatBlock key={i} stat={stat} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Quick Facts" color={theme.color} />
            <ul className="mt-3 space-y-2">
              {occ.quickFacts.map((fact, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-[var(--color-foreground)]"
                >
                  <span className="font-bold" style={{ color: theme.color }}>
                    {BULLET}
                  </span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <SectionHeader title="What You'll Do" color={theme.color} />
          <ul className="mt-3 space-y-2">
            {occ.whatYoullDo.map((item, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-[var(--color-foreground)]"
              >
                <span className="font-bold" style={{ color: theme.color }}>
                  {BULLET}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {hasAdjacent && (
          <section className="mt-10">
            <SectionHeader
              eyebrow="Related careers"
              title="Adjacent occupations"
              description="Roles people commonly move into from this one — and roles people often arrive from."
              color={theme.color}
            />
            {adjacent.length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
                  Common next moves
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {adjacent.map((o) => (
                    <OccupationCard
                      key={o.id}
                      occupation={o}
                      showSector
                      sectorName={getSectorName(o.sectorId)}
                    />
                  ))}
                </div>
              </div>
            )}
            {lateralFrom.length > 0 && (
              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
                  People often switch in from
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {lateralFrom.map((o) => (
                    <OccupationCard
                      key={o.id}
                      occupation={o}
                      showSector
                      sectorName={getSectorName(o.sectorId)}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <section className="mt-10">
          <SectionHeader
            eyebrow="Career progression"
            title="Where this role can lead you"
            description="A typical advancement path. Wages reflect Triangle-area medians."
            color={theme.color}
          />
          <div className="mt-4">
            <CareerPathway steps={occ.careerPathway} sectorId={occ.sectorId} />
          </div>
        </section>

        <section className="mt-10">
          <SectionHeader title="Top Employers" color={theme.color} />
          <ul className="mt-3 divide-y divide-[var(--color-border)] rounded-sm border border-[var(--color-border)] bg-white">
            {occ.topEmployers.map((emp, i) => (
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
          <SectionHeader title="Training Programs" color={theme.color} />
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {occ.trainingPrograms.map((p, i) => (
              <TrainingProgramCard
                key={i}
                program={p}
                sectorId={occ.sectorId}
              />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeader title="Job Quality" color={theme.color} />
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {QUALITY_FIELDS.map((f) => (
              <div
                key={f.key}
                className="rounded-sm border border-[var(--color-border)] bg-white p-4"
              >
                <div
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: theme.color }}
                >
                  {f.label}
                </div>
                <p className="mt-2 text-sm text-[var(--color-foreground)] leading-snug">
                  {occ.jobQuality[f.key]}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
