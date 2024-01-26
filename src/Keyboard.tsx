import { Stack } from "@mui/material";
import { KeyboardCard } from "./KeyboardCard";
import { Letter, alphabet } from "./data/letters";
import { Guessed, KeyColor, LetterColor } from "./data/types";
import _ from "lodash";
import { Row } from "./Row";

export function Keyboard(props: { guesseds: Guessed[] }) {
  const coloring = keyboardColoring(props.guesseds);

  return (
    <Stack spacing={1}>
      <Row>{keysFromLetters("QWERTYUIOP", coloring)}</Row>
      <Row>{keysFromLetters("ASDFGHJKL", coloring)}</Row>
      <Row>{keysFromLetters("ZXCVBNM", coloring)}</Row>
    </Stack>
  );
}

function keysFromLetters(letters: string, coloring: Record<Letter, KeyColor>) {
  return (letters.split("") as Letter[]).map((letter) => (
    <KeyboardCard
      letter={letter}
      color={coloring[letter]}
      fontColor={"white"}
      key={letter}
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
