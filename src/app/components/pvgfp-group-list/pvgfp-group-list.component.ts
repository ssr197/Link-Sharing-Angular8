import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ExchangeDataService } from '../../service/exchange-data.service';
import { PvgfpService } from '../../service/pvgfp.service';

@Component({
  selector: 'app-pvgfp-group-list',
  templateUrl: './pvgfp-group-list.component.html',
  styleUrls: ['./pvgfp-group-list.component.css']
})

export class PvgfpGroupListComponent implements OnInit {
  @Input() showBtn: any;
  @Output() groupId = new EventEmitter();
  @Output() currGroupData = new EventEmitter();
  @Output() emptyAnnotationList = new EventEmitter();
  @Output() maxElementId = new EventEmitter();
  @Output() maxAnnotId = new EventEmitter();
  groupList = [];
  count = 1;
  @Input() formId;
  @Input() isAnnotationGroup;
  @Input() currGroupId = 1;
  @Input() allGroupList:any


  constructor(
    private _exchngeData: ExchangeDataService,
    private _pvgfpService: PvgfpService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.isAnnotationGroup){
      this.groupList = this._exchngeData.allGroupList;
    }
  }

  updateCount(formId, allGroupList){
    this.formId = formId;
    this.groupList = allGroupList;
    var maxGroup = allGroupList[allGroupList.length-1].id;
    this.count = maxGroup+1;
    this._exchngeData.saveNewGroupId(this.count);
    this.getCurrentGroup(1);
  }

  onChange() {
    if(!this.isAnnotationGroup){
      this.groupId.emit(this.currGroupId);
      this.emptyAnnotationList.emit(true);
      this.getCurrentGroup(this.currGroupId);
    }
  }

  getCurrentGroup(groupId) {
    this._pvgfpService.getGroup(this.formId, groupId).subscribe(currentGroup => {
      this.maxElementId.emit(currentGroup[1].maxelementid);
      this.maxAnnotId.emit(currentGroup[2].maxannotid);
      this.updateCurrGroupData(currentGroup[0].configdef);
      }
    )
  }

  openGOModal() {
    this._exchngeData.modalBox({name:'group', data:true, type:'add'});
  }

  openEditModal(){
    this._exchngeData.modalBox({name:'group', data:true, type:'edit'});
  }

  addGroup() {
    var data = {
      'id': this.count
    }
    this.groupList.push(data);
    this.count++;
    this._exchngeData.saveNewGroupId(this.count);
  }

  updateCurrGroupData(currentGroupData) {
    this.currGroupData.emit(currentGroupData);
  }
}
