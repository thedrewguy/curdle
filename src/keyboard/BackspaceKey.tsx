import { BackspaceOutlined } from '@mui/icons-material';
import { KeyboardButton } from './KeyboardButton';

export function BackspaceKey(props: React.ComponentProps<'button'>) {
  return (
    <KeyboardButton {...props} color="lightgrey">
      <BackspaceOutlined fontSize={'small'} />
    </KeyboardButton>
  );
}
