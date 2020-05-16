import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../../service/api-call.service'

@Component({
  selector: 'app-ls-forget-password',
  templateUrl: './ls-forget-password.component.html',
  styleUrls: ['./ls-forget-password.component.css']
})
export class LsForgetPasswordComponent implements OnInit {

  isValidUserName: boolean = false;
  email:string;
  password: string;
  confirmPassword:string;

  constructor(
    private router: Router,
    private _apiCallService: ApiCallService
  ) { }

  ngOnInit() {
  }

  onEmailSubmit(){
    console.log(this.email);
    var isValidEmail = this._apiCallService.checkEmail(this.email);
    if(isValidEmail){
      this.isValidUserName = true;
    }
  }

  resetPassword(){
    this._apiCallService.resetpassword({email:this.email, password:this.password});
  }

  navigateToLoginPage(){
    this.router.navigateByUrl('login');
  }

}
