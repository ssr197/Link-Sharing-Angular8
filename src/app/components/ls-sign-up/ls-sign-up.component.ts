import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ls-sign-up',
  templateUrl: './ls-sign-up.component.html',
  styleUrls: ['./ls-sign-up.component.css']
})
export class LsSignUpComponent implements OnInit {

  passwordIsFilled:boolean = false;
  passwordMatch:boolean = false;
  user = {
    firstName: '',
    lastName: '',
    userName: '',
    dateOfBirth: '',
    email: '',
    password:'',
    confirmPassword:''
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateToLoginPage(){
    this.router.navigateByUrl('login');
  }

  onSubmit(){
    console.log(this.user);
  }

}
