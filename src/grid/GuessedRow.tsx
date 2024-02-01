import { Guessed, letterToCardColorMap } from "../data/types";
import { LetterCard } from "./LetterCard";

export function GuessedRow(props: { guessed: Guessed }) {
  return (
    <div className="flex space-x-1 content-center">
      {props.guessed.map((guessedLetter, index) => {
        return (
          <LetterCard
            letter={guessedLetter.letter}
            color={
              // "black"
              letterToCardColorMap[guessedLetter.color]
            }
            key={index}
          />
        );
      })}
    </div>
  );
}
