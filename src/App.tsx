import { useEffect, useState } from "react";
import "./App.css";
import { Letter, alphabet } from "./utils/letters";
import { ActiveRow } from "./ActiveRow";
import { makesValidWord } from "./utils/makesValidGuess";
import { Guess } from "./utils/types";
import { GuessRow } from "./GuessRow";

function App() {
  const [guesses, setGuessRows] = useState<Guess[]>([
    [
      { letter: "S", color: "green" },
      { letter: "N", color: "yellow" },
      { letter: "A", color: "grey" },
      { letter: "C", color: "green" },
      { letter: "K", color: "green" },
    ],
  ]);
  const activeRow = useActiveRow();

  return (
    <div>
      <h1>Curdle</h1>
      {guesses.map((guess) => (
        <GuessRow guess={guess} />
      ))}
      <ActiveRow letters={activeRow} />
    </div>
  );
}

export default App;

function useActiveRow() {
  const [activeRow, setActiveRow] = useState<Letter[]>([]);

  function addLetter(letter: Letter) {
    if (activeRow.length < 5) setActiveRow([...activeRow, letter]);
  }

  function removeLetter() {
    setActiveRow(activeRow.slice(0, activeRow.length - 1));
  }

  function handleKeydown(e: KeyboardEvent) {
    const keyUpper = e.key.toUpperCase();
    if ((alphabet as any).includes(keyUpper)) {
      addLetter(keyUpper as Letter);
    }
    if (e.key === "Backspace") {
      removeLetter();
    }
    if (e.key === "Enter") {
      if (makesValidWord(activeRow)) {
        console.log("guessed");
      }
    }
  }

  useKeyDown(handleKeydown);

  return activeRow;
}

function useKeyDown(handleKeydown: (e: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
}
