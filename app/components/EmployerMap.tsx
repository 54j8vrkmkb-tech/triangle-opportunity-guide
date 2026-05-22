"use client";

import dynamic from "next/dynamic";
import type { Employer, EmployerLocation } from "@/lib/data";
import { getEmployerLocations } from "@/lib/data";

const EmployerMapInner = dynamic(
  () => import("./EmployerMapInner").then((m) => m.EmployerMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-muted)] text-center">
        Loading map…
      </div>
    ),
  },
);

type LocatedEmployer = {
  employerName: string;
  employerNote?: string;
  location: EmployerLocation;
};

export function EmployerMap({ employers }: { employers: Employer[] }) {
  const located: LocatedEmployer[] = [];
  for (const e of employers) {
    const locs = getEmployerLocations(e.name, e.location);
    for (const loc of locs) {
      located.push({
        employerName: e.name,
        employerNote: e.note,
        location: loc,
      });
    }
  }

  if (located.length === 0) return null;
  return <EmployerMapInner employers={located} />;
}
