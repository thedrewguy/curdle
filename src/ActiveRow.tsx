import { Stack } from "@mui/material";
import { LetterCard } from "./LetterCard";
import { Letter } from "./utils/letters";

export function ActiveRow(props: { letters: Letter[] }) {
  return (
    <Stack direction={"row"}>
      {Array(5)
        .fill(undefined)
        .map((udf, index) => (
          <LetterCard letter={props.letters[index]} color="white" key={index} />
        ))}
    </Stack>
  );
}
