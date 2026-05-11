import type { SVGProps } from "react";

export type SectorTheme = {
  /** Saturated brand-style color, used for borders, text accents, and dark fills */
  color: string;
  /** Hover/darker shade for interactive states */
  colorDark: string;
  /** Pale background tint */
  bg: string;
  /** Mid-tint background for header bands */
  bgMid: string;
  /** Border color (often same as `color` at lower alpha) */
  border: string;
  /** Foreground color for text on top of `color` */
  on: string;
  /** Inline label, e.g. "Healthcare" */
  label: string;
  /** SVG icon component for this sector */
  Icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
};

function HealthcareIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12h3l2-5 4 10 2-5h7" />
    </svg>
  );
}

function LifeSciencesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 3h6" />
      <path d="M10 3v6.2L4.4 19A2 2 0 0 0 6.1 22h11.8a2 2 0 0 0 1.7-3L14 9.2V3" />
      <path d="M7 14h10" />
    </svg>
  );
}

function SkilledTradesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 2 2 6-6a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2 2.3-2.3z" />
      <path d="m17.5 16.5 4 4" />
      <path d="m14.5 16.5 3-3 4 4-3 3z" />
    </svg>
  );
}

function ITIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 18v3" />
      <path d="m8 9 3 3-3 3" />
      <path d="M14 15h3" />
    </svg>
  );
}

function TransportationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 17h4V5H2v12h3" />
      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
      <circle cx="7.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function PublicSectorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21h18" />
      <path d="M3 10h18" />
      <path d="m12 3 9 7H3l9-7z" />
      <path d="M5 10v11" />
      <path d="M9 10v11" />
      <path d="M15 10v11" />
      <path d="M19 10v11" />
    </svg>
  );
}

export const SECTOR_THEMES: Record<string, SectorTheme> = {
  healthcare: {
    color: "#0044b5",
    colorDark: "#002d7a",
    bg: "#eaf1ff",
    bgMid: "#d6e3ff",
    border: "#b3cbff",
    on: "#ffffff",
    label: "Healthcare",
    Icon: HealthcareIcon,
  },
  "life-sciences-mfg": {
    color: "#0e7c86",
    colorDark: "#085f67",
    bg: "#e0f4f5",
    bgMid: "#c2e7eb",
    border: "#8fd5dc",
    on: "#ffffff",
    label: "Life Sciences",
    Icon: LifeSciencesIcon,
  },
  "skilled-trades": {
    color: "#c8551f",
    colorDark: "#9c3f12",
    bg: "#fdebde",
    bgMid: "#fad6bc",
    border: "#f3b48a",
    on: "#ffffff",
    label: "Skilled Trades",
    Icon: SkilledTradesIcon,
  },
  "it-tech": {
    color: "#5b21b6",
    colorDark: "#421682",
    bg: "#ede9fe",
    bgMid: "#d8cdfb",
    border: "#b6a5f4",
    on: "#ffffff",
    label: "IT & Tech",
    Icon: ITIcon,
  },
  transportation: {
    color: "#2e7d32",
    colorDark: "#1e5523",
    bg: "#e6f4e7",
    bgMid: "#c8e6c9",
    border: "#90c896",
    on: "#ffffff",
    label: "Transport",
    Icon: TransportationIcon,
  },
  "public-sector": {
    color: "#b02a0e",
    colorDark: "#831f0a",
    bg: "#fbe3dc",
    bgMid: "#f6c4b8",
    border: "#ea9485",
    on: "#ffffff",
    label: "Public Sector",
    Icon: PublicSectorIcon,
  },
};

export function getSectorTheme(sectorId: string): SectorTheme {
  return (
    SECTOR_THEMES[sectorId] ?? {
      color: "#112337",
      colorDark: "#000",
      bg: "#f2f3f5",
      bgMid: "#e2e6ec",
      border: "#cfd5dd",
      on: "#ffffff",
      label: sectorId,
      Icon: PublicSectorIcon,
    }
  );
}
