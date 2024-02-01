import { CardColor, cardColors } from "../data/types";

export function LetterCard(props: {
  letter?: string;
  color: CardColor;
  fontSize?: string;
}) {
  let colors = cardColors[props.color];
  let fontSize = props.fontSize ?? "text-3xl";
  return (
    <div
      className={`flex justify-center items-center ${colors.bg} border rounded-md ${fontSize} w-[1.5em] h-[1.5em] ${colors.text} `}
    >
      {props.letter}
    </div>
  );
}
