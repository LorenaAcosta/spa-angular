import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/servicios/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService
  ) {
  }

  ngOnInit() {
  }
  logout() {
      this.usuarioService.logout();
  }
}
