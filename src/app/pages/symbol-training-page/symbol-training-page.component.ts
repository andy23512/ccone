import { Component, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Chance } from 'chance';
import { filter, fromEvent, map } from 'rxjs';
import { ComboMeterComponent } from 'src/app/components/combo-meter/combo-meter.component';
import { BPMFSymbol, SYMBOLS } from 'src/app/models/bpmf.enum';
import { BPMF_LAYOUT, KEY_TO_SYMBOL } from 'src/app/models/layout.const';

const chance = new Chance();

@UntilDestroy()
@Component({
  selector: 'ccone-symbol-training-page',
  templateUrl: './symbol-training-page.component.html',
  styleUrls: ['./symbol-training-page.component.scss'],
})
export class SymbolTrainingPageComponent implements OnInit {
  public queue: BPMFSymbol[] = [];
  public bpmfLayout = BPMF_LAYOUT;
  @ViewChild('comboMeter') public comboMeter!: ComboMeterComponent;

  ngOnInit(): void {
    this.queue = [...this.queue, ...chance.n(chance.pickone, 10, SYMBOLS)];
    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        untilDestroyed(this),
        map((e) => KEY_TO_SYMBOL.get(e.key)),
        filter(Boolean)
      )
      .subscribe((inputSymbol) => {
        if (inputSymbol === this.queue[0]) {
          this.queue = [...this.queue.slice(1), chance.pickone(SYMBOLS)];
          this.comboMeter.trigger();
        }
      });
  }
}
