export type SlideColumn = {
  heading: string;
  items: string[];
};

export type Slide = {
  kicker: string;
  title: string;
  body?: string;
  points?: string[];
  columns?: SlideColumn[];
  punch?: string;
  layout?: "title" | "default";
};

export type TrainingTrack = "peer-basics" | "train-the-trainer";

export type Module = {
  id: string;
  slug: string;
  track: TrainingTrack;
  title: string;
  subtitle: string;
  order: number;
  estimateMinutes: number;
  slides: Slide[];
};
