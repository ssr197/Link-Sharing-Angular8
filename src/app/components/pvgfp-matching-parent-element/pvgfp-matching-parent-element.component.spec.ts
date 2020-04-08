import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpMatchingParentElementComponent } from './pvgfp-matching-parent-element.component';

describe('PvgfpMatchingParentElementComponent', () => {
  let component: PvgfpMatchingParentElementComponent;
  let fixture: ComponentFixture<PvgfpMatchingParentElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpMatchingParentElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpMatchingParentElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
