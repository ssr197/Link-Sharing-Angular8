import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PvgfpService } from '../../service/pvgfp.service';
import { DynamicFormComponent } from '../form/dynamic-form/dynamic-form.component';
import { ExchangeDataService } from '../../service/exchange-data.service';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Component({
  selector: 'app-pvgfp-group-data-elements',
  templateUrl: './pvgfp-group-data-elements.component.html',
  styleUrls: ['./pvgfp-group-data-elements.component.css']
})
export class PvgfpGroupDataElementsComponent implements OnInit {
  pvgfpFields: any;
  @Input() formId;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  @Output() maxElemId = new EventEmitter();
  @Output() openElementListTab = new EventEmitter();
  @Output() sendBackMatchingParent = new EventEmitter();
  @Output() sendBackSecoundaryAssociations = new EventEmitter();
  @Output() sendElementNameToSecondaryAss = new EventEmitter();
  @Output() createVirtualAnnot = new EventEmitter();
  @Output() newCurrGroupData = new EventEmitter();
  @Output() deleteVirtualAnnotation = new EventEmitter();
  @Output() updatedGroupJson = new EventEmitter();
  @Input() currGroupId : any;
  @Input() currAnnotId : any;
  @Input() matchingParentElementList;
  @Input() secondaryAssociation;
  @Input() maxElementId;
  @Input() maxAnnotId;
  @Input() currGroupJSON;
  entityList:any;
  currElementId:any;
  isUpdateElement:boolean = false;
  allElementList = [];
  entityType:any;
  parentEntity:any;
  vartialRefId:any;


  constructor(
    private _pvgfpService : PvgfpService,
    private _exchangeDataService : ExchangeDataService
  ) { }

  ngOnInit() {
  }

  getFields(elementFields, valueMap){
    this.pvgfpFields = elementFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'matchesvaluemap_valuemapid').options = valueMap;
  }

  onAddElement(event){
    var currElementData = this._exchangeDataService.setJsonFormate(event);
    currElementData["matchingparentelement"] = this.matchingParentElementList;
    currElementData["secondaryassociations"] = this.secondaryAssociation;
    currElementData['parententity'] = ''; //Hardcoded
    currElementData['level'] = ''; // Hardcoded
    currElementData['rowcellreferenceid'] = '' //Hardcoded
    currElementData['paragraphreferenceid'] = '' //Hardcoded
    currElementData['entitytype'] = this.entityType;
    currElementData['parententity'] = this.parentEntity;
    if(currElementData["matchesvaluemap"]["valuemapid"] || currElementData["matchesvaluemap"]["simplevaluemap"] || currElementData["matchesvaluemap"]["matchingtype"] || currElementData["matchesvaluemap"]["advtransformationexpression"] || currElementData["matchesvaluemap"]["prependstring"] || currElementData["matchesvaluemap"]["appendstring"] || currElementData["matchesvaluemap"]["nomatchdefault"]){
      currElementData["matchesvaluemap"]["ismapped"] = true;
    }else{
      currElementData["matchesvaluemap"]["ismapped"] = false;
    }
    this.maxElementId++;
    this.maxElemId.emit(this.maxElementId);
    var parameter = {
      elementJson : currElementData,
      formId : this.formId,
      annotationId : this.currAnnotId,
      groupId : this.currGroupId
    }
    if(parameter.elementJson['elementtype'] == 'virtual'){
      var newAnnotId = (parseInt(this.maxAnnotId)+1).toString();
      parameter.elementJson['virtualannotationreference'] = newAnnotId;
      parameter.elementJson['elemententity'] = '';
      parameter.elementJson['elementname'] = '';
      parameter.elementJson['dstoentityassociationtype'] = '';
      parameter.elementJson['datatype'] = '';
      parameter.elementJson['alwayspresent'] = false;
      parameter.elementJson['matchingparentelement'] = [];
      parameter.elementJson['secondaryassociations'] = [];
    } else {
      parameter.elementJson['virtualannotationreference'] = '';
      if(this.vartialRefId){
        this.deleteVirtualAnnotation.emit(this.vartialRefId);
      }
    }

    if(this.isUpdateElement){
      parameter.elementJson["elementid"] = this.currElementId;
      this._pvgfpService.updateElement(parameter).subscribe(response => {
        if(JSON.parse(response['_body']).elementtype === 'virtual'){
          this.createVirtualAnnot.emit(newAnnotId);
        }
        var currElement = this.currGroupJSON.annotations.find(annot => annot.annotation.annotid === this.currAnnotId).annotation.datastring.elements.find(elem => elem.elementid == this.currElementId);
        var index = this.currGroupJSON.annotations.find(annot => annot.annotation.annotid === this.currAnnotId).annotation.datastring.elements.indexOf(currElement);
        this.currGroupJSON.annotations.find(annot => annot.annotation.annotid === this.currAnnotId).annotation.datastring.elements[index] = JSON.parse(response['_body'])
        this.updatedGroupJson.emit(this.currGroupJSON);
        this._pvgfpService.showSuccess("The Element Update successfully", 2000);
      })
    }
    else {
      this.saveElementJSON(parameter);
    }
    this.openElementListTab.emit();
    this.hideAll();
  }

  saveElementJSON(parameter){
    var newAnnotId = (parseInt(this.maxAnnotId)+1).toString();
    parameter.elementJson["elementid"] = this.maxElementId;
    parameter.elementJson['jsonkeyname'] = "" //hardcoded
    parameter.elementJson["elementorder"] = this.maxElementId - 1000;
    this._pvgfpService.addElement(parameter).subscribe(response => {
      if(response.elementtype === 'virtual'){
        this.createVirtualAnnot.emit(newAnnotId);
      }
      this.currGroupJSON.annotations.find(annot => annot.annotation.annotid === this.currAnnotId).annotation.datastring.elements.push(response);
      this.updatedGroupJson.emit(this.currGroupJSON);
      this._pvgfpService.showSuccess('Added Element Successfully!', 2000);
    })
  }

  hideAll(){
    this.toggleFields('alwaysafter',false,'');
    this.toggleFields('alwaysbefore',false,'');
  }

  changeEleForm(changedField){
    if(changedField.target.name === 'elementtype'){
      if(changedField.target.value === 'virtual'){
        this.showOrHide(false);
      }
      else if(changedField.target.value === 'referenceonly'){
        
      }
      else{
        this.showOrHide(true)
      }
      return
    }
    this.toggleFields(changedField.target.name, changedField.target.checked, changedField.target.value);
  }

  toggleFields(fieldName, isChecked, value){
    if(fieldName === 'elemententity'){
      if(!value){
        return
      }
      this.entityType = this.entityList.find(ele => ele.id === value).type;
      this.parentEntity = this.entityList.find(ele => ele.id === value).parent;
      this.pvgfpFields.find(ele => ele.fieldName === 'elementname').options = this._exchangeDataService.setElementName(this.entityList, value);
    }
    if(fieldName === 'alwaysafter'){
      if(isChecked){
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysafter_afterentityname').isVisibleByDefault = true;
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysafter_aftermarkerstring').isVisibleByDefault = true;
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysafter_afterdelimiterpostionno').isVisibleByDefault = true;
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysafter_afterdelimiterstring').isVisibleByDefault = true;
      }
      else{
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysafter_afterentityname').isVisibleByDefault = false;
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysafter_aftermarkerstring').isVisibleByDefault = false;
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysafter_afterdelimiterpostionno').isVisibleByDefault = false;
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysafter_afterdelimiterstring').isVisibleByDefault = false;
      }
    }
    if(fieldName === 'alwaysbefore'){
      if(isChecked){
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysbefore_beforeentityname').isVisibleByDefault = true;
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysbefore_beforemarkerstring').isVisibleByDefault = true;
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysbefore_beforedelimiterpostionno').isVisibleByDefault = true;
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysbefore_beforedelimiterstring').isVisibleByDefault = true;
      }
      else{
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysbefore_beforeentityname').isVisibleByDefault = false;
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysbefore_beforemarkerstring').isVisibleByDefault = false;
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysbefore_beforedelimiterpostionno').isVisibleByDefault = false;
        this.pvgfpFields.find(ele => ele.fieldName === 'alwaysbefore_beforedelimiterstring').isVisibleByDefault = false;
      }
    }
  }

  showOrHide(showFields){
    this.pvgfpFields.find(ele => ele.fieldName === 'elemententity').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'elementname').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'dstoentityassociationtype').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'datatype').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'alwayspresent').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldId === 'matchingparent').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldId === 'secondaryassociations').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'associationoperation').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'matchesvaluemap_valuemapid').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'matchesvaluemap_simplevaluemap').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'matchesvaluemap_matchingtype').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'matchesvaluemap_advtransformationexpression').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'matchesvaluemap_appendstring').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'matchesvaluemap_prependstring').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'matchesvaluemap_nomatchdefault').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'alwaysafter').isVisibleByDefault = showFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'alwaysbefore').isVisibleByDefault = showFields;
  }

  updateCurrElement(currElementJSON){
    this.currElementId = currElementJSON.elementid;
    this._exchangeDataService.getDataToPopulate(currElementJSON, this.pvgfpFields);
    this.showConditionalFields();
    this.isUpdateElement = true;
    if(currElementJSON.elementtype === "virtual"){
      this.showOrHide(false);
      this.vartialRefId = currElementJSON.virtualannotationreference;
    }else {
      this.showOrHide(true);
    }
    document.getElementById('btnDataElementCTA').innerHTML = "Update Element";
    this.matchingParentElementList = currElementJSON.matchingparentelement;
    this.secondaryAssociation = currElementJSON.secondaryassociations;
    this.sendBackMatchingParent.emit(this.matchingParentElementList);
    this.sendBackSecoundaryAssociations.emit(this.secondaryAssociation);
  }

  showConditionalFields(){
    var listOfHiddenFields = ["elemententity", "alwaysafter", "alwaysbefore"]
    for(let i = 0; i < listOfHiddenFields.length; i++){
      let x = this.pvgfpFields.find(ele => ele.fieldName === listOfHiddenFields[i]);
      this.toggleFields(listOfHiddenFields[i], x.defaultValue, x.defaultValue);
    }
  }

  populateSelectedString(selectedString){
    this.pvgfpFields[0].defaultValue = selectedString;
  }

  getEntityElements(data) {
    this._exchangeDataService.setElementEntity(this.pvgfpFields, data);
    this.entityList = data;
  };

  addNextElement(){
    this.isUpdateElement = false;
    document.getElementById('btnDataElementCTA').innerHTML = "Add Element";
    this.appendOptions(this.allElementList);
    this.sendBackMatchingParent.emit(null);
    this.sendBackSecoundaryAssociations.emit(null);
  }

  addElementToList(element){
    var temp = element.elemententity+'.'+element.elementname;
    this.allElementList.push({"id":temp, "text":temp});
  }

  setAfterBeforeOptions(elementList){
    this.allElementList = [];
    for(let i = 0; i<elementList.length; i++){
      let temp = elementList[i].elemententity+'.'+elementList[i].elementname
      this.allElementList.push({"id":temp, "text":temp});
    }
    this.appendOptions(this.allElementList)
  }

  appendOptions(options){
    this.pvgfpFields.find(ele => ele.fieldName === 'alwaysafter_afterentityname').options = options;
    this.pvgfpFields.find(ele => ele.fieldName === 'alwaysbefore_beforeentityname').options = options;
  }

  updatingElementIndex(elementList, index){
    var temp = elementList.slice(0, elementList.length);
    temp.splice(index, 1);
    this.appendOptions(temp);
  }

}
