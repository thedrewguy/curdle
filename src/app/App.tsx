import { Box, Stack } from "@mui/material";
import { GameGrid } from "../grid/GameGrid";
import { Keyboard } from "../keyboard/Keyboard";
import { Header } from "./Header";
import { Win } from "./Win";
import { useGame } from "./use-game";
import { useKeyDownListener } from "./use-keydown-listener";

function App() {
  const { entry, guesseds, win, clearGuesseds, handleKey } = useGame();
  useKeyDownListener(handleKey);

  return (
    <Box height="90vh" display="flex" flexDirection="column">
      <Header paddingBottom="24px" height="20%" />

      <Stack justifyContent="space-between" height="100%">
        <Stack>
          <GameGrid padding="8px" guesseds={guesseds} entry={entry} win={win} />
          {win && (
            <Win
              padding="8px"
              numGuesses={guesseds.length}
              reset={clearGuesseds}
            />
          )}
        </Stack>
        <Keyboard padding="8px" guesseds={guesseds} handleKey={handleKey} />
      </Stack>
    </Box>
  );
}

export default App;
