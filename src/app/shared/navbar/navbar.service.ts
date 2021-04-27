import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  menu: any[] = [
    {
      titulo: 'GESTIÓN',
      url: '',
      submenu: [
        {titulo: 'Clientes', url: '/cliente/listar'},
        {titulo: 'Servicios', url: '/servicio/listar'},
        {titulo: 'Categorias', url: '/categoria/listar'},
        {titulo: 'Reservas', url: '/reserva/listar'}
      ]
    },
    {
      titulo: 'TESORERIA',
      url: '',
      submenu: [
        {titulo: 'Cobranza', url: '/ventas/listar'},
        {titulo: 'Ventas Reporte', url: '/ventas/reporte'},
        {titulo: 'Puntos de Expedición', url: '/puntos-expedicion/listar'},
        {titulo: 'Comprobante', url: '/config/comprobante/agregar'},
        {titulo: 'Tipo-comprobante', url: '/config/tipo-comprobante/agregar'},
        {titulo: 'Medios de Pago', url: '/config/medios-pago/agregar'}
      ]
    },
    {
      titulo: 'COMPRAS',
      url: '',
      submenu: [
        {titulo: 'Inventario Productos', url: '/producto/listar'},
        {titulo: 'Proveedores', url: '/proveedor/listar'},
        {titulo: 'Cargar Facturas', url: '/compras/listar'},
        {titulo: 'Impuesto', url: '/config/impuesto/agregar'}
      ]
    },
    {
      titulo: 'RRHH',
      url: '',
      submenu: [
        {titulo: 'Empleados', url: '/empleado/listar'},
        {titulo: 'Pagos a Empleados', url: '/empleado/listar'},
        {titulo: 'Cargar Facturas', url: '/compras/listar'},
        {titulo: 'Impuesto', url: '/config/impuesto/agregar'}
      ]
    }
  ];

  menu1: any[] = [
    {
      titulo: 'VISTA PARA USUARIOS NO ADMIN',
      url: '',
      submenu: [
        {titulo: 'Servicios', url: 'servicio/listar'},
        {titulo: 'Productos', url: '/producto/listar'},
        {titulo: 'Categorias', url: '/categoria/listar'},
        {titulo: 'Medios de Pago', url: '/cliente/listar'}
      ]
    },
    {
      titulo: 'RRHH',
      url: '',
      submenu: [
        {titulo: 'Empleados', url: '/empleado/listar'},
        {titulo: 'Pagos a Empleados', url: '/empleado/listar'},
        {titulo: 'Cargar Facturas', url: '/compras/listar'},
        {titulo: 'Impuesto', url: '/config/impuesto/agregar'}
      ]
    }
  ];

  constructor() { }
}
