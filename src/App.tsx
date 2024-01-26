import { Box, Stack, Typography, alpha } from "@mui/material";
import { useEffect, useState } from "react";
import { EntryRow } from "./EntryRow";
import { GuessedRow } from "./GuessedRow";
import { Letter, alphabet } from "./data/letters";
import { Guessed } from "./data/types";
import { colorGuess, makesValidWord } from "./logic/logic";
import { Keyboard } from "./Keyboard";

function App() {
  const [entry, guesseds] = useGame();

  return (
    <div>
      <Typography variant="h3" textAlign="center">
        Curdle
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        (Cursed Wordle)
      </Typography>
      <br />
      <Stack spacing={1}>
        {guesseds.map((guessed, index) => (
          <GuessedRow guessed={guessed} key={index} />
        ))}
        <EntryRow entry={entry} />
      </Stack>
      <br />
      <Stack spacing={1}>
        <Keyboard guesseds={guesseds} />
      </Stack>
    </div>
  );
}

export default App;

function useGame() {
  const [entry, addLetter, removeLetter, clearEntry] = useEntry();
  const [guesseds, addGuessed] = useGuesseds();

  function handleKeydown(e: KeyboardEvent) {
    const keyUpper = e.key.toUpperCase();
    if ((alphabet as any).includes(keyUpper)) {
      addLetter(keyUpper as Letter);
    }
    if (e.key === "Backspace") {
      removeLetter();
    }
    if (e.key === "Enter" && makesValidWord(entry)) {
      const guessed = colorGuess(entry, guesseds);
      addGuessed(guessed);
      clearEntry();
    }
  }

  useKeyDown(handleKeydown);

  return [entry, guesseds] as [typeof entry, typeof guesseds];
}

function useKeyDown(handleKeydown: (e: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
}

function useGuesseds() {
  const [guesseds, setGuesseds] = useState<Guessed[]>([]);

  function addGuessed(guessed: Guessed) {
    setGuesseds([...guesseds, guessed]);
  }

  return [guesseds, addGuessed] as [typeof guesseds, typeof addGuessed];
}

function useEntry() {
  const [entry, setEntry] = useState<Letter[]>([]);
  function addLetter(letter: Letter) {
    if (entry.length < 5) setEntry([...entry, letter]);
  }

  function removeLetter() {
    setEntry(entry.slice(0, entry.length - 1));
  }

  function clearEntry() {
    setEntry([]);
  }

  return [entry, addLetter, removeLetter, clearEntry] as [
    typeof entry,
    typeof addLetter,
    typeof removeLetter,
    typeof clearEntry
  ];
}
