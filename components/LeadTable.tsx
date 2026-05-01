import type { Lead, LeadStatus } from "@/lib/leads";

const statusStyles: Record<LeadStatus, string> = {
  new: "bg-slate-700/40 text-slate-200",
  contacted: "bg-blue-700/30 text-blue-200",
  replied: "bg-indigo-700/30 text-indigo-200",
  qualified: "bg-violet-700/30 text-violet-200",
  won: "bg-emerald-700/30 text-emerald-200",
  lost: "bg-rose-800/30 text-rose-200",
};

export function LeadTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-panel">
      <table className="w-full text-sm">
        <thead className="bg-black/20 text-left text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Lead</th>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Source</th>
            <th className="px-4 py-3 font-medium">Last contact</th>
            <th className="px-4 py-3 font-medium text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t border-border hover:bg-white/[0.02]">
              <td className="px-4 py-3">
                <div className="font-medium">{lead.name}</div>
                <div className="text-xs text-muted">{lead.email}</div>
              </td>
              <td className="px-4 py-3">
                <div>{lead.company}</div>
                <div className="text-xs text-muted">{lead.title}</div>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[lead.status]}`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="px-4 py-3 text-muted">{lead.source}</td>
              <td className="px-4 py-3 text-muted">
                {lead.lastContactedAt ?? "—"}
              </td>
              <td className="px-4 py-3 text-right tabular-nums">{lead.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
