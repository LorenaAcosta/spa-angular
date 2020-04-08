import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu = [];
  constructor() {
    this.menu = [
      {
        modulo: 'Servicios',
        iconoSubModulo: 'address-book',
        moduloItems: [
          {
            id: 'reservas',
            subModulo : 'Reservas',
            iconoSubModulo: 'fas fa-calendar-alt',
            subItems: [
              {
                url: 'reserva/agregar',
                icono: 'fas fa-user',
                titulo: 'Agregar Reservas'
              }
            ]
        }
        ]
      },
      {
        modulo: 'Gestiones',
        moduloItems: [
          {
              id: 'submodulo2',
              subModulo : 'Administración',
              iconoSubModulo: 'fas fa-money-check-alt',
              subItems: [
                {
                  url: '/empleado/listar',
                  icono: 'fas fa-angle-right',
                  titulo: 'Empleados'
                },
                {
                  url: '/cliente/listar',
                  icono: 'fas fa-angle-right',
                  titulo: 'Clientes'
                }
              ]
          },
          {
            id: 'submodulo3',
            subModulo : 'Inventario',
            iconoSubModulo: 'fas fa-money-check-alt',
            subItems: [
              {
                url: '/servicio/listar',
                icono: 'fas fa-angle-right',
                titulo: 'Servicios'
              },
              {
                url: '/producto/listar',
                icono: 'fas fa-angle-right',
                titulo: 'Productos'
              }
            ]
        }
        ]
      },
      {
        modulo:'Finanzas',
        moduloItems: [
          {
              id: 'submodulo4',
              subModulo : 'Pagos',
              iconoSubModulo: 'fas fa-money-check-alt',
              subItems: [
                {
                  url: '/pagos/listar',
                  icono: 'fas fa-angle-right',
                  titulo: 'Facturar'
                },
                {
                  url: '/planilla/listar',
                  icono: 'fas fa-angle-right',
                  titulo: 'Liquidación'
                }
              ]
          }
        ]
      },
      {
        modulo:'Otros',
        moduloItems: [
          {
              id: 'submodulo5',
              subModulo : 'Configuraciones',
              iconoSubModulo: 'fas fa-money-check-alt',
              subItems: [
                {
                  url: '/medios-pago/listar',
                  icono: 'fas fa-angle-right',
                  titulo: 'Medios de Pago'
                },
                {
                  url: '/categoria/listar',
                  icono: 'fas fa-angle-right',
                  titulo: 'Categorias'
                }
              ]
          }
        ]
      }
    ];
   }
   obtenerSideBar(){
     return this.menu;
   }
}
