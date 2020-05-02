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
import { ClienteLoginComponent } from './components/parametricos/cliente/cliente-login.component';
import { CategoriaListar2Component } from './components/parametricos/categoria/categoria-listar2.component';
import { ServicioListar2Component } from './components/parametricos/servicio/servicio-listar2.component';
import { ServicioComponent } from './components/parametricos/servicio/servicio.component';
import { EmpleadoServicioComponent } from './components/parametricos/empleado/empleado-servicio.component';


const routes: Routes = [
  {
    path: '', data: { title: 'Dashboard' },
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard-Componente' } },
      { path: 'login', component: ClienteLoginComponent, data: { title: 'Login-Componente' } },
      { path: 'registrar', component: ClienteEditComponent, data: { title: 'Registrar-Componente' }},
    ]
  },
  {
    path: 'categoria', data: { title: 'Categorias' },
    children: [
      // { path: '', component: UsuariosComponent, data: { title: 'Listado' } }
      { path: 'agregar', component: CategoriaEditComponent, data: { title: 'Crear Categoria' }, },
      { path: 'listar', component: CategoriaListarComponent, data: { title: 'Listar Categoria' }, },
      { path: 'categorias', component: CategoriaListar2Component, data: { title: 'Listar Categoria' }, },
      { path: 'modificar/:id', component: CategoriaEditComponent , data: { title: 'Modificar Categoria' }, },
    ]
  },
  {
    path: 'medios-pago', data: { title: 'MediosPago' },
    children: [
      { path: 'agregar', component: MediosPagoEditComponent , data: { title: 'Crear Medio Pago' }, },
      { path: 'listar', component: MediosPagoListarComponent , data: { title: 'Listar Medio Pago' }, },
      { path: 'modificar/:id', component: MediosPagoEditComponent , data: { title: 'Editar Medio Pago' }, }
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
      { path: 'modificar/:id', component: EmpleadoEditComponent , data: { title: 'Editar Empleado' }, },
      { path: 'asignar/:id', component: EmpleadoServicioComponent , data: { title: 'Empleado Servicio' }, }
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
      { path: 'agregar', component: ServicioEditComponent , data: { title: 'Crear Servicio' }, },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
