import { Stack } from "@mui/material";
import { LetterCard } from "./LetterCard";
import { Letter } from "./utils/letters";

export function ActiveRow(props: { letters: (Letter | undefined)[] }) {
  return (
    <Stack direction={"row"}>
      {props.letters.map((letter, index) => (
        <LetterCard letter={letter} color="white" key={index} />
      ))}
    </Stack>
  );
}
