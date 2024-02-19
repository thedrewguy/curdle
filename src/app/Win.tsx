import { LetterCard } from '../grid/LetterCard';
import { Game } from './use-game';

export function Win(props: { game: Game }) {
  const { game } = props;
  const numGuesses = game.guesseds.length;
  const guessesColor =
    numGuesses < 5 ? 'green' : numGuesses === 5 ? 'yellow' : 'grey';
  return (
    <div className={`flex flex-col items-center space-y-1`}>
      <div className="flex items-center space-x-1">
        <p className="text-center text-2xl">You won in</p>
        <LetterCard
          color={guessesColor}
          letter={`${numGuesses}`}
          fontSize="text-base"
        />
        <p className="text-center text-2xl">guesses!</p>
      </div>
      <button onClick={game.clearGuesseds}>
        <div className="rounded-md bg-green-700">
          <p className="m-1 text-center text-white">Play Again</p>
        </div>
      </button>
    </div>
  );
}
