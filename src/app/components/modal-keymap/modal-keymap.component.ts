import { Component, ViewChild, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExchangeDataService } from '../../service/exchange-data.service';

@Component({
  selector: 'app-modal-keymap',
  templateUrl: './modal-keymap.component.html',
  styleUrls: ['./modal-keymap.component.css'],
  providers: [NgbModal]
})
export class ModalKeymapComponent implements OnInit {
  @Input() openmodal: boolean;
  @Input() modalType:any;
  @Input() elementEntityListArray:any;
  @Input() valueMaps:any;
  @Input() formId: any;
  @Input() annotId: any;
  @Input() groupId: any;
  @Input() valuemapid: any;
  @ViewChild("contentKeymap") modalContent: TemplateRef<any>;
  keymapForm : FormGroup;
  skvmForm: FormGroup;
  loading:boolean=false;
  modalTitle='';
  isEditModal:boolean = false;
  elementNameList:any;
  @Output() keyValueMapEmit = new EventEmitter();
  @Input() keyValueMap: any;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private _exchangeData: ExchangeDataService
  ) {
  }

  ngOnInit() {
    this.isEditModal = this.modalType.includes('edit');
    this.modalTitle = this.isEditModal ? 'Edit Keymap' : 'Add Keymap';
    this.keymapForm = this.fb.group({
      key: this.fb.array([])
    });
    if(this.keyValueMap){
      this.seedListArray();
    }
    this.skvmForm = this.fb.group({
      source: new FormControl('', [ Validators.required ]),
      target: new FormControl('', [ Validators.required ])
    });
  }

  get keyArray() {
    return (<FormArray>this.keymapForm.controls['key']);
  }

  get elementArray() {
    return (<FormArray>this.keymapForm.controls['key'].get('elementmapping'));
  }


  seedListArray() {
    if(this.keyValueMap.length){
      this.keyValueMap.forEach((data, i ) => {
        const formGroup = this.initX();
        formGroup.patchValue(data);
        this.keyArray.push(formGroup);
        data.elementmapping.forEach((dataele, idx) => {
          const elementMapGroup = this.initY();
          const elementArray = this.keyArray.at(i).get('elementmapping') as FormArray;
          elementMapGroup.patchValue(dataele);
          elementArray.push(elementMapGroup);
        })
      });
    } else {
      const formGroup = this.addEmpKeyRow();
      this.keyArray.push(formGroup);
    }
  }

  getElement(currentEntity){
    return this._exchangeData.setElementName(this.elementEntityListArray, currentEntity)
  }


  ngAfterViewInit() {
    if (this.openmodal) {
      setTimeout(() => this.modalService.open(this.modalContent, {size: 'lg', windowClass: 'modal-xl'}).result.then((result) => {
        this._exchangeData.modalBox({name:'keymap', data:false, type:this.modalType});
      }, (reason) => {
        this._exchangeData.modalBox({name:'keymap', data:false, type:this.modalType});
      }));
    }
  }

  submit(events: Event) {
    this.keyValueMapEmit.emit(this.keymapForm.value.key);
    this.modalService.dismissAll();
  }


  addKey() {
    const control = <FormArray>this.keymapForm.controls['key'];
    control.push(this.addEmpKeyRow());
  }

  addElementMap(ix) {
    const control = (<FormArray>this.keymapForm.controls['key']).at(ix).get('elementmapping') as FormArray;
    control.push(this.initY());
  }

  delKey(idx) {
    (<FormArray>this.keymapForm.controls['key']).removeAt(idx);
  }


  delElementMap(idx, idxx) {
    const control = (<FormArray>this.keymapForm.controls['key']).at(idx).get('elementmapping') as FormArray;
    control.removeAt(idxx);
  }

  addEmpKeyRow() {
    return this.fb.group({
      keysequence:'',
      keyverbose:'',
      elementseparator:'',
      elementmapping:this.fb.array([this.initY()])
    })
  }

  initX() {
    return this.fb.group({
      keysequence:'',
      keyverbose:'',
      elementseparator:'',
      elementmapping:this.fb.array([])
    })
  }

  initY() {
    return this.fb.group({
      keyentity:'',
      keyelement:'',
      keyvaluemapid:'',
      simplekeyvaluemap:''
    })
  }

  getElementName(event, idx, idxx){
    let elemControl = <FormArray>this.keymapForm.get(['key', idx, 'elementmapping']);
    let elem = elemControl.at(idxx).get('element');
    this.elementNameList = this._exchangeData.setElementName(this.elementEntityListArray,event.target.value);
  }


  addSourceMap(idx,idxx) {
    let keymapVal = this.skvmForm.value;
    let elemControl = <FormArray>this.keymapForm.get(['key', idx, 'elementmapping']);
    let elem = elemControl.at(idxx).get('simplekeyvaluemap');
    let newVal = elem.value ? elem.value+' | ': '';
    let formdattedData = newVal + this.formatKeymapVal(keymapVal);
    elem.setValue(formdattedData);
    this.skvmForm.reset();
  }

  formatKeymapVal(obj){
    let result = Object.keys(obj).map(function(key) {
      return [obj[key]];
    });
    return result.join('_');
  }

}
