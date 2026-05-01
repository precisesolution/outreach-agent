import { MeetingCard } from "@/components/MeetingCard";
import { StatCard } from "@/components/StatCard";
import { fetchUpcomingMeetings } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function groupByDay(meetings: Awaited<ReturnType<typeof fetchUpcomingMeetings>>) {
  const groups = new Map<string, typeof meetings>();
  for (const m of meetings) {
    const key = m.scheduled_at
      ? new Date(m.scheduled_at).toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      : "Unscheduled";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(m);
  }
  return Array.from(groups.entries());
}

export default async function DashboardPage() {
  const meetings = await fetchUpcomingMeetings();
  const now = Date.now();
  const upcoming = meetings.filter(
    (m) => m.scheduled_at && new Date(m.scheduled_at).getTime() >= now,
  );
  const past = meetings.filter(
    (m) => m.scheduled_at && new Date(m.scheduled_at).getTime() < now,
  );

  const grouped = groupByDay(upcoming);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Research interviews</h1>
          <p className="mt-1 text-sm text-muted">
            Upcoming discovery calls across all active projects.
          </p>
        </div>
      </header>

      <section className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Upcoming" value={upcoming.length} />
        <StatCard label="Completed" value={past.length} />
        <StatCard label="Total scheduled" value={meetings.length} />
        <StatCard
          label="Next in"
          value={
            upcoming[0]?.scheduled_at
              ? formatRelative(upcoming[0].scheduled_at)
              : "—"
          }
        />
      </section>

      {grouped.length === 0 && (
        <div className="rounded-lg border border-border bg-panel p-8 text-center text-sm text-muted">
          No upcoming meetings yet. They&apos;ll appear here once the agent books
          them.
        </div>
      )}

      <div className="space-y-8">
        {grouped.map(([day, items]) => (
          <section key={day}>
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
              {day}
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {items.map((m) => (
                <MeetingCard key={m.id} meeting={m} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function formatRelative(iso: string) {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms < 0) return "now";
  const hours = Math.round(ms / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  return `${days}d`;
}
