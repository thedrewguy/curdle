import { Box, BoxProps, Stack, Typography } from "@mui/material";
import { LetterCard } from "../grid/LetterCard";

export function Header(props: BoxProps) {
  return (
    <Box display="flex" justifyContent="center">
      <Box display="flex" flexDirection="column">
        <Box display="flex">
          <Box width="50%" />
          <Box width="8px" />
          <Typography
            width="50%"
            fontWeight="bold"
            textAlign="center"
            fontSize=".75rem"
          >
            wor
          </Typography>
        </Box>
        <Stack spacing={1} direction="row">
          <LetterCard color="darkred" letter="C" />
          <LetterCard color="black" letter="U" />
          <LetterCard color="darkred" letter="R" />
          <LetterCard color="black" letter="D" />
          <LetterCard color="darkred" letter="L" />
          <LetterCard color="black" letter="E" />
        </Stack>
        <Box display="flex">
          <Typography
            width="50%"
            color="darkred"
            fontWeight="bold"
            textAlign="center"
            fontSize=".75rem"
          >
            sed
          </Typography>
          <Box width="8px" />
          <Box width="50%" />
        </Box>
      </Box>
    </Box>
  );
}
