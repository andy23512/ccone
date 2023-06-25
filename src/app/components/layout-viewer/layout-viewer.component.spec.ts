import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutViewerComponent } from './layout-viewer.component';

describe('LayoutViewerComponent', () => {
  let component: LayoutViewerComponent;
  let fixture: ComponentFixture<LayoutViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
