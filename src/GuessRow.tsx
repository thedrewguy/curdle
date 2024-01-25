import { LetterCard } from "./LetterCard";
import { Row } from "./Row";
import { Guessed, letterToCardColorMap } from "./utils/types";

export function GuessedRow(props: { guessed: Guessed }) {
  return (
    <Row>
      {props.guessed.map((guessedLetter, index) => (
        <LetterCard
          letter={guessedLetter.letter}
          color={letterToCardColorMap[guessedLetter.color]}
          fontColor="white"
          key={index}
        />
      ))}
    </Row>
  );
}
