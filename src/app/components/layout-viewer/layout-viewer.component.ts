import { Component, Input, OnChanges } from '@angular/core';
import { KeyMap } from 'src/app/models/key-map.model';
import { KEY_ID_LAYOUT } from 'src/app/models/layout.const';
import {
  DirectionMap,
  FingerMap,
  HandMap,
  Layout,
} from 'src/app/models/layout.models';
import { SystemKeyboardMap } from 'src/app/models/system-key-map.model';

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
  @Input() public keyMaps: KeyMap[] | null = null;
  @Input() public systemKeyboardMap: SystemKeyboardMap | null = null;
  public hardwareLayout: Layout<string | null> = {};
  public softwareLayout: Layout<string | null> = {};

  public ngOnChanges(): void {
    this.hardwareLayout = layoutMap(
      KEY_ID_LAYOUT,
      (keyId) =>
        this.keyMaps?.find((key) => key?.index === keyId)?.action
          ?.representation || null
    );
    this.softwareLayout = layoutMap(KEY_ID_LAYOUT, (keyId) => {
      const action = this.keyMaps?.find((key) => key?.index === keyId)?.action;
      if (action) {
        if (action.writingSystemKeyCode) {
          const outputCharacter =
            this.systemKeyboardMap?.keyMap?.[action.writingSystemKeyCode].value;
          if (outputCharacter) {
            return outputCharacter;
          }
        }
      }
      return null;
    });
  }
}
