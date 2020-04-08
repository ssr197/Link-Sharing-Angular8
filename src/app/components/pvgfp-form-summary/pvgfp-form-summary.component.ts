import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormArrayName, FormArray } from '@angular/forms';

@Component({
  selector: 'app-pvgfp-form-summary',
  templateUrl: './pvgfp-form-summary.component.html',
  styleUrls: ['./pvgfp-form-summary.component.css']
})
export class PvgfpFormSummaryComponent implements OnInit {
  @Input() openmodal;
  @Input() modalType;
  @ViewChild("formSummary") modalContent: TemplateRef<any>;
  modeltitle:any;
  btnText:any;
  formSummaryForm:any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.btnText = 'Save';
    this.formSummaryForm = this.fb.group({
      continuationsheets: new FormControl(''),
      containscoversheets: new FormControl('false'),
      continuationpageheader: new FormControl(''),
      continuationpagefooter: new FormControl(''),
      pages : this.fb.array([])
    })
  }

  addPage(){
    const control = <FormArray>this.formSummaryForm.controls['pages'];
    control.push(this.addEmpPageArray(control.length));
  }

  addEmpPageArray(arrayLength){
    return this.fb.group({
      pageno: arrayLength+1,
      pageheaderidentifier: '',
      pagefooteridentifier: '',
      pagetype: '',
      sectionheaders: '',
      repeatablepage: '',
      pageurl: '',
    })
  }

  delete(index){
    const control = <FormArray>this.formSummaryForm.controls['pages'];
    control.removeAt(index);
  }

  submit(){
    console.log(this.formSummaryForm.value);
  }

  getFormSummaryValue(formSummary){
    console.log(formSummary);
    // this.formSummaryForm.value.continuationsheets = "formSummary";
  }

}
