import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryAssociationComponent } from './secondary-association.component';

describe('SecondaryAssociationComponent', () => {
  let component: SecondaryAssociationComponent;
  let fixture: ComponentFixture<SecondaryAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
