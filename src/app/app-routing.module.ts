import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriaEditComponent } from './components/parametricos/categoria/categoria-edit.component';
import { MediosPagoEditComponent } from './components/parametricos/medios-pago/medios-pago-edit.component';
import { MediosPagoListarComponent } from './components/parametricos/medios-pago/medios-pago-listar.component';
import { CategoriaListarComponent } from './components/parametricos/categoria/categoria-listar.component';
import { ClienteEditComponent } from './components/parametricos/cliente/cliente-edit.component';
import { ClienteListarComponent } from './components/parametricos/cliente/cliente-listar.component';
import { ProductoEditComponent } from './components/parametricos/producto/producto-edit.component';
import { ProductoListarComponent } from './components/parametricos/producto/producto-listar.component';
import { ReservEditComponent } from './components/parametricos/reserva/reserv-edit.component';
import { ServicioEditComponent } from './components/parametricos/servicio/servicio-edit.component';
import { ServicioListarComponent } from './components/parametricos/servicio/servicio-listar.component';
import { EmpleadoEditComponent } from './components/parametricos/empleado/empleado-edit.component';
import { EmpleadoListarComponent } from './components/parametricos/empleado/empleado-listar.component';
import { CategoriaListar2Component } from './components/parametricos/categoria/categoria-listar2.component';
import { ServicioListar2Component } from './components/parametricos/servicio/servicio-listar2.component';
import { ServicioComponent } from './components/parametricos/servicio/servicio.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { RegisterComponent } from './login/register.component';
import { AutenticadoGuard } from './guards/autenticado.guard';
import { AdminGuard } from './guards/admin.guard';



const routes: Routes = [
  { path: '',
    component: PagesComponent,
    children: [
      {
        path: 'categoria', data: { title: 'Categorias' },
        children: [
          // { path: '', component: UsuariosComponent, data: { title: 'Listado' } }
          { path: 'agregar', component: CategoriaEditComponent, canActivate: [ AutenticadoGuard],
                data: { title: 'Crear Categoria' }, },
          { path: 'listar', component: CategoriaListarComponent, canActivate: [ AdminGuard], data: { title: 'Listar Categoria' }, },
          { path: 'categorias', component: CategoriaListar2Component, data: { title: 'Listar Categoria' }, },
          { path: 'modificar/:id', component: CategoriaEditComponent , data: { title: 'Modificar Categoria' }, },
        ]
      },
      {
        path: 'cliente', data: { title: 'Cliente' },
        children: [
          { path: 'registrar', component: ClienteEditComponent , data: { title: 'Crear Cliente' }, },
          { path: 'listar', component: ClienteListarComponent , data: { title: 'Listar Cliente' }, },
          { path: 'modificar/:id', component: ClienteEditComponent , data: { title: 'Editar Cliente' }, }
         ]
      },
      {
        path: 'empleado', data: { title: 'Empleado' },
        children: [
          { path: 'agregar', component: EmpleadoEditComponent , data: { title: 'Crear Empleado' }, },
          { path: 'listar', component: EmpleadoListarComponent , data: { title: 'Listar Empleado' }, },
          { path: 'modificar/:id', component: EmpleadoEditComponent , data: { title: 'Editar Empleado' }, }
        ]
      },
      {
        path: 'producto', data: { title: 'Producto' },
        children: [
          { path: 'agregar', component: ProductoEditComponent , data: { title: 'Crear Producto' }, },
          { path: 'listar', component:  ProductoListarComponent, data: { title: 'Listar Producto' }, },
          { path: 'modificar/:id', component: ProductoEditComponent , data: { title: 'Editar Producto' } }
         ]
      },
      {
        path: 'servicio', data: { title: 'Servicio' },
        children: [
          { path: 'agregar', component: ServicioEditComponent , canActivate: [ AutenticadoGuard ], data: { title: 'Crear Servicio' }, },
          { path: 'listar', component:  ServicioListarComponent, data: { title: 'Listar Servicios' }, },
          { path: 'servicio', component:  ServicioComponent, data: { title: 'Listar Servicios' }, },
          { path: 'servicios/:id', component:  ServicioListar2Component, data: { title: 'Listar Servicios' }, },
          { path: 'modificar/:id', component: ServicioEditComponent , data: { title: 'Editar Servicio' } }
         ]
      },
      {
        path: 'reserva', data: { title: 'Reserva' },
        children: [
          { path: 'agregar', component: ReservEditComponent , data: { title: 'Agregar Reserva' }, }
         ]
      },
      {
        path: '', data: { title: 'Dashboard' },
        children: [
          { path: '', component: DashboardComponent, data: { title: 'Dashboard-Componente' } },
        ]
      }
    ]
  },

  { path: 'registro', component: RegisterComponent, data: { title: 'Register' }},
  { path: 'login', component: LoginComponent, data: { title: 'Login' }}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
