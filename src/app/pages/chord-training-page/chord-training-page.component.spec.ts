import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordTrainingPageComponent } from './chord-training-page.component';

describe('ChordTrainingPageComponent', () => {
  let component: ChordTrainingPageComponent;
  let fixture: ComponentFixture<ChordTrainingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChordTrainingPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChordTrainingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
