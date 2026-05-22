import Link from "next/link";
import {
  EMPLOYER_SPOTLIGHTS,
  meta,
  occupations,
  sectors,
} from "@/lib/data";
import { SectorCard } from "./components/SectorCard";
import { getSectorTheme } from "./components/sectorTheme";
import { AudienceNote } from "./components/AudienceNote";
import { GlossaryCallout } from "./components/Glossary";

export default function Home() {
  return (
    <>
      <div className="flex h-1.5 w-full" aria-hidden>
        {sectors.map((s) => {
          const t = getSectorTheme(s.id);
          return (
            <span
              key={s.id}
              className="flex-1"
              style={{ backgroundColor: t.color }}
            />
          );
        })}
      </div>

      {/* Partner band — full-color logos on white above the hero */}
      <div className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-12">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Brought to you by
          </span>
          <a
            href="https://unitedwaytriangle.org/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="United Way of the Greater Triangle"
            className="inline-flex"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/uwgt.png"
              alt="United Way of the Greater Triangle"
              height={48}
              style={{ height: 48, width: "auto", objectFit: "contain" }}
            />
          </a>
          <a
            href="https://unitedwaytriangle.org/our-work/future-of-work/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Future of Work Initiative"
            className="inline-flex"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/future-of-work.png"
              alt="Future of Work Initiative"
              height={44}
              style={{ height: 44, width: "auto", objectFit: "contain" }}
            />
          </a>
        </div>
      </div>

      <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-brand)]">
              {meta.edition}
            </p>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[var(--color-foreground)] leading-[1.05]">
              {meta.title}
            </h1>
            <p className="mt-3 font-display text-xl sm:text-2xl uppercase tracking-wide text-[var(--color-brand)]">
              {meta.subtitle}
            </p>
            <p className="mt-5 text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl">
              {meta.subsubtitle}. {occupations.length} occupations across{" "}
              {sectors.length} sectors in Durham, Wake, Orange, and Johnston
              counties — every one reachable without a four-year degree.
            </p>
            <div className="mt-4">
              <AudienceNote variant="compact" />
            </div>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                href="/find-your-fit"
                className="inline-flex items-center justify-center rounded-sm bg-[var(--color-accent-yellow)] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[var(--color-foreground)] hover:bg-[var(--color-accent-yellow-dark)] transition"
              >
                Find Your Fit →
              </Link>
              <a
                href="#sectors"
                className="inline-flex items-center justify-center rounded-sm border-2 border-[var(--color-brand)] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-white transition"
              >
                Browse Sectors
              </a>
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-3 gap-2">
            {sectors.map((s) => {
              const t = getSectorTheme(s.id);
              return (
                <Link
                  key={s.id}
                  href={`/sectors/${s.id}`}
                  className="group flex flex-col items-center justify-center gap-2 rounded-sm bg-white border-2 p-3 text-center transition hover:shadow-md"
                  style={{ borderColor: t.border }}
                >
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: t.color, color: t.on }}
                    aria-hidden
                  >
                    <t.Icon className="h-5 w-5" />
                  </div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-wider leading-tight"
                    style={{ color: t.colorDark }}
                  >
                    {t.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
              The picks
            </div>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl uppercase tracking-tight text-[var(--color-foreground)] leading-tight">
              Why these six sectors?
            </h2>
            <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
              The Triangle&apos;s six strongest growth sectors offering the
              most opportunity for workers <strong>without a four-year
              degree</strong> — selected from{" "}
              <span className="whitespace-nowrap">
                NC LEAD / NCCCS 2022&ndash;2032
              </span>{" "}
              projections, BLS wage data, and Triangle-region employer
              concentration.
            </p>
          </div>
          <ul className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="font-display text-base uppercase tracking-wide text-[var(--color-foreground)]">
                Most net new jobs
              </div>
              <p className="mt-1 text-xs text-[var(--color-muted)] leading-snug">
                Together these six sectors account for the majority of net new
                Triangle jobs projected through 2032.
              </p>
            </li>
            <li className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="font-display text-base uppercase tracking-wide text-[var(--color-foreground)]">
                Accessible entry
              </div>
              <p className="mt-1 text-xs text-[var(--color-muted)] leading-snug">
                Every role profiled is reachable through a certificate,
                apprenticeship, on-the-job training, or associate degree.
              </p>
            </li>
            <li className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="font-display text-base uppercase tracking-wide text-[var(--color-foreground)]">
                Living wages
              </div>
              <p className="mt-1 text-xs text-[var(--color-muted)] leading-snug">
                Median pay starts at $21+/hr and climbs into the $40&ndash;
                $60+/hr range with experience and credentials.
              </p>
            </li>
            <li className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="font-display text-base uppercase tracking-wide text-[var(--color-foreground)]">
                Triangle-concentrated
              </div>
              <p className="mt-1 text-xs text-[var(--color-muted)] leading-snug">
                Top employers in Durham, Wake, Orange, and Johnston counties
                are hiring at scale into these sectors right now.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-accent-yellow)] border-y-4 border-[var(--color-foreground)]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-foreground)]">
              No credential? Start now.
            </div>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl uppercase tracking-tight text-[var(--color-foreground)] leading-[1.05]">
              You don&apos;t need a credential to land at a better employer today
            </h2>
            <p className="mt-4 text-base text-[var(--color-foreground)] leading-relaxed max-w-2xl">
              {EMPLOYER_SPOTLIGHTS.length} <strong>large Triangle employers</strong>{" "}
              recognized by the American Opportunity Index for paying, promoting, and
              growing workers without a four-year degree — many cover the cost of a
              credential later if you want one.{" "}
              <span className="opacity-70">
                Smaller Triangle businesses can offer equally good jobs too — they
                just don&apos;t show up on national indexes.
              </span>
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link
                href="/employers"
                className="inline-flex items-center justify-center rounded-sm bg-[var(--color-foreground)] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-black transition"
              >
                See the employers →
              </Link>
              <Link
                href="/find-your-fit/quiz"
                className="inline-flex items-center justify-center rounded-sm border-2 border-[var(--color-foreground)] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-white transition"
              >
                Or take the quiz
              </Link>
            </div>
          </div>
          <ul className="lg:col-span-2 grid grid-cols-2 gap-2">
            {EMPLOYER_SPOTLIGHTS.slice(0, 6).map((e) => (
              <li
                key={e.id}
                className="rounded-sm bg-white px-3 py-2 text-xs font-semibold text-[var(--color-foreground)] truncate"
                title={e.name}
              >
                {e.name}
              </li>
            ))}
            <li className="rounded-sm bg-[var(--color-foreground)] px-3 py-2 text-xs font-bold uppercase tracking-wider text-white col-span-2 text-center">
              + {EMPLOYER_SPOTLIGHTS.length - 6} more on the full list
            </li>
          </ul>
        </div>
      </section>

      <section id="sectors" className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <div className="flex items-end justify-between flex-wrap gap-2 mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[var(--color-foreground)]">
              Explore by sector
            </h2>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              Each sector below shows the same data points so you can compare:
              median pay (hourly + annual), time to enter, outlook, and how
              many roles are profiled.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <SectorCard key={sector.id} sector={sector} />
          ))}
        </div>
      </section>
    </>
  );
}
