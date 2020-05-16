import { Component, OnInit } from '@angular/core';
import { ApiCallService  } from '../../service/api-call.service';
import { LocalCommunicationService } from '../../service/local-communication.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-ls-login',
  templateUrl: './ls-login.component.html',
  styleUrls: ['./ls-login.component.css']
})
export class LsLoginComponent implements OnInit {
  emailOrUsername: string
  password: string;
  user

  constructor(
    private _apiCallService: ApiCallService,
    private _localCommunicationService: LocalCommunicationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.user = this._apiCallService.login({emailOrUsername: this.emailOrUsername, password:this.password});
    this._localCommunicationService.setUser(this.user);
  }

  logout(){
    this.user = {}
    this._localCommunicationService.setUser(this.user);
  }

  forgetPassword(){
    this.router.navigateByUrl('forgetPassword');
  }

  navigateToSignupPage(){
    this.router.navigateByUrl('signup');
  }

}
