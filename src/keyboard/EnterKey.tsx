import { Card, CardProps, Typography } from "@mui/material";

export function EnterKey(props: CardProps) {
  return (
    <Card
      {...props}
      variant="outlined"
      sx={{
        backgroundColor: "lightgrey",
      }}
    >
      <Typography
        color="black"
        textAlign="center"
        fontSize="16pt"
        minWidth="1em"
        paddingX=".25em"
        paddingY=".25em"
      >
        Enter
      </Typography>
    </Card>
  );
}
