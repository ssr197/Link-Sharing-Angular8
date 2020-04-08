import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../field.interface';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ExchangeDataService } from '../../../service/exchange-data.service'

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})
export class CustomComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor(public translate: TranslateService, private renderer: Renderer, private elementRef: ElementRef, private _exchngeData : ExchangeDataService) { }
  setCustomClass(fieldWidth) {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'col-md-' + fieldWidth, true);
  }
  ngOnInit() {
    this.setCustomClass(this.field.fieldWidth);
  }

  openModal(){
    if(this.field["fieldId"]==='keyvalpairs'){
      this._exchngeData.modalBox({name:'keymap', data:true, type: this.field.defaultValue?'Edit': 'add'});
    }
    if(this.field["fieldId"]==='matchingparent'){
      this._exchngeData.modalBox({name:'matchingparent', data:true, type:this.field.defaultValue?'Edit': 'add'});
    }
    if(this.field["fieldId"]==='secondaryassociations'){
      this._exchngeData.modalBox({name:'secondaryassociations', data:true, type: this.field.defaultValue?'Edit': 'add'});
    }
  }
}
