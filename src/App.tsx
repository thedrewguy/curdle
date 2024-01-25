import { useEffect, useState } from "react";
import { Letter, alphabet } from "./data/letters";
import { EntryRow } from "./EntryRow";
import { makesValidWord } from "./logic/logic";
import { Guess, Guessed as Guessed } from "./data/types";
import { GuessedRow } from "./GuessedRow";
import { Stack, Typography } from "@mui/material";
import { guessWord } from "./logic/guess-word";

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
      <br></br>
      <Stack spacing={1}>
        {guesseds.map((guessed, index) => (
          <GuessedRow guessed={guessed} key={index} />
        ))}
        <EntryRow entry={entry} />
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
      const guessed = guessWord(entry as Guess, guesseds);
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
  const [guesseds, setGuesseds] = useState<Guessed[]>([
    [
      { letter: "S", color: "green" },
      { letter: "N", color: "yellow" },
      { letter: "A", color: "grey" },
      { letter: "C", color: "green" },
      { letter: "K", color: "green" },
    ],
  ]);

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
