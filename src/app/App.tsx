import { Container, Stack } from "@mui/material";
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
    <Container maxWidth="sm">
      <Stack
        minHeight="90vh"
        direction="column"
        spacing={1}
        justifyContent="space-between"
      >
        <Header
        // bgcolor="lightskyblue"
        />
        {win && <Win numGuesses={guesseds.length} reset={clearGuesseds} />}

        <GameGrid
          guesseds={guesseds}
          entry={entry}
          win={win}
          // sx={{ backgroundColor: "lightseagreen" }}
        />
        <Keyboard
          guesseds={guesseds}
          handleKey={handleKey}
          // sx={{ backgroundColor: "lightslategrey" }}
        />
      </Stack>
    </Container>
  );
}

export default App;
