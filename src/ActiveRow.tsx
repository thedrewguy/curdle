import { Stack } from "@mui/material";
import { LetterCard } from "./LetterCard";
import { Letter } from "./utils/letters";
import { makesValidWord } from "./utils/makesValidGuess";

export function ActiveRow(props: { letters: Letter[] }) {
  return (
    <Stack direction={"row"}>
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
    </Stack>
  );
}

function getFontColor(letters: Letter[]) {
  if (letters.length < 5) {
    return "black";
  }
  return makesValidWord(letters) ? "black" : "red";
}
