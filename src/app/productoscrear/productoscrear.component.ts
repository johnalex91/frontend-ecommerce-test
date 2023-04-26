import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Models} from './../models';
import {Service} from './../service';
import Swal from 'sweetalert2'
import { HttpParams } from '@angular/common/http'
import {Router,ActivatedRoute } from "@angular/router"

declare var $: any;
declare var require: any;
declare var document: any;

@Component({
  selector: 'app-productoscrear',
  templateUrl: './productoscrear.component.html',
  styleUrls: ['./productoscrear.component.css'],
  providers: [Models,Service],  
})

export class ProductoscrearComponent{
  in;
  err;
  url="api/product"
  public form: FormGroup;
  id=0;
  files=[];
  imagen="";
  loading=true;
  urlImage = "";
  constructor(private route: ActivatedRoute,public fb: FormBuilder, private models: Models,private _service: Service,private _router: Router) {
    this.in = this.models.Product();
    this.err = this.models.Product();
    this.form = this.fb.group({
      'name':['',[Validators.required]],
      'reference':['',[Validators.required]],
      'category':['',[Validators.required]],
      'quantity':['',[Validators.required]],
      //'image':['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    this.urlImage = this._service.getUrl();
    this.id = parseInt(this.route.snapshot.paramMap.get("id")||"");
    if(this.id != 0){
      this.getEdit(this.id);
    }else{
      this.in.id = 0;
      this.loading=false;
    }
    // console.log(this.in.nombre);
  }

  makeToFiles(fileInput: any) {
    this.previewFile();
    this.files = fileInput.target.files;
  }

  previewFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];

    var reader = new FileReader();

    reader.onloadend = function () {
      $('#imagen-blob').attr("src", reader.result);
      $('.target-preview').attr('src', reader.result);
      $('.target-preview').css({ 'display': 'block', 'width': '100%' });
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  getEdit(id:number){
    const params = new HttpParams()
    this._service
    .getGetJson(this.url+"/"+id,params).subscribe((data:any) => {
      this.in = data.data
      this.loading=false;
    }); 
  }

  submit(){
    this._service
    .getPostJson(this.url+"/create", this.in).subscribe((data:any) => {
      console.log(data.data.id);
      this._service.getUpload(this.url+"/upload", this.files[0],data.data.id).then((e)=>{
        
      }).catch(e => {
        console.log(e);
    });
    this._router.navigate(["/admin/productos"]); 
        
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro Exitoso',
          showConfirmButton: false,
          timer: 1500
        })
  
    });
  }

  setDefaultSrc(){
    this.imagen = "./assets/imagen.jpg";
  }

}