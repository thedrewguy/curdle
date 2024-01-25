import { Letter } from "./letters";

export type LetterColor = "green" | "yellow" | "grey";
type GuessLetter = { letter: Letter; color: LetterColor };
export type Guess = [
  GuessLetter,
  GuessLetter,
  GuessLetter,
  GuessLetter,
  GuessLetter
];

export type LetterCardColor = "green" | "grey" | "goldenrod" | "white";

export const letterToCardColorMap = {
  green: "green",
  grey: "grey",
  yellow: "goldenrod",
} satisfies Record<LetterColor, LetterCardColor>;
