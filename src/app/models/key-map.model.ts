import { Action } from './action.model';

export interface KeyMap {
  keyMap: 'A1' | 'A2' | 'A3';
  index: number;
  action: Action | null;
}
