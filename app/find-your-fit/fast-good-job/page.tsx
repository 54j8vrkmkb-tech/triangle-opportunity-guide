import type { Metadata } from "next";
import { getFastEntryOccupations, getSectorName } from "@/lib/data";
import { WizardShell } from "@/app/components/WizardShell";
import { OccupationCard } from "@/app/components/OccupationCard";

export const metadata: Metadata = {
  title: "A good job, fast",
  description:
    "Triangle occupations you can enter through a short certificate or apprenticeship — with strong demand and a real wage.",
};

export default function FastGoodJobPage() {
  const results = getFastEntryOccupations();
  return (
    <WizardShell
      eyebrow="A good job, fast"
      title="Quick paths to a Triangle paycheck"
      description="These roles can be reached through a certificate, apprenticeship, or short program — and all have growing or strong demand and pay $18+/hr to start."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {results.map((o) => (
          <OccupationCard
            key={o.id}
            occupation={o}
            showSector
            sectorName={getSectorName(o.sectorId)}
          />
        ))}
      </div>
      {results.length === 0 && (
        <p className="text-sm text-[var(--color-muted)]">No matches found.</p>
      )}
    </WizardShell>
  );
}
