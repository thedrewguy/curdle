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

type Constraint = {
  min: number;
  max: number;
  placement: (boolean | undefined)[];
};
type Constraints = Record<Letter, Constraint>;

function initialConstraint(): Constraint {
  return { min: 0, max: 5, placement: Array(5).fill(undefined) };
}

function initialConstraints() {
  return Object.fromEntries(
    alphabet.map((letter) => [letter, initialConstraint()])
  ) as Constraints;
}

function narrowConstraints(constraints: Constraints, guessed: Guessed) {
  _.uniq(guessed.map((gl) => gl.letter)).forEach((letter) => {
    const constraint = constraints[letter];
    let greenish = 0;
    let grey = 0;
    guessed.forEach((gl, index) => {
      if (gl.letter !== letter) {
        return;
      }
      if (gl.color === "green") {
        greenish++;
        constraint.placement[index] = true;
        return;
      }
      if (gl.color === "yellow") {
        greenish++;
        constraint.placement[index] = false;
        return;
      }
      grey++;
      constraint.placement[index] = false;
    });

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
