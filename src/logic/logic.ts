import { Letter } from "../data/letters";
import { guessWords } from "../data/guess-words";
import { Guess, Guessed } from "../data/types";

export function makesValidWord(letters: Letter[]) {
  return guessWords.includes(letters.join(""));
}

export function fitsGuessed(guess: Guess, guessed: Guessed) {
  return false;
}

const guessed: Guessed = [
  { letter: "S", color: "green" },
  { letter: "P", color: "grey" },
  { letter: "E", color: "yellow" },
  { letter: "E", color: "grey" },
  { letter: "D", color: "grey" },
];

console.log(fitsGuessed(["S", "A", "U", "C", "E"], guessed));
console.log(fitsGuessed(["S", "E", "E", "K", "S"], guessed));
