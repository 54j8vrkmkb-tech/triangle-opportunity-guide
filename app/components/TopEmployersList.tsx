"use client";

import { useState } from "react";
import {
  type Employer,
  getEmployerLocations,
  transitStatusLabel,
} from "@/lib/data";
import { EmployerLink } from "./EmployerLink";

const TRANSIT_DOT: Record<string, string> = {
  on_route: "#0e7c86",
  nearby: "#0044b5",
  limited: "#b02a0e",
  unknown: "#686e77",
};

function EmployerRow({ emp }: { emp: Employer }) {
  const locs = getEmployerLocations(emp.name, emp.location);
  const status = locs[0]?.transit.status;
  const dot = status ? TRANSIT_DOT[status] : null;
  return (
    <li className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div>
        <div className="text-sm flex items-center gap-2 flex-wrap">
          <EmployerLink name={emp.name} />
          {status && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]"
              title={transitStatusLabel(status)}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: dot ?? "#686e77" }}
              />
              {transitStatusLabel(status)}
            </span>
          )}
        </div>
        <div className="text-xs text-[var(--color-muted)]">{emp.location}</div>
      </div>
      {emp.note && (
        <div className="text-xs text-[var(--color-muted-2)] sm:text-right">
          {emp.note}
        </div>
      )}
    </li>
  );
}

export function TopEmployersList({ employers }: { employers: Employer[] }) {
  const [open, setOpen] = useState(false);
  const top = employers.slice(0, 5);
  const rest = employers.slice(5);

  return (
    <div className="mt-3 rounded-sm border border-[var(--color-border)] bg-white">
      <ul className="divide-y divide-[var(--color-border)]">
        {top.map((e, i) => (
          <EmployerRow key={`top-${i}`} emp={e} />
        ))}
      </ul>
      {rest.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="w-full text-left px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-bold uppercase tracking-wider text-[var(--color-brand)] hover:bg-[var(--color-brand-soft)] flex items-center justify-between"
          >
            <span>
              {open
                ? "Hide additional employers"
                : `Show ${rest.length} more employer${rest.length === 1 ? "" : "s"}`}
            </span>
            <span aria-hidden className="text-base">
              {open ? "▴" : "▾"}
            </span>
          </button>
          {open && (
            <ul className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
              {rest.map((e, i) => (
                <EmployerRow key={`rest-${i}`} emp={e} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
