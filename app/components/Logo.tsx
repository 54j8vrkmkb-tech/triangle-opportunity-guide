"use client";

import { useState } from "react";

type Stage = "clearbit" | "favicon" | "initials";

function initialsOf(name: string): string {
  const cleaned = name.replace(/[^A-Za-z\s]/g, "");
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (
    (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? parts[0]?.[1] ?? "")
  ).toUpperCase();
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const PALETTE = [
  "#0044b5",
  "#0e7c86",
  "#c8551f",
  "#5b21b6",
  "#2e7d32",
  "#b02a0e",
  "#1f2937",
];

export function Logo({
  domain,
  name,
  size = 32,
  rounded = true,
  className = "",
}: {
  domain?: string;
  name: string;
  size?: number;
  rounded?: boolean;
  className?: string;
}) {
  const [stage, setStage] = useState<Stage>(domain ? "clearbit" : "initials");

  const radius = rounded ? "9999px" : "4px";

  if (stage === "initials" || !domain) {
    const bg = PALETTE[hashStr(name) % PALETTE.length];
    return (
      <span
        className={className}
        aria-label={`${name} logo`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          borderRadius: radius,
          background: bg,
          color: "#fff",
          fontWeight: 700,
          fontSize: Math.max(10, Math.round(size * 0.4)),
          letterSpacing: "0.02em",
          fontFamily: "var(--font-antonio), Impact, sans-serif",
          flexShrink: 0,
        }}
      >
        {initialsOf(name)}
      </span>
    );
  }

  const src =
    stage === "clearbit"
      ? `https://logo.clearbit.com/${domain}?size=${size * 2}`
      : `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={stage}
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        background: "#fff",
        borderRadius: radius,
        border: "1px solid #e2e6ec",
        padding: 3,
        boxSizing: "border-box",
        flexShrink: 0,
      }}
      onError={() =>
        setStage(stage === "clearbit" ? "favicon" : "initials")
      }
    />
  );
}
