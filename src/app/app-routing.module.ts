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
import { ServicioListar2Component } from './components/parametricos/booking/servicios-spa.component';
import { ServicioComponent } from './components/parametricos/servicio/servicio.component';
import { ProveedorComponent } from './components/parametricos/proveedor/proveedor.component';
import { ProveedorEditComponent } from './components/parametricos/proveedor/proveedor-edit.component';

import { DisponibilidadComponent } from './components/parametricos/empleado/disponibilidad.component';
import { CompraComponent } from './components/parametricos/compra/compra.component';
import { DetallesCompraComponent } from './components/parametricos/detalles-compra/detalles-compra.component';
import { CompraEditComponent } from './components/parametricos/compra/compra-edit.component';
import { VentaComponent } from './components/parametricos/venta/venta.component';
import { VentaEditComponent } from './components/parametricos/venta/venta-edit.component';
import { VentaReporteComponent } from './components/parametricos/venta/venta-reporte.component';
import { HorarioAsignarComponent } from './components/parametricos/horario/horario-asignar.component';
import { PlanillaComponent } from './components/parametricos/planilla/planilla.component';
import { TerapistaComponent } from './components/parametricos/booking/terapista.component';
import { CalendarComponent } from './components/parametricos/booking/calendar.component';
import { CategoriaListar2Component } from './components/parametricos/booking/categoria-listar2.component';
import { ReservaListComponent } from './components/parametricos/reserva/reserva-list.component';
import { ProductoListar2Component } from './components/parametricos/producto/producto-listar2.component';
import { OfertaComponent } from './components/parametricos/oferta/oferta/oferta.component';
import { DisponibleComponent } from './components/parametricos/disponible/disponible.component';
import { HorarioListComponent } from './components/parametricos/horario/horario-list.component';

const routes: Routes = [
  {
    path: '', data: { title: 'Dashboard' },
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard-Componente' } },
      { path: 'registrar', component: ClienteEditComponent, data: { title: 'Registrar-Componente' }}
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
      { path: 'upload/:id', component: CategoriaEditComponent , data: { title: 'Upload Categoria' }, },
     { path: 'modificar/:id', component: CategoriaEditComponent , data: { title: 'Modificar Categoria' } },
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
      { path: 'modificar/:id', component: ClienteEditComponent , data: { title: 'Editar Cliente' } }
     ]
  },
  {
    path: 'empleado', data: { title: 'Empleado' },
    children: [
      { path: 'agregar', component: EmpleadoEditComponent , data: { title: 'Crear Empleado' }, },
      { path: 'listar', component: EmpleadoListarComponent , data: { title: 'Listar Empleado' }, },
      { path: 'modificar/:id', component: EmpleadoEditComponent , data: { title: 'Editar Empleado' } },
      { path: 'asignar-horario-edit/:id', component: HorarioAsignarComponent , data: { title: 'Asignar Horario Empleado' } },
      { path: 'asignar-horario', component: HorarioAsignarComponent , data: { title: 'Asignar Horario Empleado' } },
      { path: 'horario', component: HorarioListComponent , data: { title: 'Listar Horario Empleado' } },
      { path: 'disponible', component: DisponibleComponent , data: { title: 'Asignar Disponibilidad' } },
      { path: 'disponible-listar', component: DisponibleComponent , data: { title: 'Listar Disponibilidad' } }
    ]
  },
  {
    path: 'producto', data: { title: 'Producto' },
    children: [
      { path: 'agregar', component: ProductoEditComponent , data: { title: 'Crear Producto' }, },
      { path: 'listar', component:  ProductoListarComponent, data: { title: 'Listar Producto' }, },
      { path: 'modificar/:id', component: ProductoEditComponent , data: { title: 'Editar Producto' } } ]
  },
  {
    path: 'servicio', data: { title: 'Servicio' },
    children: [
      { path: 'agregar', component: ServicioEditComponent , data: { title: 'Crear Servicio' }, },
      { path: 'listar', component:  ServicioListarComponent, data: { title: 'Listar Servicios' }, },
      { path: 'servicio', component:  ServicioComponent, data: { title: 'Listar Servicios' }, },
      { path: 'modificar/:id', component: ServicioEditComponent , data: { title: 'Editar Servicio' } }
     ]
  },
  {
    path: 'reserva', data: { title: 'Reserva' },
    children: [
      { path: 'agregar', component: ReservEditComponent , data: { title: 'Agregar Reserva' }, },
      { path: 'listar', component: ReservaListComponent , data: { title: 'Listar Reserva' }, }
     ]
  },
  {
    path: 'booking', data: { title: 'Booking' },
    children: [
     /* { path: 'servicios/:id', component:  ServicioListar2Component, data: { title: 'Listar Servicios' }, },  */
      { path: 'categorias', component: CategoriaListar2Component, data: { title: 'Listar Categoria' }, },
      { path: 'ofertas', component: OfertaComponent, data: { title: 'Ofertas-Componente' }},
      { path: 'productos', component: ProductoListar2Component , data: { title: 'Listar Productos' } },
      { path: 'terapista/:id', component:  TerapistaComponent, data: { title: 'terapista' }, },
      { path: 'servicios/:id', component: ServicioListar2Component , data: { title: 'Listar Servicio' } },
      { path: 'calendar/:id', component:  CalendarComponent, data: { title: 'Calendar' }, }
    ]
  },
  {
    path: 'horario', data: { title: 'horario' },
    children: [
      { path: 'asignar/:id', component: HorarioAsignarComponent , data: { title: 'Asignar Horario' }, }
     ]
  },
  {
    path: 'planilla', data: { title: 'Planilla' },
    children: [
      { path: 'generar', component: PlanillaComponent , data: { title: 'Generar Planilla' }, }
     ]
  },
  {
    path: 'proveedor', data: { title: 'Proveedores' },
    children: [
      { path: 'agregar', component: ProveedorEditComponent , data: { title: 'Crear proveedor' }, },
      { path: 'listar', component: ProveedorComponent , data: { title: 'Listar Proveedores' }, },
      { path: 'modificar/:id', component: ProveedorEditComponent , data: { title: 'Editar Proveedor' }, }
     ]
  },
  {
    path: 'compras', data: { title: 'Compras' },
    children: [
      { path: 'agregar', component: CompraEditComponent , data: { title: 'Crear compra' }, },
      { path: 'listar', component: CompraComponent , data: { title: 'Listar compras' }, },
       { path: 'modificar/:id', component: CompraEditComponent , data: { title: 'Editar compra' }, }
     ]
  },
  {
    path: 'ventas', data: { title: 'Ventas' },
    children: [
      { path: 'agregar', component: VentaEditComponent , data: { title: 'Crear venta' }, },
      { path: 'listar', component: VentaComponent , data: { title: 'Listar ventas' }, },
      { path: 'modificar/:id', component: VentaEditComponent , data: { title: 'Editar venta' }, },
      { path: 'reporte', component: VentaReporteComponent , data: { title: 'Reporte de ventas' }, }
     ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
