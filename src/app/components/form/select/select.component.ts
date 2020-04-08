import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../field.interface';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { PvgfpService } from '../../../service/pvgfp.service';
import { ExchangeDataService } from '../../../service/exchange-data.service';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'pv-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  elementList: any;
  arrayOfElements
  elementOptionName
  field: FieldConfig;
  group: FormGroup;
  constructor(public translate: TranslateService, private renderer: Renderer, private elementRef: ElementRef, private _pvgfpService : PvgfpService, private _exchangedData: ExchangeDataService) {
  }
  ngOnInit() {
    this.setCustomClass(this.field.fieldWidth);
  }

  setCustomClass(fieldWidth) {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'col-md-' + fieldWidth, true);
  }

}
