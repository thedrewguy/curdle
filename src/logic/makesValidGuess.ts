import { Letter } from "../utils/letters";
import { guessWords } from "../utils/guess-words";

export function makesValidWord(letters: Letter[]) {
  return guessWords.includes(letters.join(""));
}
