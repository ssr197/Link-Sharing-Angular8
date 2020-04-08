import { Component, OnInit, ElementRef, Renderer, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../field.interface';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'pv-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css']
})
export class Select2Component implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  @Input() formlayout: any;
  constructor(public translate: TranslateService, private renderer: Renderer, private elementRef: ElementRef) { }
  // public items: Array<string>= this.field.options;
  ngOnInit() {
    this.setCustomClass(this.field.fieldWidth);
  }
  setCustomClass(fieldWidth) {
    if(this.formlayout !== 2){
      this.renderer.setElementClass(this.elementRef.nativeElement, 'col-md-' + fieldWidth, true);
    } else{
      this.renderer.setElementClass(this.elementRef.nativeElement, 'col-md-12', true);
    }
  }

  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }
  public selectOptions = {allowClear: true, placeholder: 'select...' }

  public selectOptionsMultiple = {allowClear: false, placeholder: 'Choose...', multiple: true }
}
