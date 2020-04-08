import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpGroupDataElementsComponent } from './pvgfp-group-data-elements.component';

describe('PvgfpGroupDataElementsComponent', () => {
  let component: PvgfpGroupDataElementsComponent;
  let fixture: ComponentFixture<PvgfpGroupDataElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpGroupDataElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpGroupDataElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
