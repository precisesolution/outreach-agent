import type { MeetingRow } from "@/lib/supabase";

const statusStyles: Record<string, string> = {
  proposed: "bg-slate-700/40 text-slate-200",
  scheduled: "bg-emerald-700/30 text-emerald-200",
  completed: "bg-indigo-700/30 text-indigo-200",
  cancelled: "bg-rose-800/30 text-rose-200",
  no_show: "bg-amber-800/30 text-amber-200",
};

function formatTime(iso: string | null) {
  if (!iso) return "Unscheduled";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function MeetingCard({ meeting }: { meeting: MeetingRow }) {
  const p = meeting.prospects;
  const proj = meeting.projects;
  const meetUrl =
    meeting.location && meeting.location.startsWith("http")
      ? meeting.location
      : null;

  return (
    <div className="rounded-lg border border-border bg-panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wide text-muted">
            {formatTime(meeting.scheduled_at)} · {meeting.duration_min ?? 30} min
          </div>
          <h3 className="mt-1 truncate text-base font-semibold">
            {meeting.title ?? "Untitled meeting"}
          </h3>
          {p && (
            <div className="mt-1 text-sm text-muted">
              {p.name}
              {p.role && ` · ${p.role}`}
              {p.organization && ` · ${p.organization}`}
            </div>
          )}
          {proj && (
            <div className="mt-0.5 text-xs text-muted">
              Project: {proj.name}
            </div>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
            statusStyles[meeting.status ?? ""] ?? "bg-slate-700/40 text-slate-200"
          }`}
        >
          {meeting.status ?? "—"}
        </span>
      </div>

      {meeting.brief_md && (
        <details className="mt-4 rounded-md border border-border bg-black/20 p-3 text-sm">
          <summary className="cursor-pointer select-none text-muted hover:text-text">
            Prep brief
          </summary>
          <pre className="mt-2 whitespace-pre-wrap font-sans text-text/90">
            {meeting.brief_md}
          </pre>
        </details>
      )}

      <div className="mt-4 flex items-center gap-2">
        {meetUrl ? (
          <a
            href={meetUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
          >
            Join Google Meet
          </a>
        ) : (
          <span className="text-xs text-muted">No Meet link</span>
        )}
        {p?.email && (
          <a
            href={`mailto:${p.email}`}
            className="rounded-md border border-border px-3 py-1.5 text-xs text-muted hover:text-text"
          >
            Email {p.name.split(" ")[0]}
          </a>
        )}
      </div>
    </div>
  );
}
