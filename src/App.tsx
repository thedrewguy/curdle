import { Stack, Typography } from "@mui/material";
import { EntryRow } from "./EntryRow";
import { GuessedRow } from "./GuessedRow";
import { Keyboard } from "./Keyboard";
import { Win } from "./Win";
import { useGame, useKeyDownListener } from "./game-hooks";

function App() {
  const { entry, guesseds, win, clearGuesseds, handleKey } = useGame();
  useKeyDownListener(handleKey);

  return (
    <div>
      <Typography variant="h3" textAlign="center">
        Curdle
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        (Cursed Wordle)
      </Typography>
      {win && <Win numGuesses={guesseds.length} reset={clearGuesseds} />}
      <br />
      <Stack spacing={1}>
        {guesseds.map((guessed, index) => (
          <GuessedRow guessed={guessed} key={index} />
        ))}
        {!win && <EntryRow entry={entry} />}
      </Stack>
      <br />
      <Keyboard guesseds={guesseds} handleKey={handleKey} />
    </div>
  );
}

export default App;
