import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../field.interface';
import { TranslateService } from 'ng2-translate/ng2-translate';
@Component({
  selector: "pv-file",
  templateUrl: "./file.component.html",
  styles: []
})
export class FileComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor(public translate: TranslateService, private renderer: Renderer, private elementRef: ElementRef) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.setCustomClass(this.field.fieldWidth);
  }
  setCustomClass(fieldWidth) {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'col-md-' + fieldWidth, true);

  }
}
