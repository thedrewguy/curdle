import { Box, BoxProps, Typography } from "@mui/material";

export function Header(props: BoxProps) {
  return (
    <Box>
      <Typography variant="h3" textAlign="center">
        Curdle
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        (Cursed Wordle)
      </Typography>
    </Box>
  );
}
