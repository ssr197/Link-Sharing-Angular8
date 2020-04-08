import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpListFormsComponent } from './pvgfp-list-forms.component';

describe('PvgfpListFormsComponent', () => {
  let component: PvgfpListFormsComponent;
  let fixture: ComponentFixture<PvgfpListFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpListFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpListFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
