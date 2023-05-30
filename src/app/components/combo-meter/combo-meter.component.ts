import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, delay, interval, of, switchMap, takeUntil, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ccone-combo-meter',
  templateUrl: './combo-meter.component.html',
  styleUrls: ['./combo-meter.component.scss'],
})
export class ComboMeterComponent implements OnInit {
  public comboCount = 0;
  public remainedTime = 0;
  @Input() public v0 = 50; // char/m
  @Input() public a = 5;
  private triggerSubject = new Subject();
  private hitTime: number | null = null;

  get timeLimit() {
    return Math.floor(
      (60 * 1000) / (this.v0 + this.a * Math.floor(this.comboCount / 10))
    );
  }

  public ngOnInit(): void {
    this.triggerSubject
      .asObservable()
      .pipe(
        untilDestroyed(this),
        tap(() => {
          this.comboCount++;
          this.hitTime = performance.now();
        }),
        switchMap(() =>
          interval(10).pipe(
            takeUntil(of(true).pipe(delay(this.timeLimit))),
            tap({
              next: () => {
                this.remainedTime = this.hitTime
                  ? Math.max(
                      this.hitTime + this.timeLimit - performance.now(),
                      0
                    )
                  : 0;
              },
              complete: () => {
                this.comboCount = 0;
                this.hitTime = null;
                this.remainedTime = 0;
              },
            })
          )
        )
      )
      .subscribe();
  }

  public trigger() {
    this.triggerSubject.next(0);
  }
}
