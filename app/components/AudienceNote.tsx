export function AudienceNote({
  variant = "compact",
}: {
  variant?: "compact" | "full";
}) {
  if (variant === "full") {
    return (
      <aside className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Who this is for
        </div>
        <h3 className="mt-1 font-display text-lg uppercase tracking-wide text-[var(--color-foreground)]">
          Built for career navigators, counselors, students, and workers
        </h3>
        <p className="mt-1 text-xs text-[var(--color-muted)] leading-relaxed">
          <strong>Career navigators &amp; counselors</strong> — use this as a
          shareable reference when working 1:1 with clients or students.{" "}
          <strong>Students &amp; workers</strong> — explore on your own, take
          the quiz, and bring questions back to a coach or counselor.
        </p>
      </aside>
    );
  }
  return (
    <div className="text-[11px] text-[var(--color-muted)] inline-flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="font-bold uppercase tracking-wider text-[var(--color-brand)]">
        For:
      </span>
      <span>career navigators &amp; counselors</span>
      <span aria-hidden>·</span>
      <span>students</span>
      <span aria-hidden>·</span>
      <span>job seekers &amp; workers</span>
    </div>
  );
}
