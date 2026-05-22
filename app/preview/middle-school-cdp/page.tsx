import type { Metadata } from "next";
import Link from "next/link";
import { getOccupation, getSector, sectors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Preview · Middle-school Career Development Plan support",
  description:
    "Internal preview — mockups of how the site could support NC's middle-school CDP requirement.",
  robots: { index: false, follow: false },
};

function Section({
  num,
  title,
  audience,
  description,
  children,
}: {
  num: string;
  title: string;
  audience: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-sm border-2 border-dashed border-[var(--color-border)] bg-[#fafbfc] p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="inline-flex items-center rounded-sm bg-[var(--color-foreground)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          Item {num}
        </span>
        <span className="inline-flex items-center rounded-sm bg-[var(--color-accent-yellow)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-foreground)]">
          {audience}
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

/* ============================================================
   ITEM 1 — "Career Spark" middle-schooler interest quiz
============================================================ */

function CareerSparkQuiz() {
  const choices = [
    { emoji: "🔧", label: "Build / fix things", hint: "tools, machines, hands-on" },
    { emoji: "🩺", label: "Help people feel better", hint: "health, care, listening" },
    { emoji: "💻", label: "Solve puzzles with computers", hint: "tech, codes, systems" },
    { emoji: "🚒", label: "Keep my community safe", hint: "emergency, public service" },
    { emoji: "🚛", label: "Move things from place to place", hint: "driving, logistics, big rigs" },
    { emoji: "🔬", label: "Run experiments and tests", hint: "lab, science, quality" },
  ];
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
        Career Spark · for middle schoolers
      </div>
      <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
        Pick the one that sounds most like you
      </h3>
      <p className="mt-1 text-xs text-[var(--color-muted)]">
        Question 1 of 4. There&apos;s no wrong answer. You&apos;ll see real jobs
        in the Triangle that match.
      </p>
      <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {choices.map((c, i) => (
          <li key={c.label}>
            <button
              type="button"
              className={`w-full text-left rounded-sm border-2 bg-white p-3 transition hover:shadow-md hover:-translate-y-0.5 ${
                i === 1
                  ? "border-[var(--color-brand)] ring-2 ring-[var(--color-brand-soft)]"
                  : "border-[var(--color-border)]"
              }`}
            >
              <div className="text-3xl" aria-hidden>
                {c.emoji}
              </div>
              <div className="mt-2 font-display text-sm uppercase tracking-wide leading-tight text-[var(--color-foreground)]">
                {c.label}
              </div>
              <div className="text-[10px] text-[var(--color-muted)] mt-1">
                {c.hint}
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-[10px] text-[var(--color-muted)]">
          ●●○○ &nbsp; 4 quick questions
        </div>
        <button
          type="button"
          className="rounded-sm bg-[var(--color-brand)] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white"
        >
          Next →
        </button>
      </div>

      <div className="mt-5 rounded-sm bg-[var(--color-brand-soft)] border border-[#9bb6ff] p-3 text-[11px] leading-relaxed text-[var(--color-foreground)]">
        <strong>Why this version, not the adult quiz:</strong> The current
        Find-Your-Fit quiz assumes job-search urgency (county, schedule, pay
        floor). For 12–14 year olds we use an interest-led framing instead and
        always show 2–3 sector matches plus the high-school courses that
        prepare for each — the artifact the NC CDP requirement asks for.
      </div>
    </div>
  );
}

/* ============================================================
   ITEM 2 — "What does this person do all day?" card
============================================================ */

function DayInTheLifeCard() {
  const occ = getOccupation("respiratory-therapist");
  const title = occ?.title ?? "Respiratory Therapist";
  const sectorName = occ ? "Healthcare" : "Healthcare";

  const day = [
    {
      time: "6:45 AM",
      detail:
        "Clock in at WakeMed and get assigned a list of patients on the floor.",
    },
    {
      time: "7:30 AM",
      detail:
        "Check a newborn in the NICU who needs help breathing. Adjust the oxygen.",
    },
    {
      time: "10:00 AM",
      detail:
        "Show a teenager how to use an inhaler before they go home after an asthma attack.",
    },
    {
      time: "12:30 PM",
      detail: "Lunch with co-workers in the staff cafeteria.",
    },
    {
      time: "2:15 PM",
      detail:
        "Help with a code blue — give breathing support during an emergency.",
    },
    {
      time: "5:30 PM",
      detail: "Hand off patients to the next shift and head home.",
    },
  ];
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-[#0e7c86]">
        A day in the life · {sectorName}
      </div>
      <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
        What does a {title} do all day?
      </h3>
      <p className="mt-1 text-xs text-[var(--color-muted)] max-w-2xl">
        Written for 6th–8th graders. Concrete tasks, real local employers,
        plain language — designed to plug into NC&apos;s middle-school career
        exploration unit.
      </p>

      <ol className="mt-4 relative border-l-2 border-[#0e7c86] pl-5 space-y-3">
        {day.map((step) => (
          <li key={step.time} className="relative">
            <span className="absolute -left-[27px] top-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#0e7c86] text-white text-[9px] font-bold">
              ●
            </span>
            <div className="font-display text-xs uppercase tracking-wider text-[#0e7c86]">
              {step.time}
            </div>
            <div className="text-sm text-[var(--color-foreground)] leading-snug">
              {step.detail}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
        <div className="rounded-sm bg-[#dff6f5] border border-[#8fd5dc] p-3">
          <div className="font-bold uppercase tracking-wider text-[#0e7c86] text-[10px]">
            Pay in the Triangle
          </div>
          <div className="mt-1 font-display text-xl text-[var(--color-foreground)]">
            $34/hr
          </div>
          <div className="text-[10px] text-[var(--color-muted)]">
            About $72,000 a year
          </div>
        </div>
        <div className="rounded-sm bg-[#dff6f5] border border-[#8fd5dc] p-3">
          <div className="font-bold uppercase tracking-wider text-[#0e7c86] text-[10px]">
            Training after high school
          </div>
          <div className="mt-1 text-xs leading-snug">
            2 years of respiratory therapy school at Wake Tech, Durham Tech, or
            another community college.
          </div>
        </div>
        <div className="rounded-sm bg-[#dff6f5] border border-[#8fd5dc] p-3">
          <div className="font-bold uppercase tracking-wider text-[#0e7c86] text-[10px]">
            High-school classes that help
          </div>
          <div className="mt-1 text-xs leading-snug">
            Biology · Anatomy/Physiology · Health Science I/II · CPR
            certification
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-sm bg-[var(--color-surface)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-foreground)] border border-[var(--color-border)]">
          🎧 Listen as audio (2 min)
        </span>
        <span className="inline-flex items-center rounded-sm bg-[var(--color-surface)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-foreground)] border border-[var(--color-border)]">
          📄 Save to my CDP
        </span>
        <span className="inline-flex items-center rounded-sm bg-[var(--color-surface)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-foreground)] border border-[var(--color-border)]">
          🖨️ Print one-pager
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   ITEM 3 — Educator CDP toolkit (lesson plans + classroom kits)
============================================================ */

function EducatorToolkit() {
  const tiles = sectors.slice(0, 6).map((s) => ({
    id: s.id,
    name: s.name,
    activities: {
      healthcare: "Pulse-check station + nursing-ladder pathway map",
      "life-sciences-mfg":
        "Blueprint reading mini-game + cGMP simulation",
      "skilled-trades": "Circuit-builder kit + apprenticeship vs. degree debate",
      "it-tech": "Help-desk role play + password-strength challenge",
      transportation:
        "Route-planning puzzle + CDL training cost-vs.-pay analysis",
      "public-sector":
        "Incident-command tabletop + budget-as-a-public-good lesson",
    }[s.id] ?? "Sector activity packet",
  }));
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
        Educator toolkit · CDP-aligned
      </div>
      <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
        Drop-in lesson plans for the NC CDP requirement
      </h3>
      <p className="mt-1 text-xs text-[var(--color-muted)] max-w-3xl">
        Each TOG sector has a 5-day mini-unit aligned to NC ESSA Career
        Development indicators. Print-ready, no logins, no licensing fees.
      </p>

      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tiles.map((t) => (
          <li
            key={t.id}
            className="rounded-sm border border-[var(--color-border)] bg-white p-3 flex gap-3"
          >
            <div className="w-10 h-10 rounded-sm bg-[var(--color-brand-soft)] flex items-center justify-center font-display text-[var(--color-brand)] text-lg">
              {t.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-sm uppercase tracking-wide text-[var(--color-foreground)] leading-tight">
                {t.name} — 5-day unit
              </div>
              <div className="text-[11px] text-[var(--color-muted)] mt-1 leading-snug">
                Signature activity: {t.activities}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider rounded-sm bg-[var(--color-surface)] px-1.5 py-0.5 text-[var(--color-muted)] border border-[var(--color-border)]">
                  Lesson plans (.docx)
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider rounded-sm bg-[var(--color-surface)] px-1.5 py-0.5 text-[var(--color-muted)] border border-[var(--color-border)]">
                  Slides
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider rounded-sm bg-[var(--color-surface)] px-1.5 py-0.5 text-[var(--color-muted)] border border-[var(--color-border)]">
                  Handouts
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider rounded-sm bg-[var(--color-surface)] px-1.5 py-0.5 text-[var(--color-muted)] border border-[var(--color-border)]">
                  Family-night kit
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
        <div className="rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
          <div className="font-bold uppercase tracking-wider text-[var(--color-brand)] text-[10px]">
            Book a guest speaker
          </div>
          <div className="mt-1 text-xs leading-snug">
            Request a Triangle employer or recent grad to visit your classroom
            (virtual or in-person).
          </div>
        </div>
        <div className="rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
          <div className="font-bold uppercase tracking-wider text-[var(--color-brand)] text-[10px]">
            Field-trip directory
          </div>
          <div className="mt-1 text-xs leading-snug">
            Wake Tech open houses, Duke / WakeMed simulation labs, IBEW
            apprenticeship tours, ports + rail yards.
          </div>
        </div>
        <div className="rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
          <div className="font-bold uppercase tracking-wider text-[var(--color-brand)] text-[10px]">
            Counselor PD
          </div>
          <div className="mt-1 text-xs leading-snug">
            1-hour async session covering how to use TOG with students who say
            &ldquo;college isn&rsquo;t for me.&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ITEM 4 — Student CDP template (fillable)
============================================================ */

function StudentCDPTemplate() {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-[#c8551f]">
        Student plan · grades 6–8
      </div>
      <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
        My Career Development Plan
      </h3>
      <p className="mt-1 text-xs text-[var(--color-muted)] max-w-3xl">
        A fillable, URL-shareable plan students update yearly. Each section
        links into real TOG content. Final state is printable as a PDF
        signed by student + family + counselor — the CDP artifact NC schools
        must produce.
      </p>

      <div className="mt-4 rounded-sm border-2 border-[#c8551f] bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#c8551f]">
              Plan for Jamie · 7th grade · Carrington Middle
            </div>
            <div className="font-display text-xl uppercase tracking-wide text-[var(--color-foreground)] mt-0.5">
              My next 3 years
            </div>
          </div>
          <span className="inline-flex items-center rounded-sm bg-[var(--color-accent-yellow)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-foreground)]">
            Updated 2x / year
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <div>
            <div className="font-display text-xs uppercase tracking-wider text-[#c8551f]">
              1. Things I&apos;m good at
            </div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {[
                "Working with hands",
                "Helping people",
                "Patient when things are hard",
                "Good with animals",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-sm bg-[#fdebd9] border border-[#f3b48a] px-2 py-0.5 text-[11px] font-semibold text-[var(--color-foreground)]"
                >
                  {tag}
                </span>
              ))}
              <button
                type="button"
                className="inline-flex items-center rounded-sm border-2 border-dashed border-[var(--color-border)] px-2 py-0.5 text-[11px] text-[var(--color-muted)]"
              >
                + Add
              </button>
            </div>
          </div>

          <div>
            <div className="font-display text-xs uppercase tracking-wider text-[#c8551f]">
              2. Sectors I want to explore
            </div>
            <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
                <div className="font-display text-xs uppercase tracking-wide text-[var(--color-foreground)]">
                  Healthcare
                </div>
                <div className="text-[10px] text-[var(--color-muted)]">
                  Most interested: Respiratory Therapist, CNA
                </div>
              </div>
              <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
                <div className="font-display text-xs uppercase tracking-wide text-[var(--color-foreground)]">
                  Public Sector
                </div>
                <div className="text-[10px] text-[var(--color-muted)]">
                  Most interested: Firefighter / EMT
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="font-display text-xs uppercase tracking-wider text-[#c8551f]">
              3. High-school courses that prepare me
            </div>
            <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[12px] text-[var(--color-foreground)]">
              {[
                ["9th", "Biology + Health Science I"],
                ["10th", "Anatomy/Physiology + CTE Health Sciences"],
                ["11th", "CTE Nursing Fundamentals (dual-credit)"],
                ["12th", "Health Sciences II + clinical hours"],
              ].map(([grade, course]) => (
                <li
                  key={grade}
                  className="flex items-baseline gap-2 rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-1"
                >
                  <span className="font-display text-[10px] uppercase text-[#c8551f] w-9">
                    {grade}
                  </span>
                  <span>{course}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-display text-xs uppercase tracking-wider text-[#c8551f]">
              4. My plan after high school
            </div>
            <div className="mt-1 flex flex-wrap gap-2">
              {[
                { label: "Community college (2-year)", on: true },
                { label: "Apprenticeship", on: false },
                { label: "Military", on: false },
                { label: "Direct to work", on: false },
                { label: "4-year university", on: false },
                { label: "Still deciding", on: false },
              ].map((p) => (
                <span
                  key={p.label}
                  className={`inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-semibold border ${
                    p.on
                      ? "bg-[#c8551f] text-white border-[#9c3f12]"
                      : "bg-white text-[var(--color-muted)] border-[var(--color-border)]"
                  }`}
                >
                  {p.on ? "✓ " : ""}
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="font-display text-xs uppercase tracking-wider text-[#c8551f]">
              5. Goals for this school year
            </div>
            <ul className="mt-1 space-y-1.5 text-[12px] text-[var(--color-foreground)]">
              <li className="rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-1.5">
                <span className="font-semibold">Visit:</span> WakeMed
                Children&apos;s Hospital tour in October
              </li>
              <li className="rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-1.5">
                <span className="font-semibold">Try:</span> Sign up for Health
                Occupations Students of America (HOSA) club
              </li>
              <li className="rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-1.5">
                <span className="font-semibold">Ask:</span> Talk to Aunt Lisa
                about her CNA work at Duke
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
          <div className="text-[10px] text-[var(--color-muted)]">
            Signed: Student · Family · Counselor
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-sm border border-[var(--color-border)] bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[var(--color-foreground)]"
            >
              Save link
            </button>
            <button
              type="button"
              className="rounded-sm bg-[#c8551f] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white"
            >
              Print PDF
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-sm bg-[var(--color-brand-soft)] border border-[#9bb6ff] p-3 text-[11px] leading-relaxed text-[var(--color-foreground)]">
        <strong>Why URL-shareable, not login-gated:</strong> Counselors serve
        300+ students; logins drop completion to single digits. The plan lives
        in a shareable URL the student keeps in their school Google Drive — the
        same pattern that already works for the adult Find-Your-Fit wizard.
      </div>
    </div>
  );
}

/* ============================================================
   ITEM 5 — Family conversation guide (one-pager)
============================================================ */

function FamilyGuide() {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-[#5b21b6]">
        Family conversation guide · printable
      </div>
      <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-[var(--color-foreground)]">
        Talking with your middle-schooler about careers
      </h3>
      <p className="mt-1 text-xs text-[var(--color-muted)] max-w-3xl">
        One page, two sides, plain English + Spanish. Sent home in the
        backpack folder after the CDP unit.
      </p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-sm border-2 border-[#5b21b6] bg-[#efe9fb] p-3">
          <div className="font-display text-sm uppercase tracking-wide text-[#421682]">
            5 questions to ask at dinner
          </div>
          <ol className="mt-2 space-y-1.5 text-[12px] leading-snug text-[var(--color-foreground)] list-decimal pl-5">
            <li>What did you try this week that was hard but felt good?</li>
            <li>Who at school do you like to work with on group projects?</li>
            <li>If you could shadow any adult for a day, who would it be?</li>
            <li>What&apos;s a job you&apos;ve seen someone do that looked cool?</li>
            <li>What part of school do you wish was different — and why?</li>
          </ol>
        </div>

        <div className="rounded-sm border border-[var(--color-border)] bg-white p-3">
          <div className="font-display text-sm uppercase tracking-wide text-[var(--color-foreground)]">
            FAQ for families
          </div>
          <dl className="mt-2 space-y-2 text-[12px] leading-snug">
            <div>
              <dt className="font-semibold text-[var(--color-foreground)]">
                Does picking a career plan now lock my kid in?
              </dt>
              <dd className="text-[var(--color-muted)]">
                No. The plan changes 1–2 times a year, on purpose.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--color-foreground)]">
                What if a 4-year degree isn&apos;t the goal?
              </dt>
              <dd className="text-[var(--color-muted)]">
                Most Triangle jobs on this site pay a living wage with 2 years
                of community college, an apprenticeship, or a certificate.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--color-foreground)]">
                Where do I see the plan?
              </dt>
              <dd className="text-[var(--color-muted)]">
                Your student will share a link. The counselor also keeps a
                signed copy.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function MiddleSchoolCDPPreviewPage() {
  // Verify a sector lookup works so the example tile is real
  void getSector("healthcare");

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
              Preview · Middle-school CDP
            </span>
          </nav>
          <div className="mt-3 inline-flex items-center rounded-sm bg-[var(--color-foreground)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Internal preview
          </div>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-tight text-[var(--color-foreground)] leading-[1.05]">
            Middle-school Career Development Plan support
          </h1>
          <p className="mt-3 text-base text-[var(--color-muted)] leading-relaxed max-w-2xl">
            Mockups of how the Triangle Opportunity Guide could support the new
            NC requirement that every middle school implement a Career
            Development Plan (CDP) — without adding a login wall, a new
            curriculum to buy, or a separate platform for counselors to learn.
          </p>
          <p className="mt-3 text-xs text-[var(--color-muted)] italic">
            Audience split: student-facing items (the quiz, day-in-the-life,
            student plan) and adult-facing items (educator toolkit, family
            guide). Each item below is tagged by who it&apos;s for.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="rounded-sm bg-[var(--color-brand-soft)] border border-[#9bb6ff] p-2">
              <div className="font-bold uppercase tracking-wider text-[var(--color-brand)] text-[9px]">
                Reuses what we already have
              </div>
              <div className="mt-1 leading-snug">
                Sectors, occupations, wages, training programs, employer list —
                same database.
              </div>
            </div>
            <div className="rounded-sm bg-[#fdebd9] border border-[#f3b48a] p-2">
              <div className="font-bold uppercase tracking-wider text-[#9c3f12] text-[9px]">
                What&apos;s new
              </div>
              <div className="mt-1 leading-snug">
                Reading level rewrite, kid-friendly visuals, CDP plan artifact,
                educator + family materials.
              </div>
            </div>
            <div className="rounded-sm bg-[#efe9fb] border border-[#b6a5f4] p-2">
              <div className="font-bold uppercase tracking-wider text-[#421682] text-[9px]">
                Open questions
              </div>
              <div className="mt-1 leading-snug">
                Which NC indicators to align to? Pilot district? Spanish on day
                1 or later?
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:py-12 space-y-8">
        <Section
          num="1"
          audience="Student"
          title='"Career Spark" interest quiz (grades 6–8)'
          description="A shorter, illustrated version of Find-Your-Fit for middle schoolers. Four questions, image-led, returns 2–3 matching TOG sectors plus the specific high-school courses that prepare for each. Output meets the 'self-discovery + initial pathway' part of an NC CDP."
        >
          <CareerSparkQuiz />
        </Section>

        <Section
          num="2"
          audience="Student"
          title='"A day in the life" cards on every occupation page'
          description="A kid-readable companion to each occupation page — hour-by-hour, local employer named, plain English. Listenable as audio for emerging readers. Linked from the existing occupation pages with a toggle ('See the kid-friendly version')."
        >
          <DayInTheLifeCard />
        </Section>

        <Section
          num="3"
          audience="Educator"
          title="Educator toolkit — CDP-aligned mini-units per sector"
          description="A counselor / CTE teacher can grab a 5-day lesson plan packet per sector, with handouts, slides, family-night materials, and field-trip leads. No content management system on top — just static, print-ready files mapped to NC indicators."
        >
          <EducatorToolkit />
        </Section>

        <Section
          num="4"
          audience="Student + Family + Counselor"
          title="Student CDP template — fillable, URL-shareable, printable"
          description="The plan artifact itself. Five short sections, save-link-and-go (no account), and the same URL-state pattern as Find-Your-Fit. Signed printable PDF closes the loop with what NC actually requires schools to produce."
        >
          <StudentCDPTemplate />
        </Section>

        <Section
          num="5"
          audience="Family"
          title="Family conversation guide (1-page handout)"
          description="A bilingual one-pager mailed home with the student's plan. Five dinner-table questions plus a short FAQ that defuses the 'is my kid being tracked away from college?' fear early."
        >
          <FamilyGuide />
        </Section>

        <div className="rounded-sm border border-[var(--color-border)] bg-white p-4 sm:p-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
            What I&apos;d need from you to ship any of these
          </div>
          <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed text-[var(--color-foreground)] space-y-1">
            <li>
              The specific NC CDP indicators schools have to document — so the
              educator toolkit and student plan map 1:1 to what counselors
              report on.
            </li>
            <li>
              One pilot district or middle school willing to co-design the
              first sector unit and student template (Durham Public? WCPSS?).
            </li>
            <li>
              A reading-level pass on the existing occupation pages — most are
              written for adult job-seekers and need a parallel kid version.
            </li>
            <li>
              A call on Spanish parity: launch with English-first and add
              Spanish, or budget for parallel translation from day one.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
