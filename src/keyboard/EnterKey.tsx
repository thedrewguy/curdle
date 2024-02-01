import { KeyboardButton } from "./KeyboardButton";

export function EnterKey(props: React.ComponentProps<"button">) {
  return (
    <KeyboardButton
      {...props}
      color="lightgrey"
      className="text-sm flex-[1.5] min-w-14"
    >
      <p className="text-sm">ENTER</p>
    </KeyboardButton>
  );
}
