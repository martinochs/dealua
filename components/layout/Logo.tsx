import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  heightClass?: string;
  link?: boolean;
  priority?: boolean;
}

export function Logo({
  className,
  heightClass = "h-9 sm:h-10",
  link = true,
  priority = false,
}: LogoProps) {
  const image = (
    <Image
      src="/logo.png"
      alt={t("site.name")}
      width={220}
      height={64}
      className={cn("w-auto max-w-[11rem] sm:max-w-[13rem]", heightClass, className)}
      priority={priority}
    />
  );

  if (!link) return image;

  return (
    <Link href="/" className="shrink-0 transition-opacity hover:opacity-90 active:opacity-80">
      {image}
    </Link>
  );
}
