import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Models} from './../models';

@Component({
  selector: 'app-productoscrear',
  templateUrl: './productoscrear.component.html',
  styleUrls: ['./productoscrear.component.css'],
  providers: [Models],  
})
export class ProductoscrearComponent{
  in;
  err;
  public form: FormGroup;
  constructor(public fb: FormBuilder, private models: Models) {
    this.in = this.models.Producto();
    this.err = this.models.Producto();
    this.form = this.fb.group({
      'id':[''],
      'nombre':['',[Validators.required]],
      'referencia':['',[Validators.required]],
      'categoria':['',[Validators.required]],
      'cantidad':['',[Validators.required]],
      'foto':['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    // console.log(this.in.nombre);
  }

}
