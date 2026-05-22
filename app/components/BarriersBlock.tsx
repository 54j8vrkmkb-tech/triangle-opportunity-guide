import type { Barriers } from "@/lib/data";

const DRUG_LABEL: Record<NonNullable<Barriers["drugTesting"]>, { label: string; color: string }> = {
  required: { label: "Drug test required", color: "#b02a0e" },
  common: { label: "Drug test common", color: "#c8551f" },
  varies: { label: "Drug test varies by employer", color: "#854d0e" },
  rare: { label: "Drug test rare", color: "#0e7c86" },
  unknown: { label: "Drug-test policy unknown", color: "#686e77" },
};

export function BarriersBlock({
  barriers,
  accent,
}: {
  barriers: Barriers;
  accent: string;
}) {
  const drug = barriers.drugTesting ? DRUG_LABEL[barriers.drugTesting] : undefined;
  const items = [
    barriers.licensure && { label: "Licensure / required certification", text: barriers.licensure },
    barriers.background && { label: "Criminal record & background check", text: barriers.background },
    barriers.physical && { label: "Physical requirements", text: barriers.physical },
    barriers.other && { label: "Other requirements", text: barriers.other },
  ].filter(Boolean) as { label: string; text: string }[];

  return (
    <section
      className="rounded-sm border-2 bg-white p-4 sm:p-5"
      style={{ borderColor: accent }}
    >
      <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
        Practical barriers & requirements
      </div>
      <h3 className="mt-1 font-display text-lg uppercase tracking-wide text-[var(--color-foreground)]">
        Is this role a good fit for you?
      </h3>
      <p className="mt-1 text-xs text-[var(--color-muted)] leading-relaxed">
        Hiring considerations that often surprise applicants. Counselors and
        navigators: review these with clients before they apply.
      </p>

      {drug && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-sm px-3 py-1.5"
          style={{ backgroundColor: drug.color + "15", color: drug.color, border: `1px solid ${drug.color}40` }}
        >
          <span aria-hidden className="text-base">⚠</span>
          <span className="text-xs font-bold uppercase tracking-wider">
            {drug.label}
          </span>
        </div>
      )}

      <dl className="mt-3 space-y-2.5">
        {items.map((it) => (
          <div key={it.label}>
            <dt className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
              {it.label}
            </dt>
            <dd className="text-sm text-[var(--color-foreground)] leading-snug">
              {it.text}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
