import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pvgfp-annotation-type-modal',
  templateUrl: './pvgfp-annotation-type-modal.component.html',
  styleUrls: ['./pvgfp-annotation-type-modal.component.css']
})
export class PvgfpAnnotationTypeModalComponent implements OnInit {
  closeResult: string;
  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  openAnnotationModal(){
    let element : HTMLElement = document.getElementById('annotationTypeModal') as HTMLElement;
    element.click();
  }

  open(content) {
    this.modalService.open(content);
  }
}
