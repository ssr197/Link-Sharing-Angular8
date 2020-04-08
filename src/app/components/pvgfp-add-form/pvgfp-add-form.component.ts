import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SpinnerService } from '../../service/spinner.service';
import { PvgfpService } from '../../service/pvgfp.service';
import { DynamicFormComponent } from '../form/dynamic-form/dynamic-form.component';
import { ExchangeDataService } from '../../service/exchange-data.service';
import { PvgfpGroupListComponent  } from '../pvgfp-group-list/pvgfp-group-list.component';
import { PvgfpGroupDataElementsComponent  } from '../pvgfp-group-data-elements/pvgfp-group-data-elements.component';
import { PvgfpGroupDataStringComponent } from '../pvgfp-group-data-string/pvgfp-group-data-string.component';
import { PvgfpAnnotationListComponent } from '../pvgfp-annotation-list/pvgfp-annotation-list.component';
import { PvgfpUploadFormComponent } from '../pvgfp-upload-form/pvgfp-upload-form.component';
import { PvgfpMatrixCoordinatesComponent } from "../pvgfp-matrix-coordinates/pvgfp-matrix-coordinates.component";
import { PvgfpFormSummaryComponent  } from '../pvgfp-form-summary/pvgfp-form-summary.component'

@Component({
  selector: 'app-pvgfp-add-form',
  templateUrl: './pvgfp-add-form.component.html',
  styleUrls: ['./pvgfp-add-form.component.css']
})

export class PvgfpAddFormComponent implements OnInit {

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  @ViewChild(PvgfpGroupDataElementsComponent) elementFormComponent : PvgfpGroupDataElementsComponent;
  @ViewChild (PvgfpGroupDataStringComponent) dataStringFormComponent : PvgfpGroupDataStringComponent;
  @ViewChild(PvgfpGroupListComponent) groupList : PvgfpGroupListComponent;
  @ViewChild (PvgfpAnnotationListComponent) annotationList : PvgfpAnnotationListComponent;
  @ViewChild (PvgfpUploadFormComponent) uploadFormComponent : PvgfpUploadFormComponent;
  @ViewChild (PvgfpMatrixCoordinatesComponent) matrixCoordsComponent : PvgfpMatrixCoordinatesComponent;
  @ViewChild (PvgfpFormSummaryComponent) formSummaryComponent : PvgfpFormSummaryComponent;
  @ViewChild('textbox') textAreaRef: ElementRef<HTMLTextAreaElement>;

  formId:any;
  groupId = 1;
  maxElementId = '1000';
  maxAnnotId = '10000';
  currGroupJSON:any;
  openGroupOperatemodal: boolean;
  openKeymapModal: boolean;
  isOpenSecondarymodal:boolean;
  valuemapIds:any;
  currDataString: string;
  lineLoader: boolean;
  elementList:any=[];
  currentAnnnotationId;
  modalType:any;
  activeTab:string;
  activeForm:string;
  selectedText:string;
  elementEntityListArray:any;
  isOpenMatchinParent:boolean;
  matchingParentList = [];
  secondaryAssociation = [];
  currentValuemapId:any;
  keyValueMap:any;
  currentAnnotationData:any;
  matrixCoords:any = [];
  activePage:any;

  populateDataString(data){
    this.currDataString = data.data;
    this.lineLoader = false;
  }

  constructor(
    private router: Router,
    private _exchangedData: ExchangeDataService,
    private pageTitleService: PageTitleService,
    public translate: TranslateService,
    private _pvgfpService: PvgfpService,
    private _spinnerService: SpinnerService){
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this._spinnerService.display(true);
  }

  ngOnInit(){
    this.pageTitleService.setTitle("Form Configuration");
    this.openDefaultTabs();
    this.loadMetaDataFields();
    this.openEditPage();
    this.openAnyModal();
  }

  loadElementEntity(){
    this._pvgfpService.getEntity().subscribe(data => {
      this.elementEntityListArray = data;
      this.elementFormComponent.getEntityElements(data);
    });
  }

  openAnyModal(){
    this._exchangedData.isOpenModal.subscribe(data => {
      if(data.name === 'group'){
        this.openGroupOperatemodal = data.data;
      } else if(data.name === 'keymap'){
        this.openKeymapModal = data.data;
      } else if(data.name === 'matchingparent'){
        this.isOpenMatchinParent = data.data;
      } else if(data.name === 'secondaryassociations'){
        this.isOpenSecondarymodal = data.data;
      }
      this.modalType = data.type;
    });
  }

  loadMetaDataFields(){
    this._pvgfpService.loadFieldMetaData().subscribe(response => {
      this.dataStringFormComponent.getFields(response.dsField);
      this.loadKeyValuePair(response.elementsField);
      this.loadElementEntity();
      this._spinnerService.display(false);
      },
    err => console.log(err)
  );
  }

  loadKeyValuePair(data){
    this._pvgfpService.getValuemapIDs().subscribe(response => {
      this.elementFormComponent.getFields(data, response.valuemaps);
      this.valuemapIds = response.valuemaps;
    });
  }

  openDefaultTabs(){
    this.switchAnotherTab('nav-annotations');
    this.openForm('nav-dString');
    this.switchForm('uploadForm');
  }

  openEditPage(){
    let routeName = this.router.url;
    this.formId = routeName.split('/form-edit/')[1];
    if(this.formId){
      this.loadEditForm(this.formId);
    }
  }

  updateValuemapId(data){
    this.currentValuemapId = data;
  }

  getAllGroups(currFormId){
    this._pvgfpService.getAllGroup(currFormId).subscribe(allGroupList => {
      this._exchangedData.saveAllGroupList(allGroupList);
      this.groupList.updateCount(currFormId, allGroupList);
    });
  }


  loadEditForm(fromId){
    this._pvgfpService.getForm(fromId).subscribe(data => {
      this.uploadFormComponent.showEditPage(data);
      this.getAllGroups(this.formId);
      this._spinnerService.display(false);
      this.formSummaryComponent.getFormSummaryValue(data.formsummary);
      this._pvgfpService.showSuccess('Form Loaded Successfully', 2000);
    });
  }

  updateGroupId(id){
    this.emptyDatastringTextBox();
    this.groupId = id;
  }

  updateCurrentGroupJSON(event){
    this.uploadFormComponent.DeleteAllMarkers();
    this.currGroupJSON = event;
    this.annotationList.updateAnnotationList(event);
    this.openDefaultTabs();
  }

  switchAnotherTab(event){
    this.activeTab = event;
  }

  openForm(event){
    this.activeForm = event;
  }

  getSelectedText(){
    const textArea = this.textAreaRef.nativeElement;
    this.selectedText = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
    this.elementFormComponent.populateSelectedString(this.selectedText);
    this.openForm('nav-dElements');
  }

  updateMaxElementId(maxElementId){
    if(maxElementId){
      this.maxElementId = maxElementId;
    }
  }

  addNextElement(){
    if(!this.currentAnnnotationId){
      this._pvgfpService.showError('Select annotation first', 2000);
      this.openDefaultTabs();
      return;
    }
    this.elementFormComponent.addNextElement();
    this.openForm('nav-dElements');
  }

  updateMatchingParentList(event){
    if(event){
      this.matchingParentList = event;
    } else {
      this.matchingParentList = [];
    }
  }

  deleteDatastringText(){
    this.emptyDatastringTextBox();
    this.dataStringFormComponent.isNameReadOnly(true);
  }

  emptyDatastringTextBox(){
    this.populateDataString({'data':''});
  }

  updateSecondaryAssociation(event){
    if(event){
      this.secondaryAssociation = event;
    } else {
      this.secondaryAssociation = [];
    }
  }

  updateKeyValueMap(event){
    if(event){
      this.keyValueMap = event;
    } else {
      this.keyValueMap = [];
    }
  }

  currentAnnotData(event){
    this.currentAnnotationData = event;
    this.dataStringFormComponent.updateCurrAnnotationJSON(event);
    this.keyValueMap = event.datastring.keyvaluepairs ? event.datastring.keyvaluepairs.simplekeymap : []
    this.dataStringFormComponent.isNameReadOnly(false);
    this.updateMatchingParentList('');
    this.updateSecondaryAssociation('');
    this.switchAnotherTab('nav-datastringbox');
    this.openForm('nav-dString');
    this.currentAnnnotationId = this.currentAnnotationData.annotid;
    this.lineLoader = true;
    this.currDataString = '';
    this.dataStringFormComponent.populateDatastringName(this.currentAnnotationData.annotid);
  }

  updateMaxAnnotId(maxAnnotId){
    if(maxAnnotId){
      this.maxAnnotId = maxAnnotId;
    }
  }

  updateCoordinateList(coordinateList){
    this.uploadFormComponent.showMarkers(coordinateList);
  }

  callDataStringApi(id){
    this.annotationList.getDataString(id);
  }

  removeMarker(id){
    this.uploadFormComponent.deleteMarker(id);
    this.deleteDatastringText();
  }

  getCurrPageAnnotations(){
    if(this.currGroupJSON){
      this.annotationList.updateAnnotationList(this.currGroupJSON);
    }
  }

  createVirtualAnnot(annotId){
    var startpage = 0;
    var createAnnotData = {
      coord : '',
      annotId : annotId,
      pageNumber : startpage
    }
    this.annotationList.createAnnotation(createAnnotData);
  }
  
  coordinateArray(coordinateArray){
    this.matrixCoords = coordinateArray;
    this.dataStringFormComponent.matrixCoordinates = this.matrixCoords;
  }
  
  addVirtualAnnot(annotJSON){
    var index = this._exchangedData.currAnnotIndex;
    var annotation = {
      annotation: {
        "datastring": {
          'name': annotJSON.annotid
        }
      }
    }
    annotation.annotation['annotid'] = annotJSON.annotid;
    annotation.annotation['annotcoordinates'] = '';
    annotation.annotation['annotationmatrix'] = false;
    annotation.annotation['matrixcoordinates'] = [];
    annotation.annotation['startpage'] = annotJSON.startpage;
    annotation.annotation['annotationtype'] = 'virtual';
     var params = {
      "annotationJson" : annotation,
      "formId" : this.formId,
      "groupId" : this.groupId
    }
    this.dataStringFormComponent.saveAnnotation(params,index);
  }

  deleteVirtualAnnot(annotationId) {
    var annotation = this.currGroupJSON.annotations.find(annot => annot.annotation.annotid == annotationId);
    this.annotationList.deleteitem(annotation);
  }

  switchForm(form){
    this.activePage = form;
  }
}
