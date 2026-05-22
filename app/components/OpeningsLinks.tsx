import type { Occupation, Sector } from "@/lib/data";

function indeedUrl(q: string, where = "Triangle, NC") {
  return `https://www.indeed.com/jobs?${new URLSearchParams({
    q,
    l: where,
  }).toString()}`;
}

function linkedinUrl(q: string, where = "Raleigh-Durham-Chapel Hill Area") {
  return `https://www.linkedin.com/jobs/search/?${new URLSearchParams({
    keywords: q,
    location: where,
    f_TPR: "r604800", // last 7 days
  }).toString()}`;
}

function ncworksUrl(q: string) {
  return `https://www.ncworks.gov/vosnet/Default.aspx?enc=${encodeURIComponent(q)}`;
}

export function OccupationOpenings({ occ }: { occ: Occupation }) {
  const q = occ.title;
  return (
    <section className="rounded-sm border-2 border-[var(--color-brand)] bg-[var(--color-brand-soft)] p-4 sm:p-5">
      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
        Current openings
      </div>
      <h3 className="mt-1 font-display text-lg sm:text-xl uppercase tracking-wide text-[var(--color-foreground)]">
        See live {occ.title} jobs in the Triangle
      </h3>
      <p className="mt-1 text-xs text-[var(--color-muted)]">
        We don&apos;t host a job board yet — these search links open the most
        recent postings on the major sites, filtered to the Triangle.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={indeedUrl(q)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-sm bg-[var(--color-brand)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[var(--color-brand-hover)]"
        >
          Indeed ↗
        </a>
        <a
          href={linkedinUrl(q)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-sm bg-[var(--color-brand)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[var(--color-brand-hover)]"
        >
          LinkedIn (last 7 days) ↗
        </a>
        <a
          href={ncworksUrl(q)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-sm bg-[var(--color-foreground)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-black"
        >
          NCWorks ↗
        </a>
      </div>
      <p className="mt-2 text-[10px] text-[var(--color-muted)] italic">
        Listings refresh on the partner site — accuracy depends on their data.
      </p>
    </section>
  );
}

export function SectorOpenings({ sector }: { sector: Sector }) {
  const q = sector.name;
  return (
    <section className="rounded-sm border-2 border-[var(--color-brand)] bg-[var(--color-brand-soft)] p-4 sm:p-5">
      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
        Current openings in {sector.name}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={indeedUrl(q)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-sm bg-[var(--color-brand)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[var(--color-brand-hover)]"
        >
          Indeed ↗
        </a>
        <a
          href={linkedinUrl(q)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-sm bg-[var(--color-brand)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[var(--color-brand-hover)]"
        >
          LinkedIn ↗
        </a>
        <a
          href={ncworksUrl(q)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-sm bg-[var(--color-foreground)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-black"
        >
          NCWorks ↗
        </a>
      </div>
    </section>
  );
}
