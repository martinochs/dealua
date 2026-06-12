import { getClickStats } from "@/lib/queries/deals";

export async function AdminClickStats() {
  const clicks = await getClickStats();

  if (clicks.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Кліків поки немає. Перейдіть до пропозиції та натисніть «Перейти до пропозиції».
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {clicks.map((item) => (
        <li key={item.dealId} className="flex justify-between rounded-lg border px-4 py-3 text-sm">
          <span className="truncate pr-4">{item.title}</span>
          <span className="font-medium shrink-0">{item.clicks} кліків</span>
        </li>
      ))}
    </ul>
  );
}
