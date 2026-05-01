export type LeadStatus =
  | "new"
  | "contacted"
  | "replied"
  | "qualified"
  | "won"
  | "lost";

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  status: LeadStatus;
  lastContactedAt: string | null;
  source: string;
  score: number;
};

export const leads: Lead[] = [
  {
    id: "ld_001",
    name: "Ava Chen",
    email: "ava@northwind.io",
    company: "Northwind",
    title: "Head of Growth",
    status: "replied",
    lastContactedAt: "2026-04-28",
    source: "LinkedIn",
    score: 87,
  },
  {
    id: "ld_002",
    name: "Marcus Patel",
    email: "marcus@helio.dev",
    company: "Helio",
    title: "VP Sales",
    status: "contacted",
    lastContactedAt: "2026-04-29",
    source: "Apollo",
    score: 72,
  },
  {
    id: "ld_003",
    name: "Sofia Rivera",
    email: "sofia@brightlabs.com",
    company: "Brightlabs",
    title: "Founder",
    status: "qualified",
    lastContactedAt: "2026-04-30",
    source: "Referral",
    score: 91,
  },
  {
    id: "ld_004",
    name: "Jonas Wirth",
    email: "jonas@vellum.ai",
    company: "Vellum",
    title: "CTO",
    status: "new",
    lastContactedAt: null,
    source: "Inbound",
    score: 64,
  },
  {
    id: "ld_005",
    name: "Priya Iyer",
    email: "priya@orbital.co",
    company: "Orbital",
    title: "RevOps Lead",
    status: "won",
    lastContactedAt: "2026-04-22",
    source: "Webinar",
    score: 95,
  },
  {
    id: "ld_006",
    name: "Daniel Okafor",
    email: "daniel@stride.app",
    company: "Stride",
    title: "Director of Sales",
    status: "lost",
    lastContactedAt: "2026-04-15",
    source: "Cold Email",
    score: 41,
  },
];

export function leadStats(items: Lead[]) {
  const total = items.length;
  const contacted = items.filter((l) => l.status !== "new").length;
  const replied = items.filter((l) =>
    ["replied", "qualified", "won"].includes(l.status),
  ).length;
  const won = items.filter((l) => l.status === "won").length;
  const replyRate = contacted === 0 ? 0 : Math.round((replied / contacted) * 100);
  return { total, contacted, replied, won, replyRate };
}
