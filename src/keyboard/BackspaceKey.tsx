import { Card, CardProps } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

export function BackspaceKey(props: CardProps) {
  return (
    <Card
      {...props}
      variant="outlined"
      sx={{
        backgroundColor: "lightgrey",
        display: "flex",
        alignItems: "center",
      }}
    >
      <BackspaceIcon sx={{ paddingX: ".5em" }} />
    </Card>
  );
}
