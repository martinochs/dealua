import { RegisterBenefitsPanel } from "@/components/auth/RegisterBenefitsPanel";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { RegisterTrustBadges } from "@/components/auth/RegisterTrustBadges";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:py-10 lg:py-12">
        <div className="flex flex-1 flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12 xl:gap-20">
          <RegisterBenefitsPanel className="lg:flex-1" />
          <div className="w-full max-w-md shrink-0 lg:flex-1 lg:max-w-[420px]">
            <RegisterForm />
          </div>
        </div>
        <RegisterTrustBadges className="mt-10 lg:mt-14" />
      </div>
    </div>
  );
}
