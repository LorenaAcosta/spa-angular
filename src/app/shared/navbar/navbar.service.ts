import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  menu: any[] = [
    {
      titulo: 'Gestión',
      url: '',
      submenu: [
        {titulo: 'Empleados', url: '/empleado/listar'},
        {titulo: 'Usuario', url: '/cliente/listar'}
      ]
    },
    {
      titulo: 'Inventario',
      url: '',
      submenu: [
        {titulo: 'Servicios', url: 'servicio/listar'},
        {titulo: 'Productos', url: '/producto/listar'},
        {titulo: 'Categorias', url: '/categoria/listar'},
        {titulo: 'Medios de Pago', url: '/cliente/listar'}
      ]
    },
    {
      titulo: 'Finanzas',
      url: '',
      submenu: [
        {titulo: 'Cobro a Clientes', url: '/empleado/listar'},
        {titulo: 'Pago a Empleados', url: '/cliente/listar'}
      ]
    }
  ];

  menu1: any[] = [
    {
      titulo: 'Vista para usuarios no admin',
      url: '',
      submenu: [
        {titulo: 'Servicios', url: 'servicio/listar'},
        {titulo: 'Productos', url: '/producto/listar'},
        {titulo: 'Categorias', url: '/categoria/listar'},
        {titulo: 'Medios de Pago', url: '/cliente/listar'}
      ]
    },
  ];

  constructor() { }
}
