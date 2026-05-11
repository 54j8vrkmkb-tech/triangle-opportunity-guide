import Link from "next/link";
import { getSectorWageStats, type Sector } from "@/lib/data";
import { getSectorTheme } from "./sectorTheme";

export function SectorCard({ sector }: { sector: Sector }) {
  const theme = getSectorTheme(sector.id);
  const stats = getSectorWageStats(sector.id);
  const occupationCount = sector.occupationIds.length;

  return (
    <article
      className="group flex flex-col rounded-sm border-2 bg-white overflow-hidden transition hover:shadow-lg"
      style={{ borderColor: theme.border }}
    >
      <div
        className="px-5 py-4 flex items-center gap-3 border-b-4"
        style={{ backgroundColor: theme.bg, borderColor: theme.color }}
      >
        <div
          className="shrink-0 h-12 w-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: theme.color, color: theme.on }}
          aria-hidden
        >
          <theme.Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h2
            className="font-display text-xl uppercase tracking-wide leading-tight"
            style={{ color: theme.colorDark }}
          >
            {sector.name}
          </h2>
          <p className="text-xs text-[var(--color-muted)] leading-snug truncate">
            {sector.tagline}
          </p>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div
          className="rounded-sm p-4"
          style={{ backgroundColor: theme.bg }}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: theme.colorDark }}>
            Median pay
          </div>
          <div className="mt-1 flex items-baseline flex-wrap gap-x-2">
            <span
              className="font-display text-3xl tabular-nums leading-none"
              style={{ color: theme.color }}
            >
              ${stats.hourlyMedian.toFixed(2)}
              <span className="text-sm font-semibold text-[var(--color-muted)] ml-0.5">
                /hr
              </span>
            </span>
            <span className="font-display text-base tabular-nums text-[var(--color-foreground)]">
              ${Math.round(stats.annualMedian).toLocaleString()}
              <span className="text-xs font-semibold text-[var(--color-muted)] ml-0.5">
                /yr
              </span>
            </span>
          </div>
          <div className="mt-1 text-[11px] text-[var(--color-muted)]">
            Top role pays ${stats.hourlyMax.toFixed(2)}/hr · ${Math.round(stats.annualMax).toLocaleString()}/yr
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-3 text-xs">
          <div>
            <dt className="text-[var(--color-muted)] uppercase tracking-wider text-[10px] font-bold">
              Time to enter
            </dt>
            <dd className="font-semibold text-[var(--color-foreground)] mt-0.5">
              {sector.timeToEnter}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--color-muted)] uppercase tracking-wider text-[10px] font-bold">
              Outlook
            </dt>
            <dd className="font-semibold text-[var(--color-foreground)] mt-0.5">
              {sector.outlook}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--color-muted)] uppercase tracking-wider text-[10px] font-bold">
              Roles
            </dt>
            <dd className="font-semibold text-[var(--color-foreground)] mt-0.5">
              {occupationCount} profiled
            </dd>
          </div>
        </dl>

        <Link
          href={`/sectors/${sector.id}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide hover:underline"
          style={{ color: theme.color }}
        >
          View occupations →
        </Link>
      </div>
    </article>
  );
}
