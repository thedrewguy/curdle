import { Box, BoxProps, Stack, Typography } from "@mui/material";
import { LetterCard } from "../grid/LetterCard";

export function Header(props: BoxProps) {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" {...props}>
      <Stack spacing={1} direction="row">
        <LetterCard color="darkred" letter="C" />
        <LetterCard color="black" letter="U" />
        <LetterCard color="darkred" letter="R" />
        <LetterCard color="black" letter="D" />
        <LetterCard color="darkred" letter="L" />
        <LetterCard color="black" letter="E" />
      </Stack>
      <Typography variant="caption" color="darkred" fontWeight="bold">
        Cursed Wordle
      </Typography>
    </Box>
  );
}
