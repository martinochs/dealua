"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteAccountAction, type DeleteAccountResult } from "@/lib/actions/delete-account";
import { t } from "@/lib/i18n/uk";

interface DeleteAccountFormProps {
  username: string;
}

export function DeleteAccountForm({ username }: DeleteAccountFormProps) {
  const [state, formAction, isPending] = useActionState<DeleteAccountResult, FormData>(
    async (_prev, formData) => deleteAccountAction(formData),
    {}
  );

  return (
    <form action={formAction} className="space-y-4">
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div className="space-y-2">
        <Label htmlFor="confirmation">{t("settings.deleteAccountConfirmLabel")}</Label>
        <Input
          id="confirmation"
          name="confirmation"
          type="text"
          required
          autoComplete="off"
          placeholder={username}
          className="max-w-sm"
        />
        <p className="text-xs text-muted-foreground">
          {t("settings.deleteAccountConfirmHint").replace("{username}", username)}
        </p>
      </div>

      <Button type="submit" variant="destructive" disabled={isPending}>
        {t("settings.deleteAccountButton")}
      </Button>
    </form>
  );
}
