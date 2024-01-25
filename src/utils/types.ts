import { Letter } from "./letters";

type Color = "green" | "yellow" | "grey";
type GuessLetter = { letter: Letter; color: Color };
export type Guess = [
  GuessLetter,
  GuessLetter,
  GuessLetter,
  GuessLetter,
  GuessLetter
];
