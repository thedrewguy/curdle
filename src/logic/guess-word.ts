import { Letter } from "../data/letters";
import { Guessed as Guessed } from "../data/types";

export function guessWord(guess: Letter[], guesseds: Guessed[]) {
  return guess.map((l) => ({
    letter: l,
    color: "green",
  })) as Guessed;
}
