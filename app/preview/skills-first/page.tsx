import type { Metadata } from "next";
import Link from "next/link";
import {
  EMPLOYER_SPOTLIGHTS,
  getOccupation,
  getSectorName,
  getSkillOverlap,
  getSkillsFirst,
  getSkillsFirstStarting,
  getStartingRole,
} from "@/lib/data";
import {
  SkillsFirstBadge,
  SkillsFirstCallout,
} from "@/app/components/SkillsFirstCallout";
import { OccupationCard } from "@/app/components/OccupationCard";

export const metadata: Metadata = {
  title: "Preview · Skills-First integration",
  description:
    "Internal preview — mockups of how Skills-First (Burning Glass) data would appear across the site.",
  robots: { index: false, follow: false },
};

function Section({
  num,
  title,
  description,
  children,
}: {
  num: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-sm border-2 border-dashed border-[var(--color-border)] bg-[#fafbfc] p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="inline-flex items-center rounded-sm bg-[var(--color-foreground)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          Item {num}
        </span>
        <h2 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-[var(--color-foreground)] leading-tight">
          {title}
        </h2>
      </div>
      <p className="mt-1 text-xs text-[var(--color-muted)] max-w-3xl">
        {description}
      </p>
      <div className="mt-4 rounded-sm bg-white border border-[var(--color-border)] p-4 sm:p-5 shadow-sm">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-3">
          Preview ↓
        </div>
        {children}
      </div>
    </section>
  );
}

export default function SkillsFirstPreviewPage() {
  // Anchor examples
  const cyberOcc = getOccupation("cybersecurity-analyst")!;
  const cyberRole = getSkillsFirst("cybersecurity-analyst")!;

  const cdlOcc = getOccupation("cdl-driver")!;
  const cdlRole = getSkillsFirst("cdl-driver")!;

  const maOcc = getOccupation("medical-records-specialist")!;

  const cashier = getStartingRole("start-cashier-retail")!;
  const cashierRole = getSkillsFirstStarting("start-cashier-retail")!;

  // Career-change skill overlap example: cashier → medical-records-specialist
  // (medical-records isn't in SKILLS_FIRST_MAP yet, so use cybersecurity as a
  // demonstration target instead — the matching mechanic is the same)
  const targetForOverlap = "cybersecurity-analyst";
  const targetOcc = getOccupation(targetForOverlap)!;
  const overlap = getSkillOverlap("start-customer-service", targetForOverlap);

  return (
    <>
      <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-4xl px-5 py-8 sm:py-12">
          <nav className="text-xs text-[var(--color-muted)]">
            <Link href="/" className="hover:text-[var(--color-brand)]">
              Home
            </Link>{" "}
            <span className="text-[var(--color-border)]">/</span>{" "}
            <span className="text-[var(--color-foreground)] font-semibold">
              Preview · Skills-First
            </span>
          </nav>
          <div className="mt-3 inline-flex items-center rounded-sm bg-[var(--color-foreground)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Internal preview
          </div>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-tight text-[var(--color-foreground)] leading-[1.05]">
            Skills-First integration preview
          </h1>
          <p className="mt-3 text-base text-[var(--color-muted)] leading-relaxed max-w-2xl">
            Four mockups of how Burning Glass Institute&apos;s{" "}
            <a
              href="https://www.skills-first.org/roles"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--color-foreground)]"
            >
              Skills-First Resource Library
            </a>{" "}
            data would appear across the site. Nothing on the public site has
            changed yet — review these and tell me which to ship.
          </p>
          <p className="mt-3 text-xs text-[var(--color-muted)] italic">
            Coverage so far: 8 TOG profiled occupations and 6 starting-role
            entries mapped to Burning Glass slugs. Cybersecurity-Analyst uses
            the actual Skills-First skill list; others use representative
            skills pending CSV-taxonomy import.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:py-12 space-y-8">
        {/* ITEM 1 */}
        <Section
          num="1"
          title='"Skills-first hiring eligible" callout'
          description="A teal callout block placed under the tag pills on an occupation page. Surfaces directly that this role doesn't require a four-year degree per a recognized national framework. Mapped TOG occupations: cybersecurity-analyst, production-tech, qc-inspector, industrial-mechanic, cdl-driver, logistics-manager, maintenance-land-mgmt, police-sheriff."
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Context: top of /occupations/cybersecurity-analyst, just below the
            wage banner and tag pills
          </div>
          <SkillsFirstCallout
            role={cyberRole}
            context={`This role (${cyberOcc.title})`}
          />

          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)] mt-6 mb-2">
            Same component, /occupations/cdl-driver
          </div>
          <SkillsFirstCallout
            role={cdlRole}
            context={`This role (${cdlOcc.title})`}
          />
        </Section>

        {/* ITEM 3 */}
        <Section
          num="3"
          title="Employer-page authority pairing"
          description='One sentence added to the /employers intro pairing AOI with Skills-First as the underlying practice. Single sentence, single outbound link.'
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Context: bottom of the /employers hero section
          </div>
          <p className="text-xs text-[var(--color-foreground)]/80 max-w-3xl">
            Inspired by the{" "}
            <a
              href="https://www.americanopportunityindex.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              American Opportunity Index
            </a>
            , which ranks large US employers on hourly-worker mobility, wage
            growth, and access to skill-building. The underlying practice is{" "}
            <strong>skills-first hiring</strong> — see Burning Glass
            Institute&apos;s{" "}
            <a
              href="https://www.skills-first.org/roles"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              Skills-First Resource Library
            </a>{" "}
            for the specific skills employers evaluate in {EMPLOYER_SPOTLIGHTS.length} of
            these roles.
          </p>
        </Section>

        {/* ITEM 5 */}
        <Section
          num="5"
          title="Quiz result badge"
          description='Small "Skills-first eligible" chip on quiz result cards where the matched occupation has a Burning Glass profile. Subtle but visible signal that reduces credential anxiety. Sits next to the existing "Matches all your must-haves" badge.'
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Context: /find-your-fit/quiz results, one card per matched
            occupation
          </div>
          <article className="flex flex-col gap-3 rounded-sm border border-[var(--color-border)] bg-white p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex flex-wrap gap-1.5">
                <span
                  className="inline-flex items-center rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: "#dff6f5", color: "#0e7c86" }}
                >
                  Matches all your must-haves
                </span>
                <SkillsFirstBadge role={cyberRole} />
              </div>
              <span className="text-xs text-[var(--color-muted)]">
                3 nice-to-haves satisfied
              </span>
            </div>
            <OccupationCard
              occupation={cyberOcc}
              showSector
              sectorName={getSectorName(cyberOcc.sectorId)}
            />
            <ul className="space-y-1.5 text-sm text-[var(--color-foreground)]">
              <li>✓ Pays at least $25/hr</li>
              <li>✓ Indoor work</li>
              <li>✓ Matches interests: computers and technology</li>
            </ul>
          </article>
        </Section>

        {/* ITEM 6 */}
        <Section
          num="6"
          title="Career-change skill overlap (concrete count)"
          description='When the user picks past jobs that have Burning Glass profiles, show literal skill-by-skill overlap with each matched TOG occupation. Replaces the current rough adjacency scoring with concrete evidence. Example: someone in customer service looking at cybersecurity analyst.'
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
            Context: /find-your-fit/career-change result card after the user
            selects &ldquo;Call center or customer service rep&rdquo; as past
            experience
          </div>
          <Link
            href={`/occupations/${targetOcc.id}`}
            className="flex flex-col gap-3 rounded-sm border border-[var(--color-border)] bg-white p-4 sm:p-5 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
                  {getSectorName(targetOcc.sectorId)}
                </div>
                <h3 className="font-display text-xl uppercase tracking-wide text-[var(--color-foreground)] leading-tight">
                  {targetOcc.title}
                </h3>
              </div>
              <div className="shrink-0 sm:text-right">
                <div className="font-display text-2xl text-[var(--color-brand)] tabular-nums leading-none">
                  ${targetOcc.wage.median.toFixed(2)}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mt-1">
                  /hr median
                </div>
              </div>
            </div>

            {/* The new piece: explicit skill overlap */}
            <div className="rounded-sm border border-[#0e7c86]/30 bg-[#dff6f5]/40 p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#0e7c86]">
                Skills that transfer (Burning Glass framework)
              </div>
              <div className="mt-1.5 text-sm text-[var(--color-foreground)]">
                <strong>{overlap.shared.length} of your {overlap.pastTotal}</strong>{" "}
                customer-service skills directly apply to this role
                {overlap.shared.length > 0 && " — including "}
                {overlap.shared.length > 0 && (
                  <span className="italic">{overlap.shared.slice(0, 3).join(", ")}</span>
                )}
                .
              </div>
              {overlap.shared.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {overlap.shared.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-sm bg-white border border-[#0e7c86]/40 px-2 py-0.5 text-[10px] font-semibold text-[#0e7c86]"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <ul className="space-y-0.5">
              <li className="text-xs text-[var(--color-foreground)] flex gap-1.5">
                <span className="text-[var(--color-brand)] font-bold">▸</span>
                <span>Common move from call center or customer service rep</span>
              </li>
              <li className="text-xs text-[var(--color-foreground)] flex gap-1.5">
                <span className="text-[var(--color-brand)] font-bold">▸</span>
                <span>Skills-first hiring framework lists this role</span>
              </li>
            </ul>
          </Link>

          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)] mt-6 mb-2">
            Static example (data shown represents real Burning Glass skills for
            both roles)
          </div>
          <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-xs text-[var(--color-foreground)]">
            <strong>Past role:</strong> {cashierRole.title} —{" "}
            {cashierRole.skills?.core?.slice(0, 4).join(", ")},{" "}
            {cashierRole.skills?.foundational?.slice(0, 2).join(", ")}.
            <br />
            <strong>Target role:</strong> {cyberRole.title} —{" "}
            {cyberRole.skills?.core?.slice(0, 3).join(", ")}, plus 20+ more
            specialized skills.
            <br />
            <span className="italic text-[var(--color-muted)]">
              Cashier → Cybersecurity is a long bridge — but skills like
              Communication and Problem Solving (foundational) do appear in
              both. For closer matches (cashier → medical-records-specialist,
              warehouse → production-tech), expect much higher overlap.
            </span>
          </div>
        </Section>

        {/* Footer */}
        <section className="rounded-sm border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-display text-xl uppercase tracking-wide text-[var(--color-foreground)]">
            Next step
          </h2>
          <p className="mt-1 text-sm text-[var(--color-muted)] leading-relaxed">
            Tell me which items to ship — any subset of #1, #3, #5, #6 — and
            I&apos;ll do a site-wide pass. For #6 specifically, full coverage
            requires expanding{" "}
            <code className="text-[var(--color-foreground)] bg-[var(--color-surface-2)] px-1 rounded-sm">
              SKILLS_FIRST_MAP
            </code>{" "}
            to include healthcare and other TOG occupations not yet in Burning
            Glass&apos;s 30-role library (we&apos;d use derived skills + a
            &ldquo;rough match&rdquo; label for those).
          </p>
        </section>
      </section>
    </>
  );
}
