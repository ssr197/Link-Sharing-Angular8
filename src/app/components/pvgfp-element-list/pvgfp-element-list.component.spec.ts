import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpElementListComponent } from './pvgfp-element-list.component';

describe('PvgfpElementListComponent', () => {
  let component: PvgfpElementListComponent;
  let fixture: ComponentFixture<PvgfpElementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpElementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
