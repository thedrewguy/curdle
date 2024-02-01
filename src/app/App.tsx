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
    <div className="h-screen flex justify-center ">
      <div className="flex flex-col h-full sm:h-[90vh] w-full max-w-[430px]">
        <Header />
        <div className="flex flex-col items-center justify-between h-full">
          <GameGrid guesseds={guesseds} entry={entry} win={win} />
          {win && <Win numGuesses={guesseds.length} reset={clearGuesseds} />}
          <Keyboard guesseds={guesseds} handleKey={handleKey} />
        </div>
      </div>
      <dialog className="backdrop-grayscale-0 ">hi</dialog>
    </div>
  );
}

export default App;
