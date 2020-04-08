import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpMatrixCoordinatesComponent } from './pvgfp-matrix-coordinates.component';

describe('PvgfpMatrixCoordinatesComponent', () => {
  let component: PvgfpMatrixCoordinatesComponent;
  let fixture: ComponentFixture<PvgfpMatrixCoordinatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpMatrixCoordinatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpMatrixCoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
