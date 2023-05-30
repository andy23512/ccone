import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboMeterComponent } from './combo-meter.component';

describe('ComboMeterComponent', () => {
  let component: ComboMeterComponent;
  let fixture: ComponentFixture<ComboMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboMeterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
