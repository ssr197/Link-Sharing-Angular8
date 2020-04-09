import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class PvgfpService {
  private apiURL: string = 'http://localhost:3000/api/';
  constructor(private http: Http, private toastr: ToastrService) { }
}
