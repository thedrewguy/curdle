import { guessWords } from "../data/guess-words";
import { Letter } from "../data/letters";
import { CardColor } from "../data/types";
import { LetterCard } from "./LetterCard";

export function EntryRow(props: { entry: Letter[] }) {
  return (
    <div className="flex space-x-1 content-center">
      {Array(5)
        .fill(undefined)
        // @ts-ignore
        .map((udf, index) => (
          <LetterCard
            letter={props.entry[index]}
            color={getColor(props.entry)}
            key={index}
          />
        ))}
    </div>
  );
}

function getColor(entry: Letter[]): CardColor {
  return guessWords.find((word) => word.startsWith(entry.join("")))
    ? "white"
    : "white-red";
}
