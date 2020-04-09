import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsLoginComponent } from './ls-login.component';

describe('LsLoginComponent', () => {
  let component: LsLoginComponent;
  let fixture: ComponentFixture<LsLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
