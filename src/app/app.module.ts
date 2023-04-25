import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { CompraComponent } from './compra/compra.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoscrearComponent } from './productoscrear/productoscrear.component';
import * as $ from "jquery";

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    CuentaComponent,
    CompraComponent,
    UsuariosComponent,
    ProductosComponent,
    ProductoscrearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
