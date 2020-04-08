import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PvgfpService } from '../../service/pvgfp.service';
import { DynamicFormComponent } from '../form/dynamic-form/dynamic-form.component';
import { ExchangeDataService } from '../../service/exchange-data.service';
import { PvgfpMatrixCoordinatesComponent  } from '../pvgfp-matrix-coordinates/pvgfp-matrix-coordinates.component';

@Component({
  selector: 'app-pvgfp-group-data-string',
  templateUrl: './pvgfp-group-data-string.component.html',
  styleUrls: ['./pvgfp-group-data-string.component.css']
})

export class PvgfpGroupDataStringComponent implements OnInit {
  dsForm: FormGroup;
  pvgfpFields: any;
  isUpdateAnnotation:boolean = false;
  matrixCoordinates = [];
  @Input() formId;
  @Input() currGroupId;
  @Input() currAnnotId;
  @Input() currAnnotationJSON;
  @Input() valueMaps: any;
  @Input() keyValueMap: any;
  @Input() currGroupJSON:any;
  @Input() currentAnnotationData:any;
  @Output() currValuemapId: any = new EventEmitter();

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  @ViewChild (PvgfpMatrixCoordinatesComponent) matrixCoordinnate : PvgfpMatrixCoordinatesComponent;

  constructor(
    private _pvgfpService: PvgfpService,
    private _exchandedataService: ExchangeDataService
  ) { }

  ngOnInit() {
  }

  getFields(dsFields){
    this.pvgfpFields = dsFields;
    this.pvgfpFields.find(ele => ele.fieldName === 'datastringtype').options = this._exchandedataService.saveDataStringType()
  }

  dataStringSave(event) {
    var index = this._exchandedataService.currAnnotIndex;
    var annotationJSON = this.newJSON(this._exchandedataService.setJsonFormate(event));
    var params = {
      "annotationJson" : annotationJSON,
      "formId" : this.formId,
      "groupId" : this.currGroupId
    }
    if(this.isUpdateAnnotation){
      params.annotationJson.annotation.datastring['elements'] = this.currGroupJSON.annotations[index].annotation.datastring.elements;
      this._pvgfpService.updateAnnotation(params).subscribe(response => {
        this.updateGroupJsonLocally(JSON.parse(response['_body']), index)
        this._pvgfpService.showSuccess("Annotation's datastring properties saved successfully!", 2000);
      })
    }
    else{
      this.saveAnnotation(params, index);
    }
    this.hideAll("reset");
  }

  saveAnnotation(params, index){
    this._pvgfpService.addAnnotationToGroup(params).subscribe(response => {
      this.updateGroupJsonLocally(response, index);
      this._pvgfpService.showSuccess("Annotation's datastring properties saved successfully!", 2000)
    })
  }

  updateGroupJsonLocally(data, index){
    this.currGroupJSON.annotations[index] = data;
  }

  newJSON(arrangedDataString) {
    arrangedDataString.elements = [];
    var params = this._exchandedataService.currAnnotParams;
    var annotation = {
      annotation: {
        "datastring": arrangedDataString
      }
    }
    annotation.annotation['annotid'] = this.currAnnotId;
    annotation.annotation['annotcoordinates'] = params.coord;
    annotation.annotation['annotationmatrix'] = this.isMatrixAnnot();
    annotation.annotation['matrixcoordinates'] = this.getMatrixCoordinates();
    annotation.annotation['startpage'] = params.pageNumber;
    if(!params.coord){
      annotation.annotation['annotationtype'] = 'virtual';
    } else if(params.coord && typeof(params.coord) != 'object'){
      annotation.annotation['annotationtype'] = 'simple';
    } else {
      annotation.annotation['annotationtype'] = 'matrix';
    }
    annotation.annotation.datastring["keyvaluepairs"]["simplekeymap"] = this.keyValueMap || [];

    var datastringType = annotation.annotation.datastring["datastringtype"];
    if(datastringType === 'image' || datastringType === 'paragraph' || datastringType === 'freetext' || datastringType === 'delimited'){
      annotation.annotation.datastring[datastringType] = true;
    }
    else if(datastringType === 'keyvaluepairs_keymapid'){
      annotation.annotation.datastring['keyvaluepairs']['keyvaluepair'] = true;
    }
    else if(datastringType === 'setofrows_borderedtable'){
      annotation.annotation.datastring['setofrows']['borderedtable'] = true;
      annotation.annotation.datastring['setofrows']['virtualtable'] = false;
    }
    else if(datastringType === 'setofrows_virtualtable'){
      annotation.annotation.datastring['setofrows']['borderedtable'] = false;
      annotation.annotation.datastring['setofrows']['virtualtable'] = true;
    }

    if(this.keyValueMap || annotation.annotation.datastring["keyvaluepairs"]["keymapid"]){
      annotation.annotation.datastring["keyvaluepairs"]["matchesvaluemap"] = true;
    } else{
      annotation.annotation.datastring["keyvaluepairs"]["matchesvaluemap"] = false;
    }
    return annotation;
  }

  isMatrixAnnot(){
    if(this.matrixCoordinates.length){
      return true;
    } else{
      return false;
    }
  }

  getMatrixCoordinates(){
    if(this.matrixCoordinates.length){
      return this.matrixCoordinates;
    } else{
      return [''];
    }

  }

  changeDSForm(changedField){
    if(changedField.target.name === 'datastringtype'){
      this.hideAll(null);
      this.toggleFields(changedField.target.value, true);
    }
    if(changedField.target.name === 'continued'){
      this.toggleFields(changedField.target.name, changedField.target.checked);
    }
  }

  hideAll(reset){
    this.toggleFields('setofrows_borderedtable', false);
    this.toggleFields('setofrows_virtualtable', false);
    this.toggleFields('delimited', false);
    this.toggleFields('keyvaluepairs_keymapid', false);
    if(reset){
      this.toggleFields('continued', false);
    }
  }

  toggleFields(fieldname, isChecked){
    if(fieldname){
      if(fieldname === 'continued'){
        if(isChecked){
          this.pvgfpFields.find(ele => ele.fieldName === 'continued_continuedelsewhere').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'continued_continuationsymbol').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'continued_continuationheader').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'continued_continuationfooter').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'continued_continuationtype').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'continued_appearsonlyoncontinuationsheet').isVisibleByDefault = true;
        } else {
          this.pvgfpFields.find(ele => ele.fieldName === 'continued_continuedelsewhere').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'continued_continuationsymbol').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'continued_continuationheader').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'continued_continuationfooter').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'continued_continuationtype').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'continued_appearsonlyoncontinuationsheet').isVisibleByDefault = false;
        }
      }
      if(fieldname === 'setofrows_borderedtable' || fieldname === 'setofrows_virtualtable'){
        if(isChecked){
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_rowseparator').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_columnseparator').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_rowdelimiter').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_columndelimiter').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_tableheader').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_columnnames').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_tableheaderseparator').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_tablestartstring').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_tableendstring').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_repeatingtableheader').isVisibleByDefault = true;
        } else {
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_rowseparator').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_columnseparator').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_rowdelimiter').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_columndelimiter').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_tableheader').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_columnnames').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_tableheaderseparator').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_tablestartstring').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_tableendstring').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'setofrows_repeatingtableheader').isVisibleByDefault = false;
        }
      }
      if(fieldname === 'delimited') {
        if (isChecked) {
          this.pvgfpFields.find(ele => ele.fieldName === 'stringdelimiters').isVisibleByDefault = true;
        } else {
          this.pvgfpFields.find(ele => ele.fieldName === 'stringdelimiters').isVisibleByDefault = false;
        }
      }
      if(fieldname === 'keyvaluepairs_keymapid'){
        var keyValuePair = this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_keymapid');
        var keyPairs = this.pvgfpFields.find(ele => ele.fieldId === 'keyvalpairs');
        if(isChecked){
          keyValuePair.options = this.valueMaps;
          keyValuePair.isVisibleByDefault = true;
          keyPairs.isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_extractionstartposition').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_extractionendposition').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_keystartposition').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_valueendposition').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_extractionstartstring').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_extractionendstring').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_keyvalueseperator').isVisibleByDefault = true;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_formkeylist').isVisibleByDefault = true;
          this.currValuemapId.emit(keyValuePair.defaultValue);
        } else{
          keyValuePair.isVisibleByDefault = false;
          keyPairs.isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_extractionstartposition').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_extractionendposition').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_keystartposition').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_valueendposition').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_extractionstartstring').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_extractionendstring').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_keyvalueseperator').isVisibleByDefault = false;
          this.pvgfpFields.find(ele => ele.fieldName === 'keyvaluepairs_formkeylist').isVisibleByDefault = false;
        }
      }
    }
  }

  updateCurrAnnotationJSON(modifiedJSON){
    modifiedJSON = modifiedJSON.datastring;
    if(modifiedJSON.name){
      this._exchandedataService.getDataToPopulate(modifiedJSON, this.pvgfpFields);
      this.showConditionalFields(modifiedJSON);
      this.isUpdateAnnotation = true;
      document.getElementById('btnDataStringCTA').innerHTML = "Update Data String"
    }else{
      this.isUpdateAnnotation = false;
      document.getElementById('btnDataStringCTA').innerHTML = "Save Data String"
    }
  }

  populateDatastringName(name){
    this.pvgfpFields[0].defaultValue = name;
  }

  showConditionalFields(modifiedJSON){
    var x = this.pvgfpFields.find(ele => ele.fieldName === 'continued');
    this.toggleFields('continued', x.defaultValue);

    var listOfHiddenFields = ["setofrows_virtualtable", "setofrows_borderedtable","delimited", "keyvaluepairs_keymapid", "paragraph", "freetext", "image"];
    for(let i = 0; i < listOfHiddenFields.length; i++){
      if(modifiedJSON[listOfHiddenFields[i]]){
        this.pvgfpFields.find(ele => ele.fieldName === 'datastringtype').defaultValue = listOfHiddenFields[i];
      }
      let x = this.pvgfpFields.find(ele => ele.fieldName === listOfHiddenFields[i]);
      this.toggleFields(listOfHiddenFields[i], x.defaultValue);
    }
  }

  isNameReadOnly(value){
    if(value){
      this.pvgfpFields.find(ele => ele.fieldName === 'name').defaultValue = '';
    }
    this.pvgfpFields.find(ele => ele.fieldName === 'name').otherProperties.readOnly = value;
  }

  addCoordinateToMatrix(coordinate){
    this.matrixCoordinnate.addCoordinateToList(coordinate);
  }

}
