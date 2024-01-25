import { useState } from "react";
import "./App.css";
import { Stack } from "@mui/material";
import { LetterCard } from "./LetterCard";
import { Letter } from "./utils/letters";

function App() {
  const [activeRow, setActiveRow] = useState<(Letter | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  return (
    <>
      <h1>Curdle</h1>
      <ActiveRow letters={activeRow} />
    </>
  );
}

export default App;

function ActiveRow(props: { letters: (Letter | undefined)[] }) {
  return (
    <Stack direction={"row"}>
      {props.letters.map((letter, index) => (
        <LetterCard letter={letter} color="white" key={index} />
      ))}
    </Stack>
  );
}
