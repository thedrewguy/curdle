import { Card, Typography } from "@mui/material";
import { Letter } from "../data/letters";
import { CardColor, cardToTextColorMap } from "../data/types";

export function LetterCard(props: { letter?: Letter; color: CardColor }) {
  return (
    <Card
      className="card"
      variant="outlined"
      sx={{
        backgroundColor: props.color,
      }}
    >
      <Typography
        color={cardToTextColorMap[props.color]}
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
