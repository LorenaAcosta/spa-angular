
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table' 
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriaComponent } from './components/parametricos/categoria/categoria.component';
import { CategoriaEditComponent } from './components/parametricos/categoria/categoria-edit.component';
import { CategoriaListarComponent } from './components/parametricos/categoria/categoria-listar.component';
import { MediosPagoComponent } from './components/parametricos/medios-pago/medios-pago.component';
import { MediosPagoEditComponent } from './components/parametricos/medios-pago/medios-pago-edit.component';
import { MediosPagoListarComponent } from './components/parametricos/medios-pago/medios-pago-listar.component';
import { ClienteEditComponent } from './components/parametricos/cliente/cliente-edit.component';
import { ClienteListarComponent } from './components/parametricos/cliente/cliente-listar.component';
import { ProductoComponent } from './components/parametricos/producto/producto.component';
import { ProductoEditComponent } from './components/parametricos/producto/producto-edit.component';
import { ProductoListarComponent } from './components/parametricos/producto/producto-listar.component';
import { ProductoListar2Component } from './components/parametricos/producto/producto-listar2.component';
import { ReservaComponent } from './components/parametricos/reserva/reserva.component';
import { ReservEditComponent } from './components/parametricos/reserva/reserv-edit.component';
import { ReservaListComponent } from './components/parametricos/reserva/reserva-list.component';
import { ServicioComponent } from './components/parametricos/servicio/servicio.component';
import { ServicioListarComponent } from './components/parametricos/servicio/servicio-listar.component';
import { ServicioEditComponent } from './components/parametricos/servicio/servicio-edit.component';
import { EmpleadoComponent } from './components/parametricos/empleado/empleado.component';
import { EmpleadoEditComponent } from './components/parametricos/empleado/empleado-edit.component';
import { EmpleadoListarComponent } from './components/parametricos/empleado/empleado-listar.component';
import { ProveedorComponent } from './components/parametricos/proveedor/proveedor.component';
import { ProveedorEditComponent } from './components/parametricos/proveedor/proveedor-edit.component';
import { CompraComponent } from './components/parametricos/compra/compra.component';
import { DetallesCompraComponent } from './components/parametricos/detalles-compra/detalles-compra.component';
import { CompraEditComponent } from './components/parametricos/compra/compra-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './components/table/table.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { VentaComponent } from './components/parametricos/venta/venta.component';
import { VentaEditComponent } from './components/parametricos/venta/venta-edit.component';
import { VentaReporteComponent } from './components/parametricos/venta/venta-reporte.component';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { PlanillaComponent } from './components/parametricos/planilla/planilla.component';
import { TerapistaComponent } from './components/parametricos/booking/terapista.component';
import { CalendarComponent } from './components/parametricos/booking/calendar.component';
import { OfertaComponent } from './components/parametricos/oferta/oferta/oferta.component';
import { DisponibleComponent } from './components/parametricos/disponible/disponible.component';
import { ListarComponent } from './components/parametricos/disponible/disponible-listar.component';
//import { HorarioListComponent } from './components/parametricos/horario/horario-list.component';
import { CategoriaListar2Component } from './components/parametricos/booking/categoria-listar2.component';
import { ServicioListar2Component } from './components/parametricos/booking/servicios-spa.component';
import { ArchivosSubidosComponent } from './components/archivos-subidos/archivos-subidos.component';
import { HorarioComponent } from './components/parametricos/horario/horario.component';
import { BoxesListarComponent } from './components/parametricos/boxes/boxes-listar.component';
import { BoxesEditComponent } from './components/parametricos/boxes/boxes-edit.component';
import { DisponibleBoxComponent } from './components/parametricos/disponible-box/disponiblebox.component';
import { HorarioListarComponent } from './components/parametricos/horario/horario-listar.component';
import { TipoComprobanteComponent } from './components/parametricos/tipo-comprobante/tipo-comprobante.component';
import { ImpuestoComponent } from './components/parametricos/impuesto/impuesto.component';
import { ComprobanteComponent } from './components/parametricos/comprobante/comprobante.component';
import { ComprobanteListarComponent } from './components/parametricos/comprobante/comprobante-listar/comprobante-listar.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    CategoriaComponent,
    CategoriaEditComponent,
    MediosPagoComponent,
    MediosPagoEditComponent,
    CategoriaListarComponent,
    CategoriaListar2Component,
    MediosPagoListarComponent,
    ProductoComponent,
    ClienteEditComponent,
    ClienteListarComponent,
    ProductoEditComponent,
    ProductoListarComponent,
    ReservaComponent,
    ReservEditComponent,
    ReservaListComponent,
    ServicioComponent,
    ServicioListarComponent,
    ServicioListar2Component,
    ServicioEditComponent,
    EmpleadoComponent,
    EmpleadoEditComponent,
    EmpleadoListarComponent,
    ProductoListar2Component,
    ProveedorComponent,
    ProveedorEditComponent,
    CompraComponent,
    DetallesCompraComponent,
    CompraEditComponent,
    TableComponent,
    VentaComponent,
    VentaEditComponent,
    VentaReporteComponent,
    EmpleadoComponent,
    PlanillaComponent,
    TerapistaComponent,
    CalendarComponent,
    OfertaComponent,
    DisponibleComponent,
    ListarComponent,
    ArchivosSubidosComponent,
    HorarioComponent,
    BoxesListarComponent,
    BoxesEditComponent,
    DisponibleBoxComponent,
    HorarioListarComponent,
    TipoComprobanteComponent,
    ImpuestoComponent,
    ComprobanteComponent,
    ComprobanteListarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
