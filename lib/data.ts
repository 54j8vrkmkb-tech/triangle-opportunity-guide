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
  /** Optional flags for roles where titles, requirements, or advancement differ widely across employers */
  variability?: {
    titles?: string;
    requirements?: string;
    advancement?: string;
  };
};

/** Practical barriers / hiring considerations layered on top of an Occupation */
export type Barriers = {
  drugTesting?: "required" | "common" | "varies" | "rare" | "unknown";
  background?: string;
  licensure?: string;
  physical?: string;
  other?: string;
};

export const BARRIERS: Record<string, Barriers> = {
  cna: {
    drugTesting: "required",
    background:
      "Background check required; NC Health Care Personnel Registry check. Most non-violent records don't auto-disqualify, but specific abuse/neglect convictions can.",
    licensure: "NC Nurse Aide I registration via NC Division of Health Service Regulation. State-administered exam after training.",
    physical: "Frequent lifting, transferring patients; standing for long shifts.",
  },
  "medical-assistant": {
    drugTesting: "common",
    background: "Background check standard. No state licensure board, so fewer automatic disqualifications.",
    licensure: "No NC license required. CMA / RMA national certifications optional and improve hiring.",
    physical: "Standing, light lifting, fast pace.",
  },
  lpn: {
    drugTesting: "required",
    background:
      "NC Board of Nursing background check. Certain convictions can be disqualifying — pre-application counseling recommended.",
    licensure: "NC Board of Nursing license (NCLEX-PN). Renewal every 2 years; continuing education required.",
    physical: "Lifting, transferring, long shifts.",
  },
  rn: {
    drugTesting: "required",
    background:
      "NC Board of Nursing background check; substance-related and violent convictions reviewed individually.",
    licensure: "NC RN license (NCLEX-RN). Renewal every 2 years.",
    physical: "Standing, lifting, fast pace; 8–12 hr shifts.",
  },
  "respiratory-therapist": {
    drugTesting: "required",
    background: "Background check; NC Respiratory Care Board review.",
    licensure: "NC Respiratory Care Board license required.",
    physical: "Standing, lifting, hospital fast-pace work.",
  },
  "radiologic-tech": {
    drugTesting: "required",
    background: "Background check; some convictions reviewed by NC Radiation Protection.",
    licensure: "ARRT certification typically required by employers.",
    physical: "Standing, equipment handling, occasional patient transfer.",
  },
  "firefighter-emt": {
    drugTesting: "required",
    background: "Strict background check; most violent and drug felonies disqualifying. Driving record matters.",
    licensure: "NC EMT or NC Firefighter I/II certification depending on role.",
    physical: "Demanding — lifting, climbing, heat exposure; physical fitness test required.",
  },
  "police-sheriff": {
    drugTesting: "required",
    background:
      "Strict — felony convictions, recent drug convictions, and some misdemeanors disqualifying. Polygraph common.",
    licensure: "NC Basic Law Enforcement Training (BLET) certification.",
    physical: "Physical fitness assessment required; vision standards.",
    other: "US citizenship typically required; minimum age 20–21 depending on agency.",
  },
  "cdl-driver": {
    drugTesting: "required",
    background:
      "DOT background and driving-record review. Most CDL-disqualifying offenses are driving-related (DUI, hit-and-run).",
    licensure: "NC Commercial Driver License (Class A or B) plus required endorsements.",
    physical: "DOT physical exam every 2 years; vision and hearing standards.",
    other: "Minimum age 21 for interstate; 18 for intrastate.",
  },
  electrician: {
    drugTesting: "common",
    background: "Background check varies by employer. Federal/government projects may require deeper checks.",
    licensure:
      "NC Electrical Contractor's License required for independent / sign-off work; journeyman status common via apprenticeship.",
    physical: "Climbing, lifting, occasional confined-space work.",
  },
  plumber: {
    drugTesting: "common",
    background: "Background check varies; clean record helps for residential customer-facing roles.",
    licensure:
      "NC State Board of Examiners of Plumbing, Heating, and Fire Sprinkler Contractors license required for independent work.",
    physical: "Lifting, kneeling, confined spaces, occasional weight loads.",
  },
  "hvac-tech": {
    drugTesting: "varies",
    background: "Background check standard. EPA Section 608 certification required for refrigerants.",
    licensure: "NC H-2/H-3 license tiers via the State Board of Examiners.",
    physical: "Lifting, climbing, rooftop and attic work in heat.",
  },
  "industrial-mechanic": {
    drugTesting: "required",
    background: "Background check standard at most large manufacturers.",
    licensure: "No state license; manufacturer- or equipment-specific certifications common.",
    physical: "Lifting up to 50 lbs; standing; occasional confined-space or elevated work.",
  },
  "production-tech": {
    drugTesting: "required",
    background: "Background check standard, especially at pharma manufacturers (FDA-regulated).",
    licensure: "No state license; cGMP / aseptic-processing training employer-provided.",
    physical: "Standing for full shifts; gowning; controlled-environment work.",
  },
  "qc-inspector": {
    drugTesting: "required",
    background: "Background check standard at pharma manufacturers.",
    licensure: "No state license; ASQ / industry certifications optional.",
    physical: "Standing, fine-motor work, lab and floor environment.",
  },
  "chemical-tech": {
    drugTesting: "required",
    background: "Standard; some classified or government-contract sites require deeper checks.",
    licensure: "No state license required.",
    physical: "Standing, PPE, lab environment.",
  },
  "auto-tech": {
    drugTesting: "common",
    background: "Background check standard at dealerships and large chains. Driving record reviewed.",
    licensure: "ASE certifications common employer ask, not legally required.",
    physical: "Lifting heavy parts; standing on hard surfaces.",
  },
  "electric-lineworker": {
    drugTesting: "required",
    background: "Background check standard at utilities; driving record matters.",
    licensure: "Apprenticeship completion + manufacturer / utility certifications.",
    physical: "High demand — climbing, weather exposure, weight tolerance.",
    other: "On-call / storm-response work is part of the job.",
  },
  "utilities-tech": {
    drugTesting: "required",
    background: "Background check standard; municipal employers may require deeper checks.",
    licensure: "NC water/wastewater operator certifications by grade level.",
    physical: "Outdoor work, lifting, occasional confined-space entry.",
  },
  "maintenance-land-mgmt": {
    drugTesting: "varies",
    background: "Background check standard for public-sector employment.",
    licensure: "Varies — pesticide applicator certifications, CDL endorsements common.",
    physical: "Outdoor labor, equipment operation, lifting.",
  },
  "social-worker": {
    drugTesting: "varies",
    background:
      "Background check standard; some convictions can restrict child- or vulnerable-adult-facing roles.",
    licensure: "BSW / MSW typical for licensed paths; entry-level case manager roles often hire with bachelor's + experience.",
    physical: "Mostly office/community; some home visits.",
  },
  "computer-user-support": {
    drugTesting: "rare",
    background: "Background check standard.",
    licensure: "No state license; CompTIA A+ or vendor certifications strongly preferred.",
    physical: "Mostly seated work.",
  },
  "cybersecurity-analyst": {
    drugTesting: "rare",
    background: "Background check standard. Government / regulated sectors may require security clearance.",
    licensure: "No state license; CompTIA Security+, CISSP, or equivalent often required.",
    physical: "Seated, screen-based work.",
  },
  "network-support": {
    drugTesting: "rare",
    background: "Background check standard.",
    licensure: "No state license; CCNA / CCNP certifications strongly preferred.",
    physical: "Mostly seated; some on-site equipment work.",
  },
  "logistics-manager": {
    drugTesting: "varies",
    background: "Background check standard.",
    licensure: "No state license; APICS / Six Sigma certifications optional.",
    physical: "Mix of desk and warehouse-floor presence.",
  },
  "community-health-worker": {
    drugTesting: "varies",
    background: "Background check standard; rules vary by employer (FQHC, county, hospital).",
    licensure: "NC Community Health Worker certification recognized; not always required.",
    physical: "Mix of office, clinic, and community visits.",
  },
  "clinical-research-coordinator": {
    drugTesting: "common",
    background: "Background check required at academic medical centers and CROs.",
    licensure: "No state license; SoCRA CCRP or ACRP CCRC industry certifications add credibility.",
    physical: "Mostly office; some patient-visit work (vitals, blood draws at some sites).",
  },
  "medical-records-specialist": {
    drugTesting: "varies",
    background: "Background check standard; HIPAA training required.",
    licensure: "No state license; AHIMA RHIT / CCS certifications strongly preferred.",
    physical: "Mostly seated, screen-based.",
  },
  pta: {
    drugTesting: "common",
    background: "Background check standard; NC PT Licensing Board review.",
    licensure: "NC PT Licensing Board license; AAS PTA program + national exam.",
    physical: "Lifting, transferring, hands-on patient work.",
  },
};

export function getBarriers(occId: string): Barriers | undefined {
  return BARRIERS[occId];
}

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
  "Lincoln Community Health Center": "https://lincolnchc.org/",
  "Piedmont Health Services": "https://www.piedmonthealth.org/",
  "Advance Community Health": "https://www.advancech.org/",
  "El Futuro": "https://elfuturo-nc.org/",
  "Wake County Human Services": "https://www.wake.gov/departments-government/human-services",
  "Durham County Department of Public Health": "https://www.dcopublichealth.org/",
  "Avance Care": "https://avancecare.com/careers/",
  "Hillcrest Convalescent Center": "https://www.hillcrestcc.com/",
  "Brookdale Senior Living": "https://www.brookdalecareers.com/",
  "Home Instead": "https://www.homeinstead.com/careers/",
  "Duke Office of Clinical Research": "https://medschool.duke.edu/research/clinical-and-translational-research/duke-office-clinical-research",
  "UNC Lineberger Comprehensive Cancer Center": "https://unclineberger.org/",
  "PPD": "https://www.ppd.com/careers/",
  "Parexel": "https://jobs.parexel.com/",
  "IQVIA": "https://jobs.iqvia.com/",
  "Labcorp Drug Development": "https://careers.labcorp.com/",
  "Duke Population Health": "https://populationhealth.duke.edu/careers",
  "UNC Family Medicine outreach": "https://www.unchealth.org/locations/unc-family-medicine",
  "WakeMed Health & Hospitals research": "https://www.wakemed.org/research",
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
  "UPS": "https://www.ups.com/us/en/about/careers",
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

// ============================================================
// QUIZ — preference-based matcher
// ============================================================

export const COUNTIES = ["Durham", "Wake", "Orange", "Johnston"] as const;
export type County = (typeof COUNTIES)[number];

export type SettingType = "inside" | "outside" | "mixed";
export type ScheduleType = "weekday" | "shift" | "variable" | "oncall";

export const INTEREST_OPTIONS: { id: string; label: string }[] = [
  { id: "helping_people", label: "Helping people directly" },
  { id: "hands_on_tools", label: "Working with hands and tools" },
  { id: "computers_tech", label: "Computers and technology" },
  { id: "machines_mechanical", label: "Machines, engines, mechanical" },
  { id: "outdoors", label: "Being outdoors" },
  { id: "science_lab", label: "Science and lab work" },
  { id: "driving_logistics", label: "Driving and logistics" },
  { id: "public_service", label: "Public service and safety" },
  { id: "patient_detail", label: "Detail-oriented or paperwork" },
  { id: "production_mfg", label: "Production and manufacturing" },
];

export const SCHEDULE_OPTIONS: { id: ScheduleType; label: string; description: string }[] = [
  { id: "weekday", label: "Weekday daytime", description: "M-F, mostly 9-to-5" },
  { id: "shift", label: "Shift work OK", description: "Nights, weekends, or rotating shifts" },
  { id: "variable", label: "Variable hours OK", description: "Schedule changes week to week" },
  { id: "oncall", label: "On-call OK", description: "Emergency or after-hours response" },
];

export const SETTING_OPTIONS: { id: SettingType | "any"; label: string }[] = [
  { id: "inside", label: "Mostly inside" },
  { id: "outside", label: "Mostly outside" },
  { id: "mixed", label: "A mix of both" },
  { id: "any", label: "No preference" },
];

export const PAY_FLOOR_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: "No minimum" },
  { value: 20, label: "$20+/hr" },
  { value: 25, label: "$25+/hr" },
  { value: 30, label: "$30+/hr" },
  { value: 35, label: "$35+/hr" },
];

type QuizProfile = {
  counties: County[];
  setting: SettingType;
  schedules: ScheduleType[];
  interests: string[];
};

const QUIZ_PROFILES: Record<string, QuizProfile> = {
  // Healthcare
  cna: {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "inside",
    schedules: ["shift", "weekday"],
    interests: ["helping_people", "hands_on_tools"],
  },
  "community-health-worker": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "inside",
    schedules: ["weekday"],
    interests: ["helping_people", "public_service", "patient_detail"],
  },
  "clinical-research-coordinator": {
    counties: ["Durham", "Wake", "Orange"],
    setting: "inside",
    schedules: ["weekday"],
    interests: ["patient_detail", "science_lab", "helping_people"],
  },
  "medical-assistant": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "inside",
    schedules: ["weekday"],
    interests: ["helping_people", "patient_detail"],
  },
  "medical-records-specialist": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "inside",
    schedules: ["weekday"],
    interests: ["patient_detail", "computers_tech"],
  },
  lpn: {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "inside",
    schedules: ["weekday", "shift"],
    interests: ["helping_people", "hands_on_tools"],
  },
  pta: {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "inside",
    schedules: ["weekday"],
    interests: ["helping_people", "hands_on_tools"],
  },
  "radiologic-tech": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "inside",
    schedules: ["weekday", "shift"],
    interests: ["helping_people", "machines_mechanical", "patient_detail"],
  },
  "respiratory-therapist": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "inside",
    schedules: ["shift"],
    interests: ["helping_people", "machines_mechanical", "patient_detail"],
  },
  rn: {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "inside",
    schedules: ["shift", "weekday"],
    interests: ["helping_people", "hands_on_tools"],
  },

  // Life Sciences Manufacturing
  "qc-inspector": {
    counties: ["Wake", "Durham", "Johnston"],
    setting: "inside",
    schedules: ["weekday", "shift"],
    interests: ["patient_detail", "science_lab", "production_mfg"],
  },
  "production-tech": {
    counties: ["Wake", "Durham", "Johnston", "Orange"],
    setting: "inside",
    schedules: ["shift", "weekday"],
    interests: ["hands_on_tools", "production_mfg", "machines_mechanical"],
  },
  "chemical-tech": {
    counties: ["Wake", "Durham", "Orange"],
    setting: "inside",
    schedules: ["weekday", "shift"],
    interests: ["science_lab", "patient_detail", "production_mfg"],
  },
  "industrial-mechanic": {
    counties: ["Wake", "Durham", "Johnston"],
    setting: "mixed",
    schedules: ["shift", "weekday"],
    interests: ["hands_on_tools", "machines_mechanical"],
  },

  // Skilled Trades
  "auto-tech": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "inside",
    schedules: ["weekday"],
    interests: ["hands_on_tools", "machines_mechanical"],
  },
  "hvac-tech": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "mixed",
    schedules: ["weekday", "oncall"],
    interests: ["hands_on_tools", "machines_mechanical", "outdoors"],
  },
  electrician: {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "mixed",
    schedules: ["weekday"],
    interests: ["hands_on_tools", "outdoors"],
  },
  plumber: {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "mixed",
    schedules: ["weekday", "oncall"],
    interests: ["hands_on_tools"],
  },

  // IT and Technology
  "computer-user-support": {
    counties: ["Wake", "Durham"],
    setting: "inside",
    schedules: ["weekday"],
    interests: ["computers_tech", "helping_people"],
  },
  "cybersecurity-analyst": {
    counties: ["Wake", "Durham"],
    setting: "inside",
    schedules: ["weekday", "oncall"],
    interests: ["computers_tech", "patient_detail"],
  },
  "network-support": {
    counties: ["Wake", "Durham"],
    setting: "inside",
    schedules: ["weekday", "oncall"],
    interests: ["computers_tech", "patient_detail"],
  },

  // Transportation
  "cdl-driver": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "mixed",
    schedules: ["variable", "shift"],
    interests: ["driving_logistics"],
  },
  "logistics-manager": {
    counties: ["Wake", "Durham", "Johnston"],
    setting: "inside",
    schedules: ["weekday"],
    interests: ["driving_logistics", "computers_tech", "patient_detail"],
  },

  // Public Sector
  "maintenance-land-mgmt": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "outside",
    schedules: ["weekday"],
    interests: ["outdoors", "hands_on_tools"],
  },
  "utilities-tech": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "outside",
    schedules: ["weekday", "oncall"],
    interests: ["outdoors", "machines_mechanical", "hands_on_tools", "public_service"],
  },
  "firefighter-emt": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "mixed",
    schedules: ["shift"],
    interests: ["helping_people", "public_service", "hands_on_tools"],
  },
  "social-worker": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "inside",
    schedules: ["weekday"],
    interests: ["helping_people", "public_service"],
  },
  "electric-lineworker": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "outside",
    schedules: ["weekday", "oncall"],
    interests: ["outdoors", "hands_on_tools", "machines_mechanical", "public_service"],
  },
  "police-sheriff": {
    counties: ["Durham", "Wake", "Orange", "Johnston"],
    setting: "mixed",
    schedules: ["shift"],
    interests: ["public_service", "helping_people"],
  },
};

export function getQuizProfile(occId: string): QuizProfile | undefined {
  return QUIZ_PROFILES[occId];
}

export type QuizInput = {
  homeCounty?: County;
  commuteCounties: County[];
  payFloor: number;
  setting: SettingType | "any";
  schedules: ScheduleType[];
  interests: string[];
};

export type QuizMatch = {
  occupation: Occupation;
  score: number;
  reasons: string[];
};

export function runQuiz(input: QuizInput): QuizMatch[] {
  const eligibleCounties = new Set<County>([
    ...(input.homeCounty ? [input.homeCounty] : []),
    ...input.commuteCounties,
  ]);
  const noCountyFilter = eligibleCounties.size === 0;

  const results: QuizMatch[] = [];

  for (const occ of occupations) {
    const profile = QUIZ_PROFILES[occ.id];
    if (!profile) continue;

    // Hard filters
    if (input.payFloor > 0 && occ.wage.median < input.payFloor) continue;
    if (!noCountyFilter) {
      const countyOverlap = profile.counties.some((c) => eligibleCounties.has(c));
      if (!countyOverlap) continue;
    }

    const reasons: string[] = [];
    let score = 0;

    // County: small bonus for home-county role
    if (input.homeCounty && profile.counties.includes(input.homeCounty)) {
      score += 1;
      reasons.push(`Available in ${input.homeCounty} County (home)`);
    } else if (!noCountyFilter) {
      const reachable = profile.counties.filter((c) => eligibleCounties.has(c));
      if (reachable.length)
        reasons.push(`Available in ${reachable.join(", ")} County`);
    }

    // Schedule
    if (input.schedules.length) {
      const matches = profile.schedules.filter((s) => input.schedules.includes(s));
      if (matches.length) {
        score += 3 * matches.length;
        reasons.push(`Schedule fits (${matches.join(", ")})`);
      } else {
        // schedule mismatch — strong negative
        score -= 3;
        reasons.push(`Schedule mismatch (this role: ${profile.schedules.join(", ")})`);
      }
    }

    // Setting
    if (input.setting !== "any") {
      if (profile.setting === input.setting) {
        score += 3;
        reasons.push(
          input.setting === "inside"
            ? "Indoor work"
            : input.setting === "outside"
              ? "Outdoor work"
              : "Mix of indoor and outdoor",
        );
      } else if (profile.setting === "mixed" || input.setting === "mixed") {
        score += 1;
      } else {
        score -= 2;
      }
    }

    // Interests
    if (input.interests.length) {
      const overlap = profile.interests.filter((i) =>
        input.interests.includes(i),
      );
      if (overlap.length) {
        score += 2 * overlap.length;
        const labels = overlap
          .map((id) => INTEREST_OPTIONS.find((o) => o.id === id)?.label ?? id)
          .map((s) => s.toLowerCase());
        reasons.push(`Matches interests: ${labels.join(", ")}`);
      }
    }

    // Pay perk: bonus if median is well above the floor
    if (input.payFloor > 0 && occ.wage.median >= input.payFloor + 5) {
      score += 1;
    }

    if (score > 0) {
      results.push({ occupation: occ, score, reasons });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 10);
}

// ============================================================
// EMPLOYER SPOTLIGHTS — American Opportunity Index–style picks
// ============================================================
// Source framing: Companies that score well on the American Opportunity
// Index (Burning Glass Institute / Schultz Family Foundation / Harvard
// Managing the Future of Work) for non-degreed worker mobility, and that
// have a meaningful Triangle (Durham / Wake / Orange / Johnston) presence.
// "Why better" claims are based on publicly-disclosed programs.

export type EmployerSpotlight = {
  id: string;
  name: string;
  url: string;
  industry: string;
  locations: string[];
  whyBetter: string[];
  adjacentOccupationIds: string[];
};

export const EMPLOYER_SPOTLIGHTS: EmployerSpotlight[] = [
  {
    id: "bofa",
    name: "Bank of America",
    url: "https://careers.bankofamerica.com/",
    industry: "Banking & financial services",
    locations: [
      "Cary commercial operations center",
      "Raleigh branches",
      "Durham branches",
      "Chapel Hill branches",
    ],
    whyBetter: [
      "Minimum US wage of $24/hr for hourly roles",
      "Pathways program hires non-degree workers into operations and tech",
      "Tuition reimbursement and internal-promotion track from teller upward",
    ],
    adjacentOccupationIds: [
      "medical-records-specialist",
      "computer-user-support",
      "social-worker",
      "logistics-manager",
    ],
  },
  {
    id: "costco",
    name: "Costco Wholesale",
    url: "https://www.costco.com/jobs.html",
    industry: "Retail / warehouse club",
    locations: ["Raleigh warehouse", "Apex warehouse", "Durham (planned)"],
    whyBetter: [
      "Starts hourly workers at well above NC retail median",
      "Full health, dental, and 401(k) match — including part-time after a qualifying period",
      "~75% of warehouse managers promoted from within",
    ],
    adjacentOccupationIds: [
      "maintenance-land-mgmt",
      "production-tech",
      "qc-inspector",
      "logistics-manager",
    ],
  },
  {
    id: "target",
    name: "Target",
    url: "https://corporate.target.com/careers",
    industry: "Retail",
    locations: [
      "Multiple Triangle stores across Wake, Durham, Orange, Johnston",
      "Sortation center near Garner",
    ],
    whyBetter: [
      "Dream to Be debt-free education program covers tuition for 250+ business and certificate programs",
      "$15+ starting hourly wage with regular increases",
      "Frontline-to-team-lead-to-manager track measured publicly",
    ],
    adjacentOccupationIds: [
      "medical-records-specialist",
      "medical-assistant",
      "computer-user-support",
      "logistics-manager",
    ],
  },
  {
    id: "lowes",
    name: "Lowe's",
    url: "https://talent.lowes.com/us/en",
    industry: "Home improvement retail",
    locations: [
      "Stores in Durham, Raleigh, Cary, Apex, Chapel Hill, Clayton",
      "Distribution support nearby",
    ],
    whyBetter: [
      "Track to the Trades pays 50% of tuition for HVAC, electrical, plumbing, carpentry, and welding certifications",
      "Guild education benefit covers 100% of tuition at partner schools",
      "Internal hourly-to-manager pathway with promotion metrics",
    ],
    adjacentOccupationIds: [
      "hvac-tech",
      "plumber",
      "electrician",
      "auto-tech",
      "maintenance-land-mgmt",
    ],
  },
  {
    id: "fedex",
    name: "FedEx",
    url: "https://careers.fedex.com/",
    industry: "Logistics & shipping",
    locations: [
      "FedEx Ground hub near RDU",
      "Operations across Wake and Durham counties",
    ],
    whyBetter: [
      "Tuition reimbursement up to $5,250/yr for hourly package handlers",
      "Internal promotion track to driver and operations supervisor",
      "Earn-and-learn programs for technicians",
    ],
    adjacentOccupationIds: [
      "cdl-driver",
      "logistics-manager",
      "industrial-mechanic",
      "maintenance-land-mgmt",
    ],
  },
  {
    id: "ups",
    name: "UPS",
    url: "https://www.ups.com/us/en/about/careers",
    industry: "Logistics & shipping",
    locations: [
      "Distribution centers in Raleigh and Durham",
      "Wake County package facilities",
    ],
    whyBetter: [
      "Earn & Learn program reimburses up to $25,000 in tuition for part-time hourly workers",
      "Unionized workforce with predictable wage progression",
      "Driver apprenticeship pipeline from package handler",
    ],
    adjacentOccupationIds: [
      "cdl-driver",
      "logistics-manager",
      "industrial-mechanic",
    ],
  },
  {
    id: "hilton",
    name: "Hilton",
    url: "https://jobs.hilton.com/",
    industry: "Hospitality",
    locations: [
      "DoubleTree, Hampton Inn, Embassy Suites, Hilton Garden Inn properties across the Triangle",
    ],
    whyBetter: [
      "Guild education benefit — 100% tuition coverage for selected degree and certificate programs from day one",
      "Repeatedly named Fortune Best Company to Work For in the US",
      "Strong frontline-to-manager mobility in food, beverage, housekeeping, and front desk",
    ],
    adjacentOccupationIds: [
      "maintenance-land-mgmt",
      "medical-records-specialist",
      "social-worker",
    ],
  },
  {
    id: "marriott",
    name: "Marriott",
    url: "https://careers.marriott.com/",
    industry: "Hospitality",
    locations: [
      "JW Marriott Raleigh-Durham, AC Hotel, Residence Inn, Courtyard properties across the Triangle",
    ],
    whyBetter: [
      "Tuition support and Marriott-funded degree partnerships",
      "Voyage leadership development program for non-degree employees",
      "Manager-from-within hiring practice across housekeeping, food and beverage",
    ],
    adjacentOccupationIds: [
      "maintenance-land-mgmt",
      "medical-records-specialist",
      "social-worker",
    ],
  },
  {
    id: "cisco-emp",
    name: "Cisco",
    url: "https://jobs.cisco.com/",
    industry: "Technology",
    locations: ["Research Triangle Park campus (one of Cisco's largest US sites)"],
    whyBetter: [
      "Cisco Networking Academy offers free industry-recognized certificates",
      "Apprenticeship Program hires technicians without four-year degrees",
      "Internal skill-based mobility into network, security, and support roles",
    ],
    adjacentOccupationIds: [
      "computer-user-support",
      "network-support",
      "cybersecurity-analyst",
    ],
  },
  {
    id: "ibm-emp",
    name: "IBM",
    url: "https://www.ibm.com/careers/",
    industry: "Technology",
    locations: ["RTP campus — IBM's largest non-HQ US site"],
    whyBetter: [
      "New Collar hiring removes degree requirements from ~50% of US jobs",
      "Registered apprenticeships in software, cybersecurity, and data",
      "SkillsBuild offers free credentials and IBM-backed internal mobility",
    ],
    adjacentOccupationIds: [
      "computer-user-support",
      "network-support",
      "cybersecurity-analyst",
    ],
  },
  {
    id: "verizon",
    name: "Verizon",
    url: "https://www.verizon.com/about/careers",
    industry: "Telecommunications",
    locations: ["Cary corporate office", "Retail stores across the Triangle"],
    whyBetter: [
      "Tuition assistance up to $8,000/yr with no degree requirement to start",
      "Strong frontline-to-tech mobility from retail to network operations",
      "Veteran-friendly hiring with skills-based credentialing",
    ],
    adjacentOccupationIds: [
      "computer-user-support",
      "network-support",
      "cybersecurity-analyst",
    ],
  },
  {
    id: "amazon-emp",
    name: "Amazon",
    url: "https://hiring.amazon.com/",
    industry: "Logistics & technology",
    locations: [
      "RDU2 fulfillment center near Garner",
      "Additional fulfillment and delivery stations in Wake and Durham",
      "AWS office in downtown Raleigh",
    ],
    whyBetter: [
      "Career Choice program pre-pays tuition for in-demand certificates (CDL, IT, healthcare, mechatronics)",
      "Mechatronics and Robotics Apprenticeship is a registered program in NC",
      "$18+/hr starting in fulfillment with full benefits day one",
    ],
    adjacentOccupationIds: [
      "production-tech",
      "qc-inspector",
      "industrial-mechanic",
      "cdl-driver",
      "logistics-manager",
      "computer-user-support",
    ],
  },
];

export function getEmployerSpotlight(id: string): EmployerSpotlight | undefined {
  return EMPLOYER_SPOTLIGHTS.find((e) => e.id === id);
}

// Reverse index: which starting roles level up to this profiled occupation?
export function getStartingRolesLeadingTo(occId: string): StartingRole[] {
  return STARTING_ROLES.filter((r) =>
    r.levelUpToOccupationIds.includes(occId),
  );
}

// ============================================================
// LOCATION REGISTRY — geocoded employer locations with transit
// ============================================================

export type TransitStatus = "on_route" | "nearby" | "limited" | "unknown";

export type EmployerLocation = {
  /** Human-readable site name (e.g., "Duke University Hospital") */
  site: string;
  /** Address or neighborhood for display */
  address: string;
  county: County;
  lat: number;
  lng: number;
  transit: {
    status: TransitStatus;
    /** Transit lines / shuttles that serve this site */
    lines: string[];
    note?: string;
  };
};

/**
 * Map keys can be either an employer name ("Duke Health") to use for any
 * `topEmployer` whose name matches, or an exact `name|location` pair for
 * disambiguation. The runtime resolver tries name+location first, then name.
 */
const LOCATION_REGISTRY: Record<string, EmployerLocation[]> = {
  // Healthcare anchors
  "Duke Health": [
    {
      site: "Duke University Hospital",
      address: "2301 Erwin Rd, Durham",
      county: "Durham",
      lat: 36.0036,
      lng: -78.9381,
      transit: {
        status: "on_route",
        lines: ["GoTriangle CRX", "Bull City Connector", "Duke shuttles"],
      },
    },
    {
      site: "Duke Regional Hospital",
      address: "3643 N Roxboro St, Durham",
      county: "Durham",
      lat: 36.0314,
      lng: -78.9013,
      transit: { status: "nearby", lines: ["GoDurham 5", "GoDurham 10B"] },
    },
    {
      site: "Duke Raleigh Hospital",
      address: "3400 Wake Forest Rd, Raleigh",
      county: "Wake",
      lat: 35.829,
      lng: -78.6342,
      transit: { status: "nearby", lines: ["GoRaleigh 7"] },
    },
  ],
  "Duke Primary Care Network": [
    {
      site: "Duke Primary Care (multiple clinics, Triangle-wide)",
      address: "Triangle-wide",
      county: "Durham",
      lat: 36.0036,
      lng: -78.9381,
      transit: { status: "unknown", lines: [], note: "Many clinic sites — transit varies" },
    },
  ],
  "Durham VA Medical Center": [
    {
      site: "Durham VA Medical Center",
      address: "508 Fulton St, Durham",
      county: "Durham",
      lat: 35.9941,
      lng: -78.929,
      transit: { status: "on_route", lines: ["GoDurham 11", "Bull City Connector"] },
    },
  ],
  "UNC Health": [
    {
      site: "UNC Hospitals (Chapel Hill)",
      address: "101 Manning Dr, Chapel Hill",
      county: "Orange",
      lat: 35.9015,
      lng: -79.0498,
      transit: {
        status: "on_route",
        lines: ["Chapel Hill Transit NU, NS, V, A (all free)"],
      },
    },
    {
      site: "UNC Health Rex (Raleigh)",
      address: "4420 Lake Boone Trl, Raleigh",
      county: "Wake",
      lat: 35.8085,
      lng: -78.711,
      transit: { status: "nearby", lines: ["GoRaleigh 6"] },
    },
  ],
  "UNC Health Rex": [
    {
      site: "UNC Health Rex (Raleigh)",
      address: "4420 Lake Boone Trl, Raleigh",
      county: "Wake",
      lat: 35.8085,
      lng: -78.711,
      transit: { status: "nearby", lines: ["GoRaleigh 6"] },
    },
  ],
  "UNC Physicians Network": [
    {
      site: "UNC Physicians Network clinics (Triangle-wide)",
      address: "Multiple sites in Orange, Durham, Wake",
      county: "Orange",
      lat: 35.9015,
      lng: -79.0498,
      transit: { status: "unknown", lines: [], note: "Many clinic sites — transit varies" },
    },
  ],
  WakeMed: [
    {
      site: "WakeMed Raleigh Campus",
      address: "3000 New Bern Ave, Raleigh",
      county: "Wake",
      lat: 35.7796,
      lng: -78.6058,
      transit: { status: "on_route", lines: ["GoRaleigh 19"] },
    },
    {
      site: "WakeMed Cary Hospital",
      address: "1900 Kildaire Farm Rd, Cary",
      county: "Wake",
      lat: 35.7837,
      lng: -78.7768,
      transit: { status: "limited", lines: ["GoCary 5 (limited)"] },
    },
  ],
  "WakeMed Physician Practices": [
    {
      site: "WakeMed Physician Practices (Wake County-wide)",
      address: "Multiple sites in Wake County",
      county: "Wake",
      lat: 35.7796,
      lng: -78.6058,
      transit: { status: "unknown", lines: [], note: "Many practice sites — transit varies" },
    },
  ],
  "Johnston Health (UNC)": [
    {
      site: "UNC Health Johnston (Smithfield)",
      address: "509 N Bright Leaf Blvd, Smithfield",
      county: "Johnston",
      lat: 35.5081,
      lng: -78.3393,
      transit: { status: "limited", lines: [], note: "No fixed-route transit nearby" },
    },
  ],

  // Life Sciences / Pharma manufacturers
  Biogen: [
    {
      site: "Biogen RTP",
      address: "5000 Davis Dr, Morrisville",
      county: "Durham",
      lat: 35.881,
      lng: -78.866,
      transit: { status: "limited", lines: ["GoTriangle CRX (walk required)"] },
    },
  ],
  "Eli Lilly": [
    {
      site: "Eli Lilly Concord RTP",
      address: "RTP Drive, Durham",
      county: "Durham",
      lat: 35.9034,
      lng: -78.864,
      transit: { status: "limited", lines: ["GoTriangle CRX (walk required)"] },
    },
  ],
  "Eli Lilly (RTP)": [
    {
      site: "Eli Lilly RTP",
      address: "RTP Drive, Durham",
      county: "Durham",
      lat: 35.9034,
      lng: -78.864,
      transit: { status: "limited", lines: ["GoTriangle CRX (walk required)"] },
    },
  ],
  "FUJIFILM Diosynth Biotechnologies": [
    {
      site: "FUJIFILM Diosynth Holly Springs",
      address: "Holly Springs",
      county: "Wake",
      lat: 35.6512,
      lng: -78.8336,
      transit: { status: "limited", lines: [] },
    },
  ],
  Grifols: [
    {
      site: "Grifols Clayton",
      address: "8368 US-70 BUS, Clayton",
      county: "Johnston",
      lat: 35.6512,
      lng: -78.4561,
      transit: { status: "limited", lines: [] },
    },
  ],
  Merck: [
    {
      site: "Merck Durham",
      address: "5325 Old Oxford Rd, Durham",
      county: "Durham",
      lat: 36.0747,
      lng: -78.852,
      transit: { status: "limited", lines: [] },
    },
  ],
  "Novo Nordisk": [
    {
      site: "Novo Nordisk Clayton",
      address: "3612 Powhatan Rd, Clayton",
      county: "Johnston",
      lat: 35.6432,
      lng: -78.4419,
      transit: { status: "limited", lines: [] },
    },
  ],
  Pfizer: [
    {
      site: "Pfizer Sanford site (regional)",
      address: "Sanford",
      county: "Wake",
      lat: 35.4824,
      lng: -79.1803,
      transit: { status: "limited", lines: [] },
    },
  ],
  Catalent: [
    {
      site: "Catalent Pharma Solutions Morrisville",
      address: "Morrisville",
      county: "Wake",
      lat: 35.8246,
      lng: -78.8256,
      transit: { status: "limited", lines: ["GoTriangle 305 (walk)"] },
    },
  ],
  "Thermo Fisher Scientific": [
    {
      site: "Thermo Fisher RTP",
      address: "3175 Staley Rd, Greenville (regional)",
      county: "Wake",
      lat: 35.8821,
      lng: -78.8628,
      transit: { status: "limited", lines: ["GoTriangle CRX (walk)"] },
    },
  ],

  // Public sector
  "City of Raleigh": [
    {
      site: "Raleigh Municipal Building",
      address: "222 W Hargett St, Raleigh",
      county: "Wake",
      lat: 35.7776,
      lng: -78.6395,
      transit: { status: "on_route", lines: ["GoRaleigh hub (Moore Square)", "many local routes"] },
    },
  ],
  "City of Durham": [
    {
      site: "Durham City Hall",
      address: "101 City Hall Plaza, Durham",
      county: "Durham",
      lat: 35.9961,
      lng: -78.901,
      transit: { status: "on_route", lines: ["GoDurham hub", "Bull City Connector"] },
    },
  ],
  "Town of Chapel Hill": [
    {
      site: "Chapel Hill Town Hall",
      address: "405 Martin Luther King Jr Blvd, Chapel Hill",
      county: "Orange",
      lat: 35.9268,
      lng: -79.058,
      transit: { status: "on_route", lines: ["Chapel Hill Transit (multiple, free)"] },
    },
  ],
  "Wake County": [
    {
      site: "Wake County government complex",
      address: "337 S Salisbury St, Raleigh",
      county: "Wake",
      lat: 35.7766,
      lng: -78.641,
      transit: { status: "on_route", lines: ["GoRaleigh hub"] },
    },
  ],
  "Durham County": [
    {
      site: "Durham County government",
      address: "200 E Main St, Durham",
      county: "Durham",
      lat: 35.9974,
      lng: -78.9011,
      transit: { status: "on_route", lines: ["GoDurham hub"] },
    },
  ],
  "Orange County": [
    {
      site: "Orange County government (Hillsborough)",
      address: "200 S Cameron St, Hillsborough",
      county: "Orange",
      lat: 36.0743,
      lng: -79.1014,
      transit: { status: "limited", lines: ["Orange County Public Transportation"] },
    },
  ],
  "Johnston County": [
    {
      site: "Johnston County government (Smithfield)",
      address: "207 E Johnston St, Smithfield",
      county: "Johnston",
      lat: 35.5083,
      lng: -78.3406,
      transit: { status: "limited", lines: [] },
    },
  ],
  NCDOT: [
    {
      site: "NCDOT central office (Raleigh)",
      address: "1 S Wilmington St, Raleigh",
      county: "Wake",
      lat: 35.7777,
      lng: -78.6383,
      transit: { status: "on_route", lines: ["GoRaleigh hub"] },
    },
  ],

  // Tech / R&D
  "Red Hat": [
    {
      site: "Red Hat Tower",
      address: "100 E Davie St, Raleigh",
      county: "Wake",
      lat: 35.7758,
      lng: -78.6391,
      transit: { status: "on_route", lines: ["GoRaleigh hub (Moore Square)"] },
    },
  ],
  Cisco: [
    {
      site: "Cisco RTP campus",
      address: "7025 Kit Creek Rd, Research Triangle Park",
      county: "Durham",
      lat: 35.8865,
      lng: -78.8418,
      transit: { status: "limited", lines: ["GoTriangle CRX (walk)"] },
    },
  ],
  IBM: [
    {
      site: "IBM RTP campus",
      address: "3039 Cornwallis Rd, Research Triangle Park",
      county: "Durham",
      lat: 35.8932,
      lng: -78.8642,
      transit: { status: "limited", lines: ["GoTriangle CRX (walk)", "GoTriangle 105"] },
    },
  ],
  SAS: [
    {
      site: "SAS Institute HQ",
      address: "100 SAS Campus Dr, Cary",
      county: "Wake",
      lat: 35.8104,
      lng: -78.778,
      transit: { status: "limited", lines: ["GoCary 4"] },
    },
  ],
  Lenovo: [
    {
      site: "Lenovo Morrisville HQ",
      address: "1009 Think Pl, Morrisville",
      county: "Wake",
      lat: 35.8425,
      lng: -78.8347,
      transit: { status: "limited", lines: ["GoTriangle 305"] },
    },
  ],

  // Logistics / shipping
  "FedEx Ground": [
    {
      site: "FedEx Ground RDU hub",
      address: "5300 World Trade Pkwy, Morrisville",
      county: "Wake",
      lat: 35.8728,
      lng: -78.7853,
      transit: { status: "limited", lines: [] },
    },
  ],
  FedEx: [
    {
      site: "FedEx RDU operations",
      address: "Morrisville / near RDU",
      county: "Wake",
      lat: 35.8728,
      lng: -78.7853,
      transit: { status: "limited", lines: [] },
    },
  ],
  UPS: [
    {
      site: "UPS Raleigh Sort Hub",
      address: "5301 Old Forestville Rd, Raleigh",
      county: "Wake",
      lat: 35.8466,
      lng: -78.5934,
      transit: { status: "limited", lines: [] },
    },
  ],
  "Old Dominion Freight Line": [
    {
      site: "Old Dominion Service Center (Raleigh)",
      address: "Raleigh",
      county: "Wake",
      lat: 35.8466,
      lng: -78.5934,
      transit: { status: "limited", lines: [] },
    },
  ],
  Amazon: [
    {
      site: "Amazon RDU2 Fulfillment (Garner)",
      address: "1805 Aviation Pkwy, Garner",
      county: "Wake",
      lat: 35.6822,
      lng: -78.6193,
      transit: { status: "limited", lines: [] },
    },
    {
      site: "AWS Raleigh office",
      address: "Downtown Raleigh",
      county: "Wake",
      lat: 35.7791,
      lng: -78.639,
      transit: { status: "on_route", lines: ["GoRaleigh hub"] },
    },
  ],
  "Estes Express Lines": [
    {
      site: "Estes Express Raleigh",
      address: "Raleigh",
      county: "Wake",
      lat: 35.8466,
      lng: -78.5934,
      transit: { status: "limited", lines: [] },
    },
  ],

  // Retail / hospitality (spotlight employers)
  "Bank of America": [
    {
      site: "Bank of America Cary commercial operations",
      address: "201 N Tryon St (regional), Cary office",
      county: "Wake",
      lat: 35.7706,
      lng: -78.7831,
      transit: { status: "limited", lines: ["GoCary 2"] },
    },
  ],
  "Costco Wholesale": [
    {
      site: "Costco Raleigh",
      address: "2838 Wake Forest Rd, Raleigh",
      county: "Wake",
      lat: 35.8466,
      lng: -78.625,
      transit: { status: "nearby", lines: ["GoRaleigh 4"] },
    },
    {
      site: "Costco Apex",
      address: "Apex",
      county: "Wake",
      lat: 35.7307,
      lng: -78.8503,
      transit: { status: "limited", lines: [] },
    },
  ],
  Target: [
    {
      site: "Target (Brier Creek, Raleigh)",
      address: "8210 Brier Creek Pkwy, Raleigh",
      county: "Wake",
      lat: 35.8826,
      lng: -78.7615,
      transit: { status: "limited", lines: [] },
    },
    {
      site: "Target Northgate (Durham)",
      address: "1058 W Club Blvd, Durham",
      county: "Durham",
      lat: 36.0274,
      lng: -78.9237,
      transit: { status: "on_route", lines: ["GoDurham 11"] },
    },
  ],
  "Lowe's": [
    {
      site: "Lowe's South Square (Durham)",
      address: "1801 Martin Luther King Jr Pkwy, Durham",
      county: "Durham",
      lat: 35.9572,
      lng: -78.9542,
      transit: { status: "nearby", lines: ["GoDurham 6"] },
    },
    {
      site: "Lowe's Capital Blvd (Raleigh)",
      address: "2031 New Bern Ave, Raleigh",
      county: "Wake",
      lat: 35.7779,
      lng: -78.6064,
      transit: { status: "on_route", lines: ["GoRaleigh 19"] },
    },
  ],
  Hilton: [
    {
      site: "DoubleTree by Hilton RTP",
      address: "4810 Page Creek Ln, Durham",
      county: "Durham",
      lat: 35.895,
      lng: -78.8567,
      transit: { status: "limited", lines: [] },
    },
    {
      site: "Hilton Raleigh North Hills",
      address: "3415 Wake Forest Rd, Raleigh",
      county: "Wake",
      lat: 35.8298,
      lng: -78.6321,
      transit: { status: "nearby", lines: ["GoRaleigh 25"] },
    },
  ],
  Marriott: [
    {
      site: "Raleigh Marriott Crabtree Valley",
      address: "4500 Marriott Dr, Raleigh",
      county: "Wake",
      lat: 35.8409,
      lng: -78.6816,
      transit: { status: "nearby", lines: ["GoRaleigh 6"] },
    },
  ],
  Verizon: [
    {
      site: "Verizon Cary office",
      address: "100 Weston Pkwy, Cary",
      county: "Wake",
      lat: 35.79,
      lng: -78.7807,
      transit: { status: "limited", lines: ["GoCary 2"] },
    },
  ],

  // Training providers
  "Wake Technical Community College": [
    {
      site: "Wake Tech Main (Scott Northern Wake Campus)",
      address: "9101 Fayetteville Rd, Raleigh",
      county: "Wake",
      lat: 35.6845,
      lng: -78.6906,
      transit: { status: "limited", lines: ["GoRaleigh 7L (limited)"] },
    },
  ],
  "Wake Tech": [
    {
      site: "Wake Tech Main Campus",
      address: "9101 Fayetteville Rd, Raleigh",
      county: "Wake",
      lat: 35.6845,
      lng: -78.6906,
      transit: { status: "limited", lines: ["GoRaleigh 7L (limited)"] },
    },
  ],
  "Durham Technical Community College": [
    {
      site: "Durham Tech Main Campus",
      address: "1637 Lawson St, Durham",
      county: "Durham",
      lat: 36.0044,
      lng: -78.8917,
      transit: { status: "on_route", lines: ["GoDurham 6"] },
    },
  ],
  "Johnston Community College": [
    {
      site: "Johnston CC Main Campus (Smithfield)",
      address: "245 College Rd, Smithfield",
      county: "Johnston",
      lat: 35.5106,
      lng: -78.3375,
      transit: { status: "limited", lines: [] },
    },
  ],

  // Community Health Centers (FQHCs)
  "Lincoln Community Health Center": [
    {
      site: "Lincoln Community Health Center",
      address: "1301 Fayetteville St, Durham",
      county: "Durham",
      lat: 36.0017,
      lng: -78.9015,
      transit: { status: "on_route", lines: ["GoDurham 5"] },
    },
  ],
  "Piedmont Health Services": [
    {
      site: "Piedmont Health Carrboro Community Health Center",
      address: "301 Lloyd St, Carrboro",
      county: "Orange",
      lat: 35.9143,
      lng: -79.078,
      transit: { status: "on_route", lines: ["Chapel Hill Transit CW"] },
    },
  ],
  "Advance Community Health": [
    {
      site: "Advance Community Health (Raleigh)",
      address: "1001 Rock Quarry Rd, Raleigh",
      county: "Wake",
      lat: 35.7619,
      lng: -78.6175,
      transit: { status: "on_route", lines: ["GoRaleigh 19"] },
    },
  ],
  "El Futuro": [
    {
      site: "El Futuro (Durham)",
      address: "Lakewood Ave, Durham",
      county: "Durham",
      lat: 35.9747,
      lng: -78.9243,
      transit: { status: "nearby", lines: ["GoDurham"] },
    },
  ],
  "Wake County Human Services": [
    {
      site: "Wake County Human Services",
      address: "220 Swinburne St, Raleigh",
      county: "Wake",
      lat: 35.7762,
      lng: -78.6315,
      transit: { status: "on_route", lines: ["GoRaleigh hub"] },
    },
  ],
  "Durham County Department of Public Health": [
    {
      site: "Durham County Public Health",
      address: "414 E Main St, Durham",
      county: "Durham",
      lat: 35.9976,
      lng: -78.8979,
      transit: { status: "on_route", lines: ["GoDurham hub"] },
    },
  ],
  "Avance Care": [
    {
      site: "Avance Care (Triangle-wide)",
      address: "Multiple Triangle locations",
      county: "Wake",
      lat: 35.79,
      lng: -78.6,
      transit: { status: "unknown", lines: [], note: "Many practices — transit varies" },
    },
  ],

  // Senior care / LTC
  "Hillcrest Convalescent Center": [
    {
      site: "Hillcrest Convalescent Center",
      address: "1417 W Pettigrew St, Durham",
      county: "Durham",
      lat: 35.9982,
      lng: -78.9226,
      transit: { status: "nearby", lines: ["GoDurham 11"] },
    },
  ],

  // Clinical research / CROs
  "Duke Office of Clinical Research": [
    {
      site: "Duke Office of Clinical Research",
      address: "300 W Morgan St, Durham",
      county: "Durham",
      lat: 35.9971,
      lng: -78.905,
      transit: { status: "on_route", lines: ["GoDurham hub", "Bull City Connector"] },
    },
  ],
  "UNC Lineberger Comprehensive Cancer Center": [
    {
      site: "UNC Lineberger",
      address: "450 West Dr, Chapel Hill",
      county: "Orange",
      lat: 35.9023,
      lng: -79.052,
      transit: { status: "on_route", lines: ["Chapel Hill Transit (multiple, free)"] },
    },
  ],
  PPD: [
    {
      site: "PPD (Thermo Fisher) Morrisville",
      address: "Morrisville, NC",
      county: "Wake",
      lat: 35.8246,
      lng: -78.8256,
      transit: { status: "limited", lines: ["GoTriangle 305"] },
    },
  ],
  Parexel: [
    {
      site: "Parexel Durham",
      address: "Durham, NC",
      county: "Durham",
      lat: 35.99,
      lng: -78.9,
      transit: { status: "limited", lines: [] },
    },
  ],
  IQVIA: [
    {
      site: "IQVIA Durham",
      address: "4820 Emperor Blvd, Durham",
      county: "Durham",
      lat: 35.8945,
      lng: -78.8623,
      transit: { status: "limited", lines: ["GoTriangle CRX (walk)"] },
    },
  ],
  "Labcorp Drug Development": [
    {
      site: "Labcorp Burlington HQ (regional)",
      address: "Burlington, NC",
      county: "Orange",
      lat: 36.0956,
      lng: -79.4378,
      transit: { status: "limited", lines: [] },
    },
  ],
};

export function getEmployerLocations(
  name: string,
  location?: string,
): EmployerLocation[] {
  if (!name) return [];
  // Try exact "name|location" first
  if (location) {
    const composite = LOCATION_REGISTRY[`${name}|${location}`];
    if (composite) return composite;
  }
  // Direct name hit
  const direct = LOCATION_REGISTRY[name];
  if (direct) return direct;
  // Fuzzy: substring against keys
  const lower = name.toLowerCase();
  for (const key of Object.keys(LOCATION_REGISTRY)) {
    if (key.length > 4 && lower.includes(key.toLowerCase())) {
      return LOCATION_REGISTRY[key];
    }
  }
  return [];
}

export function transitStatusLabel(s: TransitStatus): string {
  switch (s) {
    case "on_route":
      return "On a bus route";
    case "nearby":
      return "Bus stop nearby";
    case "limited":
      return "Limited or no transit";
    case "unknown":
      return "Transit varies by site";
  }
}

// ============================================================
// LOGO DOMAIN HELPERS
// ============================================================

const CAREER_PORTAL_PREFIXES = new Set([
  "careers",
  "career",
  "jobs",
  "hiring",
  "talent",
  "corporate",
  "recruit",
  "recruiting",
  "work",
  "apply",
  "join",
  "people",
]);

/** Strip protocol, www, career-portal subdomains, and path — return bare hostname or "" */
export function extractDomain(raw: string | undefined | null): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  // Treat "ncworks.gov or walk in" style strings: just take first token
  const firstToken = trimmed.split(/\s+/)[0];
  let candidate = firstToken;
  if (!/^https?:\/\//i.test(candidate) && candidate.includes(".")) {
    candidate = `https://${candidate}`;
  }
  let host: string;
  try {
    host = new URL(candidate).hostname.replace(/^www\./, "");
  } catch {
    host = firstToken
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .split("/")[0];
  }
  // Strip a single career-portal subdomain so Clearbit hits the root brand domain
  const parts = host.split(".");
  if (parts.length > 2 && CAREER_PORTAL_PREFIXES.has(parts[0].toLowerCase())) {
    return parts.slice(1).join(".");
  }
  return host;
}

/** Return the canonical domain for a known employer name, or "" if unknown */
export function getEmployerDomain(name: string): string {
  if (!name) return "";
  // Direct lookup
  const url = EMPLOYER_URLS[name];
  if (url) return extractDomain(url);
  // Substring (matches the same fuzzy logic getEmployerUrl uses)
  const lower = name.toLowerCase();
  for (const key of Object.keys(EMPLOYER_URLS)) {
    if (key.length > 4 && lower.includes(key.toLowerCase())) {
      return extractDomain(EMPLOYER_URLS[key]);
    }
  }
  return "";
}

// ============================================================
// JOB QUALITY FLAGS — typical benefits per occupation
// "typical" = most local employers offer this; "varies" = depends on employer; "unlikely" = rare
// ============================================================

export type BenefitFlag = "typical" | "varies" | "unlikely";

export type BenefitId =
  | "healthcare"
  | "retirement"
  | "paid_leave"
  | "childcare"
  | "remote";

export const BENEFIT_OPTIONS: { id: BenefitId; label: string }[] = [
  { id: "healthcare", label: "Healthcare benefits" },
  { id: "retirement", label: "Retirement / 401(k) match or pension" },
  { id: "paid_leave", label: "Paid leave (vacation / sick / parental)" },
  { id: "childcare", label: "Childcare support" },
  { id: "remote", label: "Remote-work options" },
];

const QUALITY_FLAGS: Record<string, Record<BenefitId, BenefitFlag>> = {
  // Healthcare — major hospital systems offer comprehensive benefits
  "medical-assistant": {
    healthcare: "varies",
    retirement: "varies",
    paid_leave: "varies",
    childcare: "varies",
    remote: "unlikely",
  },
  "medical-records-specialist": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "varies",
  },
  lpn: {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
  pta: {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
  "radiologic-tech": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
  "respiratory-therapist": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
  rn: {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
  cna: {
    healthcare: "varies",
    retirement: "varies",
    paid_leave: "varies",
    childcare: "unlikely",
    remote: "unlikely",
  },
  "community-health-worker": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "varies",
  },
  "clinical-research-coordinator": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "varies",
  },

  // Life Sciences — large pharma offers strong benefits
  "qc-inspector": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
  "production-tech": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
  "chemical-tech": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
  "industrial-mechanic": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },

  // Skilled trades — union shops typical, small shops varies
  "auto-tech": {
    healthcare: "varies",
    retirement: "varies",
    paid_leave: "varies",
    childcare: "unlikely",
    remote: "unlikely",
  },
  "hvac-tech": {
    healthcare: "varies",
    retirement: "varies",
    paid_leave: "varies",
    childcare: "unlikely",
    remote: "unlikely",
  },
  electrician: {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "varies",
    childcare: "unlikely",
    remote: "unlikely",
  },
  plumber: {
    healthcare: "varies",
    retirement: "varies",
    paid_leave: "varies",
    childcare: "unlikely",
    remote: "unlikely",
  },

  // IT & Tech — corporate roles, strong benefits + remote common
  "computer-user-support": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "typical",
  },
  "cybersecurity-analyst": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "typical",
  },
  "network-support": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "varies",
  },

  // Transportation
  "cdl-driver": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "varies",
    childcare: "unlikely",
    remote: "unlikely",
  },
  "logistics-manager": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "varies",
  },

  // Public sector — strong benefits
  "maintenance-land-mgmt": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
  "utilities-tech": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
  "firefighter-emt": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
  "social-worker": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "varies",
  },
  "electric-lineworker": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
  "police-sheriff": {
    healthcare: "typical",
    retirement: "typical",
    paid_leave: "typical",
    childcare: "varies",
    remote: "unlikely",
  },
};

export function getBenefitFlags(occId: string): Record<BenefitId, BenefitFlag> {
  return (
    QUALITY_FLAGS[occId] ?? {
      healthcare: "varies",
      retirement: "varies",
      paid_leave: "varies",
      childcare: "varies",
      remote: "varies",
    }
  );
}

// ============================================================
// QUIZ V2 — must-have / nice-to-have matcher
// ============================================================

export type Tier = "must" | "nice" | "off";

export type QuizPrefsV2 = {
  homeCounty?: County;
  commuteCounties: County[];

  /** Current background (TOG occupation id OR starting-role id) */
  currentJobId?: string;

  payFloor: number;
  payTier: Tier;

  /** Are variable hours / non-9-5 schedules acceptable? */
  variableOk?: "yes" | "no";
  variableTier: Tier;

  setting?: SettingType | "any";
  settingTier: Tier;

  benefits: Partial<Record<BenefitId, Tier>>;

  interests: string[];
  interestsTier: Tier;
};

export type CritStatus = "satisfied" | "missing" | "unknown";

export type CritResult = {
  id: string;
  label: string;
  tier: "must" | "nice";
  status: CritStatus;
};

export type QuizResultV2 = {
  occupation: Occupation;
  crits: CritResult[];
  /** Count of must-haves that were not satisfied */
  mustMisses: number;
  /** Count of nice-to-haves that WERE satisfied */
  niceHits: number;
  /** Count of criteria that are unknown / data-incomplete */
  unknowns: number;
  /** Convenience badge */
  badge: "all_must" | "some_must" | "missing_must" | "incomplete";
};

/** Tier helper that respects "off" — only must/nice tier matters */
function activeTier(t: Tier | undefined): "must" | "nice" | null {
  if (t === "must" || t === "nice") return t;
  return null;
}

export function runQuizV2(prefs: QuizPrefsV2): QuizResultV2[] {
  const eligibleCounties = new Set<County>([
    ...(prefs.homeCounty ? [prefs.homeCounty] : []),
    ...prefs.commuteCounties,
  ]);
  const noCountyFilter = eligibleCounties.size === 0;

  // Filter currentJob from results (don't show user their own job)
  const excludeIds = new Set<string>();
  if (prefs.currentJobId && !prefs.currentJobId.startsWith("start-")) {
    excludeIds.add(prefs.currentJobId);
  }

  const out: QuizResultV2[] = [];

  for (const occ of occupations) {
    if (excludeIds.has(occ.id)) continue;
    const profile = QUIZ_PROFILES[occ.id];
    if (!profile) continue;

    // Hard county filter (always applied)
    if (!noCountyFilter) {
      const countyOverlap = profile.counties.some((c) =>
        eligibleCounties.has(c),
      );
      if (!countyOverlap) continue;
    }

    const crits: CritResult[] = [];

    // County (informational)
    if (!noCountyFilter) {
      const reachable = profile.counties.filter((c) =>
        eligibleCounties.has(c),
      );
      crits.push({
        id: "county",
        label: `Available in ${reachable.join(", ")} County`,
        tier: "must",
        status: "satisfied",
      });
    }

    // Pay
    const payT = activeTier(prefs.payTier);
    if (payT && prefs.payFloor > 0) {
      const ok = occ.wage.median >= prefs.payFloor;
      crits.push({
        id: "pay",
        label: `Pays at least $${prefs.payFloor}/hr (this role: $${occ.wage.median.toFixed(2)}/hr)`,
        tier: payT,
        status: ok ? "satisfied" : "missing",
      });
    }

    // Variable / schedule flexibility
    const variableT = activeTier(prefs.variableTier);
    if (variableT && prefs.variableOk) {
      const hasVariable =
        profile.schedules.includes("variable") ||
        profile.schedules.includes("shift") ||
        profile.schedules.includes("oncall");
      if (prefs.variableOk === "yes") {
        crits.push({
          id: "variable",
          label: hasVariable
            ? "Schedule includes variable / non-9-to-5 shifts"
            : "Mostly weekday daytime (which is also fine)",
          tier: variableT,
          status: "satisfied",
        });
      } else {
        // Wants weekday daytime only
        const isWeekday = profile.schedules.includes("weekday");
        const onlyWeekday = profile.schedules.length === 1 && isWeekday;
        crits.push({
          id: "variable",
          label: onlyWeekday
            ? "Weekday daytime schedule"
            : isWeekday
              ? "Weekday daytime available, but some roles also work shifts"
              : "This role typically requires shift, on-call, or variable hours",
          tier: variableT,
          status: onlyWeekday ? "satisfied" : isWeekday ? "satisfied" : "missing",
        });
      }
    }

    // Setting (inside/outside)
    const settingT = activeTier(prefs.settingTier);
    if (settingT && prefs.setting && prefs.setting !== "any") {
      const match =
        profile.setting === prefs.setting ||
        profile.setting === "mixed" ||
        prefs.setting === "mixed";
      const label =
        prefs.setting === "inside"
          ? "Work is mostly indoors"
          : prefs.setting === "outside"
            ? "Work is mostly outdoors"
            : "Mix of indoor and outdoor work";
      crits.push({
        id: "setting",
        label,
        tier: settingT,
        status: match ? "satisfied" : "missing",
      });
    }

    // Benefits
    const flags = getBenefitFlags(occ.id);
    for (const opt of BENEFIT_OPTIONS) {
      const t = activeTier(prefs.benefits?.[opt.id]);
      if (!t) continue;
      const flag = flags[opt.id];
      let status: CritStatus;
      if (flag === "typical") status = "satisfied";
      else if (flag === "varies") status = "unknown";
      else status = "missing";
      crits.push({
        id: `benefit_${opt.id}`,
        label: opt.label,
        tier: t,
        status,
      });
    }

    // Interests (synthesize healthcare/teaching tags from sector where applicable)
    const interestT = activeTier(prefs.interestsTier);
    if (interestT && prefs.interests.length) {
      const effective = new Set(profile.interests);
      if (occ.sectorId === "healthcare") effective.add("healthcare_work");
      if (
        occ.id === "social-worker" ||
        occ.id === "community-health-worker" ||
        occ.id === "clinical-research-coordinator"
      ) {
        effective.add("teaching_education");
      }
      const overlap = [...effective].filter((i) =>
        prefs.interests.includes(i),
      );
      if (overlap.length) {
        const labels = overlap
          .map(
            (id) =>
              INTEREST_OPTIONS_V2.find((o) => o.id === id)?.label.toLowerCase() ??
              INTEREST_OPTIONS.find((o) => o.id === id)?.label.toLowerCase() ??
              id,
          )
          .join(", ");
        crits.push({
          id: "interests",
          label: `Matches your interests: ${labels}`,
          tier: interestT,
          status: "satisfied",
        });
      } else {
        crits.push({
          id: "interests",
          label: "Doesn't directly match your selected interests",
          tier: interestT,
          status: "missing",
        });
      }
    }

    // Background bonus (informational, nice-only)
    if (prefs.currentJobId) {
      const starting = getStartingRole(prefs.currentJobId);
      const past = getOccupation(prefs.currentJobId);
      let bridge = false;
      let label = "";
      if (starting?.levelUpToOccupationIds.includes(occ.id)) {
        bridge = true;
        label = `Common move from ${starting.title.toLowerCase()}`;
      } else if (past?.adjacentOccupationIds.includes(occ.id)) {
        bridge = true;
        label = "Common next step from your current role";
      } else if (past && past.sectorId === occ.sectorId) {
        bridge = true;
        label = `Same sector as your current role (${getSectorName(occ.sectorId)})`;
      }
      if (bridge) {
        crits.push({
          id: "background",
          label,
          tier: "nice",
          status: "satisfied",
        });
      }
    }

    const mustMisses = crits.filter(
      (c) => c.tier === "must" && c.status === "missing",
    ).length;
    const niceHits = crits.filter(
      (c) => c.tier === "nice" && c.status === "satisfied",
    ).length;
    const unknowns = crits.filter((c) => c.status === "unknown").length;

    let badge: QuizResultV2["badge"];
    if (mustMisses === 0) {
      badge = unknowns > 0 ? "incomplete" : "all_must";
    } else if (mustMisses === 1) {
      badge = "some_must";
    } else {
      badge = "missing_must";
    }

    out.push({ occupation: occ, crits, mustMisses, niceHits, unknowns, badge });
  }

  // Sort: all-must first, then by nice hits, then by pay
  out.sort((a, b) => {
    if (a.mustMisses !== b.mustMisses) return a.mustMisses - b.mustMisses;
    if (a.niceHits !== b.niceHits) return b.niceHits - a.niceHits;
    return b.occupation.wage.median - a.occupation.wage.median;
  });

  return out;
}

/** Updated interest options including healthcare / teaching / food-hospitality */
export const INTEREST_OPTIONS_V2: { id: string; label: string }[] = [
  { id: "helping_people", label: "Helping people directly" },
  { id: "healthcare_work", label: "Healthcare and patient care" },
  { id: "teaching_education", label: "Teaching, training, or education" },
  { id: "food_hospitality", label: "Food service or hospitality" },
  { id: "hands_on_tools", label: "Working with hands and tools" },
  { id: "computers_tech", label: "Computers and technology" },
  { id: "machines_mechanical", label: "Machines, engines, mechanical" },
  { id: "outdoors", label: "Being outdoors" },
  { id: "science_lab", label: "Science and lab work" },
  { id: "driving_logistics", label: "Driving and logistics" },
  { id: "public_service", label: "Public service and safety" },
  { id: "patient_detail", label: "Detail-oriented or paperwork" },
  { id: "production_mfg", label: "Production and manufacturing" },
];

// ============================================================
// SECTOR-LEVEL FLOW — entry → mid → senior, with inflows
// ============================================================

export type FlowOcc = {
  id: string;
  title: string;
  wage: number;
  annual: number;
};

export type FlowInflow = {
  /** "starting" = common no-degree job; "adjacent" = TOG profiled occ in another sector */
  kind: "starting" | "adjacent";
  id: string;
  title: string;
  fromLabel: string; // human label for where they're from
};

export type SectorFlow = {
  inflows: FlowInflow[];
  entry: FlowOcc[];
  mid: FlowOcc[];
  senior: FlowOcc[];
};

function asFlow(o: Occupation): FlowOcc {
  return {
    id: o.id,
    title: o.title,
    wage: o.wage.median,
    annual: o.wage.annualMedian,
  };
}

/**
 * Compose a sector-wide flow:
 *  - Inflows: starting roles + TOG occupations from OTHER sectors that lead to roles in THIS sector
 *  - Entry: profiled occupations with wage in the bottom third of the sector
 *  - Mid: middle third
 *  - Senior: top third
 */
export function getSectorFlow(sectorId: string): SectorFlow {
  const occs = getOccupationsForSector(sectorId);
  if (!occs.length) {
    return { inflows: [], entry: [], mid: [], senior: [] };
  }

  const occIds = new Set(occs.map((o) => o.id));

  // Inflows from starting roles
  const inflows: FlowInflow[] = [];
  for (const r of STARTING_ROLES) {
    if (r.levelUpToOccupationIds.some((id) => occIds.has(id))) {
      const past = PAST_SECTORS.find((p) => p.id === r.pastSectorId);
      inflows.push({
        kind: "starting",
        id: r.id,
        title: r.title,
        fromLabel: past?.name ?? "Outside sector",
      });
    }
  }
  // Inflows from TOG occupations in OTHER sectors (via lateralFromIds on our occs)
  const seenAdj = new Set<string>();
  for (const occ of occs) {
    for (const fromId of occ.lateralFromIds) {
      if (seenAdj.has(fromId)) continue;
      const from = getOccupation(fromId);
      if (from && from.sectorId !== sectorId) {
        seenAdj.add(fromId);
        inflows.push({
          kind: "adjacent",
          id: from.id,
          title: from.title,
          fromLabel: getSectorName(from.sectorId),
        });
      }
    }
    // Reverse: if other sectors' occupations list ours in their adjacentOccupationIds, also inflow
  }
  // Scan all OTHER sectors' occupations for adjacentOccupationIds that point INTO this sector
  for (const o of occupations) {
    if (o.sectorId === sectorId) continue;
    if (o.adjacentOccupationIds.some((aid) => occIds.has(aid))) {
      if (seenAdj.has(o.id)) continue;
      seenAdj.add(o.id);
      inflows.push({
        kind: "adjacent",
        id: o.id,
        title: o.title,
        fromLabel: getSectorName(o.sectorId),
      });
    }
  }

  // Tier the sector's occupations by wage
  const sorted = [...occs].sort((a, b) => a.wage.median - b.wage.median);
  const n = sorted.length;
  const t1 = Math.ceil(n / 3);
  const t2 = Math.ceil((2 * n) / 3);

  const entry = sorted.slice(0, t1).map(asFlow);
  const mid = sorted.slice(t1, t2).map(asFlow);
  const senior = sorted.slice(t2).map(asFlow);

  return { inflows, entry, mid, senior };
}

// ============================================================
// SECTOR THROUGHLINES — specific job-to-job arrows
// Derived from `careerPathway[]` strings in tog.json, curated to
// the edges that connect two profiled TOG occupations in the same sector.
// ============================================================

export type FlowColumn = "inflow" | "entry" | "mid" | "senior";

export type FlowEdge = {
  fromCol: FlowColumn;
  fromId: string;
  toCol: "entry" | "mid" | "senior";
  toId: string;
  /** "ladder" = explicit careerPathway throughline; "bridge" = starting-role/cross-sector inflow */
  kind: "ladder" | "bridge";
};

/**
 * Forward occupation-to-occupation edges within a sector, derived from
 * the `careerPathway` arrays in tog.json. Only edges between two
 * occupations BOTH profiled on the site are listed (so the arrow can
 * connect two real cards).
 */
const SECTOR_THROUGHLINES: Record<string, Array<[string, string]>> = {
  healthcare: [
    // CNA hub — multiple bedside-care ladders branch from it
    ["cna", "lpn"],
    ["cna", "pta"],
    ["cna", "radiologic-tech"],
    ["cna", "respiratory-therapist"],
    // Medical Assistant ladder also feeds LPN
    ["medical-assistant", "lpn"],
    // LPN → RN is the classic nursing ladder
    ["lpn", "rn"],
  ],
  "it-tech": [
    // Help-desk / user-support is the on-ramp for both specialties
    ["computer-user-support", "network-support"],
    ["computer-user-support", "cybersecurity-analyst"],
  ],
  transportation: [
    // CDL Driver → Logistics Manager is in both occupations' pathways
    ["cdl-driver", "logistics-manager"],
  ],
};

export type SectorThroughlines = SectorFlow & {
  edges: FlowEdge[];
};

export function getSectorThroughlines(sectorId: string): SectorThroughlines {
  const flow = getSectorFlow(sectorId);

  const colOf = (id: string): "entry" | "mid" | "senior" | null => {
    if (flow.entry.some((o) => o.id === id)) return "entry";
    if (flow.mid.some((o) => o.id === id)) return "mid";
    if (flow.senior.some((o) => o.id === id)) return "senior";
    return null;
  };

  const edges: FlowEdge[] = [];
  const seen = new Set<string>();
  const push = (e: FlowEdge) => {
    const k = `${e.fromCol}:${e.fromId}->${e.toCol}:${e.toId}`;
    if (seen.has(k)) return;
    seen.add(k);
    edges.push(e);
  };

  // 1. Inflow → occupation edges (bridges)
  for (const f of flow.inflows) {
    if (f.kind === "starting") {
      const role = getStartingRole(f.id);
      if (!role) continue;
      for (const oid of role.levelUpToOccupationIds) {
        const c = colOf(oid);
        if (c) push({ fromCol: "inflow", fromId: f.id, toCol: c, toId: oid, kind: "bridge" });
      }
    } else {
      const fromOcc = getOccupation(f.id);
      if (!fromOcc) continue;
      const targets = new Set<string>();
      for (const aid of fromOcc.adjacentOccupationIds) {
        if (colOf(aid)) targets.add(aid);
      }
      for (const o of [...flow.entry, ...flow.mid, ...flow.senior]) {
        const occ = getOccupation(o.id);
        if (occ?.lateralFromIds.includes(f.id)) targets.add(o.id);
      }
      for (const tid of targets) {
        const c = colOf(tid);
        if (c) push({ fromCol: "inflow", fromId: f.id, toCol: c, toId: tid, kind: "bridge" });
      }
    }
  }

  // 2. Occupation → occupation throughlines (ladders)
  for (const [from, to] of SECTOR_THROUGHLINES[sectorId] ?? []) {
    const fc = colOf(from);
    const tc = colOf(to);
    if (!fc || !tc) continue;
    if (fc === "senior") continue; // no forward edges out of senior
    // Only emit forward edges (left-to-right)
    const order = { entry: 0, mid: 1, senior: 2 } as const;
    if (order[tc] <= order[fc]) continue;
    push({ fromCol: fc, fromId: from, toCol: tc, toId: to, kind: "ladder" });
  }

  return { ...flow, edges };
}

// ============================================================
// NC CAREERS — direct occupation-profile mapping by SOC code
// URL pattern: https://nccareers.org/occupation-profile/<SOC without hyphen>/1284
// ============================================================

const NC_CAREERS_SOC: Record<string, string> = {
  // Healthcare
  "medical-assistant": "319092",
  cna: "311131",
  "medical-records-specialist": "292072",
  lpn: "292061",
  pta: "312021",
  "radiologic-tech": "292034",
  "respiratory-therapist": "291126",
  rn: "291141",
  "community-health-worker": "211094",
  "clinical-research-coordinator": "119121",

  // Life Sciences Manufacturing
  "qc-inspector": "519061",
  "production-tech": "519199",
  "chemical-tech": "194031",
  "industrial-mechanic": "499041",

  // Skilled Trades
  "auto-tech": "493023",
  "hvac-tech": "499021",
  electrician: "472111",
  plumber: "472152",

  // IT & Tech
  "computer-user-support": "151232",
  "cybersecurity-analyst": "151212",
  "network-support": "151231",

  // Transportation
  "cdl-driver": "533032",
  "logistics-manager": "113071",

  // Public Sector
  "maintenance-land-mgmt": "499071",
  "utilities-tech": "518031",
  "firefighter-emt": "332011",
  "social-worker": "211029",
  "electric-lineworker": "499051",
  "police-sheriff": "333051",
};

export function getNCCareersUrl(occId: string): string | undefined {
  const soc = NC_CAREERS_SOC[occId];
  if (!soc) return undefined;
  return `https://nccareers.org/occupation-profile/${soc}/1284`;
}

const NC_CAREERS_CLUSTER: Record<string, string> = {
  // NC Careers clusters by sector
  healthcare: "https://nccareers.org/clusters/health-science",
  "life-sciences-mfg":
    "https://nccareers.org/clusters/manufacturing",
  "skilled-trades":
    "https://nccareers.org/clusters/architecture-and-construction",
  "it-tech": "https://nccareers.org/clusters/information-technology",
  transportation:
    "https://nccareers.org/clusters/transportation-distribution-and-logistics",
  "public-sector":
    "https://nccareers.org/clusters/law-public-safety-corrections-and-security",
};

export function getNCCareersClusterUrl(sectorId: string): string {
  return (
    NC_CAREERS_CLUSTER[sectorId] ?? "https://nccareers.org/explore-occupations"
  );
}

// ============================================================
// SKILLS-FIRST — Burning Glass Institute role mapping
// PREVIEW DATA — verify before site-wide deploy
// Source: https://www.skills-first.org/roles
// ============================================================

export type SkillsFirstCategory = "core" | "foundational" | "specialization";

export type SkillsFirstRole = {
  slug: string; // /role/<slug>
  title: string;
  /** Skills grouped by Burning Glass category */
  skills?: {
    core?: string[];
    foundational?: string[];
    specialization?: string[];
  };
};

/** Map TOG occupation id → Burning Glass Skills-First role */
export const SKILLS_FIRST_MAP: Record<string, SkillsFirstRole> = {
  "cybersecurity-analyst": {
    slug: "cybersecurity-analysts",
    title: "Cybersecurity Analysts",
    skills: {
      core: [
        "Agile Methodology",
        "Application Security",
        "Incident Response",
        "Information Systems Security",
        "Operating Systems",
        "Risk Analysis",
        "Security Controls",
        "SIEM",
        "Security Policies",
        "Vulnerability Management",
      ],
      foundational: ["Communication", "Governance", "Problem Solving", "Project Management"],
      specialization: [
        "Auditing",
        "Cloud Security",
        "Cyber Threat Intelligence",
        "Digital Forensics",
        "Encryption",
        "Endpoint Security",
        "Identity and Access Management",
        "Information Assurance",
        "IT Security Architecture",
        "Linux",
        "Penetration Testing",
        "Risk Management Framework",
      ],
    },
  },
  "production-tech": {
    slug: "assemblers-and-fabricators",
    title: "Assemblers and Fabricators",
    skills: {
      core: [
        "Blueprint Reading",
        "Quality Control",
        "Hand and Power Tool Use",
        "Production Equipment Operation",
        "Material Handling",
      ],
      foundational: ["Attention to Detail", "Communication", "Problem Solving", "Teamwork"],
      specialization: [
        "cGMP (Good Manufacturing Practice)",
        "Aseptic Processing",
        "SAP / MES",
        "Mechanical Aptitude",
      ],
    },
  },
  "industrial-mechanic": {
    slug: "industrial-machinery-mechanics",
    title: "Industrial Machinery Mechanics",
    skills: {
      core: [
        "Preventive Maintenance",
        "Troubleshooting",
        "Mechanical Repair",
        "Blueprint Reading",
        "Pneumatics and Hydraulics",
      ],
      foundational: ["Problem Solving", "Communication", "Attention to Detail"],
      specialization: ["PLC Programming", "Welding", "CMMS Software", "Lockout / Tagout"],
    },
  },
  "qc-inspector": {
    slug: "inspectors-testers-and-samplers",
    title: "Inspectors, Testers, and Samplers",
    skills: {
      core: [
        "Quality Control",
        "Statistical Process Control",
        "Documentation",
        "Measurement and Testing",
        "Calibration",
      ],
      foundational: ["Attention to Detail", "Communication", "Problem Solving"],
      specialization: ["cGMP", "ASQ Certification", "Root Cause Analysis", "ISO 9001"],
    },
  },
  "maintenance-land-mgmt": {
    slug: "maintenance-and-repair-workers",
    title: "Maintenance and Repair Workers",
    skills: {
      core: [
        "Equipment Repair",
        "Hand and Power Tool Use",
        "Preventive Maintenance",
        "Basic Plumbing",
        "Basic Electrical",
      ],
      foundational: ["Problem Solving", "Communication", "Customer Service"],
      specialization: ["Grounds Equipment", "CMMS Software", "Pesticide Applicator Cert"],
    },
  },
  "cdl-driver": {
    slug: "truck-drivers",
    title: "Truck Drivers",
    skills: {
      core: [
        "Commercial Driving",
        "Pre-Trip Inspection",
        "Route Planning",
        "Logbook / ELD Compliance",
        "Cargo Handling",
      ],
      foundational: ["Time Management", "Communication", "Customer Service"],
      specialization: ["HazMat Endorsement", "Tanker Endorsement", "DOT Regulations"],
    },
  },
  "logistics-manager": {
    slug: "warehouse-manager",
    title: "Warehouse Manager",
    skills: {
      core: [
        "Inventory Management",
        "Warehouse Operations",
        "Team Supervision",
        "Logistics",
        "Safety Compliance",
      ],
      foundational: ["Leadership", "Communication", "Problem Solving", "Project Management"],
      specialization: ["WMS Software", "Six Sigma", "OSHA", "Lean Manufacturing"],
    },
  },
  "police-sheriff": {
    slug: "security-guards",
    title: "Security Guards (closest BGI match — actual role is more specialized)",
    skills: {
      core: ["Surveillance", "Incident Reporting", "De-escalation", "Public Safety"],
      foundational: ["Communication", "Judgment", "Attention to Detail"],
      specialization: ["NC BLET Certification", "Firearms Qualification", "Investigation"],
    },
  },
};

/** Map starting-role id → Burning Glass Skills-First role */
export const SKILLS_FIRST_STARTING: Record<string, SkillsFirstRole> = {
  "start-cashier-retail": {
    slug: "cashiers",
    title: "Cashiers",
    skills: {
      core: [
        "Customer Service",
        "Point of Sale (POS)",
        "Cash Handling",
        "Product Knowledge",
        "Inventory Tasks",
      ],
      foundational: ["Communication", "Problem Solving", "Teamwork", "Attention to Detail"],
      specialization: [],
    },
  },
  "start-customer-service": {
    slug: "customer-service-representative",
    title: "Customer Service Representative",
    skills: {
      core: ["Customer Service", "Telephone Skills", "CRM Software", "Conflict Resolution"],
      foundational: ["Communication", "Problem Solving", "Active Listening", "Empathy"],
      specialization: [],
    },
  },
  "start-warehouse": {
    slug: "laborers-and-material-movers",
    title: "Laborers and Material Movers",
    skills: {
      core: ["Material Handling", "Forklift Operation", "Inventory Tasks", "Safety Compliance"],
      foundational: ["Teamwork", "Communication", "Attention to Detail"],
      specialization: ["WMS Software"],
    },
  },
  "start-driver-delivery": {
    slug: "truck-drivers",
    title: "Truck Drivers",
    skills: {
      core: ["Commercial Driving", "Route Planning", "Cargo Handling"],
      foundational: ["Time Management", "Communication", "Customer Service"],
      specialization: [],
    },
  },
  "start-security-guard": {
    slug: "security-guards",
    title: "Security Guards",
    skills: {
      core: ["Surveillance", "Incident Reporting", "Public Safety"],
      foundational: ["Communication", "Judgment", "Attention to Detail"],
      specialization: [],
    },
  },
  "start-office-admin": {
    slug: "receptionists-and-information-clerks",
    title: "Receptionists and Information Clerks",
    skills: {
      core: [
        "Front Desk Operations",
        "Telephone Skills",
        "Scheduling",
        "Microsoft Office",
        "Customer Service",
      ],
      foundational: ["Communication", "Attention to Detail", "Multitasking"],
      specialization: ["EHR Software"],
    },
  },
};

export function getSkillsFirst(occId: string): SkillsFirstRole | undefined {
  return SKILLS_FIRST_MAP[occId];
}

export function getSkillsFirstStarting(id: string): SkillsFirstRole | undefined {
  return SKILLS_FIRST_STARTING[id];
}

export function skillsFirstUrl(slug: string): string {
  return `https://www.skills-first.org/role/${slug}`;
}

/** Flatten a role's skills into a single string set for overlap matching */
function flattenSkills(role?: SkillsFirstRole): Set<string> {
  if (!role?.skills) return new Set();
  const all = [
    ...(role.skills.core ?? []),
    ...(role.skills.foundational ?? []),
    ...(role.skills.specialization ?? []),
  ];
  return new Set(all.map((s) => s.toLowerCase()));
}

/** Compute skill overlap between a past role and a target TOG occupation */
export function getSkillOverlap(
  pastId: string,
  targetOccId: string,
): { shared: string[]; pastTotal: number; targetTotal: number } {
  const past =
    getSkillsFirst(pastId) ?? getSkillsFirstStarting(pastId) ?? undefined;
  const target = getSkillsFirst(targetOccId);
  if (!past || !target) {
    return { shared: [], pastTotal: 0, targetTotal: 0 };
  }
  const pastSet = flattenSkills(past);
  const targetSet = flattenSkills(target);
  const shared: string[] = [];
  for (const s of pastSet) if (targetSet.has(s)) shared.push(s);
  return {
    shared: shared.map((s) =>
      s.replace(/\b\w/g, (c) => c.toUpperCase()),
    ),
    pastTotal: pastSet.size,
    targetTotal: targetSet.size,
  };
}
