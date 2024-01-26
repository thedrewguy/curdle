import { Button, Stack, Typography } from "@mui/material";

export function Win(props: { numGuesses: number; reset: () => void }) {
  return (
    <Stack justifyContent="center" direction="column">
      <Typography variant="h2" textAlign="center">
        You win!
      </Typography>
      <Typography variant="h3" textAlign="center">
        {`${props.numGuesses} guesses`}
      </Typography>
      <Button variant="contained" onClick={props.reset}>
        Play again
      </Button>
    </Stack>
  );
}