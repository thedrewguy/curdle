import { LetterCard } from "../grid/LetterCard";

export function Header() {
  return (
    <div className={"flex justify-center pb-6 h-1/10"}>
      <div className="flex-col">
        <div className="flex">
          <div className="w-1/2" />
          <p className="font-sans text-left text-xs font-bold text-red-900 w-1/2 ml-2">
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
          <p className="w-1/2 text-xs text-right font-bold mr-2">sed</p>
          <div className="w-1/2" />
        </div>
      </div>
    </div>
  );
}
