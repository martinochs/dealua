"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="uk">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center font-sans">
        <h1 className="text-2xl font-bold">Критична помилка</h1>
        <p className="text-muted-foreground max-w-md">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium"
        >
          Спробувати знову
        </button>
      </body>
    </html>
  );
}
