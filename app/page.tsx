import Link from "next/link";
import { meta, sectors, occupations } from "@/lib/data";
import { SectorCard } from "./components/SectorCard";
import { getSectorTheme } from "./components/sectorTheme";

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
