import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

/** Full VyhodaDeal logo with stork — public/logo.png */
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 1024;

type LogoSize = "header" | "register" | "compact";

const sizeVariants: Record<LogoSize, string> = {
  header: "h-auto w-[11rem] sm:w-[13.5rem] md:w-[16rem] lg:w-[18rem]",
  register: "h-auto w-[13rem] sm:w-[17rem] md:w-[20rem]",
  compact: "h-auto w-36 sm:w-44",
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
