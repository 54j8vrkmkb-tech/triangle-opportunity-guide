import Link from "next/link";

export function QuizCTA({ context }: { context?: string }) {
  return (
    <aside className="rounded-sm border-2 border-[var(--color-foreground)] bg-[var(--color-accent-yellow)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-foreground)]">
          60-second job-fit quiz
        </div>
        <div className="mt-0.5 font-display text-base sm:text-lg uppercase tracking-wide text-[var(--color-foreground)] leading-tight">
          {context
            ? `Not sure if ${context} fits? Take the quiz.`
            : "Not sure which job fits you? Take the quiz."}
        </div>
        <p className="mt-1 text-xs text-[var(--color-foreground)] leading-snug">
          Pay, schedule, indoor/outdoor, county, and interests — we&apos;ll rank
          every Triangle role on the site to your answers.
        </p>
      </div>
      <Link
        href="/find-your-fit/quiz"
        className="shrink-0 inline-flex items-center justify-center rounded-sm bg-[var(--color-foreground)] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-black transition"
      >
        Take the quiz →
      </Link>
    </aside>
  );
}
