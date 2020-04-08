import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpAnnotationListComponent } from './pvgfp-annotation-list.component';

describe('PvgfpAnnotationListComponent', () => {
  let component: PvgfpAnnotationListComponent;
  let fixture: ComponentFixture<PvgfpAnnotationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpAnnotationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpAnnotationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
