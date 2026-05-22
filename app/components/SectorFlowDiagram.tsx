import Link from "next/link";
import type {
  FlowEdge,
  FlowInflow,
  FlowOcc,
  SectorThroughlines,
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

/* ----------------------- layout constants ----------------------- */

const PAD_X = 16;
const PAD_TOP = 48;
const CARD_W = 180;
const CARD_H = 62;
const COL_GAP = 36;
const ROW_GAP = 10;
const COL_W = CARD_W + COL_GAP;
const HEADER_H = 52;
const FOOTER_PAD = 20;
const TOTAL_W = PAD_X * 2 + CARD_W * 4 + COL_GAP * 3;

/* ----------------------- types ----------------------- */

type Column = "inflow" | "entry" | "mid" | "senior";
const COL_ORDER: Column[] = ["inflow", "entry", "mid", "senior"];

type Positioned = {
  col: Column;
  rowIndex: number;
  x: number;
  y: number;
};

/* ----------------------- card renderers ----------------------- */

function OccCard({
  occ,
  color,
  x,
  y,
}: {
  occ: FlowOcc;
  color: string;
  x: number;
  y: number;
}) {
  return (
    <foreignObject x={x} y={y} width={CARD_W} height={CARD_H}>
      <div
        // @ts-expect-error xmlns required for SVG foreignObject HTML
        xmlns="http://www.w3.org/1999/xhtml"
        style={{ width: "100%", height: "100%" }}
      >
        <Link
          href={`/occupations/${occ.id}`}
          className="block h-full rounded-sm border-2 bg-white px-2.5 py-2 hover:shadow-md transition"
          style={{ borderColor: color }}
        >
          <div className="font-display text-[11px] uppercase tracking-wide leading-tight text-[var(--color-foreground)] line-clamp-2">
            {occ.title}
          </div>
          <div
            className="mt-1 font-display text-sm tabular-nums leading-none"
            style={{ color }}
          >
            ${occ.wage.toFixed(2)}
            <span className="text-[9px] text-[var(--color-muted)] font-semibold">
              /hr
            </span>
          </div>
          <div className="text-[9px] text-[var(--color-muted)] leading-tight">
            ${occ.annual.toLocaleString()}/yr
          </div>
        </Link>
      </div>
    </foreignObject>
  );
}

function InflowCard({
  flow,
  x,
  y,
}: {
  flow: FlowInflow;
  x: number;
  y: number;
}) {
  const isStarting = flow.kind === "starting";
  const border = isStarting ? "#854d0e" : "#0044b5";
  const badgeBg = isStarting ? "var(--color-accent-yellow)" : "var(--color-brand-soft)";
  const badgeColor = isStarting ? "var(--color-foreground)" : "var(--color-brand)";
  const badgeText = isStarting ? "Common job" : "From other sector";

  const inner = (
    <>
      <span
        className="inline-block text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
        style={{ backgroundColor: badgeBg, color: badgeColor }}
      >
        {badgeText}
      </span>
      <div className="mt-1 font-display text-[10.5px] uppercase tracking-wide leading-tight text-[var(--color-foreground)] line-clamp-2">
        {flow.title}
      </div>
      <div className="text-[9px] text-[var(--color-muted)] leading-tight mt-0.5 line-clamp-1">
        {flow.fromLabel}
      </div>
    </>
  );

  return (
    <foreignObject x={x} y={y} width={CARD_W} height={CARD_H}>
      <div
        // @ts-expect-error xmlns required for SVG foreignObject HTML
        xmlns="http://www.w3.org/1999/xhtml"
        style={{ width: "100%", height: "100%" }}
      >
        {isStarting ? (
          <div
            className="h-full rounded-sm border-2 bg-white px-2.5 py-2"
            style={{ borderColor: border }}
          >
            {inner}
          </div>
        ) : (
          <Link
            href={`/occupations/${flow.id}`}
            className="block h-full rounded-sm border-2 bg-white px-2.5 py-2 hover:shadow-md transition"
            style={{ borderColor: border }}
          >
            {inner}
          </Link>
        )}
      </div>
    </foreignObject>
  );
}

/* ----------------------- main view ----------------------- */

export function SectorFlowDiagram({
  sectorId,
  flow,
}: {
  sectorId: string;
  flow: SectorThroughlines;
}) {
  const t = getSectorTheme(sectorId);

  // Tier background tints (light → dark across columns)
  const tierBg: Record<Column, string> = {
    inflow: "#f7f3e8",
    entry: tint(t.color, 0.88),
    mid: tint(t.color, 0.74),
    senior: tint(t.color, 0.56),
  };
  const tierBorder: Record<Column, string> = {
    inflow: "#d8c9a3",
    entry: t.border,
    mid: t.color,
    senior: t.colorDark,
  };
  const tierTextColor: Record<Column, string> = {
    inflow: "#5b4810",
    entry: t.colorDark,
    mid: t.colorDark,
    senior: "#ffffff",
  };

  // Column meta
  const colMeta: Record<Column, { eyebrow: string; title: string }> = {
    inflow: { eyebrow: "Often arrive from", title: "Where workers come in" },
    entry: { eyebrow: "Step 1", title: "Entry roles" },
    mid: { eyebrow: "Step 2", title: "Mid-tier roles" },
    senior: { eyebrow: "Step 3", title: "Senior / specialist" },
  };

  // Sort columns to reduce edge crossings via a simple left-to-right sweep:
  //   inflows: most outgoing edges first
  //   entry:   most outgoing edges first (hubs at top), then wage asc
  //   mid:     barycenter of inflow + entry sources
  //   senior:  barycenter of all sources
  const outDegree = (id: string) =>
    flow.edges.filter((e) => e.fromId === id).length;

  const sortedInflows = [...flow.inflows].sort((a, b) => {
    const d = outDegree(b.id) - outDegree(a.id);
    return d !== 0 ? d : a.title.localeCompare(b.title);
  });
  const inflowRow = new Map(sortedInflows.map((f, i) => [f.id, i]));

  const sortedEntry = [...flow.entry].sort((a, b) => {
    const d = outDegree(b.id) - outDegree(a.id);
    return d !== 0 ? d : a.wage - b.wage;
  });
  const entryRow = new Map(sortedEntry.map((o, i) => [o.id, i]));

  function barycenter(targetId: string, fromCols: Set<string>): number | null {
    const rows: number[] = [];
    for (const e of flow.edges) {
      if (e.toId !== targetId) continue;
      if (!fromCols.has(e.fromCol)) continue;
      const r =
        e.fromCol === "inflow"
          ? inflowRow.get(e.fromId)
          : e.fromCol === "entry"
            ? entryRow.get(e.fromId)
            : undefined;
      if (typeof r === "number") rows.push(r);
    }
    if (!rows.length) return null;
    return rows.reduce((a, b) => a + b, 0) / rows.length;
  }

  const sortedMid = [...flow.mid].sort((a, b) => {
    const ba = barycenter(a.id, new Set(["inflow", "entry"]));
    const bb = barycenter(b.id, new Set(["inflow", "entry"]));
    if (ba !== null && bb !== null && ba !== bb) return ba - bb;
    if (ba !== null && bb === null) return -1;
    if (ba === null && bb !== null) return 1;
    return a.wage - b.wage;
  });
  const midRow = new Map(sortedMid.map((o, i) => [o.id, i]));

  function barycenterSenior(targetId: string): number | null {
    const rows: number[] = [];
    for (const e of flow.edges) {
      if (e.toId !== targetId) continue;
      const r =
        e.fromCol === "inflow"
          ? inflowRow.get(e.fromId)
          : e.fromCol === "entry"
            ? entryRow.get(e.fromId)
            : e.fromCol === "mid"
              ? midRow.get(e.fromId)
              : undefined;
      if (typeof r === "number") rows.push(r);
    }
    if (!rows.length) return null;
    return rows.reduce((a, b) => a + b, 0) / rows.length;
  }

  const sortedSenior = [...flow.senior].sort((a, b) => {
    const ba = barycenterSenior(a.id);
    const bb = barycenterSenior(b.id);
    if (ba !== null && bb !== null && ba !== bb) return ba - bb;
    if (ba !== null && bb === null) return -1;
    if (ba === null && bb !== null) return 1;
    return a.wage - b.wage;
  });

  // Build position map
  const positions = new Map<string, Positioned>();
  const colCards: Record<Column, Array<{ id: string }>> = {
    inflow: sortedInflows.map((f) => ({ id: f.id })),
    entry: sortedEntry.map((o) => ({ id: o.id })),
    mid: sortedMid.map((o) => ({ id: o.id })),
    senior: sortedSenior.map((o) => ({ id: o.id })),
  };

  COL_ORDER.forEach((col, colIdx) => {
    const x = PAD_X + colIdx * COL_W;
    colCards[col].forEach((c, rowIdx) => {
      const y = PAD_TOP + HEADER_H + rowIdx * (CARD_H + ROW_GAP);
      positions.set(`${col}:${c.id}`, { col, rowIndex: rowIdx, x, y });
    });
  });

  const maxRows = Math.max(
    1,
    colCards.inflow.length,
    colCards.entry.length,
    colCards.mid.length,
    colCards.senior.length,
  );
  const totalH =
    PAD_TOP + HEADER_H + maxRows * (CARD_H + ROW_GAP) - ROW_GAP + FOOTER_PAD;

  // Lookup helpers
  const inflowById = new Map(flow.inflows.map((f) => [f.id, f]));
  const occById = new Map(
    [...flow.entry, ...flow.mid, ...flow.senior].map((o) => [o.id, o]),
  );

  /* ----------------------- edge path generator ----------------------- */

  function edgePath(e: FlowEdge): string | null {
    const src = positions.get(`${e.fromCol}:${e.fromId}`);
    const dst = positions.get(`${e.toCol}:${e.toId}`);
    if (!src || !dst) return null;
    const x1 = src.x + CARD_W;
    const y1 = src.y + CARD_H / 2;
    const x2 = dst.x - 6; // leave room for arrowhead
    const y2 = dst.y + CARD_H / 2;
    const dx = x2 - x1;
    const cp1x = x1 + dx * 0.55;
    const cp2x = x2 - dx * 0.55;
    return `M ${x1},${y1} C ${cp1x},${y1} ${cp2x},${y2} ${x2},${y2}`;
  }

  return (
    <div className="rounded-sm border border-[var(--color-border)] bg-white p-3 sm:p-4 overflow-x-auto">
      <svg
        viewBox={`0 0 ${TOTAL_W} ${totalH}`}
        width={TOTAL_W}
        height={totalH}
        style={{ minWidth: TOTAL_W, display: "block" }}
        role="img"
        aria-label="Career flow diagram showing how workers enter and advance in this sector"
      >
        <defs>
          <marker
            id={`arrow-${sectorId}`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={t.colorDark} />
          </marker>
          <marker
            id={`arrow-bridge-${sectorId}`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#5b4810" />
          </marker>
        </defs>

        {/* Column tier backgrounds */}
        {COL_ORDER.map((col, colIdx) => {
          const x = PAD_X + colIdx * COL_W - 8;
          const y = PAD_TOP - 8;
          const w = CARD_W + 16;
          const h = totalH - PAD_TOP - FOOTER_PAD + 16;
          return (
            <rect
              key={`bg-${col}`}
              x={x}
              y={y}
              width={w}
              height={h}
              rx={4}
              fill={tierBg[col]}
              stroke={tierBorder[col]}
              strokeWidth={1}
            />
          );
        })}

        {/* Column headers */}
        {COL_ORDER.map((col, colIdx) => {
          const x = PAD_X + colIdx * COL_W;
          const meta = colMeta[col];
          return (
            <g key={`hdr-${col}`}>
              <text
                x={x}
                y={PAD_TOP + 12}
                fontSize={10}
                fontWeight={700}
                style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
                fill={tierTextColor[col]}
              >
                {meta.eyebrow}
              </text>
              <text
                x={x}
                y={PAD_TOP + 32}
                fontSize={14}
                fontWeight={700}
                fontFamily="var(--font-display, Antonio, sans-serif)"
                style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}
                fill={tierTextColor[col]}
              >
                {meta.title}
              </text>
            </g>
          );
        })}

        {/* Edges (draw before cards so cards sit on top of any near-overlap) */}
        <g fill="none">
          {flow.edges.map((e, i) => {
            const d = edgePath(e);
            if (!d) return null;
            const stroke = e.kind === "bridge" ? "#a07b2a" : t.colorDark;
            const dash = e.kind === "bridge" ? "5 4" : undefined;
            return (
              <path
                key={`e-${i}`}
                d={d}
                stroke={stroke}
                strokeWidth={1.8}
                strokeDasharray={dash}
                markerEnd={
                  e.kind === "bridge"
                    ? `url(#arrow-bridge-${sectorId})`
                    : `url(#arrow-${sectorId})`
                }
                opacity={0.85}
              />
            );
          })}
        </g>

        {/* Cards */}
        {colCards.inflow.map((c) => {
          const f = inflowById.get(c.id);
          if (!f) return null;
          const p = positions.get(`inflow:${c.id}`);
          if (!p) return null;
          return (
            <InflowCard key={`inflow-${c.id}`} flow={f} x={p.x} y={p.y} />
          );
        })}
        {(["entry", "mid", "senior"] as const).map((col) =>
          colCards[col].map((c) => {
            const o = occById.get(c.id);
            if (!o) return null;
            const p = positions.get(`${col}:${c.id}`);
            if (!p) return null;
            return (
              <OccCard
                key={`${col}-${c.id}`}
                occ={o}
                color={t.color}
                x={p.x}
                y={p.y}
              />
            );
          }),
        )}

        {/* Empty-column placeholders */}
        {COL_ORDER.map((col, colIdx) => {
          if (colCards[col].length > 0) return null;
          const x = PAD_X + colIdx * COL_W;
          const y = PAD_TOP + HEADER_H + 8;
          const emptyText =
            col === "inflow"
              ? "No cross-sector inflows mapped yet."
              : col === "entry"
                ? "No entry-tier roles profiled."
                : col === "mid"
                  ? "No mid-tier roles profiled."
                  : "No senior roles profiled.";
          return (
            <text
              key={`empty-${col}`}
              x={x}
              y={y + 12}
              fontSize={11}
              fontStyle="italic"
              fill={tierTextColor[col]}
              opacity={0.7}
            >
              {emptyText}
            </text>
          );
        })}
      </svg>

      <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-[var(--color-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <svg width="22" height="6" aria-hidden>
            <line
              x1="0"
              y1="3"
              x2="22"
              y2="3"
              stroke={t.colorDark}
              strokeWidth="1.8"
            />
          </svg>
          Career-path throughline (typical advancement)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="22" height="6" aria-hidden>
            <line
              x1="0"
              y1="3"
              x2="22"
              y2="3"
              stroke="#a07b2a"
              strokeWidth="1.8"
              strokeDasharray="5 4"
            />
          </svg>
          Bridge from a starting job or other sector
        </span>
      </div>

      <p className="mt-3 text-xs text-[var(--color-muted)] italic leading-snug">
        Real Triangle workers rarely move in a straight line — this is a typical
        pattern across employers. Individual paths vary by employer, prior
        credentials, and life situation.
      </p>
    </div>
  );
}
