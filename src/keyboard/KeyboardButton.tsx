import { CardColor, cardColors } from "../data/types";

export function KeyboardButton(
  props: React.ComponentProps<"button"> & {
    color: CardColor;
    className?: string;
  }
) {
  const { color, className, ...buttonProps } = props;
  const { bg, text } = cardColors[color];
  return (
    <button
      {...buttonProps}
      className={`flex justify-center items-center flex-1 ${bg} ${text} text-center text-lg  border rounded-md min-w-5 min-h-5 p-1 active:bg-neutral-700 ${className}`}
    >
      {props.children}
    </button>
  );
}
