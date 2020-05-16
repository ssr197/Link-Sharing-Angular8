import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsForgetPasswordComponent } from './ls-forget-password.component';

describe('LsForgetPasswordComponent', () => {
  let component: LsForgetPasswordComponent;
  let fixture: ComponentFixture<LsForgetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsForgetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
