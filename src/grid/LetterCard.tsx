import { Card, Typography } from "@mui/material";
import { CardColor, cardToTextColorMap } from "../data/types";

export function LetterCard(props: {
  letter?: string;
  color: CardColor;
  fontSize?: string;
  fontColor?: string;
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
        color={props.fontColor ?? cardToTextColorMap[props.color]}
        textAlign="center"
        fontSize={props.fontSize ?? "1.75rem"}
        width={"1.5em"}
        height={"1.5em"}
      >
        {props.letter}
      </Typography>
    </Card>
  );
}
