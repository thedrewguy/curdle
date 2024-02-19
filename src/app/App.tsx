import { GameGrid } from '../grid/GameGrid';
import { Keyboard } from '../keyboard/Keyboard';
import { Header } from './Header';
import { Win } from './Win';
import { useGame } from './use-game';
import { useKeyDownListener } from './use-keydown-listener';

function App() {
  const {
    entry,
    guesseds,
    win,
    hardMode,
    toggleHardMode,
    undo,
    redo,
    clearGuesseds,
    handleKey,
  } = useGame();

  useKeyDownListener(handleKey);

  return (
    <div className="flex h-[100vh] justify-center">
      <div className="flex h-[100dvh] w-full max-w-[430px] flex-col sm:h-[90dvh]">
        <Header
          hardMode={hardMode}
          toggleHardMode={toggleHardMode}
          gameInProgress={guesseds.length > 0}
          undo={undo}
          redo={redo}
        />
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
