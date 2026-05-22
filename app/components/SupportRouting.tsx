export function SupportRouting() {
  return (
    <section className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
        Need help getting started?
      </div>
      <h3 className="mt-1 font-display text-lg uppercase tracking-wide text-[var(--color-foreground)]">
        Local navigators and career services
      </h3>
      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <li className="rounded-sm bg-white border border-[var(--color-border)] p-3">
          <div className="font-semibold text-[var(--color-foreground)]">
            <a
              href="https://www.ncworks.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[var(--color-brand)]"
            >
              NCWorks Career Centers ↗
            </a>
          </div>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            Free career navigators, training funding (WIOA), interview prep.
            Centers in Raleigh, Durham, and Smithfield.
          </p>
        </li>
        <li className="rounded-sm bg-white border border-[var(--color-border)] p-3">
          <div className="font-semibold text-[var(--color-foreground)]">
            <a
              href="https://www.waketech.edu/student-services/career-services"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[var(--color-brand)]"
            >
              Wake Tech Career Services ↗
            </a>
          </div>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            Open to enrolled and prospective students. Job placement, resume
            help, employer connections.
          </p>
        </li>
        <li className="rounded-sm bg-white border border-[var(--color-border)] p-3">
          <div className="font-semibold text-[var(--color-foreground)]">
            <a
              href="https://www.durhamtech.edu/student-services/career-services"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[var(--color-brand)]"
            >
              Durham Tech Career Services ↗
            </a>
          </div>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            Career counseling and employer events. Open to community members.
          </p>
        </li>
      </ul>
    </section>
  );
}
