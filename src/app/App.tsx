import { Box, Container, Stack, Typography } from "@mui/material";
import { EntryRow } from "../grid/EntryRow";
import { GuessedRow } from "../grid/GuessedRow";
import { Keyboard } from "../keyboard/Keyboard";
import { Win } from "./Win";
import { useGame } from "./use-game";
import { useKeyDownListener } from "./use-keydown-listener";

function App() {
  const { entry, guesseds, win, clearGuesseds, handleKey } = useGame();
  useKeyDownListener(handleKey);

  return (
    <Container maxWidth="sm">
      <Stack direction="column" spacing={1} justifyContent="space-between">
        <Box minHeight="20vh">
          <Typography variant="h3" textAlign="center">
            Curdle
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            (Cursed Wordle)
          </Typography>
          {win && <Win numGuesses={guesseds.length} reset={clearGuesseds} />}
        </Box>
        <Stack spacing={1} minHeight="50vh">
          {guesseds.map((guessed, index) => (
            <GuessedRow guessed={guessed} key={index} />
          ))}
          {!win && <EntryRow entry={entry} />}
        </Stack>
        <Keyboard guesseds={guesseds} handleKey={handleKey} />
      </Stack>
    </Container>
  );
}

export default App;
