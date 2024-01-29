import { Letter, alphabet } from "../data/letters";

export function countLetters(guess: Letter[]) {
  return Object.fromEntries(
    alphabet.map((letter) => [letter, guess.filter((l) => l === letter).length])
  ) as Record<Letter, number>;
}
