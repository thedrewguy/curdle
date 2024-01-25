import { useState } from "react";
import "./App.css";
import { Stack } from "@mui/material";
import { LetterCard } from "./LetterCard";

function App() {
  const [guessRow, setGuessRow] = useState<string[]>(["", "", "", "", "", ""]);

  return (
    <>
      <h1>Curdle</h1>
      <Stack direction={"row"}>
        {guessRow.map((letter, index) => (
          <LetterCard letter={letter} color="white" key={index} />
        ))}
      </Stack>
    </>
  );
}

export default App;
