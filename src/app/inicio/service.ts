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
    return this.http.post<U>(ruta, json, { headers: headers })
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
    return this.http.delete<U>(ruta, { headers: headers })
  }

  goBack(){

  }


}
