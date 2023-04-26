import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Models,Product} from './../models';
import {Service} from './../service';
import Swal from 'sweetalert2'
import { HttpParams } from '@angular/common/http'
declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [Models,Service]
})
export class InicioComponent implements OnInit {

  login = false;
  user="";
  buys:Product[]=[];
  urlProduct='api/product/';
  loading=true;
  list: Product[] = [];;
  urlImage = "";




  constructor(private _service: Service,private _router: Router) { }

  ngOnInit(): void {
    this.urlImage = this._service.getUrl();

    console.log(localStorage.getItem("user"));
    if(localStorage.getItem("user")!=null && localStorage.getItem("token")!=null){
      //this._router.navigate(["/"]); 
      this.login=true;
      this.user = localStorage.getItem("user")+"";
    }
    if(localStorage.getItem("buys")!=null){
      this.buys = JSON.parse(localStorage.getItem("buys")+"");
    }
    this.getProducts();
    console.log(this.buys);
  }

  closemodal(){
    $('#exampleModal').modal('hide');
  }

  getProducts(){
    const params = new HttpParams()
    this._service
    .getGetJson(this.urlProduct, params).subscribe((data:any) => {
      this.list = data.data;
      console.log("informacion productos ",this.list);
      console.log(this.list);
      
      this.loading=false;
      
    });
  }

  myBuys(){
    if(this.buys.length==0){
      Swal.fire(
        'Información',
        'Usted no tiene ninguna compra hasta el momento por procesar',
        'info'
      )
    }else{
      if(localStorage.getItem('user')==null){
        $('#exampleModal').modal('show');
      }else{
        this._router.navigate(["/compras"]); 
      }
    }
  }

  addBuy(data:any){
    if(localStorage.getItem('user')==null){
      $('#exampleModal').modal('show');
    }else{
      if(localStorage.getItem("buys")==null){
        data.quantity = data.quantity - 1;
        localStorage.setItem("buys",JSON.stringify(data));
      }else{
        let arr = JSON.parse(localStorage.getItem("buys")+"");
        if(arr.length == 0){
          let arrProduct = [];
          data.quantity = data.quantity - 1;
          arrProduct.push(data);
          localStorage.setItem("buys",JSON.stringify(arrProduct));
          this.buys = arrProduct;
        }else{
          let arrProduct = [];
          arrProduct.push(arr);
          data.quantity = data.quantity - 1;
          arrProduct.push(data);
          localStorage.setItem("buys",JSON.stringify(arrProduct));
          this.buys = arrProduct;
        }
      }
    } 
  }

  logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("token");    
    window.location.assign('/');
  }
}
