import { HelpOutline } from '@mui/icons-material';
import React, { useState } from 'react';
import { LetterCard } from '../grid/LetterCard';
import { Info } from './Info';
import { twMerge } from 'tailwind-merge';

type HeaderProps = {
  hardMode: boolean;
  toggleHardMode: () => void;
  undo: () => void;
  redo: () => void;
  gameInProgress: boolean;
};

export function Header(props: HeaderProps) {
  const [dialogVisible, setDialogVisible] = useState(false);

  const { topRight, bottomLeft } = marginText(props.hardMode);

  return (
    <div className={'h-1/10 flex justify-between pb-6'}>
      <Info
        visible={dialogVisible}
        setVisible={setDialogVisible}
        hardMode={props.hardMode}
      />
      <button
        className="flex w-5 items-start justify-start py-1"
        onClick={clickHandler(() => setDialogVisible(true))}
      >
        <HelpOutline className="text-red-900" sx={{ height: '15px' }} />
      </button>
      <div className="flex-col">
        <div className="flex">
          <div className="h-4 w-1/2" />
          <p className="ml-2 flex w-1/2 items-end text-left  font-sans text-xs font-bold text-red-900">
            {topRight.text}
          </p>
        </div>
        <div className="flex space-x-1">
          <FirstLetterCard {...props} />
          <button onClick={clickHandler(props.undo)}>
            <LetterCard color="black" letter="U" />
          </button>
          <button onClick={clickHandler(props.redo)}>
            <LetterCard color="red" letter="R" />
          </button>
          <LetterCard color="black" letter="D" />
          <LetterCard color="red" letter="L" />
          <LetterCard color="black" letter="E" />
        </div>
        <div className="flex">
          <p
            className={twMerge(
              'mr-2 w-1/2 text-xs font-bold',
              bottomLeft.alignment
            )}
          >
            {bottomLeft.text}
          </p>
          <div className="w-1/2" />
        </div>
      </div>
      <div className="w-5" />
    </div>
  );
}

function FirstLetterCard(props: HeaderProps) {
  const card = <LetterCard color="red" letter={props.hardMode ? 'H' : 'C'} />;
  if (props.gameInProgress) {
    return card;
  }
  return <button onClick={clickHandler(props.toggleHardMode)}>{card}</button>;
}

function marginText(hardMode: boolean) {
  if (!hardMode) {
    return {
      topRight: { text: 'wor' },
      bottomLeft: { text: 'sed', alignment: 'text-right' },
    };
  }
  return {
    topRight: { text: ' ' },
    bottomLeft: { text: 'ard mode', alignment: 'text-left' },
  };
}

function clickHandler(fn: () => void) {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.blur();
    fn();
  };
}
