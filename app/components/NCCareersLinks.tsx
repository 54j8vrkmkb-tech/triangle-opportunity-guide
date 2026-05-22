import {
  getNCCareersUrl,
  getNCCareersClusterUrl,
  type Occupation,
  type Sector,
} from "@/lib/data";

export function OccupationNCCareers({ occ }: { occ: Occupation }) {
  const directUrl = getNCCareersUrl(occ.id);
  const clusterUrl = getNCCareersClusterUrl(occ.sectorId);

  return (
    <section className="rounded-sm border border-[var(--color-border)] bg-white p-4 sm:p-5">
      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
        Career exploration · NC Careers
      </div>
      <h3 className="mt-1 font-display text-lg uppercase tracking-wide text-[var(--color-foreground)]">
        See {occ.title} on NC&apos;s state career site
      </h3>
      <p className="mt-1 text-xs text-[var(--color-muted)]">
        State-published occupation profile — salary data, tasks, education
        requirements, and career-cluster context for students, counselors, and
        career navigators.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {directUrl && (
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-sm bg-[var(--color-brand)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[var(--color-brand-hover)]"
          >
            NC Careers profile ↗
          </a>
        )}
        <a
          href={clusterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-sm border-2 border-[var(--color-brand)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-[var(--color-brand)] hover:bg-[var(--color-brand-soft)]"
        >
          Sector career cluster ↗
        </a>
      </div>
    </section>
  );
}

export function SectorNCCareers({ sector }: { sector: Sector }) {
  const clusterUrl = getNCCareersClusterUrl(sector.id);

  return (
    <section className="rounded-sm border border-[var(--color-border)] bg-white p-4 sm:p-5">
      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
        Career exploration · NC Careers
      </div>
      <h3 className="mt-1 font-display text-lg uppercase tracking-wide text-[var(--color-foreground)]">
        Explore the {sector.name} career cluster
      </h3>
      <p className="mt-1 text-xs text-[var(--color-muted)]">
        State-published cluster page — full list of occupations in this area
        with salary data, tasks, and education pathways.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={clusterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-sm bg-[var(--color-brand)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[var(--color-brand-hover)]"
        >
          Open cluster on NC Careers ↗
        </a>
      </div>
    </section>
  );
}
