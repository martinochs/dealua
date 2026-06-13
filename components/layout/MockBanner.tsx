"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const DISMISS_KEY = "dealua-mock-banner-dismissed";

export function MockBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(DISMISS_KEY) !== "1");
  }, []);

  if (!visible) return null;

  return (
    <div className="relative border-b border-amber-200/80 bg-amber-50 px-4 py-1 text-center text-[11px] text-amber-900">
      <span>🧪 Демо-режим — дані в пам&apos;яті до перезапуску сервера</span>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem(DISMISS_KEY, "1");
          setVisible(false);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-amber-100"
        aria-label="Закрити"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
