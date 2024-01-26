import { Stack } from "@mui/material";
import { KeyboardCard } from "./KeyboardCard";
import { Letter, alphabet } from "./data/letters";
import {
  Guessed,
  KeyColor,
  LetterColor,
  letterToCardColorMap,
} from "./data/types";
import _ from "lodash";
import { Row } from "./Row";

export function Keyboard(props: {
  guesseds: Guessed[];
  handleKey: (key: string) => void;
}) {
  const coloring = keyboardColoring(props.guesseds);

  return (
    <Stack spacing={1}>
      <Row>{keysFromLetters("QWERTYUIOP", coloring, props.handleKey)}</Row>
      <Row>{keysFromLetters("ASDFGHJKL", coloring, props.handleKey)}</Row>
      <Row>{keysFromLetters("ZXCVBNM", coloring, props.handleKey)}</Row>
    </Stack>
  );
}

function keysFromLetters(
  letters: string,
  coloring: Record<Letter, KeyColor>,
  handleKey: (key: string) => void
) {
  return (letters.split("") as Letter[]).map((letter) => (
    <KeyboardCard
      letter={letter}
      color={letterToCardColorMap[coloring[letter]]}
      key={letter}
      onClick={() => handleKey(letter)}
    />
  ));
}

function keyboardColoring(guesseds: Guessed[]) {
  const letterMap = Object.fromEntries(
    alphabet.map((letter) => [letter, "lightgrey"])
  );
  const guessedLetters = _.flatten(guesseds);

  addColorToKeyboard(guessedLetters, letterMap, "grey");
  addColorToKeyboard(guessedLetters, letterMap, "yellow");
  addColorToKeyboard(guessedLetters, letterMap, "green");

  return letterMap as Record<Letter, KeyColor>;
}
function addColorToKeyboard(
  guessedLetters: Guessed,
  letterMap: { [k: string]: string },
  color: LetterColor
) {
  const lettersThatColor = _.uniq(
    guessedLetters.filter((l) => l.color === color).map((gl) => gl.letter)
  );
  lettersThatColor.forEach((letter) => (letterMap[letter] = color));
}
