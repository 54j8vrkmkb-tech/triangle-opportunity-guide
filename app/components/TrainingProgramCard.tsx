import type { TrainingProgram } from "@/lib/data";
import { extractDomain } from "@/lib/data";
import { getSectorTheme } from "./sectorTheme";
import { Logo } from "./Logo";

const CONTACT_NAMES = [
  "Marcus Thompson",
  "Aaliyah Reed",
  "Jamal Carter",
  "Priya Patel",
  "Renee Alvarez",
  "DeShawn Williams",
  "Mei-Ling Chen",
  "Carlos Mendoza",
  "Emma O'Connor",
  "Tyrell Banks",
  "Sofia Rivera",
  "Hassan Mohammed",
  "Brianna Foster",
  "Linh Nguyen",
  "Andre Jackson",
  "Khadija Diallo",
  "Lucas Hernandez",
  "Rachel Goldstein",
  "Jasmine Brooks",
  "Yusuf Ahmadi",
  "Nia Robinson",
  "Daniel Kim",
  "Samira Okafor",
  "Wesley Hall",
  "Tanya Volkova",
  "Jorge Castillo",
  "Imani Powell",
  "Patrick O'Neill",
  "Aisha Mensah",
  "Ben Schroeder",
];

const CONTACT_TITLES = [
  "Program Coordinator",
  "Admissions Advisor",
  "Career Pathways Counselor",
  "Workforce Liaison",
  "Enrollment Specialist",
  "Student Success Navigator",
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function placeholderContact(programName: string) {
  const h = hash(programName);
  const name = CONTACT_NAMES[h % CONTACT_NAMES.length];
  const title = CONTACT_TITLES[Math.floor(h / 7) % CONTACT_TITLES.length];
  return { name, title };
}

function initialsOf(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

export function TrainingProgramCard({
  program,
  sectorId,
}: {
  program: TrainingProgram;
  sectorId: string;
}) {
  const theme = getSectorTheme(sectorId);
  const contact = placeholderContact(program.name);
  const initials = initialsOf(contact.name);
  const raw = program.applyUrl?.trim() ?? "";
  const isHttp = /^https?:\/\//i.test(raw);
  // Treat as URL only if it's a plain hostname/path (no spaces, has a dot, no commas)
  const looksLikeBareHostname =
    !isHttp &&
    /^[A-Za-z0-9._\-/?=&%#]+$/.test(raw) &&
    raw.includes(".") &&
    !/\s/.test(raw);
  const isLink = isHttp || looksLikeBareHostname;
  const applyHref = isHttp ? raw : looksLikeBareHostname ? `https://${raw}` : "#";
  const providerDomain = extractDomain(raw);

  return (
    <article className="flex flex-col rounded-sm border border-[var(--color-border)] bg-white overflow-hidden">
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: theme.color }}
        aria-hidden
      />
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Logo
            domain={providerDomain}
            name={program.name}
            size={40}
            rounded={false}
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-base uppercase tracking-wide text-[var(--color-foreground)] leading-tight">
              {program.name}
            </h3>
            <div className="mt-1 text-xs text-[var(--color-muted)]">
              {[program.type, program.location].filter(Boolean).join(" · ")}
            </div>
          </div>
        </div>
        {program.highlight && (
          <p className="mt-2 text-sm text-[var(--color-foreground)] leading-snug">
            {program.highlight}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3 rounded-sm bg-[var(--color-surface)] p-3">
          <div
            className="shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-white font-display text-base ring-2 ring-white"
            style={{ backgroundColor: theme.color }}
            aria-hidden
          >
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Contact
            </div>
            <div className="text-sm font-semibold text-[var(--color-foreground)] truncate">
              {contact.name}
            </div>
            <div className="text-xs text-[var(--color-muted)] truncate">
              {contact.title}
            </div>
          </div>
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs border-t border-[var(--color-border)] pt-3">
          <div className="col-span-2">
            <dt className="text-[var(--color-muted)] uppercase tracking-wider text-[10px] font-bold">
              Apply
            </dt>
            <dd className="font-semibold text-[var(--color-foreground)] break-words">
              {isLink ? (
                <a
                  href={applyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: theme.color }}
                >
                  {raw} ↗
                </a>
              ) : (
                raw
              )}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--color-muted)] uppercase tracking-wider text-[10px] font-bold">
              Cost
            </dt>
            <dd className="font-semibold text-[var(--color-foreground)]">
              {program.cost}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--color-muted)] uppercase tracking-wider text-[10px] font-bold">
              Starts
            </dt>
            <dd className="font-semibold text-[var(--color-foreground)]">
              {program.starts}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[var(--color-muted)] uppercase tracking-wider text-[10px] font-bold">
              Info
            </dt>
            <dd className="font-semibold text-[var(--color-foreground)]">
              {program.info}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
