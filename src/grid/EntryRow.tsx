import { guessWords } from "../data/guess-words";
import { Letter } from "../data/letters";
import { LetterCard } from "./LetterCard";
import { Row } from "./Row";

export function EntryRow(props: { entry: Letter[] }) {
  return (
    <Row>
      {Array(5)
        .fill(undefined)
        // @ts-ignore
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
    : "crimson";
}
