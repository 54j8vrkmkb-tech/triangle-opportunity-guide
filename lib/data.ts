import raw from "@/data/tog.json";

export type Stat = { value: string; label: string };

export type Employer = { name: string; location: string; note: string };

export type TrainingProgram = {
  name: string;
  type: string;
  location: string;
  highlight: string;
  applyUrl: string;
  cost: string;
  starts: string;
  info: string;
};

export type JobQuality = {
  schedule: string;
  benefits: string;
  advancement: string;
  automation: string;
};

export type PathwayStep = {
  role: string;
  detail: string;
  wage: string;
  current?: boolean;
};

export type Sector = {
  id: string;
  name: string;
  tagline: string;
  headlineStats: Stat[];
  summary: string;
  wageRange: string;
  timeToEnter: string;
  outlook: string;
  keyEmployers: Employer[];
  occupationIds: string[];
};

export type Occupation = {
  id: string;
  title: string;
  sectorId: string;
  settings: string;
  wage: {
    median: number;
    annualMedian: number;
    msa: string;
    source: string;
  };
  tags: {
    demand: string;
    automationRisk: string;
    entry: string;
    criminalRecord: string;
  };
  summary: string;
  byTheNumbers: Stat[];
  topEmployers: Employer[];
  quickFacts: string[];
  whatYoullDo: string[];
  trainingPrograms: TrainingProgram[];
  jobQuality: JobQuality;
  careerPathway: PathwayStep[];
  skills: string[];
  adjacentOccupationIds: string[];
  lateralFromIds: string[];
};

type Guide = {
  meta: {
    title: string;
    subtitle: string;
    subsubtitle: string;
    edition: string;
    publisher: string;
    initiative: string;
    region: string;
    lastUpdated: string;
  };
  sectors: Sector[];
  occupations: Occupation[];
};

const guide = raw as unknown as Guide;

export const meta = guide.meta;
export const sectors: Sector[] = guide.sectors;
export const occupations: Occupation[] = guide.occupations;

export function getSector(id: string): Sector | undefined {
  return sectors.find((s) => s.id === id);
}

export function getOccupation(id: string): Occupation | undefined {
  return occupations.find((o) => o.id === id);
}

export function getOccupationsForSector(sectorId: string): Occupation[] {
  const sector = getSector(sectorId);
  if (!sector) return [];
  const list = sector.occupationIds
    .map((id) => getOccupation(id))
    .filter((o): o is Occupation => Boolean(o));
  return list.sort((a, b) => a.wage.median - b.wage.median);
}

export function getAdjacentOccupations(id: string): {
  adjacent: Occupation[];
  lateralFrom: Occupation[];
} {
  const occ = getOccupation(id);
  if (!occ) return { adjacent: [], lateralFrom: [] };
  return {
    adjacent: occ.adjacentOccupationIds
      .map((x) => getOccupation(x))
      .filter((o): o is Occupation => Boolean(o)),
    lateralFrom: occ.lateralFromIds
      .map((x) => getOccupation(x))
      .filter((o): o is Occupation => Boolean(o)),
  };
}

export function getSectorName(sectorId: string): string {
  return getSector(sectorId)?.name ?? sectorId;
}

const FAST_ENTRY_KEYWORDS = ["WEEK", "MONTH", "CERT", "TRAINING", "APPRENTICE"];

export function getFastEntryOccupations(): Occupation[] {
  return occupations
    .filter((o) => {
      const entry = o.tags.entry.toUpperCase();
      const demand = o.tags.demand.toUpperCase();
      const fast = FAST_ENTRY_KEYWORDS.some((k) => entry.includes(k));
      const strong =
        demand.includes("GROWING") ||
        demand.includes("STRONG") ||
        demand.includes("HIGH");
      return fast && strong && o.wage.median >= 18;
    })
    .sort((a, b) => b.wage.median - a.wage.median);
}

const STRONG_BENEFIT_KEYWORDS = [
  "pension",
  "federal",
  "state",
  "union",
  "comprehensive",
  "excellent",
  "duke",
  "unc",
  "wakemed",
  "city",
  "county",
];

export function getStrongBenefitsOccupations(): Occupation[] {
  return occupations
    .filter((o) => {
      const blob = (o.jobQuality.benefits + " " + o.jobQuality.schedule).toLowerCase();
      return STRONG_BENEFIT_KEYWORDS.some((k) => blob.includes(k));
    })
    .sort((a, b) => b.wage.median - a.wage.median);
}

export function getLevelUpFrom(occId: string): Occupation[] {
  const occ = getOccupation(occId);
  if (!occ) return [];
  const fromSector = occupations.filter(
    (o) => o.sectorId === occ.sectorId && o.wage.median > occ.wage.median,
  );
  const fromAdjacent = occ.adjacentOccupationIds
    .map((id) => getOccupation(id))
    .filter((o): o is Occupation => Boolean(o))
    .filter((o) => o.wage.median > occ.wage.median);
  const merged = new Map<string, Occupation>();
  for (const o of [...fromAdjacent, ...fromSector]) merged.set(o.id, o);
  return [...merged.values()].sort((a, b) => a.wage.median - b.wage.median);
}

// ---------------- Sector wage aggregates ----------------

export type SectorWageStats = {
  hourlyMedian: number;
  annualMedian: number;
  hourlyMax: number;
  annualMax: number;
};

export function getSectorWageStats(sectorId: string): SectorWageStats {
  const list = getOccupationsForSector(sectorId);
  if (!list.length) {
    return { hourlyMedian: 0, annualMedian: 0, hourlyMax: 0, annualMax: 0 };
  }
  const hourly = list.map((o) => o.wage.median).sort((a, b) => a - b);
  const annual = list.map((o) => o.wage.annualMedian).sort((a, b) => a - b);
  const mid = Math.floor(hourly.length / 2);
  const hourlyMedian =
    hourly.length % 2 === 0 ? (hourly[mid - 1] + hourly[mid]) / 2 : hourly[mid];
  const annualMedian =
    annual.length % 2 === 0 ? (annual[mid - 1] + annual[mid]) / 2 : annual[mid];
  return {
    hourlyMedian,
    annualMedian,
    hourlyMax: hourly[hourly.length - 1],
    annualMax: annual[annual.length - 1],
  };
}

// ---------------- Starting-role bridge (level-up) ----------------

/** "Past sector" = where someone works today, often outside the TOG-profiled sectors */
export type PastSector = { id: string; name: string };

export const PAST_SECTORS: PastSector[] = [
  { id: "past-retail-customer", name: "Retail & Customer Service" },
  { id: "past-food-hospitality", name: "Food Service & Hospitality" },
  { id: "past-warehouse-delivery", name: "Warehouse, Driving & Delivery" },
  { id: "past-office-admin", name: "Office & Administration" },
  { id: "past-caregiving-education", name: "Caregiving & Education" },
  { id: "past-construction-labor", name: "Construction & Labor" },
  { id: "past-security-military", name: "Security & Military" },
];

export type StartingRole = {
  id: string;
  title: string;
  description: string;
  /** The past/current sector the worker is in today */
  pastSectorId: string;
  levelUpToOccupationIds: string[];
};

export const STARTING_ROLES: StartingRole[] = [
  {
    id: "start-cashier-retail",
    title: "Cashier or retail associate",
    description:
      "Customer-facing, fast pace, point-of-sale or stocking experience.",
    pastSectorId: "past-retail-customer",
    levelUpToOccupationIds: [
      "medical-records-specialist",
      "medical-assistant",
      "computer-user-support",
      "social-worker",
    ],
  },
  {
    id: "start-customer-service",
    title: "Call center or customer service rep",
    description: "Phone or chat support, ticket handling, scheduling.",
    pastSectorId: "past-retail-customer",
    levelUpToOccupationIds: [
      "computer-user-support",
      "medical-records-specialist",
      "cybersecurity-analyst",
      "social-worker",
    ],
  },
  {
    id: "start-food-service",
    title: "Food service or fast-food worker",
    description:
      "Restaurants, food prep, line cook, or hospitality service roles.",
    pastSectorId: "past-food-hospitality",
    levelUpToOccupationIds: [
      "production-tech",
      "qc-inspector",
      "medical-assistant",
      "maintenance-land-mgmt",
    ],
  },
  {
    id: "start-housekeeping",
    title: "Hotel housekeeping or janitorial",
    description: "Cleaning, maintenance, hospitality, attention to detail.",
    pastSectorId: "past-food-hospitality",
    levelUpToOccupationIds: [
      "maintenance-land-mgmt",
      "utilities-tech",
      "qc-inspector",
      "production-tech",
    ],
  },
  {
    id: "start-warehouse",
    title: "Warehouse or shipping associate",
    description:
      "Picking, packing, forklift work, or distribution-center jobs.",
    pastSectorId: "past-warehouse-delivery",
    levelUpToOccupationIds: [
      "production-tech",
      "qc-inspector",
      "cdl-driver",
      "industrial-mechanic",
      "logistics-manager",
    ],
  },
  {
    id: "start-driver-delivery",
    title: "Driver or delivery (Uber, Lyft, Amazon, etc.)",
    description: "Local driving experience, vehicle handling, navigation.",
    pastSectorId: "past-warehouse-delivery",
    levelUpToOccupationIds: [
      "cdl-driver",
      "logistics-manager",
      "auto-tech",
      "maintenance-land-mgmt",
    ],
  },
  {
    id: "start-office-admin",
    title: "Office admin or receptionist",
    description: "Scheduling, records, basic Office/EHR software, front desk.",
    pastSectorId: "past-office-admin",
    levelUpToOccupationIds: [
      "medical-records-specialist",
      "medical-assistant",
      "computer-user-support",
      "social-worker",
      "logistics-manager",
    ],
  },
  {
    id: "start-cna-home-health",
    title: "CNA or home health aide",
    description:
      "Direct-care experience — patient hygiene, vitals, daily living support.",
    pastSectorId: "past-caregiving-education",
    levelUpToOccupationIds: [
      "medical-assistant",
      "lpn",
      "pta",
      "respiratory-therapist",
      "rn",
    ],
  },
  {
    id: "start-childcare-education",
    title: "Childcare worker or teacher aide",
    description:
      "Working with kids, families, or schools — high empathy, multitasking.",
    pastSectorId: "past-caregiving-education",
    levelUpToOccupationIds: [
      "social-worker",
      "medical-assistant",
      "medical-records-specialist",
    ],
  },
  {
    id: "start-construction-labor",
    title: "Construction laborer or general handyperson",
    description: "Site work, tools, framing, demolition, or general labor.",
    pastSectorId: "past-construction-labor",
    levelUpToOccupationIds: [
      "electrician",
      "plumber",
      "hvac-tech",
      "industrial-mechanic",
      "electric-lineworker",
      "utilities-tech",
      "maintenance-land-mgmt",
    ],
  },
  {
    id: "start-security-guard",
    title: "Security guard",
    description: "Site monitoring, reporting, de-escalation, basic enforcement.",
    pastSectorId: "past-security-military",
    levelUpToOccupationIds: [
      "police-sheriff",
      "firefighter-emt",
      "cybersecurity-analyst",
      "maintenance-land-mgmt",
    ],
  },
  {
    id: "start-military",
    title: "Military veteran",
    description:
      "Discipline, structured operations, technical or trade skills, security clearance.",
    pastSectorId: "past-security-military",
    levelUpToOccupationIds: [
      "police-sheriff",
      "firefighter-emt",
      "cybersecurity-analyst",
      "electrician",
      "industrial-mechanic",
      "cdl-driver",
      "logistics-manager",
    ],
  },
];

export function getStartingRolesForPastSector(pastSectorId: string): StartingRole[] {
  return STARTING_ROLES.filter((r) => r.pastSectorId === pastSectorId);
}

export function getStartingRole(id: string): StartingRole | undefined {
  return STARTING_ROLES.find((r) => r.id === id);
}

export function getLevelUpFromStartingRole(id: string): Occupation[] {
  const r = getStartingRole(id);
  if (!r) return [];
  return r.levelUpToOccupationIds
    .map((oid) => getOccupation(oid))
    .filter((o): o is Occupation => Boolean(o))
    .sort((a, b) => a.wage.median - b.wage.median);
}

// ---------------- Employer URLs ----------------

const EMPLOYER_URLS: Record<string, string> = {
  "Duke Health": "https://www.dukehealth.org/",
  "Duke Primary Care Network": "https://www.dukehealth.org/locations",
  "Duke University Hospital": "https://www.dukehealth.org/hospitals/duke-university-hospital",
  "Duke Regional Hospital": "https://www.dukehealth.org/hospitals/duke-regional-hospital",
  "Duke Raleigh Hospital": "https://www.dukehealth.org/hospitals/duke-raleigh-hospital",
  "UNC Health": "https://www.unchealth.org/",
  "UNC Health Rex": "https://www.unchealth.org/locations/unc-rex-healthcare",
  "UNC Physicians Network": "https://www.unchealth.org/",
  "UNC REX Healthcare": "https://www.unchealth.org/locations/unc-rex-healthcare",
  "WakeMed": "https://www.wakemed.org/",
  "WakeMed Physician Practices": "https://www.wakemed.org/physician-practices",
  "Durham VA Medical Center": "https://www.va.gov/durham-health-care/",
  "Johnston Health (UNC)": "https://www.unchealth.org/locations/unc-health-johnston",
  "Johnston Memorial Hospital": "https://www.unchealth.org/locations/unc-health-johnston",
  "Biogen": "https://www.biogen.com/careers.html",
  "Eli Lilly (RTP)": "https://careers.lilly.com/",
  "Eli Lilly": "https://careers.lilly.com/",
  "FUJIFILM Diosynth Biotechnologies": "https://www.fujifilmdiosynth.com/careers/",
  "Grifols": "https://www.grifols.com/en/careers",
  "Merck": "https://jobs.merck.com/us/en",
  "Novo Nordisk": "https://www.novonordisk.com/careers.html",
  "Pfizer": "https://www.pfizer.com/about/careers",
  "Seqirus": "https://www.seqirus.com/careers",
  "Catalent": "https://www.catalent.com/careers/",
  "Thermo Fisher Scientific": "https://jobs.thermofisher.com/global/en",
  "City of Raleigh": "https://raleighnc.gov/jobs",
  "City of Durham": "https://www.durhamnc.gov/95/Human-Resources",
  "Town of Chapel Hill": "https://www.townofchapelhill.org/government/departments-services/human-resources",
  "Wake County": "https://www.wake.gov/departments-government/human-resources/job-opportunities",
  "Durham County": "https://www.dconc.gov/county-departments/departments-f-z/human-resources",
  "Orange County": "https://www.orangecountync.gov/197/Human-Resources",
  "Johnston County": "https://www.johnstonnc.com/hr2/content.cfm?PD=jobs",
  "NCDOT": "https://www.ncdot.gov/careers/",
  "NC Department of Transportation": "https://www.ncdot.gov/careers/",
  "NCWorks": "https://www.ncworks.gov/",
  "NCWorks Career Centers": "https://www.ncworks.gov/",
  "Wake Technical Community College": "https://www.waketech.edu/",
  "Wake Tech": "https://www.waketech.edu/",
  "Durham Technical Community College": "https://www.durhamtech.edu/",
  "Durham Tech": "https://www.durhamtech.edu/",
  "Johnston Community College": "https://www.johnstoncc.edu/",
  "Cisco": "https://jobs.cisco.com/",
  "Red Hat": "https://www.redhat.com/en/jobs",
  "IBM": "https://www.ibm.com/careers/",
  "SAS": "https://www.sas.com/en_us/careers.html",
  "Fidelity Investments": "https://jobs.fidelity.com/",
  "MetLife": "https://careers.metlife.com/",
  "Lenovo": "https://jobs.lenovo.com/",
  "Cree | Wolfspeed": "https://www.wolfspeed.com/company/careers/",
  "Wolfspeed": "https://www.wolfspeed.com/company/careers/",
  "Toshiba": "https://www.toshiba.com/tai/careers",
  "Pratt & Whitney": "https://careers.rtx.com/global/en/pratt-whitney",
  "Cummins": "https://careers.cummins.com/",
  "Caterpillar": "https://www.caterpillar.com/en/careers.html",
  "Old Dominion Freight Line": "https://www.odfl.com/us/en/about/careers.html",
  "FedEx Ground": "https://careers.fedex.com/",
  "FedEx": "https://careers.fedex.com/",
  "UPS": "https://www.jobs-ups.com/",
  "Amazon": "https://hiring.amazon.com/",
  "Estes Express Lines": "https://www.estes-express.com/about/careers",
  "Duke Energy": "https://www.duke-energy.com/our-company/careers",
  "Wake EMS": "https://www.wakegov.com/departments-government/ems",
  "Durham County EMS": "https://www.dconc.gov/county-departments/departments-a-e/emergency-medical-services",
  "Raleigh Fire Department": "https://raleighnc.gov/services/fire",
  "Durham Fire Department": "https://www.durhamnc.gov/175/Fire",
  "Raleigh Police Department": "https://raleighnc.gov/services/police",
  "Durham Police Department": "https://www.durhamnc.gov/171/Police",
  "Wake County Sheriff": "https://www.wakegov.com/departments-government/sheriffs-office",
  "NC State University": "https://jobs.ncsu.edu/",
  "Duke University": "https://careers.duke.edu/",
  "UNC-Chapel Hill": "https://jobs.unc.edu/",
};

export function getEmployerUrl(name: string): string {
  if (!name) return "#";
  const direct = EMPLOYER_URLS[name];
  if (direct) return direct;
  // Fuzzy: check if any known employer key is a substring of `name`
  const lower = name.toLowerCase();
  for (const key of Object.keys(EMPLOYER_URLS)) {
    if (key.length > 4 && lower.includes(key.toLowerCase())) {
      return EMPLOYER_URLS[key];
    }
  }
  // Fallback: Google search restricted to Triangle NC
  const q = encodeURIComponent(`${name} Triangle NC careers`);
  return `https://www.google.com/search?q=${q}`;
}

export function isCuratedEmployerUrl(name: string): boolean {
  if (EMPLOYER_URLS[name]) return true;
  const lower = name.toLowerCase();
  return Object.keys(EMPLOYER_URLS).some(
    (k) => k.length > 4 && lower.includes(k.toLowerCase()),
  );
}

export type BackgroundEntry =
  | { kind: "occupation"; occupation: Occupation }
  | { kind: "starting"; startingRole: StartingRole };

export function resolveBackground(ids: string[]): BackgroundEntry[] {
  return ids
    .map<BackgroundEntry | null>((id) => {
      const occ = getOccupation(id);
      if (occ) return { kind: "occupation", occupation: occ };
      const sr = getStartingRole(id);
      if (sr) return { kind: "starting", startingRole: sr };
      return null;
    })
    .filter((e): e is BackgroundEntry => e !== null);
}

export function getCareerChangeMatches(
  pastIds: string[],
): { occupation: Occupation; score: number; reasons: string[] }[] {
  if (!pastIds.length) return [];
  const entries = resolveBackground(pastIds);
  if (!entries.length) return [];

  const pastOccs = entries
    .filter((e): e is Extract<BackgroundEntry, { kind: "occupation" }> => e.kind === "occupation")
    .map((e) => e.occupation);
  const pastStartings = entries
    .filter((e): e is Extract<BackgroundEntry, { kind: "starting" }> => e.kind === "starting")
    .map((e) => e.startingRole);

  const pastOccIds = new Set(pastOccs.map((o) => o.id));
  const pastSectors = new Set(pastOccs.map((o) => o.sectorId));
  const pastSkills = new Set<string>(
    pastOccs.flatMap((o) => o.skills.map((s) => s.toLowerCase())),
  );

  const candidates = occupations.filter((o) => !pastOccIds.has(o.id));

  const scored = candidates.map((o) => {
    const reasons: string[] = [];
    let score = 0;

    // Bridges from common no-degree starting jobs
    for (const r of pastStartings) {
      if (r.levelUpToOccupationIds.includes(o.id)) {
        score += 5;
        reasons.push(
          `Common move from ${r.title.charAt(0).toLowerCase() + r.title.slice(1)}`,
        );
      }
    }

    // Adjacency / lateral from profiled past occupations
    if (pastOccs.some((p) => p.adjacentOccupationIds.includes(o.id))) {
      score += 5;
      reasons.push("Common next step from your past role");
    }
    if (pastOccs.some((p) => p.lateralFromIds.includes(o.id))) {
      score += 4;
      reasons.push("People often switch into this from your background");
    }
    const reverseAdjacent = o.adjacentOccupationIds.some((id) => pastOccIds.has(id));
    const reverseLateral = o.lateralFromIds.some((id) => pastOccIds.has(id));
    if (reverseAdjacent || reverseLateral) {
      score += 3;
      if (!reasons.length)
        reasons.push("Role is linked back to your past experience");
    }

    if (pastSectors.has(o.sectorId)) {
      score += 1;
      reasons.push(`Same sector (${getSectorName(o.sectorId)})`);
    }

    const skillOverlap = o.skills.filter((s) =>
      pastSkills.has(s.toLowerCase()),
    ).length;
    if (skillOverlap > 0) {
      score += skillOverlap * 0.5;
      reasons.push(
        `${skillOverlap} shared skill${skillOverlap === 1 ? "" : "s"}`,
      );
    }

    // Dedupe reasons preserving order
    const uniqReasons = Array.from(new Set(reasons));

    return { occupation: o, score, reasons: uniqReasons };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}
