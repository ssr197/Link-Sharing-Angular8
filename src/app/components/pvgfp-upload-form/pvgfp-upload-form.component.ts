import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PvgfpService } from '../../service/pvgfp.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExchangeDataService } from '../../service/exchange-data.service';
import { SpinnerService } from '../../service/spinner.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleService } from '../../core/page-title/page-title.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-pvgfp-upload-form',
  templateUrl: './pvgfp-upload-form.component.html',
  styleUrls: ['./pvgfp-upload-form.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class PvgfpUploadFormComponent implements OnInit {
  @Output() showAnnotationList = new EventEmitter();
  @Output() currFormId = new EventEmitter();
  @Output() pageUrlArray = new EventEmitter();
  @Output() getFirstGroupData = new EventEmitter();
  @Output() openGetDataStringCall = new EventEmitter();
  @Output() getCurrPageAnnotations = new EventEmitter();
  hideForm:boolean = false;
  totalPage = [];
  imageUrl: String;
  uploadForm: FormGroup;
  sizeDiff;
  filename:string;
  pageSize: number;
  annotationType = "Attach the component here";
  formTypeOptions:any;
  outputTypeOptions:any;
  currPage = 0;
  user;
  isTestPage = false;
  formId:string;
  componentTitle:string;
  formname : string = "";
  formdescription: string = "";
  formtype: string = "imagepdf";
  outputtype : string = "pvijson";
  annotationIdList = [];
  testPageResult = false;
  testResult:any;
  currAnnotationType: any;

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private _pvgfpService: PvgfpService,
    private _exchangedData: ExchangeDataService,
    private config: NgbPaginationConfig,
    private spinnerService : SpinnerService,
    private pageTitleService : PageTitleService,
  ) {
    config.size = 'sm';
    config.boundaryLinks = true;
  }

  ngOnInit() {
    this.updateComponentTitle('Upload Form');
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.uploadForm = this.formBuilder.group({
      formName: "",
      formDescription: "",
      formType: "",
      outputType : "",
      file1: [''],
    });
    this.setOption();
    this.triggerCurrAnnot();

    this._exchangedData.currAnnotType.subscribe((val: string) => {
      this.currAnnotationType = val;
    });
  }


  ngAfterViewInit(){
    setTimeout(() => {
      this.pageTitleService.showTools(false);
    });
  }

  showEditPage(data){
    this.updateComponentTitle(data.formname);
    this.getPngData(JSON.parse(data.templateurls));
  }

  setOption(){
    this.formTypeOptions = [{"id":"imagepdf", "text":"Image PDF"}, {"id":"digitalpdf", "text":"Digital PDF"},{"id":"docx", "text":"DOCX"}]
    this.outputTypeOptions = [{"id":"pvijson", "text":" PVI JSON"}, {"id":"e2br3", "text":"E2B R3"}]
  }

  updateComponentTitle(title){
    this.componentTitle = title;
  }

  saveCoordinates() {
    var coordinates:any = $("#coordinateHolder").val();
    console.log(coordinates);
    this.pageUrlArray.emit(this.imageUrl);
    this.showAnnotationList.emit({"coord":coordinates,"pageNumber":this.currPage});
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.filename = file.name;
      this.uploadForm.get('file1').setValue(file);
    }
  }

  callUploader() {
    if(!this.isTestPage){
      this.spinnerService.display(true);
      const formData = new FormData();
      formData.append('file1', this.uploadForm.get('file1').value);
      formData.append('formname', this.formname);
      formData.append('formdescription', this.formdescription);
      formData.append('formtype',this.formtype);
      formData.append('outputType',this.outputtype);
      formData.append('formsummary', '{}');
      formData.append('user', 'Admin');
      this._pvgfpService.pdfToPng(formData).subscribe(data => {
        this.spinnerService.display(false);
        this.router.navigate(["/form-edit", data.formID]);
      });
    } else {
      var file = this.uploadForm.get('file1').value;
      this._pvgfpService.processForm(this.formId, file)
      .subscribe(data => {
          this.testPageResult = true;
          this.testResult = JSON.parse(data['_body']);
        }
      )
    }
  }

  getPngData(data){
    this.totalPage = data.url_png;
    this._exchangedData.saveAllPageLink(this.totalPage);
    this.pageSize = this.totalPage.length;
    console.log("total page:" + this.pageSize)
    this.renderImage(1, false);
    this.hideForm = true;
  }

  renderImage(page, showWarning) {
    this.pageTitleService.showTools(true);
    if(!showWarning){
      this._exchangedData.saveCurrPngPageNumber(page-1);
      this.imageUrl = this.totalPage[page-1].replace(/172.28.1.20/g, "182.76.1.86");
      return
    }
    swal({
      title: "Are you sure?",
      text: "Once page changed, All unsaved Annotation will be lost",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if(willDelete.value){
        this.DeleteAllMarkers();
        this.currPage = page-1;
        this._exchangedData.saveCurrPngPageNumber(this.currPage);
        this.imageUrl = this.totalPage[page-1].replace(/172.28.1.20/g, "182.76.1.86");
        this.getCurrPageAnnotations.emit();
      }
    })

  }

  showTestPage(formId, formData){
    this.formId = formId;
    this.isTestPage = true;
    this.formname = formData.formname;
    this.formdescription = formData.formdescription;
    this.updateComponentTitle("Test: "+formData.formname);
  }

  //Jcrop Part
  onImageLoad() {
    this.initJcorp($);
  }

  initJcorp($) {
    $("#viewPng").Jcrop({
       onSelect: this.getCordination
    });
    this.sizeDiff = this.getImgSizeDiff();
  };

  getCordination(c) {
    // Note: can't use getImgSizeDiff due to jcorp local scope issue
    let pageImg = document.getElementById("file-image") as HTMLImageElement,
        imgActualSize = Math.floor(pageImg.naturalWidth),
        imgCurrSize = Math.floor(pageImg.width),
        sizeDiff = parseFloat((imgActualSize/imgCurrSize).toFixed(2)),
        xcord = Math.floor(c.x * sizeDiff),
        ycord = Math.floor(c.y * sizeDiff),
        width = Math.floor(c.w * sizeDiff),
        height = Math.floor(c.h * sizeDiff),
        coordinateValue = xcord + " , " + ycord + " , " + width + " , " + height;
        $("#coordinateHolder").val(coordinateValue);
        $("#addAnnotation").click();
  };

  getImgSizeDiff(){
    let pageImg = document.getElementById("file-image") as HTMLImageElement,
        imgActualSize = Math.floor(pageImg.naturalWidth),
        imgCurrSize = Math.floor(pageImg.width);
        return parseFloat((imgActualSize/imgCurrSize).toFixed(2));
  };

  showMarkers(coordinates){
    if(typeof(coordinates.coordinate) != 'object'){
      let pageNumber = coordinates.pageNumber;
      if(pageNumber === this.currPage){
        let annotId = coordinates.annotationId;
        this.annotationIdList.push(annotId);
        if(coordinates.coordinate){
          let coord = coordinates.coordinate.split(",");
          let coordX = Math.floor(parseInt(coord[0]) / this.sizeDiff);
          let coordY = Math.floor(parseInt(coord[1]) / this.sizeDiff);
          let coordW = Math.floor(parseInt(coord[2]) / this.sizeDiff);
          let coordH = Math.floor(parseInt(coord[3]) / this.sizeDiff);
          let newDiv : HTMLDivElement = document.createElement("div") as HTMLDivElement;
          newDiv.classList.add("area-marker");
          newDiv.style.top = coordY + 'px';
          newDiv.style.left = coordX + 'px';
          newDiv.style.width = coordW + 'px';
          newDiv.style.height = coordH + 'px';
          newDiv.setAttribute('id', 'marker-'+annotId);
          newDiv.setAttribute('title', annotId);
          let jcorpContainer = document.getElementsByClassName('jcrop-holder')[0];
          if(!jcorpContainer){
            this.renderImage(this.currPage, false);
          }
          jcorpContainer.appendChild(newDiv);
        }
      }
    } else {
      let coordMatrix = coordinates.coordinate;
      for(let i = 0; i < coordMatrix.length; i++){
        coordinates.coordinate = coordMatrix[i];
        this.showMarkers(coordinates);
      }
    }
  }

  triggerCurrAnnot(){
    document.addEventListener('click', this.getCurrAnnotData.bind(this));
  }

  getCurrAnnotData(params){
    if(params.target.classList[0] === 'area-marker'){
      var id = params.target.id.split('-')[1];
      this.openGetDataStringCall.emit(id);
    }
  }

  DeleteAllMarkers(){
    for(let i = 0; i < this.annotationIdList.length; i++){
      this.deleteMarker(this.annotationIdList[i]);
    }
  }

  deleteMarker(annotNumber){
    var id = 'marker-'+annotNumber;
    var delMarker = document.getElementById(id);
    if(delMarker) {
      delMarker.parentNode.removeChild(delMarker);
      var index = this.annotationIdList.indexOf(annotNumber);
      this.annotationIdList.splice(index, 0);
    }
  }
}
