export type ResourceCategory =
  | "knowledge"
  | "testing"
  | "integration"
  | "crisis"
  | "community";

export type ResourceLink = {
  id: string;
  title: string;
  url: string;
  category: ResourceCategory;
  blurb: string;
};

export const resources: ResourceLink[] = [
  {
    id: "dose-wiki",
    title: "dose.wiki",
    url: "https://dose.wiki",
    category: "knowledge",
    blurb:
      "Community-maintained substance information. Use as a starting point for research — not as medical advice.",
  },
  {
    id: "psychonautwiki",
    title: "PsychonautWiki",
    url: "https://psychonautwiki.org",
    category: "knowledge",
    blurb:
      "Encyclopedia-style effects, interactions, and harm-reduction notes. Cross-check sources.",
  },
  {
    id: "tripsit",
    title: "TripSit",
    url: "https://tripsit.me",
    category: "community",
    blurb:
      "Long-running online peer support and factsheets. Useful when you need live chat culture and combo charts.",
  },
  {
    id: "dancesafe",
    title: "DanceSafe",
    url: "https://dancesafe.org",
    category: "testing",
    blurb:
      "Education and reagent testing advocacy. Strong primer on why testing matters and how kits work at a high level.",
  },
  {
    id: "reagent-kits",
    title: "Reagent test kits (shop)",
    url: "/shop#test-kit",
    category: "testing",
    blurb:
      "We stock a starter reagent kit for personal harm reduction. Kits do not guarantee purity or safety.",
  },
  {
    id: "maps-integration",
    title: "MAPS — integration resources",
    url: "https://maps.org",
    category: "integration",
    blurb:
      "Research and education org with materials on psychedelic contexts. Useful backdrop for post-experience integration.",
  },
  {
    id: "creative-integration",
    title: "Creative integration hub",
    url: "/integration",
    category: "integration",
    blurb:
      "Share image, text, or video that helped you metabolize an experience — art as aftercare.",
  },
  {
    id: "iasp",
    title: "IASP suicide prevention resources",
    url: "https://www.iasp.info/suicidalthoughts/",
    category: "crisis",
    blurb:
      "Localized crisis resources. If you or someone else is in immediate danger, call local emergency services.",
  },
  {
    id: "findahelpline",
    title: "Find A Helpline",
    url: "https://findahelpline.com",
    category: "crisis",
    blurb:
      "Directory of emotional support helplines by country. Bookmark before you need it.",
  },
];

export const categoryLabels: Record<ResourceCategory, string> = {
  knowledge: "Knowledge",
  testing: "Testing",
  integration: "Integration",
  crisis: "Crisis",
  community: "Community",
};
