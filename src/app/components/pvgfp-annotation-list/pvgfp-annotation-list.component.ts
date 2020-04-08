import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ExchangeDataService } from '../../service/exchange-data.service';
import { PvgfpService } from '../../service/pvgfp.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-pvgfp-annotation-list',
  templateUrl: './pvgfp-annotation-list.component.html',
  styleUrls: ['./pvgfp-annotation-list.component.css']
})
export class PvgfpAnnotationListComponent implements OnInit {

  @Input() formId;
  @Input() groupId;
  @Input() selectedValue: string;
  @Input() maxAnnotId: any;
  @Output() shareCoordinatesToParent = new EventEmitter();
  @Output() populateDataString = new EventEmitter();
  // @Output() currAnnotationId = new EventEmitter();
  @Output() currElemList = new EventEmitter();
  @Output() populateDatastringName = new EventEmitter();
  @Output() updateCurrGroupJson = new EventEmitter();
  @Output() newAnnotId = new EventEmitter();
  @Output() createMarker = new EventEmitter();
  @Output() removeMarker = new EventEmitter();
  @Output() coordinateArray = new EventEmitter();
  @Output() currAnnnotData = new EventEmitter();
  @Output() createVirtualAnnot = new EventEmitter();

  annotationId: number;
  imageLinkArray: any;
  currGroupData: any;
  isMatrixAnnot = false;
  isMatAnnotations = false;
  matrixCoord = [];
  currPageNumber:number = 0;
  btnName:string = 'Start';
  markBtn = false;
  currAnnotData:any;

  constructor(
    private _exchangedData: ExchangeDataService,
    private _pvgfpService: PvgfpService,
  ) { }

  ngOnInit() { }

  createAnnotation(params) {
    if(!this.isMatrixAnnot){
      var annotId = (parseInt(this.maxAnnotId)+1).toString();
      this.newAnnotId.emit(annotId);
      this.addToAnnotationList(params.coord, annotId, params.pageNumber);
    } else{
      this.matrixCoord.push(params.coord);
      this.currPageNumber = params.pageNumber;
      this.coordinateArray.emit(this.matrixCoord);
    }
  }

  addToAnnotationList(coordinate, annotationId, pageNumber) {
    if(pageNumber === this._exchangedData.currPngPageNumber){
      var newAnnotation = {
        'annotation' : {
          'datastring':{},
          'annotid' : annotationId,
          'startpage' : pageNumber,
          'annotcoordinates' : coordinate,
          'annotationmatrix' : false,
          'matrixcoordinates' : []
        }
      }
      this.currGroupData.annotations.push(newAnnotation);
      this.createMarker.emit({coordinate, annotationId, pageNumber});
      if(!coordinate){
        this.getDataString(newAnnotation.annotation);
        this.createVirtualAnnot.emit(newAnnotation.annotation);
      }
    }
  }

  getDataString(annotation){
    this.markBtn = false;
    this.currAnnotData = annotation
    this.currAnnnotData.emit(annotation);
    if(!this.imageLinkArray){
      this.imageLinkArray = this._exchangedData.allPageList;
    }
    this._exchangedData.currAnnotationIndex(this.currGroupData.annotations.indexOf(this.currGroupData.annotations.find(ele => ele.annotation == annotation)));
    this.annotationId = annotation.annotid;
    var coordinate = annotation.annotcoordinates;
    var pageNumber = annotation.startpage;
    this.getCurrAnnotData(annotation);
    this._exchangedData.saveCurrAnnotationsData({"coord":coordinate, "pageNumber":pageNumber});
    if(coordinate){
      var params = {
        URL: this.imageLinkArray[pageNumber],
        coord: coordinate
      };
      this._pvgfpService.getDataString(params).subscribe(data => {
        this.populateDataString.emit({'data':data, 'simple':true});
      });
    } else {
      const dataStringText = this._exchangedData.elemTempStr;
      this.populateDataString.emit({'data':dataStringText, 'simple':false});
    }
  }

  getCurrAnnotData(currAnnotationJSON){
    this.matrixCoord = [];
    if(currAnnotationJSON.annotationmatrix){
      this.markBtn = true;
    this.matrixCoord = currAnnotationJSON.matrixcoordinates;
    }
    this.coordinateArray.emit(this.matrixCoord);
  }

  changeAnnotationGroup(event, annotation) {
    if(!annotation.annotation.datastring.name){
      this._pvgfpService.showError("This annotation is not yet saved", 2000);
      return;
    }
    var data = {
      annotId: annotation.annotation.annotid,
      groupId: this.groupId,
      formId: this.formId,
      newGroup: event.target.value
    }
    this._pvgfpService.moveAnnotation(data).subscribe(message => {
      this.currGroupData = JSON.parse(message['_body']);
      this._pvgfpService.showSuccess("Annotation Moved Successfully", 2000);
    })
  }

  deleteitem(annotation){
    swal({
      title: "Are you sure?",
      text: "Once deleted, same Annotation will not be recovered !",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    })
    .then((willDelete) => {
      if(willDelete.value){
        if(!annotation.annotation.datastring.name){
          this._pvgfpService.showSuccess("Annotation Deleted Successfully", 2000);
        }
        else{
          var data = {
            formId: this.formId,
            annotationId: annotation.annotation.annotid
          }
          this._pvgfpService.deleteAnnotation(data).subscribe(response =>{
            this._pvgfpService.showSuccess("Annotation Deleted Successfully", 2000);
          })
        }
        this.removeLocalAnnotation(annotation);
      }
    })
  }

  removeLocalAnnotation(annotJSON){
    let index = this.currGroupData.annotations.indexOf(annotJSON);
    this.currGroupData.annotations.splice(index,1);
    this.updateCurrGroupJson.emit(this.currGroupData);
  }

  updateAnnotationList(currentGroupJson){
    this.currPageNumber = this._exchangedData.currPngPageNumber;
    this.currGroupData = currentGroupJson;
    for(let i = 0; i < this.currGroupData.annotations.length; i++){
      var coordinate = this.currGroupData.annotations[i].annotation.annotcoordinates;
      var annotationId = this.currGroupData.annotations[i].annotation.annotid;
      var pageNumber = this.currGroupData.annotations[i].annotation.startpage;
      this.createMarker.emit({coordinate, annotationId, pageNumber});
      if(this.currGroupData.annotations[i].annotation.annotationmatrix){
        this.createMatrixMarker(this.currGroupData.annotations[i].annotation, this.currGroupData.annotations[i].annotation.matrixcoordinates);
      }
    }
  }

  toggleMatrixType(){
    this.markBtn = !this.markBtn;
  }

  startMarking(){
    if(this.btnName == 'Start'){
      this.btnName = 'End';
      this.isMatrixAnnot = true;
    } else {
      this.btnName = 'Start'
      this.isMatrixAnnot = false;
      this.createMatrixMarker(this.currAnnotData, this.matrixCoord);
    }
  }

  createMatrixMarker(currAnnotData, coordArray){
    var annotationId = currAnnotData.annotid;
    var pageNumber = currAnnotData.startpage;
    for(let i=0; i < coordArray.length; i++){
      var coordinate = coordArray[i];
      this.createMarker.emit({coordinate, annotationId, pageNumber});
    }
  }
  
}
