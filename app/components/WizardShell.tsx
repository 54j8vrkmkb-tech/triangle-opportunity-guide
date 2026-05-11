import Link from "next/link";

export function WizardShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:py-12">
          <nav className="text-xs text-[var(--color-muted)]">
            <Link href="/" className="hover:text-[var(--color-brand)]">
              Home
            </Link>{" "}
            <span className="text-[var(--color-border)]">/</span>{" "}
            <Link
              href="/find-your-fit"
              className="hover:text-[var(--color-brand)]"
            >
              Find Your Fit
            </Link>{" "}
            <span className="text-[var(--color-border)]">/</span>{" "}
            <span className="text-[var(--color-foreground)] font-semibold">
              {eyebrow}
            </span>
          </nav>
          <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            {eyebrow}
          </div>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl uppercase tracking-tight text-[var(--color-foreground)] leading-[1.05]">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-base text-[var(--color-muted)] leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 sm:py-12">
        {children}
      </section>
    </>
  );
}
