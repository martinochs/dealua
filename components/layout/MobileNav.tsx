"use client";

import Link from "next/link";
import { Menu, Plus, User, LogOut, Shield, List, Grid3X3 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions/auth";
import { t } from "@/lib/i18n/uk";
import type { Profile } from "@/types/database";

interface MobileNavProps {
  profile: Profile | null;
  pendingCount?: number;
}

export function MobileNav({ profile, pendingCount = 0 }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Menu">
        <Menu className="h-5 w-5" />
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setOpen(false)} />
          <nav className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border bg-background p-2 shadow-lg">
            <Link
              href="/deals"
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm hover:bg-accent min-h-[44px]"
              onClick={() => setOpen(false)}
            >
              <List className="h-4 w-4" />
              Усі пропозиції
            </Link>
            <Link
              href="/categories"
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm hover:bg-accent min-h-[44px]"
              onClick={() => setOpen(false)}
            >
              <Grid3X3 className="h-4 w-4" />
              {t("nav.categories")}
            </Link>
            <Link
              href="/submit"
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm hover:bg-accent min-h-[44px]"
              onClick={() => setOpen(false)}
            >
              <Plus className="h-4 w-4" />
              {t("nav.submit")}
            </Link>

            {profile ? (
              <>
                <Link
                  href={`/profile/${profile.username}`}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm hover:bg-accent min-h-[44px]"
                  onClick={() => setOpen(false)}
                >
                  <User className="h-4 w-4" />
                  {profile.username}
                </Link>
                {profile.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm hover:bg-accent min-h-[44px]"
                    onClick={() => setOpen(false)}
                  >
                    <Shield className="h-4 w-4" />
                    {t("nav.admin")}
                    {pendingCount > 0 && (
                      <span className="ml-auto rounded-full bg-hot text-white text-xs px-2 py-0.5">
                        {pendingCount}
                      </span>
                    )}
                  </Link>
                )}
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm hover:bg-accent min-h-[44px]"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("nav.logout")}
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm hover:bg-accent min-h-[44px]"
                  onClick={() => setOpen(false)}
                >
                  {t("nav.login")}
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm hover:bg-accent min-h-[44px]"
                  onClick={() => setOpen(false)}
                >
                  {t("nav.register")}
                </Link>
              </>
            )}
          </nav>
        </>
      )}
    </div>
  );
}
