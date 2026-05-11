import type { Metadata } from "next";
import {
  getLevelUpFrom,
  getLevelUpFromStartingRole,
  getOccupation,
  getSectorName,
  getStartingRole,
  occupations,
  sectors,
  STARTING_ROLES,
} from "@/lib/data";
import { WizardShell } from "@/app/components/WizardShell";
import { OccupationCard } from "@/app/components/OccupationCard";

export const metadata: Metadata = {
  title: "Level up from where I am",
  description:
    "Pick your current role and see higher-paying next steps in the Triangle.",
};

function PickerForm({ current }: { current?: string }) {
  return (
    <form
      method="get"
      action="/find-your-fit/level-up"
      className="rounded-sm border border-[var(--color-border)] bg-white p-5"
    >
      <label
        htmlFor="current"
        className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]"
      >
        Your current role
      </label>
      <select
        id="current"
        name="current"
        defaultValue={current ?? ""}
        className="mt-2 w-full rounded-sm border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-brand)]"
      >
        <option value="" disabled>
          Pick the role you have now…
        </option>

        <optgroup label="Common no-degree starting jobs">
          {STARTING_ROLES.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title}
            </option>
          ))}
        </optgroup>

        {sectors.map((s) => (
          <optgroup key={s.id} label={`Profiled — ${s.name}`}>
            {s.occupationIds
              .map((id) => getOccupation(id))
              .filter((o): o is NonNullable<typeof o> => Boolean(o))
              .map((o) => (
                <option key={o.id} value={o.id}>
                  {o.title} — ${o.wage.median.toFixed(2)}/hr
                </option>
              ))}
          </optgroup>
        ))}
      </select>
      <button
        type="submit"
        className="mt-4 inline-flex items-center rounded-sm bg-[var(--color-brand)] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[var(--color-brand-hover)]"
      >
        Show me the next step →
      </button>
    </form>
  );
}

export default async function LevelUpPage({
  searchParams,
}: {
  searchParams: Promise<{ current?: string }>;
}) {
  const { current } = await searchParams;
  const startingRole = current ? getStartingRole(current) : undefined;
  const currentOcc = current ? getOccupation(current) : undefined;

  const fromStartingRole = startingRole
    ? getLevelUpFromStartingRole(startingRole.id)
    : [];
  const fromOcc = currentOcc ? getLevelUpFrom(currentOcc.id) : [];

  const showingStartingRole = !!startingRole;
  const showingOcc = !!currentOcc;

  return (
    <WizardShell
      eyebrow="Level up"
      title="Higher-paying next steps"
      description="Tell us where you are now — including common starting jobs that don't require a degree — and we'll surface profiled Triangle roles that pay more and align with your background."
    >
      <PickerForm current={current} />

      {showingStartingRole && startingRole && (
        <div className="mt-8">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            Starting from
          </div>
          <h2 className="mt-1 font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
            {startingRole.title}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-muted)] max-w-2xl">
            {startingRole.description}
          </p>

          {fromStartingRole.length > 0 ? (
            <>
              <h3 className="mt-6 font-display text-xl uppercase tracking-wide text-[var(--color-foreground)]">
                Where you can go next
              </h3>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                Triangle roles where the skills and habits from your current
                work carry over. Sorted by median wage, ascending.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fromStartingRole.map((o) => (
                  <OccupationCard
                    key={o.id}
                    occupation={o}
                    showSector
                    sectorName={getSectorName(o.sectorId)}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              No matched roles yet for that starting point.
            </p>
          )}
        </div>
      )}

      {showingOcc && currentOcc && (
        <div className="mt-8">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            Starting from
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3 mt-1">
            <h2 className="font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
              {currentOcc.title} —{" "}
              <span className="text-[var(--color-brand)]">
                ${currentOcc.wage.median.toFixed(2)}/hr
              </span>
            </h2>
          </div>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Sector: {getSectorName(currentOcc.sectorId)}
          </p>

          {fromOcc.length > 0 ? (
            <>
              <h3 className="mt-6 font-display text-xl uppercase tracking-wide text-[var(--color-foreground)]">
                Where you can go next
              </h3>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                Sorted by median wage, ascending. {fromOcc.length} role
                {fromOcc.length === 1 ? "" : "s"} pay more than your current
                role.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fromOcc.map((o) => (
                  <OccupationCard
                    key={o.id}
                    occupation={o}
                    showSector
                    sectorName={getSectorName(o.sectorId)}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              No higher-paying roles in this dataset for {currentOcc.title}. Try
              the{" "}
              <a
                href="/find-your-fit/career-change"
                className="text-[var(--color-brand)] font-semibold hover:underline"
              >
                Change careers
              </a>{" "}
              path instead.
            </p>
          )}
        </div>
      )}

      {!showingOcc && !showingStartingRole && current && (
        <p className="mt-6 text-sm text-[var(--color-muted)]">
          That role wasn&apos;t found. Pick from the menu above.
        </p>
      )}

      {!current && (
        <p className="mt-6 text-xs text-[var(--color-muted)]">
          Don&apos;t see your role?{" "}
          <a
            href="/"
            className="text-[var(--color-brand)] font-semibold hover:underline"
          >
            Browse all {occupations.length} occupations
          </a>
          .
        </p>
      )}
    </WizardShell>
  );
}
