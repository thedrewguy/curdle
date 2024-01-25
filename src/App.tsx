import { useEffect, useState } from "react";
import "./App.css";
import { Letter, alphabet } from "./utils/letters";
import { ActiveRow } from "./ActiveRow";

function App() {
  const activeRow = useActiveRow();

  return (
    <div>
      <h1>Curdle</h1>
      <ActiveRow letters={activeRow} />
    </div>
  );
}

export default App;

function useActiveRow() {
  const [activeRow, setActiveRow] = useState<Letter[]>([]);

  function addLetter(letter: Letter) {
    setActiveRow([...activeRow, letter]);
  }

  function handleKeydown(e: KeyboardEvent) {
    const keyUpper = e.key.toUpperCase();
    if ((alphabet as any).includes(keyUpper)) {
      addLetter(keyUpper as Letter);
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
