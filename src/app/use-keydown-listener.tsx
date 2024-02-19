import { useEffect } from 'react';
import { Game } from './use-game';
import { answerWords } from '../data/answer-words';
import { guessWords } from '../data/guess-words';
import { alphabet, Letter } from '../data/letters';
import { colorGuess } from '../logic/color-guess';
import { makesValidWord } from '../logic/makes-valid-word';

export function useKeyDownListener(game: Game) {
  function handleKeydown(e: KeyboardEvent) {
    if (e.altKey || e.ctrlKey) {
      return;
    }

    getKeyHandler(game)(e.key);
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
}

export function getKeyHandler(args: Game) {
  const { addLetter, removeLetter } = args;
  return function (key: string) {
    const keyUpper = key.toUpperCase();
    if ((alphabet as any).includes(keyUpper)) {
      addLetter(keyUpper as Letter);
    }
    if (key === 'Backspace') {
      removeLetter();
    }
    if (key === 'Enter') {
      handleEnter(args);
    }
    if (key === 'ArrowLeft') {
      handleUndo(args);
    }
    if (key === 'ArrowRight') {
      handleRedo(args);
    }
  };
}

function handleUndo(args: Game) {
  const { entry, clearEntry, undo } = args;
  if (entry.length > 0) {
    clearEntry();
    return;
  }

  undo();
}
function handleRedo(args: Game) {
  const { entry, redo } = args;
  if (entry.length > 0) {
    return;
  }

  redo();
}
function handleEnter(args: Game) {
  const {
    win,
    clearGuesseds,
    entry,
    guesseds,
    hardMode,
    addGuessed,
    clearEntry,
  } = args;

  if (win) {
    clearGuesseds();
    return;
  }

  if (makesValidWord(entry)) {
    const guessed = colorGuess(
      entry,
      guesseds,
      hardMode ? guessWords : answerWords
    );
    addGuessed(guessed);
    clearEntry();
  }
}
