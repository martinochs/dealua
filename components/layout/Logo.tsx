import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

/** VyhodaDeal fox logo — public/logo.png (includes tagline) */
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 298;

type LogoSize = "header" | "register" | "compact";

const sizeVariants: Record<LogoSize, string> = {
  header: "h-auto w-[12.5rem] sm:w-[15.5rem] md:w-[18rem] lg:w-[20rem]",
  register: "h-auto w-[14rem] sm:w-[18rem] md:w-[22rem]",
  compact: "h-auto w-40 sm:w-48",
};

interface LogoProps {
  className?: string;
  size?: LogoSize;
  link?: boolean;
  priority?: boolean;
  /** Tagline is baked into logo.png — prop kept for optional extra line below */
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
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className={cn(sizeVariants[size], "object-contain object-left")}
        priority={priority}
        unoptimized
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
    <Link href="/" className="block shrink-0 transition-opacity hover:opacity-90 active:opacity-80">
      {content}
    </Link>
  );
}
