import { Letter } from "./letters";

export type LetterColor = "green" | "yellow" | "grey";
export type KeyColor = LetterColor | "lightgrey";
type GuessedLetter = { letter: Letter; color: LetterColor };
export type Guessed = GuessedLetter[];

export type CardColor =
  | "green"
  | "grey"
  | "goldenrod"
  | "white"
  | "lightgrey"
  | "black"
  | "darkred";

export const letterToCardColorMap = {
  green: "green",
  grey: "grey",
  lightgrey: "lightgrey",
  yellow: "goldenrod",
} satisfies Record<KeyColor, CardColor>;

export const cardToTextColorMap = {
  green: "white",
  grey: "white",
  goldenrod: "white",
  white: "black",
  lightgrey: "black",
  black: "white",
  darkred: "white",
} satisfies Record<CardColor, "white" | "black">;
