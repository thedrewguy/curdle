import { Card, Typography } from "@mui/material";

export function LetterCard(props: {
  letter: string;
  color: "lightgreen" | "white";
}) {
  return (
    <Card
      className="card"
      variant="outlined"
      sx={{
        backgroundColor: props.color,
      }}
    >
      <Typography fontSize="20pt" minWidth={"1.5em"} minHeight={"1.5em"}>
        {props.letter}
      </Typography>
    </Card>
  );
}
