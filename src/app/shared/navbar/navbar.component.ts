import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/servicios/usuario.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuItems: any[];
  constructor(
    private navbarService: NavbarService,
    public usuarioService: UsuarioService
    ) {

    let roles: any[];
    roles = JSON.parse(localStorage.getItem('usuario')) || ' ';
    let band = 0;
    // tslint:disable-next-line: prefer-for-of
    for ( let i = 0; i < roles.length; i++) {
        console.log(roles[i]);
        if (roles[i].nombre === 'ROLE_ADMIN') {
          band = 1;
          break;
        }
    }
    if (band === 0 ) {
      this.menuItems = navbarService.menu1;
      console.log(this.menuItems);
    } else {
      this.menuItems = navbarService.menu;
      console.log(this.menuItems);
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.usuarioService.logout();
  }

}
