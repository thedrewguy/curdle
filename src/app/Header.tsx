import { LetterCard } from '../grid/LetterCard';

export function Header() {
  return (
    <div className={'h-1/10 flex justify-center pb-6'}>
      <div className="flex-col">
        <div className="flex">
          <div className="w-1/2" />
          <p className="ml-2 w-1/2 text-left font-sans text-xs font-bold text-red-900">
            wor
          </p>
        </div>
        <div className="flex space-x-1">
          <LetterCard color="red" letter="C" />
          <LetterCard color="black" letter="U" />
          <LetterCard color="red" letter="R" />
          <LetterCard color="black" letter="D" />
          <LetterCard color="red" letter="L" />
          <LetterCard color="black" letter="E" />
        </div>
        <div className="flex">
          <p className="mr-2 w-1/2 text-right text-xs font-bold">sed</p>
          <div className="w-1/2" />
        </div>
      </div>
    </div>
  );
}
