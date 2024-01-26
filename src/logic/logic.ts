import { Letter, alphabet } from "../data/letters";
import { guessWords } from "../data/guess-words";
import { Guess, Guessed } from "../data/types";
import _ from "lodash";

export function makesValidWord(letters: Letter[]) {
  return guessWords.includes(letters.join(""));
}

export function fitsGuessed(guess: Guess, guessed: Guessed) {
  return false;
}

const guessed: Guessed = [
  { letter: "E", color: "yellow" },
  { letter: "M", color: "yellow" },
  { letter: "C", color: "grey" },
  { letter: "E", color: "green" },
  { letter: "E", color: "grey" },
];

type Constraint = { min: number; max: number };
type Constraints = Record<Letter, Constraint>;

function initialConstraints() {
  return Object.fromEntries(
    alphabet.map((letter) => [letter, { min: 0, max: 5 }])
  ) as Constraints;
}

function narrowConstraints(constraints: Constraints, guessed: Guessed) {
  const lettersInGuessed = _.uniq(guessed.map((gl) => gl.letter));

  lettersInGuessed.forEach((letter) => {
    const matchingGuessedLetters = guessed.filter((gl) => gl.letter === letter);
    const greenish = matchingGuessedLetters.filter(
      (gl) => gl.color === "green" || gl.color === "yellow"
    ).length;
    const grey = matchingGuessedLetters.filter(
      (gl) => gl.color === "grey"
    ).length;

    const constraint = constraints[letter];

    if (greenish > constraint.min) {
      constraint.min = greenish;
    }
    if (grey) {
      constraint.max = greenish;
    }
  });
}

const constraints = initialConstraints();

narrowConstraints(constraints, guessed);

console.dir(constraints, { depth: Infinity });

console.log(fitsGuessed(["M", "E", "L", "E", "E"], guessed));
console.log(fitsGuessed(["M", "E", "T", "E", "R"], guessed));
