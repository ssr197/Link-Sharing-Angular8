import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvfgpShortcutToolsComponent } from './pvfgp-shortcut-tools.component';

describe('PvfgpShortcutToolsComponent', () => {
  let component: PvfgpShortcutToolsComponent;
  let fixture: ComponentFixture<PvfgpShortcutToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvfgpShortcutToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvfgpShortcutToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
