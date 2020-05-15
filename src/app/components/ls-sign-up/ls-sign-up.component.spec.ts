import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsSignUpComponent } from './ls-sign-up.component';

describe('LsSignUpComponent', () => {
  let component: LsSignUpComponent;
  let fixture: ComponentFixture<LsSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
