import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Location } from '@angular/common'
//import {RequestOptions, Request, RequestMethod} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class Service {

  private url = "http://localhost:8081/";

  constructor(public location: Location, private http: HttpClient) {}

  getHeaders(estado: string) {
    let options
      options = {
        headers: new HttpHeaders()
          .append(
            'Authorization',
            'Bearer' + (localStorage.getItem('token') ?? ''),
          )
          .append('Content-Type', 'application/json'),
      }
    return options
  }

  getPostJson<T, U>(ruta: string, json: T): Observable<U> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + (localStorage.getItem('token') ?? ''),
      'Content-Type': 'application/json',
    })
    return this.http.post<U>(this.url+ruta, json, { headers: headers })
  }

  /*
  getUpload<T, U>(ruta: string, archivo: File,id:number) {
    let formdata = new FormData();
    formdata.append("archivo",archivo);
    formdata.append("id",id+"");
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', 'Bearer' + localStorage.getItem('token') ?? '');


    return	 this.http.post(this.url+''+ruta,formdata, {
      headers: headers
    }).map((res:any) => res.json());	

  }  
  */


  getUpload(ruta: string, archivo: any,id:number){
    return new Promise((resolve, reject)=>{
    var formData: any = new FormData();
    var xhr = new XMLHttpRequest();
    
    formData.append('archivo', archivo);
    formData.append('id', id);
      xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        if(xhr.status == 200){
          return resolve(JSON.parse(xhr.response));
        }else{
          return reject(xhr.response);
        }
      }
    };
      xhr.open("POST", this.url+ruta, true);
      xhr.send(formData);
    });
  }

  getGetJson<T, U>(ruta: string, params: HttpParams): Observable<U> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + (localStorage.getItem('token') ?? ''),
      'Content-Type': 'application/json',
    })
    return this.http.get<U>(this.url+ruta,{ headers: headers,params:params});
  }



  getDelete<T, U>(ruta: string, json: T): Observable<U> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + (localStorage.getItem('token') ?? ''),
      'Content-Type': 'application/json',
    })
    return this.http.delete<U>(this.url+ruta, { headers: headers })
  }

  goBack(){

  }

  getUrl(){
    return this.url;
  }

}
