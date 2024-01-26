import { useEffect } from "react";

export function useKeyDownListener(handleKey: (key: string) => void) {
  function handleKeydown(e: KeyboardEvent) {
    if (e.altKey || e.ctrlKey) {
      return;
    }

    handleKey(e.key);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
}
