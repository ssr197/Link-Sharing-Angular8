import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { ExchangeDataService  } from '../../service/exchange-data.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-pvgfp-matching-parent-element',
  templateUrl: './pvgfp-matching-parent-element.component.html',
  styleUrls: ['./pvgfp-matching-parent-element.component.css']
})
export class PvgfpMatchingParentElementComponent implements OnInit {
  @ViewChild("contentMatchingParentElement") modalContent: TemplateRef<any>;
  @Output() matchingParentList = new EventEmitter();
  modalTitle:any;
  @Input() openmodal;
  @Input() modalType:any;
  @Input() elementEntityListArray;
  @Input() matchingParentElemData;
  matchingParent: FormGroup;
  elementNameList = [];

  constructor(
    private _exchangeData : ExchangeDataService,
    private modalService : NgbModal,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.modalTitle = 'Matching Parent Element';
    this.matchingParent = this.fb.group({
      list : this.fb.array([])
    });
    this.seedListArray();
  }

  get listArray() {
    return (<FormArray>this.matchingParent.controls['list']);
  }

  createListGroup() {
    return this.fb.group({
      parentrefentity: new FormControl(''),
      parentrefelement: new FormControl('')
    });
  }

  addListArray() {
    this.listArray.push(this.createListGroup());
  }

  removeListArray(index) {
    this.listArray.removeAt(index);
  }

  seedListArray() {
    if(this.matchingParentElemData.length){
      this.matchingParentElemData.forEach((seedDatum, i ) => {
        const formGroup = this.createListGroup();
        this.elementNameList[i] = this._exchangeData.setElementName(this.elementEntityListArray, seedDatum.parentrefentity);
        formGroup.patchValue(seedDatum);
        this.listArray.push(formGroup);
      });
    } else {
      const formGroup = this.createListGroup();
      this.listArray.push(formGroup);

    }
  }

  ngAfterViewInit() {
    if (this.openmodal) {
      setTimeout(() => this.modalService.open(this.modalContent, {size: 'lg'}).result.then((result) => {
        this._exchangeData.modalBox({name:'matchingparent', data:false, type:this.modalType});
      }, (reason) => {
        this._exchangeData.modalBox({name:'matchingparent', data:false, type:this.modalType});
      }))
    }
  }

  submit(){
    this.matchingParentList.emit(this.matchingParent.value.list);
    this.modalService.dismissAll();
  }

  getElementName(event, idx){
    this.elementNameList[idx] = this._exchangeData.setElementName(this.elementEntityListArray, event.target.value);
  }

}
