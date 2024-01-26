import { Card, CardProps, Typography } from "@mui/material";
import { Letter } from "./data/letters";
import { CardColor, cardToTextColorMap } from "./data/types";

export function KeyboardCard(
  props: CardProps & {
    letter: Letter;
    color: CardColor;
  }
) {
  const { letter, color, ...cardProps } = props;
  return (
    <Card
      {...cardProps}
      className="card"
      variant="outlined"
      sx={{
        backgroundColor: props.color,
      }}
    >
      <Typography
        color={cardToTextColorMap[props.color]}
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
