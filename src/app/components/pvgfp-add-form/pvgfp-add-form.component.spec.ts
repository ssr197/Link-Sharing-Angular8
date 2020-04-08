import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpAddFormComponent } from './pvgfp-add-form.component';

describe('PvgfpAddFormComponent', () => {
  let component: PvgfpAddFormComponent;
  let fixture: ComponentFixture<PvgfpAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
