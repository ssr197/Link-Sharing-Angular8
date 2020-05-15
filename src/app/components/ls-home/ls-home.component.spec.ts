import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsHomeComponent } from './ls-home.component';

describe('LsHomeComponent', () => {
  let component: LsHomeComponent;
  let fixture: ComponentFixture<LsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
