import { Stack } from "@mui/material";
import { LetterCard } from "./LetterCard";
import { Guess } from "./utils/types";

export function GuessRow(props: { guess: Guess }) {
  return (
    <Stack sx={{ justifyContent: "center" }} direction="row">
      {props.guess.map((guessLetter, index) => (
        <LetterCard
          letter={guessLetter.letter}
          color={"lightgreen"}
          fontColor="white"
          key={index}
        />
      ))}
    </Stack>
  );
}
