import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Models} from './../models';
import {Service} from './service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Models,Service]
})
export class LoginComponent{
  in;
  err;
  public form: FormGroup;
  constructor(private _service: Service,public fb: FormBuilder, private models: Models,private _router: Router) {
    this.in = this.models.Usuario();
    this.err = this.models.Usuario();
    this.form = this.fb.group({
      'id':[''],
      'usuario':['',[Validators.required]],
      'password':['',[Validators.required]],
    })
   }

 
  ngOnInit(): void {
    if(localStorage.getItem("user")!=null && localStorage.getItem("token")!=null){
      this._router.navigate(["/"]); 
      //window.location.assign('/');
    }
  }

  submit(){
    if(this.in.usuario=="admin"){
      localStorage.setItem("user","admin");
      localStorage.setItem("token","123456");
      this._router.navigate(["/admin"]);   
    }else{
      localStorage.setItem("user","jhon alexander");
      localStorage.setItem("token","123456");
      this._router.navigate(["/"]);   
    }
  }



}
