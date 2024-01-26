import { ButtonBaseProps } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { KeyboardButton } from "./KeyboardButton";

export function BackspaceKey(props: ButtonBaseProps) {
  return (
    <KeyboardButton {...props} color="lightgrey">
      <BackspaceIcon sx={{ paddingX: ".5em", color: "black" }} />
    </KeyboardButton>
  );
}
