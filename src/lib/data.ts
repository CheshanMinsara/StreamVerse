import { PlaceHolderImages } from './placeholder-images';

export interface Media {
  id: string;
  title: string;
  description: string;
  type: 'Movie' | 'TV Show';
  posterUrl: string;
  posterHint: string;
}

const titles = [
  "Cosmic Drift", "Cyberia", "Midnight Shadow", "Dragon's Crest",
  "Love in Paris", "Final Mission", "Giggle Grove", "The Crown's Heir",
  "The Haunting", "Vindicator", "Planet Earth III", "The Office US"
];

const descriptions = [
  "A lone astronaut gets lost in a colorful nebula, discovering a secret that could change humanity forever.",
  "In a neon-drenched future, a rogue AI threatens to unravel society. Only a cynical detective can stop it.",
  "A private investigator in the 1940s stumbles upon a conspiracy that goes all the way to the top.",
  "A young sorceress must unite warring kingdoms against a mythical beast awakened from its ancient slumber.",
  "Two strangers meet by chance in the city of lights, embarking on a whirlwind romance full of laughter and surprises.",
  "An elite soldier is betrayed by his own agency and must fight for his life against a seemingly endless wave of assassins.",
  "A cheerful group of animal friends go on whimsical adventures in a magical, ever-changing forest.",
  "The dramatic rise and fall of a powerful royal family, filled with political intrigue, betrayal, and forbidden love.",
  "A family moves into a new house only to discover it's inhabited by a malevolent spirit with a dark past.",
  "A retired superhero is forced back into action when a new supervillain threatens to destroy his city.",
  "A stunning look at the diverse ecosystems of our planet and the incredible creatures that inhabit them.",
  "A mockumentary following the daily lives of employees at a mid-sized paper company. Hilarity ensues."
];

const types: ('Movie' | 'TV Show')[] = [
  'Movie', 'TV Show', 'Movie', 'TV Show', 'Movie', 'Movie',
  'Movie', 'TV Show', 'Movie', 'Movie', 'TV Show', 'TV Show'
];

export const mediaData: Media[] = PlaceHolderImages.map((image, index) => ({
  id: image.id,
  title: titles[index % titles.length],
  description: descriptions[index % descriptions.length],
  type: types[index % types.length],
  posterUrl: image.imageUrl,
  posterHint: image.imageHint,
}));
