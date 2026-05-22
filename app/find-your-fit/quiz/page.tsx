import type { Metadata } from "next";
import Link from "next/link";
import {
  BENEFIT_OPTIONS,
  type BenefitId,
  COUNTIES,
  type County,
  INTEREST_OPTIONS_V2,
  getOccupation,
  getSectorName,
  getStartingRole,
  PAST_SECTORS,
  PAY_FLOOR_OPTIONS,
  runQuizV2,
  type ScheduleType,
  sectors,
  STARTING_ROLES,
  type SettingType,
  type Tier,
} from "@/lib/data";
import { WizardShell } from "@/app/components/WizardShell";
import { OccupationCard } from "@/app/components/OccupationCard";

export const metadata: Metadata = {
  title: "Job-fit quiz",
  description:
    "Pick must-haves vs nice-to-haves — pay, schedule, location, benefits, interests — and see Triangle roles that fit.",
};

// ----------------------- searchParams helpers -----------------------
type Raw = string | string[] | undefined;

function toArr(v: Raw): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function asTier(v: Raw): Tier {
  const s = Array.isArray(v) ? v[0] : v;
  return s === "must" || s === "nice" ? s : "off";
}

function isCounty(x: string): x is County {
  return (COUNTIES as readonly string[]).includes(x);
}

function isSetting(x: string): x is SettingType | "any" {
  return ["inside", "outside", "mixed", "any"].includes(x);
}

const VARIABLE_OPTIONS: { id: "yes" | "no"; label: string; description: string }[] = [
  {
    id: "yes",
    label: "Yes — any schedule works",
    description: "Shift, nights, weekends, on-call all OK",
  },
  {
    id: "no",
    label: "No — weekday daytime only",
    description: "M-F predictable hours required",
  },
];

const SETTING_LABELS: Record<string, string> = {
  inside: "Mostly inside",
  outside: "Mostly outside",
  mixed: "A mix of both",
  any: "No preference",
};

// ----------------------- small UI primitives -----------------------
function TierToggle({
  name,
  value,
}: {
  name: string;
  value: Tier;
}) {
  return (
    <fieldset className="mt-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
      <legend className="sr-only">Importance</legend>
      <span className="text-[var(--color-muted)] mr-1">Importance:</span>
      {(["must", "nice", "off"] as Tier[]).map((t) => (
        <label
          key={t}
          className={`cursor-pointer rounded-sm border px-2 py-1 ${
            value === t
              ? t === "must"
                ? "border-[var(--color-foreground)] bg-[var(--color-foreground)] text-white"
                : t === "nice"
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-muted)]"
              : "border-[var(--color-border)] bg-white text-[var(--color-foreground)]"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={t}
            defaultChecked={value === t}
            className="sr-only"
          />
          {t === "must" ? "Must-have" : t === "nice" ? "Nice-to-have" : "Skip"}
        </label>
      ))}
    </fieldset>
  );
}

function CritBadge({ status }: { status: "satisfied" | "missing" | "unknown" }) {
  const styles =
    status === "satisfied"
      ? { bg: "#dff6f5", fg: "#0e7c86", glyph: "✓" }
      : status === "missing"
        ? { bg: "#fbe3dc", fg: "#b02a0e", glyph: "✕" }
        : { bg: "#fef9c3", fg: "#854d0e", glyph: "?" };
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold shrink-0"
      style={{ backgroundColor: styles.bg, color: styles.fg }}
    >
      {styles.glyph}
    </span>
  );
}

function StatusBadge({ badge }: { badge: "all_must" | "some_must" | "missing_must" | "incomplete" }) {
  const styles: Record<typeof badge, { bg: string; fg: string; text: string }> = {
    all_must: { bg: "#dff6f5", fg: "#0e7c86", text: "Matches all your must-haves" },
    incomplete: { bg: "#fef9c3", fg: "#854d0e", text: "Matches must-haves; some data unclear" },
    some_must: { bg: "#fbe3dc", fg: "#b02a0e", text: "Missing 1 must-have" },
    missing_must: { bg: "#fbe3dc", fg: "#b02a0e", text: "Missing multiple must-haves" },
  };
  const s = styles[badge];
  return (
    <span
      className="inline-flex items-center rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      {s.text}
    </span>
  );
}

// ----------------------- page -----------------------
export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, Raw>>;
}) {
  const sp = await searchParams;

  const homeCounty =
    sp.home && typeof sp.home === "string" && isCounty(sp.home)
      ? sp.home
      : undefined;
  const commuteCounties = toArr(sp.commute).filter(isCounty);
  const currentJobId =
    typeof sp.current === "string" && sp.current ? sp.current : undefined;

  const payFloor =
    typeof sp.pay === "string" && sp.pay ? Number(sp.pay) || 0 : 0;
  const payTier = asTier(sp.payTier);

  const variableOk =
    sp.variable === "yes" || sp.variable === "no" ? sp.variable : undefined;
  const variableTier = asTier(sp.variableTier);

  const setting =
    typeof sp.setting === "string" && isSetting(sp.setting)
      ? sp.setting
      : ("any" as const);
  const settingTier = asTier(sp.settingTier);

  // Build benefits map from sp[`benefit_${id}`]
  const benefits: Partial<Record<BenefitId, Tier>> = {};
  for (const opt of BENEFIT_OPTIONS) {
    benefits[opt.id] = asTier(sp[`benefit_${opt.id}`]);
  }

  const interests = toArr(sp.interest);
  const interestsTier = asTier(sp.interestsTier);

  const submitted = sp.submitted === "1";

  const results = submitted
    ? runQuizV2({
        homeCounty,
        commuteCounties,
        currentJobId,
        payFloor,
        payTier,
        variableOk,
        variableTier,
        setting,
        settingTier,
        benefits,
        interests,
        interestsTier,
      })
    : [];

  // Section helper
  const sectionClass =
    "rounded-sm border border-[var(--color-border)] bg-white p-5";

  return (
    <WizardShell
      eyebrow="Job-fit quiz"
      title="What kind of job fits your life?"
      description="Mark each preference as a must-have, a nice-to-have, or skip it. Roles that meet your must-haves rise to the top; nice-to-haves rank within them."
    >
      <form method="get" action="/find-your-fit/quiz" className="space-y-6">
        <input type="hidden" name="submitted" value="1" />

        {/* 1. Where you live */}
        <fieldset className={sectionClass}>
          <legend className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            1. Where you live
          </legend>
          <p className="text-xs text-[var(--color-muted)] mt-1 mb-3">
            Your home county. (Location is always treated as a must-have.)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {COUNTIES.map((c) => (
              <label
                key={c}
                className={`flex items-center justify-center gap-2 rounded-sm border px-3 py-2 cursor-pointer text-sm ${
                  homeCounty === c
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] font-semibold"
                    : "border-[var(--color-border)] bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="home"
                  value={c}
                  defaultChecked={homeCounty === c}
                  className="accent-[var(--color-brand)]"
                />
                {c}
              </label>
            ))}
          </div>
        </fieldset>

        {/* 2. Commute */}
        <fieldset className={sectionClass}>
          <legend className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            2. Counties you&apos;ll commute to
          </legend>
          <p className="text-xs text-[var(--color-muted)] mt-1 mb-3">
            Optional. Pick any other counties you&apos;d travel for the right
            job.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {COUNTIES.map((c) => (
              <label
                key={c}
                className={`flex items-center justify-center gap-2 rounded-sm border px-3 py-2 cursor-pointer text-sm ${
                  commuteCounties.includes(c)
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] font-semibold"
                    : "border-[var(--color-border)] bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  name="commute"
                  value={c}
                  defaultChecked={commuteCounties.includes(c)}
                  className="accent-[var(--color-brand)]"
                />
                {c}
              </label>
            ))}
          </div>
        </fieldset>

        {/* 3. Current job (optional) */}
        <fieldset className={sectionClass}>
          <legend className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            3. Your current job (optional)
          </legend>
          <p className="text-xs text-[var(--color-muted)] mt-1 mb-3">
            We use this to flag roles that build on your existing experience.
          </p>
          <label className="sr-only" htmlFor="current">
            Current job
          </label>
          <select
            id="current"
            name="current"
            defaultValue={currentJobId ?? ""}
            className="w-full rounded-sm border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-brand)]"
          >
            <option value="">— skip —</option>
            {PAST_SECTORS.map((ps) => {
              const roles = STARTING_ROLES.filter(
                (r) => r.pastSectorId === ps.id,
              );
              if (!roles.length) return null;
              return (
                <optgroup key={ps.id} label={ps.name}>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </optgroup>
              );
            })}
            {sectors.map((s) => (
              <optgroup key={s.id} label={`Triangle Opportunity Guide — ${s.name}`}>
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
        </fieldset>

        {/* 4. Minimum pay */}
        <fieldset className={sectionClass}>
          <legend className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            4. Minimum pay
          </legend>
          <p className="text-xs text-[var(--color-muted)] mt-1 mb-3">
            What hourly rate would the role need to clear?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {PAY_FLOOR_OPTIONS.map((p) => (
              <label
                key={p.value}
                className={`flex items-center justify-center gap-2 rounded-sm border px-3 py-2 cursor-pointer text-sm ${
                  payFloor === p.value
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] font-semibold"
                    : "border-[var(--color-border)] bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="pay"
                  value={p.value}
                  defaultChecked={payFloor === p.value}
                  className="accent-[var(--color-brand)]"
                />
                {p.label}
              </label>
            ))}
          </div>
          <TierToggle name="payTier" value={payTier} />
        </fieldset>

        {/* 5. Variable hours */}
        <fieldset className={sectionClass}>
          <legend className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            5. Schedule
          </legend>
          <p className="text-xs text-[var(--color-muted)] mt-1 mb-3">
            Are variable hours, shift work, or on-call days workable for you?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {VARIABLE_OPTIONS.map((v) => (
              <label
                key={v.id}
                className={`flex items-start gap-2 rounded-sm border px-3 py-2 cursor-pointer text-sm ${
                  variableOk === v.id
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                    : "border-[var(--color-border)] bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="variable"
                  value={v.id}
                  defaultChecked={variableOk === v.id}
                  className="mt-0.5 accent-[var(--color-brand)]"
                />
                <span>
                  <span className="font-semibold">{v.label}</span>
                  <span className="block text-xs text-[var(--color-muted)]">
                    {v.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
          <TierToggle name="variableTier" value={variableTier} />
        </fieldset>

        {/* 6. Setting */}
        <fieldset className={sectionClass}>
          <legend className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            6. Indoor or outdoor work?
          </legend>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["inside", "outside", "mixed", "any"] as const).map((s) => (
              <label
                key={s}
                className={`flex items-center justify-center gap-2 rounded-sm border px-3 py-2 cursor-pointer text-sm ${
                  setting === s
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] font-semibold"
                    : "border-[var(--color-border)] bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="setting"
                  value={s}
                  defaultChecked={setting === s}
                  className="accent-[var(--color-brand)]"
                />
                {SETTING_LABELS[s]}
              </label>
            ))}
          </div>
          <TierToggle name="settingTier" value={settingTier} />
        </fieldset>

        {/* 7. Benefits */}
        <fieldset className={sectionClass}>
          <legend className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            7. Benefits
          </legend>
          <p className="text-xs text-[var(--color-muted)] mt-1 mb-3">
            For each benefit, mark whether it&apos;s a must-have, nice-to-have,
            or skip.
          </p>
          <div className="divide-y divide-[var(--color-border)] rounded-sm border border-[var(--color-border)]">
            {BENEFIT_OPTIONS.map((opt) => {
              const cur = benefits[opt.id] ?? "off";
              return (
                <div
                  key={opt.id}
                  className="flex flex-col gap-2 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <div className="text-sm font-semibold text-[var(--color-foreground)]">
                    {opt.label}
                  </div>
                  <div className="flex gap-1 text-[10px] font-bold uppercase tracking-wider">
                    {(["must", "nice", "off"] as Tier[]).map((t) => (
                      <label
                        key={t}
                        className={`cursor-pointer rounded-sm border px-2 py-1 ${
                          cur === t
                            ? t === "must"
                              ? "border-[var(--color-foreground)] bg-[var(--color-foreground)] text-white"
                              : t === "nice"
                                ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                                : "border-[var(--color-border)] bg-white text-[var(--color-muted)]"
                            : "border-[var(--color-border)] bg-white text-[var(--color-foreground)]"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`benefit_${opt.id}`}
                          value={t}
                          defaultChecked={cur === t}
                          className="sr-only"
                        />
                        {t === "must" ? "Must" : t === "nice" ? "Nice" : "Skip"}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </fieldset>

        {/* 8. Interests */}
        <fieldset className={sectionClass}>
          <legend className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            8. What kind of work appeals to you?
          </legend>
          <p className="text-xs text-[var(--color-muted)] mt-1 mb-3">
            Pick as many as you like. We&apos;ll match roles to your selections.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {INTEREST_OPTIONS_V2.map((i) => (
              <label
                key={i.id}
                className={`flex items-center gap-2 rounded-sm border px-3 py-2 cursor-pointer text-sm ${
                  interests.includes(i.id)
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                    : "border-[var(--color-border)] bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  name="interest"
                  value={i.id}
                  defaultChecked={interests.includes(i.id)}
                  className="accent-[var(--color-brand)]"
                />
                <span>{i.label}</span>
              </label>
            ))}
          </div>
          <TierToggle name="interestsTier" value={interestsTier} />
        </fieldset>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center rounded-sm bg-[var(--color-brand)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-[var(--color-brand-hover)]"
          >
            Show my matches →
          </button>
          {submitted && (
            <Link
              href="/find-your-fit/quiz"
              className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            >
              Reset quiz
            </Link>
          )}
        </div>
      </form>

      {submitted && (
        <Results results={results} currentJobId={currentJobId} />
      )}
    </WizardShell>
  );
}

function Results({
  results,
  currentJobId,
}: {
  results: ReturnType<typeof runQuizV2>;
  currentJobId?: string;
}) {
  const all = results.filter((r) => r.badge === "all_must" || r.badge === "incomplete");
  const some = results.filter((r) => r.badge === "some_must");
  const missing = results.filter((r) => r.badge === "missing_must");

  const currentTitle = currentJobId
    ? getOccupation(currentJobId)?.title ?? getStartingRole(currentJobId)?.title
    : undefined;

  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
        Your matches
      </h2>
      {currentTitle && (
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          Coming from <strong>{currentTitle}</strong> · roles you&apos;ve
          already held are excluded.
        </p>
      )}

      {all.length > 0 && (
        <ResultGroup
          heading="Matches all your must-haves"
          description="Top matches first — sorted by how many nice-to-haves they satisfy."
          results={all}
        />
      )}
      {some.length > 0 && (
        <ResultGroup
          heading="Almost — missing one must-have"
          description="Close matches if you can flex on one criterion."
          results={some}
        />
      )}
      {missing.length > 0 && (
        <ResultGroup
          heading="Worth a look — multiple must-haves not met"
          description="Bigger gaps, but the role may still be worth considering."
          results={missing.slice(0, 5)}
        />
      )}
      {results.length === 0 && (
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          No matches. Try widening commute, lowering pay floor, or marking
          fewer items as must-haves.
        </p>
      )}
    </div>
  );
}

function ResultGroup({
  heading,
  description,
  results,
}: {
  heading: string;
  description: string;
  results: ReturnType<typeof runQuizV2>;
}) {
  return (
    <section className="mt-6">
      <h3 className="font-display text-lg uppercase tracking-wide text-[var(--color-foreground)]">
        {heading}{" "}
        <span className="text-[var(--color-muted)]">({results.length})</span>
      </h3>
      <p className="text-xs text-[var(--color-muted)] mt-0.5 mb-3">{description}</p>
      <div className="grid grid-cols-1 gap-3">
        {results.map((r) => (
          <article
            key={r.occupation.id}
            className="flex flex-col gap-3 rounded-sm border border-[var(--color-border)] bg-white p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <StatusBadge badge={r.badge} />
              <span className="text-xs text-[var(--color-muted)]">
                {r.niceHits} nice-to-have
                {r.niceHits === 1 ? "" : "s"} satisfied
                {r.unknowns > 0 && ` · ${r.unknowns} unclear`}
              </span>
            </div>
            <OccupationCard
              occupation={r.occupation}
              showSector
              sectorName={getSectorName(r.occupation.sectorId)}
            />
            <ul className="space-y-1.5">
              {r.crits.map((c) => (
                <li
                  key={c.id}
                  className="flex items-start gap-2 text-sm text-[var(--color-foreground)]"
                >
                  <CritBadge status={c.status} />
                  <span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider mr-1 ${
                        c.tier === "must"
                          ? "text-[var(--color-foreground)]"
                          : "text-[var(--color-brand)]"
                      }`}
                    >
                      {c.tier === "must" ? "Must" : "Nice"}
                    </span>
                    {c.label}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

// Schedule type referenced (avoid unused-import warnings)
export type _ = ScheduleType;
