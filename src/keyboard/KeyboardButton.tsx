import { Button, ButtonBaseProps } from "@mui/material";
import { CardColor } from "../data/types";

export function KeyboardButton(props: ButtonBaseProps & { color: CardColor }) {
  const { color, ...buttonProps } = props;
  return (
    <Button
      {...buttonProps}
      variant="outlined"
      sx={{
        minWidth: 0,
        padding: 0,
        backgroundColor: props.color,
      }}
    >
      {props.children}
    </Button>
  );
}
