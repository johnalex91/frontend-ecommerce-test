import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Models} from './../models';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css'],
  providers: [Models]
})
export class CuentaComponent{
  in;
  err;
  public form: FormGroup;
  constructor(public fb: FormBuilder, private models: Models, private router:Router) {
    this.in = this.models.Usuario();
    this.err = this.models.Usuario();
    this.form = this.fb.group({
      'id':[''],
      'usuario':['',[Validators.required]],
      'password':['',[Validators.required]],
      'email':['',[Validators.required]],
      'confirmpassword':['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  verifypassword(){
    var button = (document.getElementById('buttonsubmit')as HTMLButtonElement)
    if(this.in.password !=  this.in.confirmpassword){     
      button.disabled = true;
    }else{
      if(this.form.invalid){
        button.disabled = false;
      }      
    }
  }

  validemail(){
    var button = (document.getElementById('buttonsubmit')as HTMLButtonElement)
    var emailRegex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (emailRegex.test(this.in.email)) {
      button.disabled = true;
    } else {
      if(this.form.invalid){
        button.disabled = false;
      }
    }
  }

  openmodal(){
    $('#exampleModal').modal('show');
  }

  redireccionar(){
    setTimeout(() => {
      this.router.navigate(['/inicio']);
    }, 2000);
  }
}
