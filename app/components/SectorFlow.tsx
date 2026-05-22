import Link from "next/link";
import type {
  FlowInflow,
  FlowOcc,
  SectorFlow as SectorFlowData,
} from "@/lib/data";
import { getSectorTheme } from "./sectorTheme";

/* ----------------------- color helpers ----------------------- */

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "");
  return [
    parseInt(m.slice(0, 2), 16),
    parseInt(m.slice(2, 4), 16),
    parseInt(m.slice(4, 6), 16),
  ];
}

function tint(hex: string, t: number): string {
  const [r, g, b] = hexToRgb(hex);
  const mix = (c: number) => Math.round(c + (255 - c) * t);
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
}

/* ----------------------- atoms ----------------------- */

function Arrow({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center px-0 lg:px-1">
      {/* Horizontal arrow on desktop; vertical on mobile when columns stack */}
      <span
        aria-hidden
        className="font-display text-2xl leading-none lg:rotate-0 rotate-90"
        style={{ color }}
      >
        →
      </span>
    </div>
  );
}

function OccCard({ occ, color }: { occ: FlowOcc; color: string }) {
  return (
    <Link
      href={`/occupations/${occ.id}`}
      className="block rounded-sm border-2 bg-white px-3 py-2.5 transition hover:shadow-md hover:-translate-y-0.5"
      style={{ borderColor: color }}
    >
      <div className="font-display text-xs sm:text-sm uppercase tracking-wide leading-tight text-[var(--color-foreground)]">
        {occ.title}
      </div>
      <div
        className="mt-1 font-display text-base tabular-nums leading-none"
        style={{ color }}
      >
        ${occ.wage.toFixed(2)}
        <span className="text-[9px] text-[var(--color-muted)] font-semibold">
          /hr
        </span>
      </div>
      <div className="text-[10px] text-[var(--color-muted)]">
        ${occ.annual.toLocaleString()}/yr
      </div>
    </Link>
  );
}

function InflowCard({ flow }: { flow: FlowInflow }) {
  if (flow.kind === "starting") {
    return (
      <div
        className="rounded-sm border-2 px-3 py-2.5 bg-white"
        style={{ borderColor: "#854d0e" }}
      >
        <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[var(--color-foreground)] bg-[var(--color-accent-yellow)] px-1.5 py-0.5 rounded-sm">
          Common job
        </span>
        <div className="mt-1 font-display text-xs uppercase tracking-wide text-[var(--color-foreground)] leading-tight">
          {flow.title}
        </div>
        <div className="text-[10px] text-[var(--color-muted)]">
          {flow.fromLabel}
        </div>
      </div>
    );
  }
  return (
    <Link
      href={`/occupations/${flow.id}`}
      className="block rounded-sm border-2 px-3 py-2.5 bg-white hover:shadow-md transition"
      style={{ borderColor: "#0044b5" }}
    >
      <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[var(--color-brand)] bg-[var(--color-brand-soft)] px-1.5 py-0.5 rounded-sm">
        From other sector
      </span>
      <div className="mt-1 font-display text-xs uppercase tracking-wide text-[var(--color-foreground)] leading-tight">
        {flow.title}
      </div>
      <div className="text-[10px] text-[var(--color-muted)]">
        {flow.fromLabel}
      </div>
    </Link>
  );
}

/* ----------------------- column ----------------------- */

function Column({
  eyebrow,
  title,
  description,
  bg,
  border,
  textColor,
  cards,
  emptyText,
}: {
  eyebrow: string;
  title: string;
  description: string;
  bg: string;
  border: string;
  textColor: string;
  cards: React.ReactNode[];
  emptyText: string;
}) {
  return (
    <div
      className="rounded-sm border p-3 sm:p-4 flex flex-col min-w-0"
      style={{ backgroundColor: bg, borderColor: border }}
    >
      <div>
        <div
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: textColor }}
        >
          {eyebrow}
        </div>
        <div
          className="mt-0.5 font-display text-base uppercase tracking-wide leading-tight"
          style={{ color: textColor }}
        >
          {title}
        </div>
        <p
          className="mt-1 text-[11px] leading-snug"
          style={{ color: textColor, opacity: 0.85 }}
        >
          {description}
        </p>
      </div>
      <div className="mt-3 space-y-2">
        {cards.length === 0 ? (
          <div
            className="text-xs italic"
            style={{ color: textColor, opacity: 0.7 }}
          >
            {emptyText}
          </div>
        ) : (
          cards
        )}
      </div>
    </div>
  );
}

/* ----------------------- main view ----------------------- */

export function SectorFlowView({
  sectorId,
  flow,
}: {
  sectorId: string;
  flow: SectorFlowData;
}) {
  const t = getSectorTheme(sectorId);

  // Horizontal gradient: light → dark from left (entry) to right (senior).
  // Inflow column uses a warm neutral so it reads as "outside the sector."
  const inflowBg = "#f7f3e8";
  const entryBg = tint(t.color, 0.86);
  const midBg = tint(t.color, 0.7);
  const seniorBg = tint(t.color, 0.5);

  return (
    <div className="rounded-sm border border-[var(--color-border)] bg-white p-3 sm:p-4 overflow-x-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 lg:gap-1 items-stretch min-w-[280px] lg:min-w-[900px]">
        <Column
          eyebrow="Often arrive from"
          title="Where workers come in"
          description="Common no-degree jobs (yellow) and adjacent occupations in other sectors that bridge in."
          bg={inflowBg}
          border="#d8c9a3"
          textColor="#5b4810"
          cards={flow.inflows.map((f) => (
            <InflowCard key={`${f.kind}-${f.id}`} flow={f} />
          ))}
          emptyText="No common cross-sector inflows mapped yet."
        />

        <Arrow color={t.color} />

        <Column
          eyebrow="Step 1"
          title="Entry roles"
          description="Shortest path in — typically certificate / weeks-to-months training."
          bg={entryBg}
          border={t.border}
          textColor={t.colorDark}
          cards={flow.entry.map((o) => (
            <OccCard key={o.id} occ={o} color={t.color} />
          ))}
          emptyText="No entry-tier roles profiled."
        />

        <Arrow color={t.color} />

        <Column
          eyebrow="Step 2"
          title="Mid-tier roles"
          description="Built on entry experience plus an associate degree or stacked credentials."
          bg={midBg}
          border={t.color}
          textColor={t.colorDark}
          cards={flow.mid.map((o) => (
            <OccCard key={o.id} occ={o} color={t.color} />
          ))}
          emptyText="No mid-tier roles profiled."
        />

        <Arrow color={t.color} />

        <Column
          eyebrow="Step 3"
          title="Senior / specialist"
          description="Higher pay; usually 3+ years experience plus advanced credential."
          bg={seniorBg}
          border={t.colorDark}
          textColor="#ffffff"
          cards={flow.senior.map((o) => (
            <OccCard key={o.id} occ={o} color={t.color} />
          ))}
          emptyText="No senior roles profiled."
        />
      </div>

      <p className="mt-4 text-xs text-[var(--color-muted)] italic leading-snug">
        Real Triangle workers rarely move in a straight line — this is a typical
        pattern across employers. Individual paths vary by employer, prior
        credentials, and life situation.
      </p>
    </div>
  );
}
