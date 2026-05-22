import Link from "next/link";
import {
  type EmployerSpotlight,
  extractDomain,
  getOccupation,
  getSectorName,
} from "@/lib/data";
import { getSectorTheme } from "./sectorTheme";
import { Logo } from "./Logo";

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const STRIPE_PALETTE = [
  "#0044b5",
  "#0e7c86",
  "#c8551f",
  "#5b21b6",
  "#2e7d32",
  "#b02a0e",
  "#1f2937",
];

export function EmployerSpotlightCard({
  employer,
}: {
  employer: EmployerSpotlight;
}) {
  const color = STRIPE_PALETTE[hashStr(employer.id) % STRIPE_PALETTE.length];
  const domain = extractDomain(employer.url);
  const adjacents = employer.adjacentOccupationIds
    .map((id) => getOccupation(id))
    .filter((o): o is NonNullable<ReturnType<typeof getOccupation>> => Boolean(o));

  return (
    <article className="flex flex-col rounded-sm border border-[var(--color-border)] bg-white overflow-hidden">
      <div className="h-1.5 w-full" style={{ backgroundColor: color }} aria-hidden />
      <div className="p-5">
        <div className="flex items-start gap-3">
          <Logo domain={domain} name={employer.name} size={52} rounded={false} />
          <div className="min-w-0">
            <h2 className="font-display text-xl uppercase tracking-wide text-[var(--color-foreground)] leading-tight">
              <a
                href={employer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color }}
              >
                {employer.name} ↗
              </a>
            </h2>
            <div className="text-xs text-[var(--color-muted)] mt-0.5">
              {employer.industry}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Triangle locations
          </div>
          <ul className="mt-1 space-y-0.5">
            {employer.locations.map((loc, i) => (
              <li
                key={i}
                className="text-xs text-[var(--color-foreground)] flex gap-1.5"
              >
                <span style={{ color }} className="font-bold">
                  ▸
                </span>
                <span>{loc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Why a better employer
          </div>
          <ul className="mt-1 space-y-1">
            {employer.whyBetter.map((b, i) => (
              <li
                key={i}
                className="text-sm text-[var(--color-foreground)] leading-snug flex gap-2"
              >
                <span style={{ color }} className="font-bold">
                  ▸
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {adjacents.length > 0 && (
          <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Bridge into these credentialed Triangle roles
            </div>
            <p className="text-xs text-[var(--color-muted)] mt-1 mb-2">
              Skills you build here transfer directly into:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {adjacents.map((o) => {
                const t = getSectorTheme(o.sectorId);
                return (
                  <Link
                    key={o.id}
                    href={`/occupations/${o.id}`}
                    className="inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-[11px] font-semibold hover:underline"
                    style={{
                      backgroundColor: t.bg,
                      color: t.colorDark,
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderColor: t.border,
                    }}
                    title={getSectorName(o.sectorId)}
                  >
                    <t.Icon className="h-3 w-3" />
                    {o.title}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
