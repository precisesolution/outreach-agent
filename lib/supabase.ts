import { createClient } from "@supabase/supabase-js";

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://fsrkfkwdjxzazzbtafka.supabase.co";
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzcmtma3dkanh6YXp6YnRhZmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MDE2MTIsImV4cCI6MjA5MzE3NzYxMn0.vbnllTe5-QLeaC19x4IFpOBC__OLYY8ZyoAct85wS3U";

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

export type MeetingRow = {
  id: string;
  title: string | null;
  scheduled_at: string | null;
  duration_min: number | null;
  location: string | null;
  status: string | null;
  brief_md: string | null;
  prospects: {
    id: string;
    name: string;
    email: string | null;
    role: string | null;
    organization: string | null;
    helpfulness_score: number | null;
    brief_md: string | null;
  } | null;
  projects: {
    id: string;
    name: string;
    org_name: string | null;
  } | null;
};

export async function fetchUpcomingMeetings(): Promise<MeetingRow[]> {
  const { data, error } = await supabase
    .from("meetings")
    .select(
      `id, title, scheduled_at, duration_min, location, status, brief_md,
       prospects ( id, name, email, role, organization, helpfulness_score, brief_md ),
       projects ( id, name, org_name )`,
    )
    .order("scheduled_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as unknown as MeetingRow[];
}
