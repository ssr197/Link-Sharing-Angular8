import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { ExchangeDataService  } from '../../service/exchange-data.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-secondary-association',
  templateUrl: './secondary-association.component.html',
  styleUrls: ['./secondary-association.component.css']
})
export class SecondaryAssociationComponent implements OnInit {

  @ViewChild("contentSecondayAssociations") modalContent: TemplateRef<any>;
  modalTitle:string;
  secondaryAssociations:FormGroup;
  elementNameList = [];
  @Input() openmodal;
  @Input() modalType: any;
  @Output() secondaryAssociation = new EventEmitter();
  @Input() elementEntityListArray;
  @Input() secondaryAssociationsData: any;

  constructor(
    private _exchangeData: ExchangeDataService,
    private modalService : NgbModal,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.modalTitle = 'Secondary Associations';
    this.secondaryAssociations = this.fb.group({
      list : this.fb.array([])
    })
    this.seedListArray();
  }

  get listArray() {
    return (<FormArray>this.secondaryAssociations.controls['list']);
  }

  createListGroup() {
    return this.fb.group({
      secondaryentity: new FormControl(''),
      secondaryelement: new FormControl(''),
      secondaryelementvalue: new FormControl(''),
      secondaryassociationoperation: new FormControl('')
    });
  }

  addListArray() {
    this.listArray.push(this.createListGroup());
  }

  removeListArray(index) {
    this.listArray.removeAt(index);
  }

  seedListArray() {
    if(this.secondaryAssociationsData.length){
      this.secondaryAssociationsData.forEach((seedDatum, i ) => {
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
        this._exchangeData.modalBox({name:'secondaryassociations', data:false, type:this.modalType});
      }, (reason) => {
        this._exchangeData.modalBox({name:'secondaryassociations', data:false, type:this.modalType});
      }));
    }
  }

  getElementName(event, idx){
    this.elementNameList[idx] = this._exchangeData.setElementName(this.elementEntityListArray, event.target.value);
  }

  submit(){
    this.secondaryAssociation.emit(this.secondaryAssociations.value.list);
    this.close();
  }

  close(){
    this.modalService.dismissAll();
    this._exchangeData.modalBox({name:'secondaryassociations', data:false, type:'add'})
  }
}
