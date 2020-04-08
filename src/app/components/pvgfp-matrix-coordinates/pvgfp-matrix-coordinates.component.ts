import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pvgfp-matrix-coordinates',
  templateUrl: './pvgfp-matrix-coordinates.component.html',
  styleUrls: ['./pvgfp-matrix-coordinates.component.css']
})
export class PvgfpMatrixCoordinatesComponent implements OnInit {
  @Input() coordinateList:any;

  constructor() { }

  ngOnInit() {
  }

  getCoordinate(index){
    let currCoordinate = this.coordinateList[index];
    console.log(currCoordinate);
  }

  deleteCoordinate(index){
    this.coordinateList.splice(index, 1);
  }

  addCoordinateToList(coordinate){
    this.coordinateList.push(coordinate);
  }

}
