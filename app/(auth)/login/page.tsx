import { LoginForm } from "@/components/auth/LoginForm";
import { isMockMode } from "@/lib/config";

interface LoginPageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next, error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <LoginForm mockMode={isMockMode()} next={next} oauthError={error === "auth_callback_error"} />
    </div>
  );
}
