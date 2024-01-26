import { ButtonBaseProps, Typography } from "@mui/material";
import { KeyboardButton } from "./KeyboardButton";

export function EnterKey(props: ButtonBaseProps) {
  return (
    <KeyboardButton {...props} color="lightgrey">
      <Typography
        color="black"
        textAlign="center"
        fontSize="16pt"
        minWidth="1em"
        paddingX=".25em"
        paddingY=".25em"
      >
        Enter
      </Typography>
    </KeyboardButton>
  );
}
