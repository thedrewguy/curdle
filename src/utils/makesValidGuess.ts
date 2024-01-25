import { Letter } from "./letters";
import { guessWords } from "./guess-words";

export function makesValidWord(letters: Letter[]) {
  return guessWords.includes(letters.join(""));
}
