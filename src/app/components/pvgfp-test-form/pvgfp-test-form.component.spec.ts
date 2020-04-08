import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvgfpTestFormComponent } from './pvgfp-test-form.component';

describe('PvgfpTestFormComponent', () => {
  let component: PvgfpTestFormComponent;
  let fixture: ComponentFixture<PvgfpTestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpTestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
