import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})

export class ExchangeDataService {
  @Output() isOpenModal: EventEmitter<boolean> = new EventEmitter();

  groupId;
  formattedData = {};
  allGroupList;
  allPageList;
  currAnnotParams;
  currAnnotIndex:number;
  prevIndex:number;
  currPngPageNumber:number;
  elemTempStr: string;
  isEmptyDataStringPresent = false
  emptyDataString:any;
  blankDataString:any
  public currAnnotType: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor() { }

  setAnnotType(value: string){
    this.currAnnotType.next(value);
  }

  modalBox(data){
    this.isOpenModal.emit(data)
  }

  saveNewGroupId(id){
    this.groupId = id;
  }

  //Very Important - parse the formData to required formate. //It can be optimise
  setJsonFormate(data){
    var formData = data;
    for(var key in formData){
      if(!key.includes('_')){
        this.formattedData[key] = formData[key];
        delete formData[key];
      }
    }
    this.reArrangename(formData);
    // We can call this function recursively for more than two level
    // this.setJsonFormate(this.formattedData);
    return this.formattedData;
  }

  reArrangename(data){
    var formData = data;
    for(var key in data){
      var nameArray = key.split('_');
      this.formattedData[nameArray[0]] = {}
    }

    for(var key in data){
      var nameArray = key.split('_');
      this.formattedData[nameArray[0]][nameArray[1]] = formData[key];
      delete formData[key];
    }
  }

  setToFormData(json){
    var returnedData = {}
    for(var key in json){
      if(typeof(json[key]) !== "object" || (Array.isArray(json[key]))){
        returnedData[key] = json[key]
      }
      else {
        returnedData[key] = false;
        for(var child in json[key]){
          if(json[key][child] !== "" && json[key][child] !== false && !json[key][child]){
            returnedData[key] = true;
          }
          returnedData[key+'_'+child] = json[key][child];
        }
      }
    }
    return returnedData;
  }

  saveAllGroupList(allGroupList){
    this.allGroupList = allGroupList;
  }

  getDataToPopulate(formData, fields){
    if(formData){
      for(var i = 0; i < fields.length; i++){
        var tempName = fields[i].fieldName;
        var type = fields[i].type;
        if(tempName in formData && type != 'button'){
          fields[i].defaultValue = formData[tempName];
        }
      }
    }
    return fields;
  }

  setElementEntity( elementFields, data){
    elementFields.find(ele => ele.fieldName === 'elemententity').options = data;
  }

  setElementName(message, elementEntity){
    if(elementEntity){
      return message.find(ele => ele.id === elementEntity).elements;
    }
  }

  saveDataStringType(){
    return [
      {
          "id": "image",
          "text": "Image"
      },
      {
          "id": "freetext",
          "text": "Free Text"
      },
      {
          "id": "paragraph",
          "text": "Paragraph"
      },
      {
          "id": "setofrows_borderedtable",
          "text": "Bordered Table"
      },
      {
        "id": "setofrows_virtualtable",
        "text": "Virtual Table"
      },
      {
          "id": "delimited",
          "text": "Delimited"
      },
      {
        "id": "keyvaluepairs_keymapid",
        "text": "Key Value Pair"
      }
    ]
  }

  getShortcutTools(){
    return [
      {
        "label": "Paragraph",
        "value": "paragraph",
        "class": "",
        "icon": "md md-alpha-p-box-outline",
        "iconText": "",
        "active": false
      },
      {
        "label": "Set Of Rows",
        "value": "setofrows",
        "class": "",
        "icon": "md md-alpha-s-box-outline",
        "iconText": "",
        "active": false
      },
      {
        "label": "Free Text",
        "value": "freetext",
        "class": "",
        "icon": "md md-alpha-f-box-outline",
        "iconText": "",
        "active": false
      },
      {
        "label": "Key Value Pairs",
        "value": "keyvaluepairs",
        "class": "",
        "icon": "md md-alpha-k-box-outline",
        "iconText": "",
        "active": false
      },
      {
        "label": "Image",
        "value": "image",
        "class": "",
        "icon": "md md-alpha-i-box-outline",
        "iconText": "",
        "active": false
      },
      {
        "label": "Delimeter",
        "value": "delimited",
        "class": "",
        "icon": "md md-alpha-d-box-outline",
        "iconText": "",
        "active": false
      }
    ]
  }

  saveAllPageLink(pageLinkArray){
    this.allPageList = pageLinkArray;
  }

  saveCurrAnnotationsData(params){
    this.currAnnotParams = params;
    console.log(this.currAnnotParams);
  }

  currAnnotationIndex(index){
    if(this.currAnnotIndex){
      this.prevIndex = this.currAnnotIndex;
    }
    this.currAnnotIndex = index;
  }

  saveCurrPngPageNumber(pageNumber){
    this.currPngPageNumber = pageNumber
  }

  saveElemTempStr(elemTempStr){
    this.elemTempStr = elemTempStr;
    console.log(this.elemTempStr);
  }

  saveEmptyDataString(emptyForm){
    var dataString = this.setJsonFormate(emptyForm);
    this.formattedData = {};
    this.isEmptyDataStringPresent = true;
    this.emptyDataString = {
      'datastring': dataString,
      'annotid': '',
      'annotcoordinates': '',
      'annotationmatrix': false,
      'matrixcoordinates': [''],
      'startpage': '',
      'annotationtype':'virtual'
    }
  }

  setEmptyDatastring(annotid){
    this.blankDataString = {
      'datastring': {},
      'matrixcoordinates' : [],
      'annotid' : annotid,
      'annotcoordinates':'',
      'annotationmatrix':false,
      'startpage': this.currPngPageNumber,
      'annotationtype' : 'virtual'
    }
    return this.blankDataString;
  }

  
}
