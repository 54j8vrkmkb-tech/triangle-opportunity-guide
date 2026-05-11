import type { Stat } from "@/lib/data";

export function StatBlock({ stat }: { stat: Stat }) {
  return (
    <div className="rounded-sm border border-[var(--color-border)] bg-white p-3">
      <div className="font-display text-2xl text-[var(--color-brand)] leading-none uppercase">
        {stat.value}
      </div>
      <div className="mt-1.5 text-xs text-[var(--color-muted)] leading-snug">
        {stat.label}
      </div>
    </div>
  );
}
