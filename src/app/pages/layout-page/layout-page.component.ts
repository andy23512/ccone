import { Component } from '@angular/core';
import {
  BPMF_LAYOUT,
  DEFAULT_LAYOUT,
  NEED_REMAP_KEYS,
  REMAPPED_LAYOUT,
} from '../../models/layout.const';

@Component({
  selector: 'ccone-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss'],
})
export class LayoutPageComponent {
  public bpmfLayout = BPMF_LAYOUT;
  public defaultLayout = DEFAULT_LAYOUT;
  public needRemapKeys = NEED_REMAP_KEYS;
  public remappedLayout = REMAPPED_LAYOUT;
}
