import { Letter } from "../data/letters";
import { guessWords } from "../data/guess-words";

export function makesValidWord(letters: Letter[]) {
  return guessWords.includes(letters.join(""));
}
