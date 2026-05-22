import type { SkillsFirstRole } from "@/lib/data";
import { skillsFirstUrl } from "@/lib/data";

export function SkillsFirstCallout({
  role,
  context,
}: {
  role: SkillsFirstRole;
  context?: string;
}) {
  return (
    <aside className="rounded-sm border-2 border-[#0e7c86] bg-[#dff6f5] p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0e7c86] text-white text-xs font-bold"
        >
          ✓
        </span>
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#0e7c86]">
          Skills-first hiring eligible
        </div>
      </div>
      <h3 className="mt-1 font-display text-base sm:text-lg uppercase tracking-wide text-[var(--color-foreground)]">
        Employers are increasingly hiring this role on skills, not a degree
      </h3>
      <p className="mt-1 text-xs text-[var(--color-foreground)] leading-relaxed">
        {context ?? `This role (${role.title})`} is in the Burning Glass
        Institute&apos;s Skills-First Resource Library — a national framework
        for the skills, not credentials, that employers actually evaluate.
      </p>
      <div className="mt-3">
        <a
          href={skillsFirstUrl(role.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-sm bg-[#0e7c86] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#085f67]"
        >
          See the Skills-First profile ↗
        </a>
      </div>
    </aside>
  );
}

export function SkillsFirstBadge({ role }: { role: SkillsFirstRole }) {
  return (
    <a
      href={skillsFirstUrl(role.slug)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-sm bg-[#dff6f5] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0e7c86] hover:bg-[#bce8e7]"
      title={`Skills-first hiring eligible (${role.title})`}
    >
      <span aria-hidden>✓</span>
      Skills-first eligible
    </a>
  );
}
