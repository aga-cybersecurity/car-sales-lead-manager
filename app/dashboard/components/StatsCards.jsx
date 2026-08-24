export default function StatsCards({ leads }) {
  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => !lead.status || lead.status === "New Lead"
  ).length;

  const contacted = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const followUps = leads.filter(
    (lead) => lead.status === "Follow-Up Needed"
  ).length;

  const closed = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  const stats = [
    {
      title: "Total Leads",
      value: totalLeads,
    },
    {
      title: "New Leads",
      value: newLeads,
    },
    {
      title: "Contacted",
      value: contacted,
    },
    {
      title: "Follow-Ups",
      value: followUps,
    },
    {
      title: "Closed",
      value: closed,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-500 transition"
        >
          <p className="text-gray-400 text-sm">
            {stat.title}
          </p>

          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}