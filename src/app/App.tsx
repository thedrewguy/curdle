import { GameGrid } from '../grid/GameGrid';
import { Keyboard } from '../keyboard/Keyboard';
import { Header } from './Header';
import { Win } from './Win';
import { useGame } from './use-game';
import { useKeyDownListener } from './use-keydown-listener';

function App() {
  const { entry, guesseds, win, clearGuesseds, handleKey } = useGame();
  useKeyDownListener(handleKey);

  return (
    <div className="flex h-full justify-center">
      <div className="h-game fixed flex w-full max-w-[430px] flex-col">
        <Header />
        <div className="flex h-full flex-col items-center justify-between">
          <GameGrid guesseds={guesseds} entry={entry} win={win} />
          {win && <Win numGuesses={guesseds.length} reset={clearGuesseds} />}
          <Keyboard guesseds={guesseds} handleKey={handleKey} />
        </div>
      </div>
    </div>
  );
}

export default App;
