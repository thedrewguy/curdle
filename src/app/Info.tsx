import { useEffect, useRef } from 'react';
import { LetterCard } from '../grid/LetterCard';

export function Info(props: {
  visible: boolean;
  setVisible: (v: boolean) => void;
}) {
  const { ref, hide } = useInfo(props.visible, props.setVisible);
  return (
    <dialog ref={ref} className="max-w-[430px] rounded-lg p-7">
      <h1 className="text-xl font-bold">Welcome to Curdle.</h1>
      <br />
      <p>
        Curdle is nearly the same as Wordle, but with one key difference. While
        Wordle picks an answer at the start and sticks with it, Curdle will wait
        for you to guess and work against you to the bitter end.
      </p>
      <br />
      <div>
        If you can solve the Curdle in few enough guesses you'll be rewarded
        with the green number tile:{' '}
        <div className="inline-block">
          <LetterCard letter="?" color="green" fontSize="text-base" />
        </div>
      </div>
      <br />
      <p>Happy Curdling!</p>
      <br />
      <div className="flex justify-end">
        <button
          onClick={hide}
          className="rounded-md bg-neutral-300 p-2 font-bold active:bg-neutral-500"
        >
          Back to Curdling
        </button>
      </div>
    </dialog>
  );
}

function useInfo(visible: boolean, setVisible: (v: boolean) => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (visible) {
      show();
    }
  }, [visible]);

  function show() {
    ref.current?.showModal();
  }

  function hide() {
    ref.current?.close();
    setVisible(false);
  }

  return { ref, hide };
}
