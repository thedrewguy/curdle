import { Letter, alphabet } from "../data/letters";
import { guessWords } from "../data/guess-words";
import { Guess, Guessed } from "../data/types";
import _ from "lodash";
import { answerWords } from "../data/answer-words";

const guessLetterCounts = Object.fromEntries(
  guessWords.map((word) => [word, countLetters(word.split("") as Guess)])
);

export function makesValidWord(letters: Letter[]) {
  return guessWords.includes(letters.join(""));
}

function meetsConstraints(guess: Guess, constraints: Constraints) {
  return (
    meetsPositionConstraints(guess, constraints.position) &&
    meetsCountConstraints(guess, constraints.count)
  );
}

function meetsPositionConstraints(
  guess: Guess,
  constraints: PositionConstraints
) {
  return guess.every((letter, index) => {
    const constraint = constraints[index];
    if (constraint.yes && constraint.yes !== letter) {
      return false;
    }
    if (constraint.no.has(letter)) {
      return false;
    }
    return true;
  });
}

function meetsCountConstraints(guess: Guess, constraints: CountConstraints) {
  const letterCounts = guessLetterCounts[guess.join("")];
  return Object.entries(letterCounts).every(([letter, count]) => {
    const constraint = constraints[letter as Letter];
    if (count < constraint.min || count > constraint.max) {
      return false;
    }
    return true;
  });
}

type PositionConstraint = { yes: Letter | undefined; no: Set<Letter> };
type PositionConstraints = [
  PositionConstraint,
  PositionConstraint,
  PositionConstraint,
  PositionConstraint,
  PositionConstraint
];
type CountConstraints = Record<Letter, { min: number; max: number }>;
type Constraints = { count: CountConstraints; position: PositionConstraints };

function initialConstraints(): Constraints {
  const count = Object.fromEntries(
    alphabet.map((letter) => [letter, { min: 0, max: 5 }])
  ) as CountConstraints;

  const placement = Array(5)
    .fill(undefined)
    .map((udf) => ({
      yes: undefined,
      no: new Set<Letter>(),
    })) as PositionConstraints;

  return { count: count, position: placement };
}

function narrowConstraints(constraints: Constraints, guessed: Guessed) {
  const { count, position } = constraints;

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
        position[index].yes = letter;
        return;
      }
      if (gl.color === "yellow") {
        greenish++;
        position[index].no.add(letter);
        return;
      }
      grey++;
      position[index].no.add(letter);
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

function countLetters(guess: Guess) {
  return Object.fromEntries(
    alphabet.map((letter) => [letter, guess.filter((l) => l === letter).length])
  ) as Record<Letter, number>;
}

const guessed: Guessed = [
  { letter: "E", color: "yellow" },
  { letter: "M", color: "yellow" },
  { letter: "C", color: "grey" },
  { letter: "E", color: "green" },
  { letter: "E", color: "grey" },
];
const guesseds = [guessed];

const c = initialConstraints();
guesseds.forEach((guessed) => narrowConstraints(c, guessed));

const remaining = answerWords.filter((word) =>
  meetsConstraints(word.split("") as Guess, c)
);

console.dir(remaining);

console.log(meetsPositionConstraints(["M", "E", "L", "E", "E"], c.position));
console.log(meetsPositionConstraints(["M", "E", "T", "E", "R"], c.position));
