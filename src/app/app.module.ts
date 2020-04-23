
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpHandler, HttpResponse} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriaComponent } from './components/parametricos/categoria/categoria.component';
import { CategoriaEditComponent } from './components/parametricos/categoria/categoria-edit.component';
import { MediosPagoComponent } from './components/parametricos/medios-pago/medios-pago.component';
import { MediosPagoEditComponent } from './components/parametricos/medios-pago/medios-pago-edit.component';
import { CategoriaListarComponent } from './components/parametricos/categoria/categoria-listar.component';
import { MediosPagoListarComponent } from './components/parametricos/medios-pago/medios-pago-listar.component';
import { ProductoComponent } from './components/parametricos/producto/producto.component';
import { ClienteEditComponent } from './components/parametricos/cliente/cliente-edit.component';
import { ClienteListarComponent } from './components/parametricos/cliente/cliente-listar.component';
import { ProductoEditComponent } from './components/parametricos/producto/producto-edit.component';
import { ProductoListarComponent } from './components/parametricos/producto/producto-listar.component';
import { ReservaComponent } from './components/parametricos/reserva/reserva.component';
import { ReservEditComponent } from './components/parametricos/reserva/reserv-edit.component';
import { ServicioComponent } from './components/parametricos/servicio/servicio.component';
import { ServicioListarComponent } from './components/parametricos/servicio/servicio-listar.component';
import { ServicioEditComponent } from './components/parametricos/servicio/servicio-edit.component';
import { EmpleadoComponent } from './components/parametricos/empleado/empleado.component';
import { EmpleadoEditComponent } from './components/parametricos/empleado/empleado-edit.component';
import { EmpleadoListarComponent } from './components/parametricos/empleado/empleado-listar.component';
import { ClienteLoginComponent } from './components/parametricos/cliente/cliente-login.component';
import { CategoriaListar2Component } from './components/parametricos/categoria/categoria-listar2.component';



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
    MediosPagoListarComponent,
    ProductoComponent,
    ClienteEditComponent,
    ClienteListarComponent,
    ProductoEditComponent,
    ProductoListarComponent,
    ReservaComponent,
    ReservEditComponent,
    ServicioComponent,
    ServicioListarComponent,
    ServicioEditComponent,
    EmpleadoComponent,
    EmpleadoEditComponent,
    EmpleadoListarComponent,
    ClienteLoginComponent,
    CategoriaListar2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    NgxPaginationModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
