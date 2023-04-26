import { Component, OnInit } from '@angular/core';
import {Models,Product} from './../models';
import {Service} from './../service';
import Swal from 'sweetalert2'
import { HttpParams } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [Models,Service]  
})
export class ProductosComponent implements OnInit {

  loading=true;
  url="api/product/";
  list:Product[]=[];

  constructor(private _service: Service,private _router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    const params = new HttpParams()
    this._service
    .getGetJson(this.url, params).subscribe((data:any) => {
      this.list = data.data;      
      this.loading=false;
    });
  }

  deleteProduct(data:any,index:number){
    const params = new HttpParams()

    Swal.fire({
      title: 'En verdad desea eliminar el registro?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonColor:"green",
      confirmButtonColor:"red"
    }).then((result) => {
      if (result.isConfirmed) {
        this._service
        .getDelete(this.url+data.id, params).subscribe((data:any) => {
          Swal.fire('Registro Eliminado', '', 'success')
            this.getProducts();
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
