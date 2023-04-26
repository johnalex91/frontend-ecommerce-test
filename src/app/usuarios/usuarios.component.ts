import { Component, OnInit } from '@angular/core';
import {Models,User} from './../models';
import {Service} from './../service';
import Swal from 'sweetalert2'
import { HttpParams } from '@angular/common/http'
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [Models,Service]
})
export class UsuariosComponent implements OnInit {
  user = "";
  login=true;
  loading=true;
  url="api/user/";
  list:User[]=[];

  constructor(private _service: Service,private _router: Router) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(){
    const params = new HttpParams()
    this._service
    .getGetJson(this.url, params).subscribe((data:any) => {
      this.list = data;
      this.loading=false;
    });
  }

  deleteUser(data:any,index:number){
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
          Swal.fire('Usuario Eliminado', '', 'success')
            this.getUsuario();
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }



}
