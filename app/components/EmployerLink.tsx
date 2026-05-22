import {
  getEmployerDomain,
  getEmployerUrl,
  isCuratedEmployerUrl,
} from "@/lib/data";
import { Logo } from "./Logo";

export function EmployerLink({
  name,
  className,
  showLogo = true,
  logoSize = 24,
}: {
  name: string;
  className?: string;
  showLogo?: boolean;
  logoSize?: number;
}) {
  const url = getEmployerUrl(name);
  const curated = isCuratedEmployerUrl(name);
  const domain = curated ? getEmployerDomain(name) : "";

  return (
    <span className="inline-flex items-center gap-2">
      {showLogo && (
        <Logo
          domain={domain}
          name={name}
          size={logoSize}
          rounded={false}
        />
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={
          className ??
          "inline-flex items-center gap-1 font-semibold text-[var(--color-foreground)] hover:text-[var(--color-brand)] hover:underline"
        }
        title={curated ? `Visit ${name}` : `Search for ${name}`}
      >
        {name}
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-3 w-3 opacity-60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </a>
    </span>
  );
}
