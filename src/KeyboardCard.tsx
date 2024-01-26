import { Card, Typography } from "@mui/material";
import { Letter } from "./data/letters";
import { CardColor } from "./data/types";

export function KeyboardCard(props: {
  letter: Letter;
  color: CardColor;
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
