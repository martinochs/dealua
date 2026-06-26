import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  heightClass?: string;
  link?: boolean;
  priority?: boolean;
  /** Hidden by default — show explicitly on pages like register */
  showTagline?: boolean;
}

export function Logo({
  className,
  heightClass = "h-12 sm:h-14 md:h-16",
  link = true,
  priority = false,
  showTagline = false,
}: LogoProps) {
  const content = (
    <div className={cn("flex flex-col", className)}>
      <Image
        src="/logo.png"
        alt={t("site.name")}
        width={480}
        height={120}
        className={cn("w-auto max-w-[15rem] sm:max-w-[18rem] md:max-w-[21rem]", heightClass)}
        priority={priority}
      />
      {showTagline && (
        <span className="mt-0.5 text-[10px] font-medium text-muted-foreground/80 sm:text-[11px]">
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
