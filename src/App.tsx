import { useEffect, useState } from "react";
import "./App.css";
import { Letter } from "./utils/letters";
import { ActiveRow } from "./ActiveRow";

function App() {
  const [activeRow, setActiveRow] = useState<(Letter | undefined)[]>(
    Array(5).fill(undefined)
  );

  useKeyListener();

  return (
    <div>
      <h1>Curdle</h1>
      <ActiveRow letters={activeRow} />
    </div>
  );
}

export default App;

function handleKeydown(e: KeyboardEvent) {
  console.log(e.key);
}

function useKeyListener() {
  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
}
