export type AvatarPreset = {
  id: string;
  path: `/avatars/${string}.svg`;
  emoji: string;
  bg: string;
};

export const AVATAR_PRESETS: AvatarPreset[] = [
  { id: "fox", path: "/avatars/fox.svg", emoji: "🦊", bg: "#FF9F43" },
  { id: "bear", path: "/avatars/bear.svg", emoji: "🐻", bg: "#A66B4F" },
  { id: "cat", path: "/avatars/cat.svg", emoji: "🐱", bg: "#9B59B6" },
  { id: "dog", path: "/avatars/dog.svg", emoji: "🐶", bg: "#3498DB" },
  { id: "owl", path: "/avatars/owl.svg", emoji: "🦉", bg: "#16A085" },
  { id: "panda", path: "/avatars/panda.svg", emoji: "🐼", bg: "#7F8C8D" },
  { id: "tiger", path: "/avatars/tiger.svg", emoji: "🐯", bg: "#F39C12" },
  { id: "lion", path: "/avatars/lion.svg", emoji: "🦁", bg: "#E67E22" },
  { id: "frog", path: "/avatars/frog.svg", emoji: "🐸", bg: "#27AE60" },
  { id: "unicorn", path: "/avatars/unicorn.svg", emoji: "🦄", bg: "#E056FD" },
  { id: "robot", path: "/avatars/robot.svg", emoji: "🤖", bg: "#576574" },
  { id: "rocket", path: "/avatars/rocket.svg", emoji: "🚀", bg: "#4834D4" },
];

const ALLOWED_PATHS = new Set(AVATAR_PRESETS.map((preset) => preset.path));

export function isPresetAvatarUrl(url: string | null | undefined): url is AvatarPreset["path"] {
  return !!url && ALLOWED_PATHS.has(url as AvatarPreset["path"]);
}

export function isAllowedAvatarUrl(url: string | null): boolean {
  if (url === null) return true;
  return isPresetAvatarUrl(url);
}
