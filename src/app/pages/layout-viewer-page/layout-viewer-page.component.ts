import { Component } from '@angular/core';
import { KeyMap } from 'src/app/models/key-map.model';
import { SystemKeyboardMap } from 'src/app/models/system-key-map.model';
import { KeyMapService } from 'src/app/services/key-map.service';

@Component({
  selector: 'ccone-layout-viewer-page',
  templateUrl: './layout-viewer-page.component.html',
  styleUrls: ['./layout-viewer-page.component.scss'],
})
export class LayoutViewerPageComponent {
  public keyMaps: KeyMap[] | null = null;
  public systemKeyboardMap: SystemKeyboardMap | null = null;

  constructor(private keyMapService: KeyMapService) {}

  public getKeyMaps() {
    this.keyMapService.getKeyMaps().subscribe((keyMaps) => {
      this.keyMaps = keyMaps;
    });
  }

  public onFileInputChange(event: Event) {
    const files = (event?.target as HTMLInputElement)?.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.systemKeyboardMap = JSON.parse(reader.result as string);
      });
      reader.readAsText(files[0]);
    }
  }
}
