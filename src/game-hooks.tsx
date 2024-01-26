import { useEffect, useState } from "react";
import { Letter, alphabet } from "./data/letters";
import { Guessed } from "./data/types";
import { colorGuess, makesValidWord } from "./logic/logic";

export function useGame() {
  const [entry, addLetter, removeLetter, clearEntry] = useEntry();
  const [guesseds, addGuessed, clearGuesseds] = useGuesseds();

  const lastGuess =
    guesseds.length > 0 ? guesseds[guesseds.length - 1] : undefined;
  const win = !!lastGuess?.every((gl) => gl.color === "green");

  const handleKey = win
    ? (key: string) => {
        if (key === "Enter") {
          clearGuesseds();
        }
      }
    : (key: string) => {
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
      };

  return {
    entry,
    guesseds,
    clearGuesseds,
    win,
    handleKey,
  };
}

export function useKeyDownListener(handleKey: (key: string) => void) {
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
