import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Chance } from 'chance';
import { filter, fromEvent, map } from 'rxjs';
import {
  BPMF,
  CHORDS,
  CONSONANTS,
  Consonant,
  MEDIALS,
  Medial,
  RHYMES,
  Rhyme,
  TONES,
  Tone,
} from 'src/app/models/bpmf.enum';
import { BPMF_LAYOUT, KEY_TO_SYMBOL } from 'src/app/models/layout.const';
import { BpmfPipe } from 'src/app/pipes/bpmf.pipe';

const chance = new Chance();

@UntilDestroy()
@Component({
  selector: 'ccone-chord-training-page',
  templateUrl: './chord-training-page.component.html',
  styleUrls: ['./chord-training-page.component.scss'],
})
export class ChordTrainingPageComponent implements OnInit {
  public queue: string[] = [];
  public bpmfLayout = BPMF_LAYOUT;
  public currentInput: BPMF = {
    consonant: null,
    medial: null,
    rhyme: null,
    tone: null,
  };

  get highLightKeys() {
    const chord = this.queue[0].split('');
    if (TONES.includes(chord[chord.length - 1] as Tone)) {
      return chord;
    }
    return [...chord, Tone.Tone1];
  }

  ngOnInit(): void {
    this.queue = [...this.queue, ...chance.n(chance.pickone, 5, CHORDS)];
    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        untilDestroyed(this),
        map((e) => KEY_TO_SYMBOL.get(e.key)),
        filter(Boolean)
      )
      .subscribe((inputSymbol) => {
        if (CONSONANTS.includes(inputSymbol as Consonant)) {
          this.currentInput = {
            ...this.currentInput,
            consonant: inputSymbol as Consonant,
          };
        } else if (MEDIALS.includes(inputSymbol as Medial)) {
          this.currentInput = {
            ...this.currentInput,
            medial: inputSymbol as Medial,
          };
        } else if (RHYMES.includes(inputSymbol as Rhyme)) {
          this.currentInput = {
            ...this.currentInput,
            rhyme: inputSymbol as Rhyme,
          };
        } else {
          this.currentInput = {
            ...this.currentInput,
            tone: inputSymbol as Tone,
          };
        }
        if (this.currentInput.tone) {
          if (new BpmfPipe().transform(this.currentInput) === this.queue[0]) {
            this.queue = [...this.queue.slice(1), chance.pickone(CHORDS)];
            this.currentInput = {
              consonant: null,
              medial: null,
              rhyme: null,
              tone: null,
            };
          }
        }
      });
    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        untilDestroyed(this),
        filter(({ key }) => key === 'Backspace')
      )
      .subscribe(() => {
        if (this.currentInput.tone) {
          this.currentInput = { ...this.currentInput, tone: null };
        } else if (this.currentInput.rhyme) {
          this.currentInput = { ...this.currentInput, rhyme: null };
        } else if (this.currentInput.medial) {
          this.currentInput = { ...this.currentInput, medial: null };
        } else if (this.currentInput.consonant) {
          this.currentInput = { ...this.currentInput, consonant: null };
        }
      });
    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        untilDestroyed(this),
        filter(({ key }) => key === 'Escape')
      )
      .subscribe(() => {
        this.currentInput = {
          consonant: null,
          medial: null,
          rhyme: null,
          tone: null,
        };
      });
  }
}
