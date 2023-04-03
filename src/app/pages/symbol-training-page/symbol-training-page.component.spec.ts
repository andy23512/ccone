import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolTrainingPageComponent } from './symbol-training-page.component';

describe('SymbolTrainingPageComponent', () => {
  let component: SymbolTrainingPageComponent;
  let fixture: ComponentFixture<SymbolTrainingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SymbolTrainingPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SymbolTrainingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
