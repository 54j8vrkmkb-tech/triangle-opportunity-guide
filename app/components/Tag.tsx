export function Tag({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "yellow" | "navy";
}) {
  const styles: Record<string, string> = {
    neutral:
      "bg-[var(--color-surface-2)] text-[var(--color-foreground)] ring-1 ring-inset ring-[var(--color-border)]",
    brand:
      "bg-[var(--color-brand-soft)] text-[var(--color-brand)] ring-1 ring-inset ring-[var(--color-brand-soft)]",
    yellow:
      "bg-[var(--color-accent-yellow)] text-[var(--color-foreground)] ring-1 ring-inset ring-[var(--color-accent-yellow-dark)]",
    navy: "bg-[var(--color-foreground)] text-white",
  };
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles[tone]}`}
    >
      {children}
    </span>
  );
}
