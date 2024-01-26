import { Card, Typography } from "@mui/material";
import { Letter } from "./data/letters";
import { KeyColor } from "./data/types";

export function KeyboardCard(props: {
  letter: Letter;
  color: KeyColor;
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
        textAlign="center"
        fontSize="16pt"
        minWidth="1em"
        paddingX=".25em"
        paddingY=".25em"
      >
        {props.letter}
      </Typography>
    </Card>
  );
}
