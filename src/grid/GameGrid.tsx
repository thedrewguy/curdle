import { Letter } from '../data/letters';
import { Guessed } from '../data/types';
import { EntryRow } from './EntryRow';
import { GuessedRow } from './GuessedRow';

export function GameGrid(props: {
  guesseds: Guessed[];
  entry: Letter[];
  win: boolean;
}) {
  const { guesseds, entry, win } = props;
  const numSkeletons = 6 - guesseds.length - (win ? 0 : 1);

  return (
    <div className="flex flex-col space-y-1 p-2">
      {guesseds.map((guessed, index) => (
        <GuessedRow guessed={guessed} key={index} />
      ))}
      {!win && <EntryRow entry={entry} />}
      {numSkeletons > 0 &&
        Array(numSkeletons)
          .fill(undefined)
          // @ts-ignore
          .map((udf, index) => <EntryRow key={index} entry={[]} />)}
    </div>
  );
}
