import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpAnnotationTypeModalComponent } from './pvgfp-annotation-type-modal.component';

describe('PvgfpAnnotationTypeModalComponent', () => {
  let component: PvgfpAnnotationTypeModalComponent;
  let fixture: ComponentFixture<PvgfpAnnotationTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpAnnotationTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpAnnotationTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
