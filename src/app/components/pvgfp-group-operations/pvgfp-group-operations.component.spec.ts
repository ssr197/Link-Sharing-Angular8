import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpGroupOperationsComponent } from './pvgfp-group-operations.component';

describe('PvgfpGroupOperationsComponent', () => {
  let component: PvgfpGroupOperationsComponent;
  let fixture: ComponentFixture<PvgfpGroupOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpGroupOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpGroupOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
