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
                href="/find-your-fit"
                className="inline-flex items-center rounded-sm bg-[var(--color-accent-yellow)] px-3 sm:px-4 py-2 text-sm font-bold uppercase tracking-wide text-[var(--color-foreground)] hover:bg-[var(--color-accent-yellow-dark)] transition"
              >
                Find Your Fit
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t-4 border-[var(--color-brand)] bg-[var(--color-foreground)] text-white mt-16">
          <div className="mx-auto max-w-6xl px-5 py-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-display text-lg uppercase tracking-wide">
                {meta.publisher}
              </div>
              <div className="text-xs opacity-70">{meta.initiative}</div>
            </div>
            <div className="text-xs opacity-70">
              {meta.edition} · Last updated {meta.lastUpdated}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
