import { ButtonBase, Card, Stack, StackProps, Typography } from "@mui/material";
import { LetterCard } from "../grid/LetterCard";

export function Win(
  props: StackProps & { numGuesses: number; reset: () => void }
) {
  const { numGuesses, reset, ...stackProps } = props;
  const guessesColor =
    numGuesses < 5 ? "green" : numGuesses === 5 ? "goldenrod" : "grey";
  return (
    <Stack {...stackProps} alignItems="center" spacing={1}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography textAlign="center" fontSize="1.75rem">
          You won in
        </Typography>
        <LetterCard
          color={guessesColor}
          letter={`${numGuesses}`}
          fontSize="1rem"
        />
        <Typography textAlign="center" fontSize="1.75rem">
          guesses
        </Typography>
      </Stack>
      <ButtonBase onClick={props.reset}>
        <Card sx={{ bgcolor: "green" }}>
          <Typography margin="4px" color="white">
            Play Again?
          </Typography>
        </Card>
      </ButtonBase>
    </Stack>
  );
}
