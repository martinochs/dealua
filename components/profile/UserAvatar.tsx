import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  username: string;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-9 w-9 text-sm",
  md: "h-11 w-11 text-lg",
  lg: "h-16 w-16 text-xl sm:h-20 sm:w-20 sm:text-2xl",
} as const;

export function UserAvatar({ username, avatarUrl, size = "md", className }: UserAvatarProps) {
  const initial = username[0]?.toUpperCase() ?? "?";
  const sizeClass = sizeClasses[size];

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={username}
        width={80}
        height={80}
        className={cn("rounded-full object-cover", sizeClass, className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary",
        sizeClass,
        className
      )}
      aria-hidden={false}
    >
      <span aria-label={username}>{initial}</span>
    </div>
  );
}
