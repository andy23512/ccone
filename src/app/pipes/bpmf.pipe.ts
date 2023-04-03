import { Pipe, PipeTransform } from '@angular/core';
import { BPMF, Tone } from '../models/bpmf.enum';

@Pipe({
  name: 'bpmf',
})
export class BpmfPipe implements PipeTransform {
  transform({ consonant, medial, rhyme, tone }: BPMF): string {
    return [consonant, medial, rhyme, tone]
      .filter(Boolean)
      .join('')
      .replace(Tone.Tone1, '');
  }
}
