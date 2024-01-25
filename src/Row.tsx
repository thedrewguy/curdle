import { Stack } from "@mui/material";

export function Row(props: React.PropsWithChildren) {
  return (
    <Stack sx={{ justifyContent: "center" }} direction="row">
      {props.children}
    </Stack>
  );
}
