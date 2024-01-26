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

function fitsConstraints(guess: Guess, constraints: Constraints) {
  const letterCounts = _.countBy(guess);
  return guess.every((letter, index) => {
    const countConstraint = constraints.count[letter];
    const num = letterCounts[letter];
    if (num > countConstraint.max || num < countConstraint.min) {
      return false;
    }

    const placementConstraint = constraints.placement[index];
    if (placementConstraint.yes && placementConstraint.yes !== letter) {
      return false;
    }
    if (placementConstraint.no.has(letter)) {
      return false;
    }
    return true;
  });
}

const guessed: Guessed = [
  { letter: "E", color: "yellow" },
  { letter: "M", color: "yellow" },
  { letter: "C", color: "grey" },
  { letter: "E", color: "green" },
  { letter: "E", color: "grey" },
];

type PlacementConstraint = { yes: Letter | undefined; no: Set<Letter> };
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
      yes: undefined,
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
        placement[index].yes = letter;
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

console.log(fitsConstraints(["M", "E", "L", "E", "E"], c));
console.log(fitsConstraints(["M", "E", "T", "E", "R"], c));
