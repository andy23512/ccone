import { Component } from '@angular/core';
import { KeyMap as KeyMap } from 'src/app/models/key-map.model';
import { WritingSystemKeyCode } from 'src/app/models/writing-system-key-code.models';
import { KeyMapService } from 'src/app/services/key-map.service';

@Component({
  selector: 'ccone-layout-viewer-page',
  templateUrl: './layout-viewer-page.component.html',
  styleUrls: ['./layout-viewer-page.component.scss'],
})
export class LayoutViewerPageComponent {
  public keyMaps: KeyMap[] = [];
  public keyboardLayoutMap: Map<WritingSystemKeyCode, string> = new Map();

  constructor(private keyMapService: KeyMapService) {}

  public getKeyMaps() {
    this.keyMapService.getKeyMaps().subscribe((keyMaps) => {
      this.keyMaps = keyMaps;
    });
  }

  public getKeyboardLayoutMap() {
    if ((navigator as any).keyboard) {
      (navigator as any).keyboard
        .getLayoutMap()
        .then((keyboardLayoutMap: Map<WritingSystemKeyCode, string>) => {
          this.keyboardLayoutMap = keyboardLayoutMap;
        });
    }
  }
}
