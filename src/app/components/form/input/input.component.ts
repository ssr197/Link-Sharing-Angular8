import { Component, OnInit, ElementRef, Renderer, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../field.interface';
import { TranslateService } from 'ng2-translate/ng2-translate';
@Component({
  selector: "pv-input",
  templateUrl: "./input.component.html",
  styles: []
})
export class TextBoxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor(public translate: TranslateService, private renderer: Renderer, private elementRef: ElementRef) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    // this.checkFieldVisibility(this.field.isVisibleByDefault);
    this.setCustomClass(this.field.fieldWidth);
  }

  setCustomClass(fieldWidth) {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'col-md-' + fieldWidth, true);
  }

  checkFieldVisibility(isVisibleByDefault) {
    if (isVisibleByDefault) {
      this.renderer.setElementClass(this.elementRef.nativeElement,  'hide', false);
      this.renderer.setElementClass(this.elementRef.nativeElement,  'show', true);
    } else {
      this.renderer.setElementClass(this.elementRef.nativeElement,  'show', false);
      this.renderer.setElementClass(this.elementRef.nativeElement,  'hide', true);
    }
  }
}


