import { HelpOutline } from '@mui/icons-material';
import { useState } from 'react';
import { LetterCard } from '../grid/LetterCard';
import { Info } from './Info';

export function Header() {
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <div className={'h-1/10 flex justify-between pb-6'}>
      <Info visible={dialogVisible} setVisible={setDialogVisible} />
      <div
        className="flex w-5 items-start justify-start py-1"
        onClick={() => setDialogVisible(true)}
      >
        <HelpOutline className="text-red-900" sx={{ height: '15px' }} />
      </div>
      <div className="flex-col">
        <div className="flex">
          <div className="w-1/2" />
          <p className="ml-2 w-1/2 text-left font-sans text-xs font-bold text-red-900">
            wor
          </p>
        </div>
        <div className="flex space-x-1">
          <LetterCard color="red" letter="C" />
          <LetterCard color="black" letter="U" />
          <LetterCard color="red" letter="R" />
          <LetterCard color="black" letter="D" />
          <LetterCard color="red" letter="L" />
          <LetterCard color="black" letter="E" />
        </div>
        <div className="flex">
          <p className="mr-2 w-1/2 text-right text-xs font-bold">sed</p>
          <div className="w-1/2" />
        </div>
      </div>
      <div className="w-5" />
    </div>
  );
}
