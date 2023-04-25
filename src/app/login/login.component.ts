import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Models} from './../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Models]
})
export class LoginComponent{
  in;
  err;
  public form: FormGroup;
  constructor(public fb: FormBuilder, private models: Models,private _router: Router) {
    this.in = this.models.Usuario();
    this.err = this.models.Usuario();
    this.form = this.fb.group({
      'id':[''],
      'usuario':['',[Validators.required]],
      'password':['',[Validators.required]],
    })
   }

 
  ngOnInit(): void {
    if(localStorage.getItem("user")!=null){
      this._router.navigate(["/"]); 
    }
  }

  submit(){
    console.log(this.in);
  }



}
