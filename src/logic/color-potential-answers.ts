import { answerWords } from '../data/answer-words';
import { Letter } from '../data/letters';
import { LetterColor } from '../data/types';
import { countLetters } from './count-letters';

const letterCountsByAnswer = Object.fromEntries(
  answerWords.map(word => [word, countLetters(word.split('') as Letter[])])
);

export function colorPotentialAnswers(answers: string[], guess: Letter[]) {
  return answers.map(answer =>
    JSON.stringify(coloringForAnswer(guess, answer.split('') as Letter[]))
  );
}

function coloringForAnswer(guess: Letter[], answer: Letter[]): LetterColor[] {
  const guessLetterCounts = {} as Partial<Record<Letter, number>>;

  const coloringGreenOnly: ('green' | undefined)[] = answer.map(
    (answerLetter, index) => {
      const guessLetter = guess[index];
      if (guessLetter !== answerLetter) {
        return;
      }

      guessLetterCounts[guessLetter] =
        (guessLetterCounts[guessLetter] ?? 0) + 1;

      return 'green';
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
      guessLetterCount <= letterCountsByAnswer[answer.join('')][guessLetter]
    ) {
      return 'yellow';
    }
    return 'grey';
  });

  return coloring;
}
