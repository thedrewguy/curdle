import { LetterCard } from "./LetterCard";
import { Row } from "./Row";
import { guessWords } from "./utils/guess-words";
import { Letter } from "./utils/letters";

export function ActiveRow(props: { letters: Letter[] }) {
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
