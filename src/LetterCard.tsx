import { Card, Typography } from "@mui/material";
import { Letter } from "./utils/letters";

export function LetterCard(props: {
  letter?: Letter;
  color: "lightgreen" | "white";
  fontColor: string;
}) {
  return (
    <Card
      className="card"
      variant="outlined"
      sx={{
        backgroundColor: props.color,
      }}
    >
      <Typography
        color={props.fontColor}
        fontSize="20pt"
        minWidth={"1.5em"}
        minHeight={"1.5em"}
      >
        {props.letter}
      </Typography>
    </Card>
  );
}
