import { getStats } from "@/lib/queries/deals";

export async function AdminStats() {
  const stats = await getStats();

  const items = [
    { label: "Схвалені", value: stats.approvedDeals },
    { label: "На модерації", value: stats.pendingDeals, highlight: stats.pendingDeals > 0 },
    { label: "Категорії", value: stats.categories },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className={`rounded-lg border p-4 text-center ${item.highlight ? "border-amber-300 bg-amber-50" : "bg-card"}`}
        >
          <div className="text-2xl font-bold">{item.value}</div>
          <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
