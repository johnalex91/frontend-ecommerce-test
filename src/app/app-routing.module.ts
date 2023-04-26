import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CompraComponent } from './compra/compra.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { LoginComponent } from './login/login.component';
import { ProductoscrearComponent } from './productoscrear/productoscrear.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [

  {path: '', component: InicioComponent},
  {path: 'compras', component: CompraComponent},
  {path: 'cuenta', component: CuentaComponent},
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent
      }, 
      {
        path: 'productos',
        component: ProductosComponent
      }, 
      {path: 'productoscrear/:id', component: ProductoscrearComponent}
    ]
  }, 
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
