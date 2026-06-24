const MORE_OFFERS_MARKER = /🔥?\s*Ще пропозиції:\s*\n/i;
const OFFER_LINE = /^•\s*(.+?)\s→\s*(https:\S+)\s*$/;

export interface DealMoreOffer {
  label: string;
  url: string;
}

export interface ParsedDealDescription {
  intro: string;
  moreOffers: DealMoreOffer[];
}

export function parseDealDescription(description: string): ParsedDealDescription {
  const match = description.match(MORE_OFFERS_MARKER);
  if (!match || match.index === undefined) {
    return { intro: description.trim(), moreOffers: [] };
  }

  const intro = description.slice(0, match.index).trim();
  const rest = description.slice(match.index + match[0].length);
  const moreOffers: DealMoreOffer[] = [];

  for (const line of rest.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("•")) continue;

    const offerMatch = trimmed.match(OFFER_LINE);
    if (offerMatch) {
      moreOffers.push({ label: offerMatch[1].trim(), url: offerMatch[2].trim() });
    }
  }

  return { intro, moreOffers };
}

export function splitDescriptionParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export interface TextSegment {
  type: "text" | "link";
  value: string;
  href?: string;
}

const MARKDOWN_LINK = /\[([^\]]+)\]\((https:\/\/[^)]+)\)/;
const PLAIN_URL = /(https:\/\/[^\s)]+)/;

export function segmentTextWithLinks(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    const markdownIndex = remaining.search(/\[/);
    const urlIndex = remaining.search(/https:\/\//);
    const nextSpecial =
      markdownIndex === -1
        ? urlIndex
        : urlIndex === -1
          ? markdownIndex
          : Math.min(markdownIndex, urlIndex);

    if (nextSpecial === -1) {
      segments.push({ type: "text", value: remaining });
      break;
    }

    if (nextSpecial > 0) {
      segments.push({ type: "text", value: remaining.slice(0, nextSpecial) });
      remaining = remaining.slice(nextSpecial);
      continue;
    }

    const markdownMatch = remaining.match(MARKDOWN_LINK);
    if (markdownMatch && markdownMatch.index === 0) {
      segments.push({ type: "link", value: markdownMatch[1], href: markdownMatch[2] });
      remaining = remaining.slice(markdownMatch[0].length);
      continue;
    }

    const urlMatch = remaining.match(PLAIN_URL);
    if (urlMatch && urlMatch.index === 0) {
      segments.push({ type: "link", value: urlMatch[0], href: urlMatch[0] });
      remaining = remaining.slice(urlMatch[0].length);
      continue;
    }

    segments.push({ type: "text", value: remaining[0] });
    remaining = remaining.slice(1);
  }

  return segments;
}
