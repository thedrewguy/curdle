import { Card, Typography } from "@mui/material";
import { Letter } from "../data/letters";
import { CardColor } from "../data/types";

export function LetterCard(props: {
  letter?: Letter;
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
        fontSize="20pt"
        width={"1.5em"}
        height={"1.5em"}
      >
        {props.letter}
      </Typography>
    </Card>
  );
}
