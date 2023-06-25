import { Component, Input } from '@angular/core';
import { BPMFSymbol } from 'src/app/models/bpmf.enum';
import { Layout } from '../../models/layout.models';

@Component({
  selector: 'ccone-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @Input() public layout: Layout<BPMFSymbol | string | null> = {};
  @Input() public highlightedKeys: (BPMFSymbol | string)[] = [];
  @Input() public colorSchema: 'default' | 'bpmf' = 'default';
  public switches = [
    'thumbEnd',
    'thumbMid',
    'thumbTip',
    'index',
    'middle',
    'middleMid',
    'ring',
    'ringMid',
    'little',
  ] as const;
  public sides = ['left', 'right'] as const;
  public fadeSwitches = ['middleMid', 'ringMid', 'little'];
}
