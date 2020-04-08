import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpFormSummaryComponent } from './pvgfp-form-summary.component';

describe('PvgfpFormSummaryComponent', () => {
  let component: PvgfpFormSummaryComponent;
  let fixture: ComponentFixture<PvgfpFormSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpFormSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpFormSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
