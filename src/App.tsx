import { useEffect, useState } from "react";
import { Letter, alphabet } from "./data/letters";
import { Guess } from "./Guess";
import { makesValidWord } from "./logic/makesValidGuess";
import { Guessed as Guessed } from "./data/types";
import { GuessedRow } from "./GuessRow";
import { Stack, Typography } from "@mui/material";
import { guessWord } from "./logic/guess-word";

function App() {
  const [guess, guesseds] = useKeyboardListener();

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
        <Guess letters={guess} />
      </Stack>
    </div>
  );
}

export default App;

function useKeyboardListener() {
  const [guess, addLetter, removeLetter, clearGuess] = useGuess();
  const [guesseds, addGuessed] = useGuesseds();

  function handleKeydown(e: KeyboardEvent) {
    const keyUpper = e.key.toUpperCase();
    if ((alphabet as any).includes(keyUpper)) {
      addLetter(keyUpper as Letter);
    }
    if (e.key === "Backspace") {
      removeLetter();
    }
    if (e.key === "Enter" && makesValidWord(guess)) {
      const newGuess = guessWord(guess);
      addGuessed(newGuess);
      clearGuess();
    }
  }

  useKeyDown(handleKeydown);

  return [guess, guesseds] as [typeof guess, typeof guesseds];
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

function useGuess() {
  const [guess, setGuess] = useState<Letter[]>([]);
  function addLetter(letter: Letter) {
    if (guess.length < 5) setGuess([...guess, letter]);
  }

  function removeLetter() {
    setGuess(guess.slice(0, guess.length - 1));
  }

  function clearGuess() {
    setGuess([]);
  }

  return [guess, addLetter, removeLetter, clearGuess] as [
    typeof guess,
    typeof addLetter,
    typeof removeLetter,
    typeof clearGuess
  ];
}
