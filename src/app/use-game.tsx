import { useState } from 'react';
import { Letter, alphabet } from '../data/letters';
import { Guessed } from '../data/types';
import { makesValidWord } from '../logic/makes-valid-word';
import { colorGuess } from '../logic/color-guess';
import { answerWords } from '../data/answer-words';
import { guessWords } from '../data/guess-words';
import _ from 'lodash';

type KeyDownArgs = {
  win: boolean;
  clearGuesseds: () => void;
  addLetter: (letter: Letter) => void;
  removeLetter: () => void;
  entry: Letter[];
  guesseds: Guessed[];
  hardMode: boolean;
  addGuessed: (guessed: Guessed) => void;
  undo: () => void;
  redo: () => void;
  clearEntry: () => void;
};

export function useGame() {
  const [entry, addLetter, removeLetter, clearEntry] = useEntry();
  const { guesseds, addGuessed, undo, redo, clearGuesseds } = useGuesseds();
  const { hardMode, toggleHardMode } = useHardMode();

  const lastGuess =
    guesseds.length > 0 ? guesseds[guesseds.length - 1] : undefined;
  const win = !!lastGuess?.every(gl => gl.color === 'green');

  const handleKey = handleKeyDown({
    win,
    clearGuesseds,
    addLetter,
    removeLetter,
    entry,
    guesseds,
    hardMode,
    addGuessed,
    undo,
    redo,
    clearEntry,
  });

  return {
    entry,
    guesseds,
    clearGuesseds,
    win,
    handleKey,
    hardMode,
    toggleHardMode,
    undo,
    redo,
  };
}

function handleKeyDown(args: KeyDownArgs) {
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

function handleUndo(args: KeyDownArgs) {
  const { entry, clearEntry, undo } = args;
  if (entry.length > 0) {
    clearEntry();
    return;
  }

  undo();
}

function handleRedo(args: KeyDownArgs) {
  const { entry, redo } = args;
  if (entry.length > 0) {
    return;
  }

  redo();
}

function handleEnter(args: KeyDownArgs) {
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

function useGuesseds() {
  const [guesseds, setGuesseds] = useState<Guessed[]>([]);
  const [undid, setUndid] = useState<Guessed[]>([]);

  function addGuessed(guessed: Guessed) {
    setGuesseds([...guesseds, guessed]);
    const lastUndid = _.last(undid);
    if (JSON.stringify(guessed) === JSON.stringify(lastUndid)) {
      setUndid(_.dropRight(undid, 1));
      return;
    }
    setUndid([]);
  }

  function undo() {
    if (guesseds.length === 0) {
      return;
    }
    setGuesseds(_.dropRight(guesseds, 1));
    const lastGuessed = _.last(guesseds);
    setUndid([...undid, lastGuessed!]);
  }

  function redo() {
    if (undid.length === 0) {
      return;
    }
    const lastUndid = _.last(undid);
    addGuessed(lastUndid!);
  }

  function clearGuesseds() {
    setGuesseds([]);
  }

  return { guesseds, addGuessed, undo, redo, clearGuesseds };
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
