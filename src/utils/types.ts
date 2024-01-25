import { Letter } from "./letters";

export type LetterColor = "green" | "yellow" | "grey";
type GuessedLetter = { letter: Letter; color: LetterColor };
export type Guessed = [
  GuessedLetter,
  GuessedLetter,
  GuessedLetter,
  GuessedLetter,
  GuessedLetter
];

export type LetterCardColor = "green" | "grey" | "goldenrod" | "white";

export const letterToCardColorMap = {
  green: "green",
  grey: "grey",
  yellow: "goldenrod",
} satisfies Record<LetterColor, LetterCardColor>;
