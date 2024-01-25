import { LetterCard } from "./LetterCard";
import { Row } from "./Row";
import { Guess, letterToCardColorMap } from "./utils/types";

export function GuessRow(props: { guess: Guess }) {
  return (
    <Row>
      {props.guess.map((guessLetter, index) => (
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
