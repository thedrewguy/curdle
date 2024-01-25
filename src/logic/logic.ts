import { Letter } from "../data/letters";
import { guessWords } from "../data/guess-words";
import { Guessed } from "../data/types";

export function makesValidWord(letters: Letter[]) {
  return guessWords.includes(letters.join(""));
}

export function fitsGuessed(word: string, guessed: Guessed) {
  const letters = word.split("");
  return false;
}

const guessed: Guessed = [
  { letter: "S", color: "green" },
  { letter: "P", color: "grey" },
  { letter: "E", color: "yellow" },
  { letter: "E", color: "grey" },
  { letter: "D", color: "grey" },
];
console.log(fitsGuessed("SAUCE", guessed));
console.log(fitsGuessed("SEEKS", guessed));
