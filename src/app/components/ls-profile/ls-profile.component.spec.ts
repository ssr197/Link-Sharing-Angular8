import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsProfileComponent } from './ls-profile.component';

describe('LsProfileComponent', () => {
  let component: LsProfileComponent;
  let fixture: ComponentFixture<LsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
