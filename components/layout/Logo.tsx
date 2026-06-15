import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  heightClass?: string;
  link?: boolean;
  priority?: boolean;
  showTagline?: boolean;
}

export function Logo({
  className,
  heightClass = "h-8 sm:h-9",
  link = true,
  priority = false,
  showTagline = true,
}: LogoProps) {
  const content = (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <Image
        src="/logo.png"
        alt={t("site.name")}
        width={200}
        height={56}
        className={cn("w-auto max-w-[9.5rem] sm:max-w-[11rem]", heightClass)}
        priority={priority}
      />
      {showTagline && (
        <span className="text-[10px] font-medium text-muted-foreground/80 sm:text-[11px]">
          {t("site.tagline")}
        </span>
      )}
    </div>
  );

  if (!link) return content;

  return (
    <Link href="/" className="shrink-0 transition-opacity hover:opacity-90 active:opacity-80">
      {content}
    </Link>
  );
}
