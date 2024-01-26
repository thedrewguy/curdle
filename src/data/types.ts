import { Letter } from "./letters";

export type LetterColor = "green" | "yellow" | "grey";
export type KeyColor = Letter | "lightgrey";
type GuessedLetter = { letter: Letter; color: LetterColor };
export type Guess = Letter[];
export type Guessed = GuessedLetter[];

export type LetterCardColor = "green" | "grey" | "goldenrod" | "white";

export const letterToCardColorMap = {
  green: "green",
  grey: "grey",
  yellow: "goldenrod",
} satisfies Record<LetterColor, LetterCardColor>;
