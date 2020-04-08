import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class PvgfpService {
  jsonValue: string;

  private apiURL: string = 'http://localhost:3000/api/';
  constructor(private http: Http, private toastr: ToastrService) { }

  getFormList() {
    return this.http.get(this.apiURL+'getForms')
    .map(response => response.json());
  }

  pdfToPng(formData){
    return this.http.post(this.apiURL+'PDFtoPNG', formData)
    .map(response => response.json());
  }

  getDataString(data){
    return this.http.get(this.apiURL+'OCRExtractor', {search: data})
    .map(response => response.json());
  }

  loadFieldMetaData() {
    return this.http.get(this.apiURL+'LoadFieldMetaData')
    .map(response => response.json());
  }

  getEntity() {
    return this.http.get(this.apiURL+'LoadMetaData')
    .map(response => response.json());
  }

  getValuemapIDs() {
    return this.http.get(this.apiURL+'GetValueMapIds')
      .map(response => response.json());
  }

  getForm(formid){
    var formID = {
      "formid":formid
    }
    return this.http.get(this.apiURL+'LoadForm',{search:formID})
    .map(response => response.json());
  }

  callAddGroupAPI(formId, groupId, data){
    const body = new FormData();
    body.set('group', JSON.stringify(data));
    this.http.post(this.apiURL+'AddGroup/'+formId+'/'+groupId, body).subscribe(message => {
      },
      (err) => {
        console.log(err)
      }
    )
  }

  updateGroup(formId, groupId, data){
    const body = new FormData();
    body.set('group', JSON.stringify(data));
    return this.http.post(this.apiURL+'SetGroup/'+formId+'/'+groupId, body);
  }

  getAllGroup(formId){
    return this.http.get(this.apiURL+'GetAllGroups/'+formId)
    .map(response => response.json());
  }

  getGroup(formId, groupId){
    return this.http.get(this.apiURL+'GetGroup/'+formId+'/'+groupId)
    .map(response => response.json());
  }

  moveAnnotation(data){
    const body = new FormData();
    body.set('togroupid', data.newGroup);
    body.set('annotationid', data.annotId);
    return this.http.post(this.apiURL+'MoveAnnotation/'+data.formId+'/'+data.groupId, body)
  }

  addAnnotationToGroup(data){
    const body = new FormData();
    body.set('annotation', JSON.stringify(data.annotationJson));
    return this.http.post(this.apiURL+'AddAnnotation/'+data.formId+'/'+data.groupId,body)
    .map(response => response.json());
  }

  deleteAnnotation(data){
    return  this.http.delete(this.apiURL+'SetAnnotation/'+data.formId+'/'+data.annotationId)
  }

  addElement(data){
    const body = new FormData();
    body.set('element', JSON.stringify(data.elementJson));
    return this.http.post(this.apiURL+'AddElement/'+data.formId+'/'+data.groupId+'/'+data.annotationId, body)
    .map(response => response.json());
  }

  deleteForm(formId){
    return this.http.delete(this.apiURL+'DeleteForm/'+formId);
  }

  deleteElement(data){
    return this.http.delete(this.apiURL+'SetElement/'+data.formId+'/'+ data.groupId+'/'+data.annotationId+'/'+data.elementId);
  }

  updateAnnotation(data){
    const body = new FormData();
    body.set('annotation',JSON.stringify(data.annotationJson));
    return this.http.post(this.apiURL+'SetAnnotation/'+data.formId+'/'+data.annotationJson.annotation.annotid, body)
  }

  setKeymapValue(formid, groupId, annotid, data){
    const body = new FormData();
    body.set('keymap', JSON.stringify(data));
    this.http.post(this.apiURL+'SetSimpleKeyMap/'+formid+'/'+groupId+'/'+annotid, body).subscribe(message => {
      console.log("Key Map saved successfully");
    });
  }

  updateElement(data){
    const body = new FormData();
    body.set('element',JSON.stringify(data.elementJson));
    return this.http.post(this.apiURL+'SetElement/'+data.formId+'/'+data.groupId+'/'+data.annotationId+'/'+data.elementJson.elementid, body)
  }

  showSuccess(message, delay) {
    this.toastr.success(message, '',{
      timeOut: delay || '3000',
      positionClass: 'toast-top-center'
    });
  }

  showError(message, delay) {
    this.toastr.error(message, '',{
      timeOut: delay || 3000,
      positionClass: 'toast-top-center'
    });
  }

  processForm(formId, data){
    const body = new FormData();
    body.set('form_id', formId);
    body.set('file1', data);
    return this.http.post(this.apiURL+'ProcessForm/',body);
  }
}
