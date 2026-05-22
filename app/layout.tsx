import type { Metadata } from "next";
import { Antonio, Palanquin } from "next/font/google";
import Link from "next/link";
import { meta } from "@/lib/data";
import "./globals.css";

const palanquin = Palanquin({
  variable: "--font-palanquin",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: {
    default: `${meta.title} — ${meta.subtitle}`,
    template: `%s — ${meta.title}`,
  },
  description: meta.subsubtitle,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${palanquin.variable} ${antonio.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--color-foreground)]">
        {/* Beta-site banner — site-wide */}
        <div className="bg-[var(--color-accent-yellow)] text-[var(--color-foreground)] text-[11px] sm:text-xs border-b-2 border-[var(--color-foreground)]">
          <div className="mx-auto max-w-6xl px-5 py-1.5 flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider">
              Beta site
            </span>
            <span className="opacity-80">
              Not all information has been verified at this time.
            </span>
          </div>
        </div>

        <div className="bg-[var(--color-foreground)] text-white text-[11px]">
          <div className="mx-auto max-w-6xl px-5 py-2 flex items-center justify-between">
            <span className="opacity-80">
              {meta.publisher} · {meta.initiative}
            </span>
            <span className="opacity-60 hidden sm:inline">{meta.region}</span>
          </div>
        </div>

        <header className="border-b border-[var(--color-border)] bg-white sticky top-0 z-30">
          <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 leading-tight">
              <span
                aria-hidden
                className="font-display text-white bg-[var(--color-brand)] rounded-sm px-2 py-1 text-base tracking-wide"
              >
                TOG
              </span>
              <span className="flex flex-col">
                <span className="font-display text-base sm:text-lg uppercase tracking-wide text-[var(--color-foreground)]">
                  Triangle Opportunity Guide
                </span>
                <span className="text-[11px] sm:text-xs text-[var(--color-muted)]">
                  Careers Without a Four-Year Degree
                </span>
              </span>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/"
                className="hidden sm:inline-flex items-center rounded-sm px-3 py-2 text-sm font-semibold text-[var(--color-foreground)] hover:text-[var(--color-brand)]"
              >
                Sectors
              </Link>
              <Link
                href="/find-your-fit/quiz"
                className="inline-flex items-center rounded-sm bg-[var(--color-accent-yellow)] px-3 sm:px-4 py-2 text-sm font-bold uppercase tracking-wide text-[var(--color-foreground)] hover:bg-[var(--color-accent-yellow-dark)] transition"
              >
                Take the Quiz
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t-4 border-[var(--color-brand)] bg-white mt-16">
          {/* Partner band — solid white so brand logos sit on their native background */}
          <div className="border-b border-[var(--color-border)]">
            <div className="mx-auto max-w-6xl px-5 py-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
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
                  height={56}
                  style={{ height: 56, width: "auto", objectFit: "contain" }}
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
                  height={56}
                  style={{ height: 56, width: "auto", objectFit: "contain" }}
                />
              </a>
            </div>
          </div>
          {/* Metadata strip */}
          <div className="bg-[var(--color-foreground)] text-white">
            <div className="mx-auto max-w-6xl px-5 py-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-display uppercase tracking-wide">
                  {meta.publisher}
                </span>
                <span className="opacity-50">·</span>
                <span>{meta.initiative}</span>
                <span className="opacity-50">·</span>
                <Link
                  href="/glossary"
                  className="underline hover:opacity-90"
                >
                  Definitions
                </Link>
                <span className="opacity-50">·</span>
                <Link
                  href="/find-your-fit/quiz"
                  className="underline hover:opacity-90"
                >
                  Job-fit quiz
                </Link>
              </div>
              <div className="opacity-70">
                {meta.edition} · Last updated {meta.lastUpdated}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
