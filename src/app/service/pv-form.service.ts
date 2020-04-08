import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../field.interface';
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class pvFormService {
  constructor() { }

  // toFormGroup(fields: FieldConfig<any>[] ) {
  //   let group: any = {};
  //
  //   fields.forEach(field => {
  //     group[field.key] = field.isMandatory ? new FormControl(field.value || '', Validators.required)
  //       : new FormControl(field.value || '');
  //   });
  //   return new FormGroup(group);
  // }

}
