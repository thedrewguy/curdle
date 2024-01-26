import { LetterCard } from "./LetterCard";
import { Row } from "./Row";
import { guessWords } from "../data/guess-words";
import { Letter } from "../data/letters";

export function EntryRow(props: { entry: Letter[] }) {
  return (
    <Row>
      {Array(5)
        .fill(undefined)
        .map((udf, index) => (
          <LetterCard
            letter={props.entry[index]}
            color="white"
            fontColor={getFontColor(props.entry)}
            key={index}
          />
        ))}
    </Row>
  );
}

function getFontColor(entry: Letter[]) {
  return guessWords.find((word) => word.startsWith(entry.join("")))
    ? "black"
    : "red";
}
