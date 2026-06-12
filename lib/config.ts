/** True when running with in-memory mock data (default without Supabase env vars). */
export function isMockMode(): boolean {
  if (process.env.USE_MOCK === "true") return true;
  if (process.env.USE_MOCK === "false") return false;
  return (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
