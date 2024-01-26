import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { EntryRow } from "./EntryRow";
import { GuessedRow } from "./GuessedRow";
import { Keyboard } from "./Keyboard";
import { Win } from "./Win";
import { Letter, alphabet } from "./data/letters";
import { Guessed } from "./data/types";
import { colorGuess, makesValidWord } from "./logic/logic";

function App() {
  const { entry, guesseds, win, clearGuesseds, handleKey } = useGame();
  useKeyDownListener(handleKey);

  return (
    <div>
      <Typography variant="h3" textAlign="center">
        Curdle
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        (Cursed Wordle)
      </Typography>
      {win && <Win numGuesses={guesseds.length} reset={clearGuesseds} />}
      <br />
      <Stack spacing={1}>
        {guesseds.map((guessed, index) => (
          <GuessedRow guessed={guessed} key={index} />
        ))}
        {!win && <EntryRow entry={entry} />}
      </Stack>
      <br />
      <Keyboard guesseds={guesseds} handleKey={handleKey} />
    </div>
  );
}

export default App;

function useGame() {
  const [entry, addLetter, removeLetter, clearEntry] = useEntry();
  const [guesseds, addGuessed, clearGuesseds] = useGuesseds();

  const lastGuess =
    guesseds.length > 0 ? guesseds[guesseds.length - 1] : undefined;
  const win = !!lastGuess?.every((gl) => gl.color === "green");

  function handleKey(key: string) {
    if (win) {
      return;
    }
    const keyUpper = key.toUpperCase();
    if ((alphabet as any).includes(keyUpper)) {
      addLetter(keyUpper as Letter);
    }
    if (key === "Backspace") {
      removeLetter();
    }
    if (key === "Enter" && makesValidWord(entry)) {
      const guessed = colorGuess(entry, guesseds);
      addGuessed(guessed);
      clearEntry();
    }
  }

  return {
    entry,
    guesseds,
    clearGuesseds,
    win,
    handleKey,
  };
}

function useKeyDownListener(handleKey: (key: string) => void) {
  function handleKeydown(e: KeyboardEvent) {
    if (e.altKey || e.ctrlKey) {
      return;
    }

    handleKey(e.key);
  }

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

  function clearGuesseds() {
    setGuesseds([]);
  }

  return [guesseds, addGuessed, clearGuesseds] as [
    typeof guesseds,
    typeof addGuessed,
    typeof clearGuesseds
  ];
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
