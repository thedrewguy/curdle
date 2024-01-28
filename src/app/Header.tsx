import { Box, BoxProps, Stack, Typography } from "@mui/material";
import { LetterCard } from "../grid/LetterCard";

export function Header(props: BoxProps) {
  return (
    <Box {...props} display="flex" justifyContent="center">
      <Box display="flex" flexDirection="column">
        <Box display="flex">
          <Box width="50%" />
          <Typography
            width="50%"
            fontWeight="bold"
            textAlign="center"
            fontSize=".75rem"
            marginLeft="8px"
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
            marginRight="8px"
          >
            sed
          </Typography>
          <Box width="50%" />
        </Box>
      </Box>
    </Box>
  );
}
