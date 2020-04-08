import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExchangeDataService } from '../../service/exchange-data.service'
import { PvgfpService } from '../../service/pvgfp.service'
import swal from 'sweetalert2';


@Component({
  selector: 'app-pvgfp-element-list',
  templateUrl: './pvgfp-element-list.component.html',
  styleUrls: ['./pvgfp-element-list.component.css']
})
export class PvgfpElementListComponent implements OnInit {
  @Input() currGroupJSON;
  @Output() currElementJson = new EventEmitter();
  @Output() newCurrGroupJSON = new EventEmitter();
  @Input() groupId:any;
  @Input() formId:any;
  @Input() currentAnnotationData:any;
  @Output() deleteVirtualElement = new EventEmitter();
  currElementId:any;


  constructor(
    private _exchangeData : ExchangeDataService,
    private pvgfpService : PvgfpService
  ) { }

  ngOnInit() {
  }

  getElement(currElementJSON){
    this.currElementId = currElementJSON.elementid;
    var elementJson = this._exchangeData.setToFormData(currElementJSON);
    this.currElementJson.emit(elementJson);
  }

  deleteitem(elementJSON, index){
    console.log(elementJSON);
    swal({
      title: "Are you sure?",
      text: "Once deleted, same Element will not be recovered !",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    })
    .then((willDelete) => {
      if(willDelete.value){
        var params = {
          formId :this.formId,
          groupId : this.groupId,
          annotationId : this.currentAnnotationData.annotid,
          elementId : elementJSON.elementid
        }
        this.pvgfpService.deleteElement(params).subscribe(response =>{
          if(elementJSON.elementtype === 'virtual'){
            if(elementJSON.virtualannotationreference){
              // alert("need to delete annotation with annotation id "+elementJSON.virtualannotationreference);
              // also delete annotation with annotationId = elementJSON.virtualannotationreference
              this.deleteVirtualElement.emit(elementJSON.virtualannotationreference);
            }
          }
          this.pvgfpService.showSuccess("Element Deleted Successfully", 2000);
          this.newCurrGroupJSON.emit((this.currGroupJSON.annotations.find(annot => annot.annotation == this.currentAnnotationData)).annotation.datastring.elements.splice(index,1));
        })
      }
    })
  }
}
