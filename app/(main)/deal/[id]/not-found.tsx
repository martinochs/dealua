import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DealNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <h1 className="text-2xl font-bold">Пропозицію не знайдено</h1>
      <p className="text-muted-foreground">Можливо, вона ще на модерації або була видалена.</p>
      <Button asChild>
        <Link href="/deals">Усі пропозиції</Link>
      </Button>
    </div>
  );
}
