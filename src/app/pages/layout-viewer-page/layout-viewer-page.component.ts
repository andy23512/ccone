import { Component, OnInit } from '@angular/core';
import { NgxSerial } from 'ngx-serial';

@Component({
  selector: 'ccone-layout-viewer-page',
  templateUrl: './layout-viewer-page.component.html',
  styleUrls: ['./layout-viewer-page.component.scss'],
})
export class LayoutViewerPageComponent implements OnInit {
  public serial: NgxSerial;
  public respondedKeyMaps = '';

  constructor() {
    this.serial = new NgxSerial(this.dataHandler, {
      baudRate: 115200,
    });
  }

  public ngOnInit(): void {
    const respondedKeyMapsFromLocalStorage =
      localStorage.getItem('respondedKeyMaps');
    if (respondedKeyMapsFromLocalStorage) {
      this.respondedKeyMaps = respondedKeyMapsFromLocalStorage;
      console.log(this.respondedKeyMaps);
    }
  }

  private dataHandler(data: string) {
    if (data) {
      this.respondedKeyMaps = this.respondedKeyMaps
        ? this.respondedKeyMaps + data
        : data;
      localStorage.setItem('respondedKeyMaps', this.respondedKeyMaps);
    }
  }

  public async connect() {
    await this.serial.connect(() => {
      console.log('connected');
    });
  }

  public async getKeyMaps() {
    this.respondedKeyMaps = '';
    for (let i = 1; i < 4; i++) {
      for (let j = 0; j < 90; j++) {
        await this.serial.sendData(`VAR B3 A${i} ${j}\r\n`);
      }
    }
  }

  public close() {
    this.serial.close(() => {
      console.log('closed');
    });
  }
}
