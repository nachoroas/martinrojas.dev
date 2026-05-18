import { createAdminClient } from "@/lib/supabase/admin";
import LogoutButton from "@/components/admin/LogoutButton";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

type PageView = {
  path: string;
  count: number;
};

async function getMessages(): Promise<Message[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("id, name, email, message, created_at")
    .order("created_at", { ascending: false });
  return data ?? [];
}

async function getTopPages(): Promise<PageView[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("page_views")
    .select("path");

  if (!data) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    counts[row.path] = (counts[row.path] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

async function getTopProjects(): Promise<PageView[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("page_views")
    .select("path")
    .like("path", "/projects/%");

  if (!data) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    const slug = row.path.replace(/^\/projects\//, "").replace(/\/$/, "") || row.path;
    counts[slug] = (counts[slug] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPage() {
  const [messages, topPages, topProjects] = await Promise.all([
    getMessages(),
    getTopPages(),
    getTopProjects(),
  ]);

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <LogoutButton />
        </div>

        {/* Messages */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            Messages ({messages.length})
          </h2>
          {messages.length === 0 ? (
            <p className="text-sm text-gray-500">No messages yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-800">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-800 bg-gray-900 text-left text-gray-400">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3 whitespace-nowrap">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {messages.map((m) => (
                    <tr key={m.id} className="bg-gray-900 hover:bg-gray-800">
                      <td className="px-4 py-3 font-medium">{m.name}</td>
                      <td className="px-4 py-3 text-gray-400">{m.email}</td>
                      <td className="max-w-xs px-4 py-3 text-gray-300">
                        <span className="line-clamp-2">{m.message}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-400">
                        {formatDate(m.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Top pages */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Top pages
            </h2>
            {topPages.length === 0 ? (
              <p className="text-sm text-gray-500">No data yet.</p>
            ) : (
              <div className="rounded-lg border border-gray-800">
                {topPages.map(({ path, count }, i) => (
                  <div
                    key={path}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm ${
                      i !== topPages.length - 1 ? "border-b border-gray-800" : ""
                    } bg-gray-900`}
                  >
                    <span className="truncate text-gray-300">{path}</span>
                    <span className="ml-4 shrink-0 font-medium">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Top projects */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Top projects
            </h2>
            {topProjects.length === 0 ? (
              <p className="text-sm text-gray-500">No data yet.</p>
            ) : (
              <div className="rounded-lg border border-gray-800">
                {topProjects.map(({ path, count }, i) => (
                  <div
                    key={path}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm ${
                      i !== topProjects.length - 1 ? "border-b border-gray-800" : ""
                    } bg-gray-900`}
                  >
                    <span className="truncate text-gray-300">{path}</span>
                    <span className="ml-4 shrink-0 font-medium">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
