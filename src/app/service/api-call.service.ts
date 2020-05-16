import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  user = {"firstName":"admin","lastName":"admin","username":"admin","password":"admin","id":1};

  constructor() { }

  login(params){
    this.user.username = params.emailOrUsername;
    this.user.password = params.password;
    return this.user;
  }

}
