import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Action } from 'src/app/models/action.model';
import { ACTIONS } from 'src/app/models/actions.const';
import { KEY_ID_LAYOUT } from 'src/app/models/layout.const';
import {
  DirectionMap,
  Layout,
  FingerMap,
  HandMap,
} from 'src/app/models/layout.models';

function layoutMap<T, U>(layout: Layout<T>, func: (arg: T) => U): Layout<U> {
  const output: Layout<U> = {};
  Object.entries(layout).forEach(([hand, fingerMap]) => {
    const outputFingerMap: Partial<FingerMap<Partial<DirectionMap<U>>>> = {};
    Object.entries(fingerMap).forEach(([finger, directionMap]) => {
      const outputDirectionMap: Partial<DirectionMap<U>> = {};
      Object.entries(directionMap).forEach(([direction, value]) => {
        outputDirectionMap[direction as keyof DirectionMap<U>] = func(value);
      });
      outputFingerMap[finger as keyof FingerMap<U>] = outputDirectionMap;
    });
    output[hand as keyof HandMap<U>] = outputFingerMap;
  });
  return output;
}

@Component({
  selector: 'ccone-layout-viewer',
  templateUrl: './layout-viewer.component.html',
  styleUrls: ['./layout-viewer.component.css'],
})
export class LayoutViewerComponent implements OnChanges {
  @Input() public hardwareKeyMaps = '';
  public parsedHardwareKeyMaps: ({
    keyMap: 'A1' | 'A2' | 'A3';
    index: number;
    action: Action | null;
  } | null)[] = [];
  public hardwareLayout: Layout<string | null> = {};
  public softwareLayout: Layout<string | null> = {};

  public ngOnChanges(): void {
    this.parsedHardwareKeyMaps = this.hardwareKeyMaps
      .split('\r')
      .filter(Boolean)
      .map((line) => {
        const result = line.match(/^VAR B3 (A[1-3]) ([0-9]+) ([0-9]+) 0$/);
        if (result) {
          return {
            keyMap: result[1] as 'A1' | 'A2' | 'A3',
            index: parseInt(result[2]),
            action:
              ACTIONS.find((a) => a.codeId === parseInt(result[3])) || null,
          };
        } else {
          console.error(line);
          return null;
        }
      })
      .filter(Boolean);
    console.log(this.parsedHardwareKeyMaps);
    this.hardwareLayout = layoutMap(
      KEY_ID_LAYOUT,
      (keyId) =>
        this.parsedHardwareKeyMaps.find((key) => key?.index === keyId)?.action
          ?.representation || null
    );
  }

  public getKeyboardLayout() {
    if ((navigator as any).keyboard) {
      const keyboard = (navigator as any).keyboard;
      keyboard.getLayoutMap().then((keyboardLayoutMap: any) => {
        this.softwareLayout = layoutMap(KEY_ID_LAYOUT, (keyId) => {
          const action = this.parsedHardwareKeyMaps.find(
            (key) => key?.index === keyId
          )?.action;
          if (action) {
            if (action.writingSystemKeyCode) {
              const outputCharacter = keyboardLayoutMap.get(
                action.writingSystemKeyCode
              );
              if (outputCharacter) {
                return outputCharacter;
              }
            }
            return action.representation;
          }
          return null;
        });
      });
    }
  }
}
