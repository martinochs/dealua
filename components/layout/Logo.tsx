import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

type LogoSize = "header" | "register" | "compact";

const sizeVariants: Record<LogoSize, string> = {
  header: "h-auto w-[13.5rem] sm:w-[16rem] md:w-[18.5rem]",
  register: "h-auto w-[15rem] sm:w-[19rem] md:w-[22rem]",
  compact: "h-auto w-40 sm:w-44",
};

interface LogoProps {
  className?: string;
  size?: LogoSize;
  link?: boolean;
  priority?: boolean;
  /** Hidden by default — show explicitly on pages like register */
  showTagline?: boolean;
}

export function Logo({
  className,
  size = "header",
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
        className={sizeVariants[size]}
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
