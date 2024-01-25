import { LetterCard } from "./LetterCard";
import { Row } from "./Row";
import { guessWords } from "./data/guess-words";
import { Letter } from "./data/letters";

export function Guess(props: { letters: Letter[] }) {
  return (
    <Row>
      {Array(5)
        .fill(undefined)
        .map((udf, index) => (
          <LetterCard
            letter={props.letters[index]}
            color="white"
            fontColor={getFontColor(props.letters)}
            key={index}
          />
        ))}
    </Row>
  );
}

function getFontColor(letters: Letter[]) {
  return guessWords.find((word) => word.startsWith(letters.join("")))
    ? "black"
    : "red";
}
