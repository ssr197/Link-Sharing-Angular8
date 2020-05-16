import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsPublicDashboardComponent } from './ls-public-dashboard.component';

describe('LsPublicDashboardComponent', () => {
  let component: LsPublicDashboardComponent;
  let fixture: ComponentFixture<LsPublicDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsPublicDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsPublicDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
