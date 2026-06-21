export const VYHODA_DEAL_TEAM_LABEL = "VyhodaDeal Team";

const TEAM_USERNAMES = new Set(["martin83", "dealmaster", "admin", "vyhodadeal team"]);

export function isVyhodaDealTeamAuthor(username: string | null | undefined): boolean {
  if (!username) return false;
  const normalized = username.trim().toLowerCase();
  return (
    normalized === VYHODA_DEAL_TEAM_LABEL.toLowerCase() || TEAM_USERNAMES.has(normalized)
  );
}

export function getDealAuthorDisplayName(username: string | null | undefined): string {
  if (!username || isVyhodaDealTeamAuthor(username)) {
    return VYHODA_DEAL_TEAM_LABEL;
  }
  return username;
}
