export function VariabilityNote({
  variability,
}: {
  variability: {
    titles?: string;
    requirements?: string;
    advancement?: string;
  };
}) {
  const items = [
    variability.titles && { label: "Titles vary by employer", text: variability.titles },
    variability.requirements && {
      label: "Requirements may differ across institutions",
      text: variability.requirements,
    },
    variability.advancement && {
      label: "Advancement paths differ by employer",
      text: variability.advancement,
    },
  ].filter(Boolean) as { label: string; text: string }[];

  if (!items.length) return null;

  return (
    <aside className="rounded-sm border-2 border-[#854d0e] bg-[#fef9c3] p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#854d0e] text-white text-sm font-bold"
        >
          !
        </span>
        <div className="font-display text-base uppercase tracking-wide text-[#854d0e]">
          Heads up — this role varies by employer
        </div>
      </div>
      <p className="mt-2 text-xs text-[#854d0e] leading-relaxed">
        Don&apos;t assume one posting&apos;s details apply everywhere. The
        information below is generalized; specific employers may differ.
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-[var(--color-foreground)]">
            <span className="font-bold uppercase tracking-wider text-[10px] text-[#854d0e]">
              {item.label}
            </span>
            <span className="block mt-0.5 leading-snug">{item.text}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
