import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PvgfpService } from '../../service/pvgfp.service';
import { PvgfpUploadFormComponent } from '../pvgfp-upload-form/pvgfp-upload-form.component';
import { PageTitleService } from '../../core/page-title/page-title.service';

@Component({
  selector: 'app-pvgfp-test-form',
  templateUrl: './pvgfp-test-form.component.html',
  styleUrls: ['./pvgfp-test-form.component.css']
})
export class PvgfpTestFormComponent implements OnInit {

  @ViewChild(PvgfpUploadFormComponent) upload:PvgfpUploadFormComponent;
  isTestPage:boolean;

  constructor(
    private router:Router,
    private pvgfpService : PvgfpService,
    private pageTitleService: PageTitleService
  ) { }

  ngOnInit() {
    var formId = this.getFormId();
    this.getFormDetails(formId);
  }

  ngAfterViewInit(){

  }

  getFormId(){
    this.isTestPage = this.router.url.includes("/form-test");
    return this.router.url.split("/form-test?formId=")[1];
  }

  getFormDetails(formId){
    this.pvgfpService.getForm(formId).subscribe(data => {
      this.upload.showTestPage(formId, data);
    });

  }

}
