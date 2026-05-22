"use client";

import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  type EmployerLocation,
  type TransitStatus,
  transitStatusLabel,
} from "@/lib/data";

const TRIANGLE_CENTER: [number, number] = [35.9, -78.83];

const transitColor: Record<TransitStatus, string> = {
  on_route: "#0e7c86",
  nearby: "#0044b5",
  limited: "#b02a0e",
  unknown: "#686e77",
};

function pinIcon(status: TransitStatus, index: number) {
  const color = transitColor[status];
  const html = `
    <div style="
      position: relative;
      width: 30px;
      height: 38px;
      filter: drop-shadow(0 2px 3px rgba(0,0,0,.3));
    ">
      <div style="
        background: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid #fff;
        position: absolute;
        top: 0;
        left: 0;
      "></div>
      <div style="
        position: absolute;
        top: 6px;
        left: 0;
        width: 30px;
        text-align: center;
        color: #fff;
        font-family: 'Antonio', 'Impact', sans-serif;
        font-weight: 700;
        font-size: 13px;
        line-height: 1;
      ">${index + 1}</div>
    </div>
  `;
  return L.divIcon({
    html,
    className: "tog-pin",
    iconSize: [30, 38],
    iconAnchor: [15, 38],
    popupAnchor: [0, -34],
  });
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useMemo(() => {
    if (!points.length) return;
    if (points.length === 1) {
      map.setView(points[0], 12);
      return;
    }
    const bounds = L.latLngBounds(points.map((p) => L.latLng(p[0], p[1])));
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, points]);
  return null;
}

function googleMapsUrl(
  destLat: number,
  destLng: number,
  destLabel: string,
  origin: string,
  mode: "driving" | "transit" | "walking" | "bicycling",
) {
  const params = new URLSearchParams({
    api: "1",
    destination: `${destLat},${destLng}`,
    destination_place_id: "",
    travelmode: mode,
  });
  if (origin.trim()) params.set("origin", origin.trim());
  // Provide a friendly destination label via query param hint
  const url = `https://www.google.com/maps/dir/?${params.toString()}`;
  return url + `&dest_label=${encodeURIComponent(destLabel)}`;
}

type LocatedEmployer = {
  employerName: string;
  employerNote?: string;
  location: EmployerLocation;
};

export function EmployerMapInner({
  employers,
}: {
  employers: LocatedEmployer[];
}) {
  const [origin, setOrigin] = useState("");

  const points = useMemo(
    () => employers.map((e) => [e.location.lat, e.location.lng] as [number, number]),
    [employers],
  );

  if (!employers.length) {
    return (
      <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-muted)]">
        No mappable Triangle locations for this employer list yet.
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-[var(--color-border)] bg-white overflow-hidden">
      <div className="border-b border-[var(--color-border)] p-3 sm:p-4 bg-[var(--color-surface)]">
        <label
          htmlFor="commute-origin"
          className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]"
        >
          Your address (for commute estimates)
        </label>
        <input
          id="commute-origin"
          type="text"
          inputMode="text"
          autoComplete="street-address"
          placeholder="e.g., 123 Main St, Durham, NC 27701"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="mt-1 w-full rounded-sm border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-brand)]"
        />
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          Pick a pin, then choose drive / transit / walk / bike — we&apos;ll open
          Google Maps with directions. Leave blank to let Google ask for your
          starting point.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: transitColor.on_route }}
            />
            On a bus route
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: transitColor.nearby }}
            />
            Bus stop nearby
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: transitColor.limited }}
            />
            Limited / no transit
          </span>
        </div>
      </div>

      <MapContainer
        center={TRIANGLE_CENTER}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: 380, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        {employers.map((e, i) => (
          <Marker
            key={`${e.employerName}-${i}`}
            position={[e.location.lat, e.location.lng]}
            icon={pinIcon(e.location.transit.status, i)}
          >
            <Popup maxWidth={280}>
              <div className="space-y-2">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Pin {i + 1}
                  </div>
                  <div className="font-semibold text-slate-900">
                    {e.employerName}
                  </div>
                  <div className="text-xs text-slate-700">{e.location.site}</div>
                  <div className="text-xs text-slate-500">
                    {e.location.address}
                  </div>
                </div>
                <div className="text-xs">
                  <span
                    className="inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{
                      backgroundColor:
                        transitColor[e.location.transit.status],
                    }}
                  >
                    {transitStatusLabel(e.location.transit.status)}
                  </span>
                  {e.location.transit.lines.length > 0 && (
                    <div className="mt-1 text-slate-700">
                      {e.location.transit.lines.join(" · ")}
                    </div>
                  )}
                  {e.location.transit.note && (
                    <div className="mt-1 italic text-slate-500">
                      {e.location.transit.note}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Get directions
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(
                      [
                        ["driving", "Drive"],
                        ["transit", "Transit"],
                        ["walking", "Walk"],
                        ["bicycling", "Bike"],
                      ] as const
                    ).map(([mode, label]) => (
                      <a
                        key={mode}
                        href={googleMapsUrl(
                          e.location.lat,
                          e.location.lng,
                          e.location.site,
                          origin,
                          mode,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-sm bg-slate-900 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-black"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
