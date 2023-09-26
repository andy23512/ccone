import { WritingSystemKeyCode } from './writing-system-key-code.models';

export interface SystemKeyboardMap {
  name: string;
  keyMap: Record<WritingSystemKeyCode, SystemKeyMap>;
}

export interface SystemKeyMap {
  value: string;
  withShift: string;
  withAltGr: string;
  withShiftAltGR: string;
}
