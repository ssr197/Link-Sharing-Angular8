import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpGroupDataStringComponent } from './pvgfp-group-data-string.component';

describe('PvgfpGroupDataStringComponent', () => {
  let component: PvgfpGroupDataStringComponent;
  let fixture: ComponentFixture<PvgfpGroupDataStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpGroupDataStringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpGroupDataStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
