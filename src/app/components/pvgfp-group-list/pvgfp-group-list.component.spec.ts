import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpGroupListComponent } from './pvgfp-group-list.component';

describe('PvgfpGroupListComponent', () => {
  let component: PvgfpGroupListComponent;
  let fixture: ComponentFixture<PvgfpGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
