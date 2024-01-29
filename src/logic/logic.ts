import _ from "lodash";
import { answerWords } from "../data/answer-words";
import { guessWords } from "../data/guess-words";
import { Letter, alphabet } from "../data/letters";
import { Guess, Guessed, LetterColor } from "../data/types";

const letterCountsByAnswer = Object.fromEntries(
  answerWords.map((word) => [word, countLetters(word.split("") as Guess)])
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

function meetsCountConstraints(answer: Guess, constraints: CountConstraints) {
  const letterCounts = letterCountsByAnswer[answer.join("")];
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
    .map(() => ({
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

function coloringForAnswer(guess: Guess, answer: Guess): LetterColor[] {
  const guessLetterCounts = {} as Partial<Record<Letter, number>>;

  const coloringGreenOnly: ("green" | undefined)[] = answer.map(
    (answerLetter, index) => {
      const guessLetter = guess[index];
      if (guessLetter !== answerLetter) {
        return;
      }

      guessLetterCounts[guessLetter] =
        (guessLetterCounts[guessLetter] ?? 0) + 1;

      return "green";
    }
  );

  const coloring = coloringGreenOnly.map((color, index) => {
    if (color) {
      return color;
    }

    const guessLetter = guess[index];

    let guessLetterCount = (guessLetterCounts[guessLetter] ?? 0) + 1;
    guessLetterCounts[guessLetter] = guessLetterCount;

    if (
      guessLetterCount <= letterCountsByAnswer[answer.join("")][guessLetter]
    ) {
      return "yellow";
    }
    return "grey";
  });

  return coloring;
}

function getPotentialAnswers(guesseds: Guessed[]) {
  const constraints = initialConstraints();
  guesseds.forEach((guessed) => narrowConstraints(constraints, guessed));

  return answerWords.filter((word) =>
    meetsConstraints(word.split("") as Guess, constraints)
  );
}

function colorPotentialAnswers(answers: string[], guess: Guess) {
  return answers.map((answer) =>
    JSON.stringify(coloringForAnswer(guess, answer.split("") as Guess))
  );
}

export function colorGuess(guess: Guess, guesseds: Guessed[]): Guessed {
  const potentialAnswers = getPotentialAnswers(guesseds);
  const answerColorings = colorPotentialAnswers(potentialAnswers, guess);
  const coloringString = chooseFromColorings(answerColorings);

  if (!coloringString) {
    throw new Error("No coloring could be determined 🤔");
  }

  const coloring = JSON.parse(coloringString);

  return guess.map((letter, index) => ({
    letter: letter,
    color: coloring[index] as LetterColor,
  }));
}

function chooseFromColorings(colorings: string[]) {
  const bestTwo = _(colorings)
    .countBy() // count by frequency
    .entries()
    .sortBy(_.last) // sort by count
    .takeRight(2) // take two commonest
    .map((arr) => arr[0] as string); // just the string

  if (bestTwo.size() === 1) {
    return bestTwo.first();
  }
  const allGreen = '["green","green","green","green","green"]';
  // if tied with winning coloring, remove winning coloring
  return bestTwo.pull(allGreen).last();
}
