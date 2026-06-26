"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { UserAvatar } from "@/components/profile/UserAvatar";
import { updateAvatarAction } from "@/lib/actions/update-avatar";
import { AVATAR_PRESETS, isPresetAvatarUrl } from "@/lib/avatars/presets";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

interface AvatarPickerProps {
  username: string;
  currentAvatarUrl: string | null;
}

export function AvatarPicker({ username, currentAvatarUrl }: AvatarPickerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function selectAvatar(avatarUrl: string | null) {
    startTransition(async () => {
      const result = await updateAvatarAction(avatarUrl);
      if (result.success) {
        router.refresh();
      }
    });
  }

  const selectedPreset = isPresetAvatarUrl(currentAvatarUrl) ? currentAvatarUrl : null;
  const usingInitials = !currentAvatarUrl;

  return (
    <section className="space-y-4 rounded-lg border bg-card p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{t("settings.avatarTitle")}</h2>
        <p className="text-sm text-muted-foreground">{t("settings.avatarDescription")}</p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border bg-muted/20 p-4">
        <UserAvatar username={username} avatarUrl={currentAvatarUrl} size="lg" />
        <div className="min-w-0">
          <p className="font-medium">@{username}</p>
          <p className="text-sm text-muted-foreground">
            {usingInitials
              ? t("settings.avatarCurrentInitials")
              : selectedPreset
                ? t("settings.avatarCurrentPreset")
                : t("settings.avatarCurrentExternal")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        <button
          type="button"
          disabled={isPending}
          onClick={() => selectAvatar(null)}
          className={cn(
            "flex aspect-square items-center justify-center rounded-full border-2 bg-primary/10 text-lg font-bold text-primary transition hover:bg-primary/15",
            usingInitials ? "border-primary ring-2 ring-primary/30" : "border-transparent"
          )}
          aria-label={t("settings.avatarUseInitials")}
          title={t("settings.avatarUseInitials")}
        >
          {username[0]?.toUpperCase()}
        </button>

        {AVATAR_PRESETS.map((preset) => {
          const isSelected = selectedPreset === preset.path;
          return (
            <button
              key={preset.id}
              type="button"
              disabled={isPending}
              onClick={() => selectAvatar(preset.path)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-full border-2 transition hover:opacity-90",
                isSelected ? "border-primary ring-2 ring-primary/30" : "border-transparent"
              )}
              aria-label={preset.id}
              aria-pressed={isSelected}
            >
              <Image
                src={preset.path}
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>

      {isPending && (
        <p className="text-sm text-muted-foreground">{t("settings.avatarSaving")}</p>
      )}
    </section>
  );
}
