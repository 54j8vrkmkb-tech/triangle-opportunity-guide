import Link from "next/link";
import type { Occupation } from "@/lib/data";
import { getSectorTheme } from "./sectorTheme";

export function OccupationCard({
  occupation,
  showSector,
  sectorName,
}: {
  occupation: Occupation;
  showSector?: boolean;
  sectorName?: string;
}) {
  const theme = getSectorTheme(occupation.sectorId);
  return (
    <Link
      href={`/occupations/${occupation.id}`}
      className="group flex flex-col gap-3 rounded-sm border bg-white p-4 transition hover:shadow-md"
      style={{ borderColor: theme.border }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex items-start gap-3">
          <div
            className="shrink-0 h-9 w-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.bg, color: theme.color }}
            aria-hidden
          >
            <theme.Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            {showSector && sectorName && (
              <div
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: theme.color }}
              >
                {sectorName}
              </div>
            )}
            <h3
              className="font-display text-lg uppercase tracking-wide leading-tight text-[var(--color-foreground)]"
              style={{}}
            >
              {occupation.title}
            </h3>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div
            className="font-display text-xl tabular-nums leading-none"
            style={{ color: theme.color }}
          >
            ${occupation.wage.median.toFixed(2)}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mt-1">
            /hr median
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span
          className="inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: theme.bg, color: theme.colorDark }}
        >
          {occupation.tags.demand}
        </span>
        <span className="inline-flex items-center rounded-sm bg-[var(--color-surface-2)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-foreground)]">
          {occupation.tags.entry}
        </span>
      </div>
    </Link>
  );
}
