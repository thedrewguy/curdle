import { useState } from 'react';
import { Letter, alphabet } from '../data/letters';
import { Guessed } from '../data/types';
import { makesValidWord } from '../logic/makes-valid-word';
import { colorGuess } from '../logic/color-guess';
import { answerWords } from '../data/answer-words';
import { guessWords } from '../data/guess-words';

export function useGame() {
  const [entry, addLetter, removeLetter, clearEntry] = useEntry();
  const [guesseds, addGuessed, clearGuesseds] = useGuesseds();
  const { hardMode, toggleHardMode } = useHardMode();

  const lastGuess =
    guesseds.length > 0 ? guesseds[guesseds.length - 1] : undefined;
  const win = !!lastGuess?.every(gl => gl.color === 'green');

  const handleKey = win
    ? (key: string) => {
        if (key === 'Enter') {
          clearGuesseds();
        }
      }
    : (key: string) => {
        const keyUpper = key.toUpperCase();
        if ((alphabet as any).includes(keyUpper)) {
          addLetter(keyUpper as Letter);
        }
        if (key === 'Backspace') {
          removeLetter();
        }
        if (key === 'Enter' && makesValidWord(entry)) {
          const guessed = colorGuess(
            entry,
            guesseds,
            hardMode ? guessWords : answerWords
          );
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
    hardMode,
    toggleHardMode,
  };
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
    typeof clearGuesseds,
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
    typeof clearEntry,
  ];
}

function useHardMode() {
  const [hardMode, setHardMode] = useState(false);
  function toggleHardMode() {
    setHardMode(!hardMode);
  }
  return { hardMode, toggleHardMode };
}
