import { Stack } from "@mui/material";

export function Row(props: React.PropsWithChildren) {
  return (
    <Stack sx={{ justifyContent: "center" }} direction="row" spacing={1}>
      {props.children}
    </Stack>
  );
}
