import _ from "lodash";

export function chooseFromColorings(colorings: string[]) {
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
