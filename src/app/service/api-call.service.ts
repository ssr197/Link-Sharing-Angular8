import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  allUserList = [{"firstName":"admin","lastName":"admin","userName":"admin","dateOfBirth":"1997-07-13","email":"admin@admin.com","password":"admin","id":1}];
  
  constructor() { }

  login(params){
    var currUser = this.allUserList.find(tempUser => (tempUser.userName === params.emailOrUsername || tempUser.email === params.emailOrUsername));
    if(currUser && currUser.password == params.password){
      return currUser;
    }
  }

  signUp(newUser){
    var id = this.allUserList[this.allUserList.length-1].id
    newUser.id = id+1;
    delete newUser.confirmPassword;
    this.allUserList.push(newUser);
  }

  checkEmail(email){
    var currUser = this.allUserList.find(tempUser => tempUser.email == email);
    if(currUser){
      return true;
    } else {
      return false;
    }
  }

  resetpassword(params){
    this.allUserList.find(tempUser => tempUser.email == params.email).password = params.password;
  }

}
