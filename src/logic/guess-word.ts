import { Letter } from "../data/letters";
import { Guess, Guessed as Guessed } from "../data/types";

export function guessWord(guess: Guess, guesseds: Guessed[]) {
  return guess.map((l) => ({
    letter: l,
    color: "green",
  })) as Guessed;
}
