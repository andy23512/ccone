import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Action } from 'src/app/models/action.model';
import { ACTIONS } from 'src/app/models/actions.const';
import { KeyMap } from 'src/app/models/key-map.model';
import { KEY_ID_LAYOUT } from 'src/app/models/layout.const';
import {
  DirectionMap,
  Layout,
  FingerMap,
  HandMap,
} from 'src/app/models/layout.models';
import { WritingSystemKeyCode } from 'src/app/models/writing-system-key-code.models';

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
  @Input() public keyMaps: KeyMap[] = [];
  @Input() public keyboardLayoutMap: Map<WritingSystemKeyCode, string> =
    new Map();
  public hardwareLayout: Layout<string | null> = {};
  public softwareLayout: Layout<string | null> = {};

  public ngOnChanges(): void {
    this.hardwareLayout = layoutMap(
      KEY_ID_LAYOUT,
      (keyId) =>
        this.keyMaps.find((key) => key?.index === keyId)?.action
          ?.representation || null
    );
    this.softwareLayout = layoutMap(KEY_ID_LAYOUT, (keyId) => {
      const action = this.keyMaps.find((key) => key?.index === keyId)?.action;
      if (action) {
        if (action.writingSystemKeyCode) {
          const outputCharacter = this.keyboardLayoutMap.get(
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
  }
}
