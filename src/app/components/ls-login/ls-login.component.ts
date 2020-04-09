import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ls-login',
  templateUrl: './ls-login.component.html',
  styleUrls: ['./ls-login.component.css']
})
export class LsLoginComponent implements OnInit {
  loginForm:FormGroup

  constructor(
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username : new FormControl(''),
      password : new FormControl('')
    })
  }

  onSubmit(){
    console.log(this.loginForm.value);
  }

  forgetPassword(){
    console.log("forgetPassWord");
  }

}
