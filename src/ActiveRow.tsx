import { Stack } from "@mui/material";
import { LetterCard } from "./LetterCard";
import { guessWords } from "./utils/guess-words";
import { Letter } from "./utils/letters";

export function ActiveRow(props: { letters: Letter[] }) {
  return (
    <Stack sx={{ justifyContent: "center" }} direction={"row"}>
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
  return guessWords.find((word) => word.startsWith(letters.join("")))
    ? "black"
    : "red";
}
