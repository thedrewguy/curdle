import { LetterCard } from "../grid/LetterCard";

export function Win(props: { numGuesses: number; reset: () => void }) {
  const guessesColor =
    props.numGuesses < 5 ? "green" : props.numGuesses === 5 ? "yellow" : "grey";
  return (
    <div className={`flex flex-col items-center space-y-1`}>
      <div className="flex items-center space-x-1">
        <p className="text-center text-2xl">You won in</p>
        <LetterCard
          color={guessesColor}
          letter={`${props.numGuesses}`}
          fontSize="text-base"
        />
        <p className="text-center text-2xl">guesses!</p>
      </div>
      <button onClick={props.reset}>
        <div className="bg-green-700 rounded-md">
          <p className="text-center text-white m-1">Play Again</p>
        </div>
      </button>
    </div>
  );
}
