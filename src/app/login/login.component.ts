import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/servicios/usuario.service';


// declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  recuerdame: boolean = false;

  constructor(
    public router: Router,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    // init_plugins();
  }

  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario( forma.value.username, forma.value.password );

    this._usuarioService.login( usuario, forma.value.recuerdame )
                  .subscribe( correcto =>
                              this.router.navigate(['/dashboard'])
                              );
    if (this._usuarioService.estaLogueado()) {
      this.userData();
    }
  }


  userData() {

    this._usuarioService.getUsuarioLogueado()
                  .subscribe( (resp: any) => {

                  });
  }


}
