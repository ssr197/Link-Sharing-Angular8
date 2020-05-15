import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsNewItemComponent } from './ls-new-item.component';

describe('LsNewItemComponent', () => {
  let component: LsNewItemComponent;
  let fixture: ComponentFixture<LsNewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsNewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsNewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
