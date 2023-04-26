import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Models} from './../models';
import {Service} from './../service';
import Swal from 'sweetalert2'
import { HttpParams } from '@angular/common/http'
import {Router,ActivatedRoute } from "@angular/router"

declare var $: any;

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css'],
  providers: [Models,Service],  
})
export class CuentaComponent{
  in;
  err;
  public form: FormGroup;
  confirmpassword="";
  url="api/user";
  constructor(private route: ActivatedRoute,public fb: FormBuilder, private models: Models,private _service: Service,private _router: Router) {
    this.in = this.models.User();
    this.err = this.models.User();
    this.form = this.fb.group({
      'username':['',[Validators.required]],
      'password':['',[Validators.required]],
      'email':['',[Validators.required]],
      'confirmpassword':['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    if(localStorage.getItem("user")!=null && localStorage.getItem("token")!=null){
      this._router.navigate(["/"]); 
      //window.location.assign('/');
    }    
  }

  verifypassword(){
    var button = (document.getElementById('buttonsubmit')as HTMLButtonElement)
    if(this.in.password !=  this.confirmpassword){     
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
      this._router.navigate(['/inicio']);
    }, 2000);
  }

  submit(){
    this._service
    .getPostJson(this.url+"/create", this.in).subscribe((data:any) => {
        console.log(data);
        if(data.data == "NONE"){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'El usuario y/o email ya se encuentra registrados',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro Exitoso',
            showConfirmButton: false,
            timer: 1500
          })
          this._router.navigate(["/login"]);     
        }
    });
  }

}
