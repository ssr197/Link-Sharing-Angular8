import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { FieldConfig, Validator } from '../../../field.interface';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Input() formlayout: any;
  @Output() invalidForm: any;
  @Output() formArray: any;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Input() form: FormGroup;


  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createControl();
    this.invalidForm = this.form.valid;
    // this.getFormData(this.form);
    // this.saveEmptyDataString();
    this.onChanges();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
      // this.resetForm();
    } else {
      this.validateAllFormFields(this.form);
    }
  }
  
  resetForm(){
    this.form.reset();
  }

  validateAllFormFields(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  createControl() {
    const group = this.fb.group({});
    const fbArray = this.fb.array([]);
    this.fields.forEach(field => {
      if (field.type === "button" || field.type === "custom") return;
      const control = this.fb.control(
        field.defaultValue,
        this.bindValidations(field.validations || []),
      );
      // fbArray.push(control)
      group.addControl(field.fieldName, control);
    });
    // ListUtils.pvFormObj.push(group.controls);
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(this.getValidators(valid.validator));
      });
      return Validators.compose(validList);
    }
    return null;
  }

  getValidators(validator) {
    if (validator === 'required') {
      return Validators.required;
    } else {
      return Validators.pattern(validator);
    }
  }

  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      this.change = val;
    });
  }

  // saveEmptyDataString(){
  //   if(!this._exchangeDataService.isEmptyDataStringPresent){
  //    if(this.form.value['name'] === ''){
  //      this._exchangeDataService.saveEmptyDataString(this.form.value);
  //    }
  //   }
  // }

}
