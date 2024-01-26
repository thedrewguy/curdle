import { ButtonBaseProps, Typography } from "@mui/material";
import { Letter } from "../data/letters";
import { CardColor, cardToTextColorMap } from "../data/types";
import { KeyboardButton } from "./KeyboardButton";

export function LetterKey(
  props: ButtonBaseProps & { letter: Letter; color: CardColor }
) {
  const { letter, color, ...buttonProps } = props;
  return (
    <KeyboardButton {...buttonProps} color={color}>
      <Typography
        color={cardToTextColorMap[props.color]}
        textAlign="center"
        fontSize="16pt"
        minWidth="1em"
        paddingX=".25em"
        paddingY=".25em"
      >
        {letter}
      </Typography>
    </KeyboardButton>
  );
}
