import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalKeymapComponent } from './modal-keymap.component';

describe('ModalKeymapComponent', () => {
  let component: ModalKeymapComponent;
  let fixture: ComponentFixture<ModalKeymapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalKeymapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalKeymapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
