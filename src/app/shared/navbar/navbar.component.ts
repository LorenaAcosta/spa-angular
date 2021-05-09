import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/servicios/usuario.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuItems: any[] = [];
  menuCliente: any[] = [];
  menuCajero: any[] = [];
  menuAdmin: any[] = [];
  constructor(
    private navbarService: NavbarService,
    public usuarioService: UsuarioService
    ) {

    let roles: any[];
    roles = JSON.parse(localStorage.getItem('usuario')) || ' ';
    let band:any = null;
    localStorage.setItem('admin', 'false');
    // tslint:disable-next-line: prefer-for-of
    for ( let i = 0; i < roles.length; i++) {
        console.log(roles[i]);
        if (roles[i].nombre === 'ROLE_ADMIN') {
          localStorage.setItem('admin', 'true');
          this.menuAdmin = navbarService.menu;
          console.log(this.menuItems);
          break;
        }
        if (roles[i].nombre === 'ROLE_CLIENTE') {
          this.menuCliente = navbarService.menu1;
          console.log(this.menuCliente);
        }
        if (roles[i].nombre === 'ROLE_CAJERO') {
          this.menuCajero = navbarService.menuCaja;
          console.log(this.menuCajero);
        }
    }
    //se concatena los menus en caso de tener mas de un rol
    this.menuItems = [].concat(this.menuCliente, this.menuCajero, this.menuAdmin);
    console.log(this.menuItems, this.menuItems.length);
    
  }

  ngOnInit(): void {
  }

  logout() {
    this.usuarioService.logout();
  }

}
