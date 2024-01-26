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

function fitsConstraints(guess: Guess, constraints: CountConstraints) {
  const letterCounts = _.countBy(guess);
  guess.forEach((letter, index) => {
    const constraint = constraints[letter];
    const num = letterCounts[letter];
    if (num > constraint.max || num < constraint.min) {
      return false;
    }
  });
  return true;
}

const guessed: Guessed = [
  { letter: "E", color: "yellow" },
  { letter: "M", color: "yellow" },
  { letter: "C", color: "grey" },
  { letter: "E", color: "green" },
  { letter: "E", color: "grey" },
];

type PlacementConstraint = { yes: Set<Letter>; no: Set<Letter> };
type PlacementConstraints = [
  PlacementConstraint,
  PlacementConstraint,
  PlacementConstraint,
  PlacementConstraint,
  PlacementConstraint
];
type CountConstraints = Record<Letter, { min: number; max: number }>;
type Constraints = { count: CountConstraints; placement: PlacementConstraints };

function initialConstraints(): Constraints {
  const count = Object.fromEntries(
    alphabet.map((letter) => [letter, { min: 0, max: 5 }])
  ) as CountConstraints;

  const placement = Array(5)
    .fill(undefined)
    .map((udf) => ({
      yes: new Set<Letter>(),
      no: new Set<Letter>(),
    })) as PlacementConstraints;

  return { count: count, placement: placement };
}

function narrowConstraints(constraints: Constraints, guessed: Guessed) {
  const { count, placement } = constraints;

  _.uniq(guessed.map((gl) => gl.letter)).forEach((letter) => {
    const letterCountConstraint = count[letter];
    let greenish = 0;
    let grey = 0;
    guessed.forEach((gl, index) => {
      if (gl.letter !== letter) {
        return;
      }
      if (gl.color === "green") {
        greenish++;
        placement[index].yes.add(letter);
        return;
      }
      if (gl.color === "yellow") {
        greenish++;
        placement[index].no.add(letter);
        return;
      }
      grey++;
      placement[index].no.add(letter);
    });

    if (greenish > letterCountConstraint.min) {
      letterCountConstraint.min = greenish;
    }
    if (grey) {
      letterCountConstraint.max = greenish;
    }
    count[letter] = letterCountConstraint;
  });
}

const c = initialConstraints();
narrowConstraints(c, guessed);
console.dir(c, { depth: Infinity });

console.log(fitsGuessed(["M", "E", "L", "E", "E"], guessed));
console.log(fitsGuessed(["M", "E", "T", "E", "R"], guessed));
