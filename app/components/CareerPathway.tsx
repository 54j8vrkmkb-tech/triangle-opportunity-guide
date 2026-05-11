import type { PathwayStep } from "@/lib/data";
import { getSectorTheme } from "./sectorTheme";

export function CareerPathway({
  steps,
  sectorId,
}: {
  steps: PathwayStep[];
  sectorId: string;
}) {
  if (!steps?.length) return null;
  const theme = getSectorTheme(sectorId);

  return (
    <div className="rounded-sm border border-[var(--color-border)] bg-white p-4 sm:p-5">
      <ol className="flex flex-col sm:flex-row sm:items-stretch gap-0">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const isCurrent = !!step.current;
          return (
            <li
              key={i}
              className="flex-1 flex flex-col sm:flex-row sm:items-stretch"
            >
              <div
                className="flex-1 rounded-sm p-3 border"
                style={{
                  backgroundColor: isCurrent ? theme.bg : "var(--color-surface)",
                  borderColor: isCurrent ? theme.color : "var(--color-border)",
                  borderWidth: isCurrent ? 2 : 1,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      backgroundColor: isCurrent ? theme.color : "#ffffff",
                      color: isCurrent ? theme.on : "var(--color-muted)",
                      borderWidth: isCurrent ? 0 : 1,
                      borderStyle: "solid",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    {i + 1}
                  </span>
                  {isCurrent && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: theme.colorDark }}
                    >
                      This role
                    </span>
                  )}
                </div>
                <div className="mt-2 font-display text-base uppercase tracking-wide text-[var(--color-foreground)] leading-tight">
                  {step.role}
                </div>
                <div
                  className="mt-1 text-sm font-semibold tabular-nums"
                  style={{ color: theme.color }}
                >
                  {step.wage}/hr
                </div>
                <div className="mt-0.5 text-xs text-[var(--color-muted)]">
                  {step.detail}
                </div>
              </div>
              {!isLast && (
                <div className="flex items-center justify-center px-1 py-1 sm:py-0">
                  <span
                    aria-hidden
                    className="font-bold sm:rotate-0 rotate-90 text-lg"
                    style={{ color: theme.color }}
                  >
                    →
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
