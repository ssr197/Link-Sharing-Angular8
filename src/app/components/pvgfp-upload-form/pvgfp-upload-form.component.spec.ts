import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PvgfpUploadFormComponent } from './pvgfp-upload-form.component';

describe('PvgfpUploadFormComponent', () => {
  let component: PvgfpUploadFormComponent;
  let fixture: ComponentFixture<PvgfpUploadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvgfpUploadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvgfpUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
