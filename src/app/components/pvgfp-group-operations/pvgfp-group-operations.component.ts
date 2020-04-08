import { Component, ViewChild, OnInit, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExchangeDataService } from '../../service/exchange-data.service';
import { PvgfpService } from '../../service/pvgfp.service';


@Component({
  selector: 'app-pvgfp-group-operations',
  templateUrl: './pvgfp-group-operations.component.html',
  styleUrls: ['./pvgfp-group-operations.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class PvgfpGroupOperationsComponent implements OnInit {
  @Input() openmodal: boolean;
  @Input() modalType:any;
  @Input() formId;
  @Input() currentGroup:any;
  @Output() addGroup = new EventEmitter();
  @Output() updatedGroupJson = new EventEmitter();
  @ViewChild("content") modalContent: TemplateRef<any>;
  groupForm : FormGroup;
  loading:boolean=false;
  currGroup = 1;
  modalTitle='';
  btnText='';
  isEditModal:boolean = false;
  emptyFormData:any;
  submitAlert:boolean = false;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private _exchangeData: ExchangeDataService,
    private _pvgfpService: PvgfpService
  ) {
    // config.backdrop = 'static';
    // config.keyboard = false;

  }

  ngOnInit() {
    this.isEditModal = this.modalType.includes('edit');
    this.modalTitle = this.isEditModal? 'Edit Group':'Add Group';
    this.btnText = this.isEditModal? 'Update':'Add';
    this.emptyFormData= {"groupoperations":[{"transformcase":"none"},{"transformdateformat":"none"},{"transformnumberformat":"none"},{"concatwithdelimiter":""},{"padafterconcat":"none"},{"padbeforeconcat":"none"},{"truncateleadingdelimiter":"false"},{"truncatelaggingdelimiter":"false"}]};
    this.currentGroup = this.isEditModal?this.currentGroup:this.emptyFormData;
    this.groupForm = this.fb.group({
        transformcase: this.fb.group({
          transformcase: new FormControl(this.currentGroup.groupoperations[0].transformcase)
        }),
        transformdateformat: this.fb.group({
          transformdateformat: new FormControl(this.currentGroup.groupoperations[1].transformdateformat)
        }),
        transformnumberformat: this.fb.group({
          transformnumberformat: new FormControl(this.currentGroup.groupoperations[2].transformnumberformat)
        }),
        concatwithdelimiter: this.fb.group({
          concatwithdelimiter: new FormControl(this.currentGroup.groupoperations[3].concatwithdelimiter)
        }),
        padafterconcat: this.fb.group({
          padafterconcat: new FormControl(this.currentGroup.groupoperations[4].padafterconcat)
        }),
        padbeforeconcat: this.fb.group({
          padbeforeconcat: new FormControl(this.currentGroup.groupoperations[5].padbeforeconcat)
        }),
        truncateleadingdelimiter: this.fb.group({
          truncateleadingdelimiter: new FormControl(JSON.parse(this.currentGroup.groupoperations[6].truncateleadingdelimiter))
        }),
        truncatelaggingdelimiter: this.fb.group({
          truncatelaggingdelimiter: new FormControl(JSON.parse(this.currentGroup.groupoperations[7].truncatelaggingdelimiter))
        })
    });
  }

  ngAfterViewInit() {
    if (this.openmodal) {
      setTimeout(() => this.modalService.open(this.modalContent).result.then((result) => {
        this._exchangeData.modalBox({name:'group', data:false, type:this.modalType});
      }, (reason) => {
        this._exchangeData.modalBox({name:'group', data:false, type:this.modalType});
      }))
    }
  }

  submit(events: Event) {
    this.currGroup = this._exchangeData.groupId;
    var formattedData = this.formatGroupFormData(this.groupForm.value);
    formattedData['annotations'] = [];
    this.loading=true;
    if(this.isEditModal){
      var allAnnotationList = this.currentGroup.annotations;
      formattedData['annotations'] = allAnnotationList;
      this._pvgfpService.updateGroup(this.formId, this.currentGroup.groupid, formattedData).subscribe(newGroupData => {
        this.updatedGroupJson.emit(JSON.parse(newGroupData['_body']));
        this.currentGroup.groupoperations = formattedData.groupoperations;
        console.log("Group Updated!");
      })
    } else{
      this.addGroup.emit(true);
      this._pvgfpService.callAddGroupAPI(this.formId, this.currGroup, formattedData);
      console.log(formattedData);
    }
    this.submitAlert = true;
    setTimeout(()=>{
      this.modalService.dismissAll();
    },1000);
  }

  formatGroupFormData(data){
    var formArrData = {"groupid":this.isEditModal?this.currentGroup.groupid:this.currGroup,"groupoperations":[]};
    for(var key in data) {
      formArrData.groupoperations.push(data[key]);
    }
    return formArrData;
  }

  updateCurrentGroupJson(event){
    this.currentGroup = event;
  }
}
