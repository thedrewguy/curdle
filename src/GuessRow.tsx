import { LetterCard } from "./LetterCard";
import { Row } from "./Row";
import { Guessed, letterToCardColorMap } from "./utils/types";

export function GuessedRow(props: { guessed: Guessed }) {
  return (
    <Row>
      {props.guessed.map((guessLetter, index) => (
        <LetterCard
          letter={guessLetter.letter}
          color={letterToCardColorMap[guessLetter.color]}
          fontColor="white"
          key={index}
        />
      ))}
    </Row>
  );
}
