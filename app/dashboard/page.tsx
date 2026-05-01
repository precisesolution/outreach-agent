import { LeadTable } from "@/components/LeadTable";
import { StatCard } from "@/components/StatCard";
import { leads, leadStats } from "@/lib/leads";

export default function DashboardPage() {
  const stats = leadStats(leads);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Lead dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            Pipeline snapshot for the outreach agent.
          </p>
        </div>
      </header>

      <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total leads" value={stats.total} />
        <StatCard label="Contacted" value={stats.contacted} />
        <StatCard
          label="Reply rate"
          value={`${stats.replyRate}%`}
          hint={`${stats.replied} of ${stats.contacted} contacted`}
        />
        <StatCard label="Won" value={stats.won} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-muted">Recent leads</h2>
        <LeadTable leads={leads} />
      </section>
    </main>
  );
}
