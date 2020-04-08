import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../field.interface';
import { TranslateService } from 'ng2-translate/ng2-translate';
@Component({
  selector: "pv-radiobutton",
  templateUrl: "./radiobutton.component.html",
  styles: []
})
export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor(public translate: TranslateService, private renderer: Renderer, private elementRef: ElementRef) {
  }
  setCustomClass(fieldWidth) {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'col-md-' + fieldWidth, true);
  }
  ngOnInit() {
    this.setCustomClass(this.field.fieldWidth);
  }
}
