import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Models,Product} from './../models';
import {Service} from './../service';
import Swal from 'sweetalert2'
import { HttpParams } from '@angular/common/http'

declare var $: any;


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
  providers: [Models,Service]
})
export class CompraComponent implements OnInit {

  login = false;
  loading=true;
  user="";
  buys:Product[]=[];
  urlProduct='api/product/';
  urlImage = "";

  constructor(private _service: Service,private _router: Router) { }

  ngOnInit(): void {
    this.urlImage = this._service.getUrl();

    if(localStorage.getItem("user")==null || localStorage.getItem("token")==null){
      this._router.navigate(["/"]); 
    }else{
      this.login=true;
      this.user = localStorage.getItem("user")+"";
    }
    console.log('localStorage.getItem("buys")',localStorage.getItem("buys"));
    if(localStorage.getItem("buys")!=null){
      this.buys = JSON.parse(localStorage.getItem("buys")+"");
      console.log("buys",this.buys);
      setTimeout((e:any)=>{
        this.loading=false;
      },2000);
    }

  }

  modalopen(){
    $('#exampleModal').modal('show');
  }

  modalclose(){
    $('#exampleModal').modal('hide');
    $('#exampleModal2').modal('show');
  }

  logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("token");    
    window.location.assign('/');
  }

  async buyProduct(data:any,index:number){
    Swal.fire({
      title: 'En verdad desea Realizar la Compra?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Comprar',
      cancelButtonColor:"red",
      confirmButtonColor:"green"
    }).then((result) => {
      if (result.isConfirmed) {
        /*
        let arr: Product[] = [];
        let buys_arr = JSON.parse(localStorage.getItem("buys")+"");
        buys_arr.forEach((e:any,i:number)=>{
          data = e;
          if(i == index){
            if(data.quantity>1){
              data.quantity = data.quantity - 1;
              arr.push(data);
            }else{
              arr.push(data);
            }
          }else{
            arr.push(data);
          }
        })
        console.log(arr);
        localStorage.setItem("buys",JSON.stringify(arr));
        */
        //realiza peticion para mermar quality
        const params = new HttpParams()
        this._service
        .getPostJson(this.urlProduct+"buy/"+data.id, params).subscribe((data:any) => {
          Swal.fire('Compra Exitosa', '', 'success')
          this.buys.splice(index, 1);
          localStorage.setItem("buys",JSON.stringify(this.buys));          
          setTimeout((e:any)=>{
            window.location.assign('/');
          },2000);
        });

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    }) 
  }

  deleteProduct(data:any,index:number){
    Swal.fire({
      title: 'En verdad desea eliminar la compra?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonColor:"green",
      confirmButtonColor:"red"
    }).then((result) => {
      if (result.isConfirmed) {
        this.buys.splice(index, 1);
        localStorage.setItem("buys",JSON.stringify(this.buys));
        Swal.fire('Eliminada compra', '', 'success')
        setTimeout((e:any)=>{
          this.validExistBuys();
        },3000);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


  validExistBuys(){
    if(localStorage.getItem("buys")!=null){
      let count = JSON.parse(localStorage.getItem("buys")+"");
      if(count.length == 0){
        this._router.navigate(["/"]);         
      }
    }else{
       this._router.navigate(["/"]); 
    }
  }

}
