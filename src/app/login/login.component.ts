import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, Route } from '@angular/router';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/servicios/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';


// declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent {

  public formSubmitted = false;
  public loginForm = this.fb.group({
    username: [localStorage.getItem('username') || '', Validators.required],
    password: ['', [ Validators.required, Validators.minLength(3) ]],
    remember: [false]
  });

  constructor(
    public router: Router,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    private spinnerService: NgxSpinnerService,
    private fb: FormBuilder
  ) { }

  login() {
    this.spinnerService.show();
    this._usuarioService.login( this.loginForm.value)
    .subscribe( resp => {
      this.spinnerService.hide();
      if ( this.loginForm.get('remember').value ) {
        localStorage.setItem('username', this.loginForm.get('username').value);
      } else {
        localStorage.removeItem('username');
      }
    }, (err) => {
      this.spinnerService.hide();
      console.log(err);
      Swal.fire('Error', err.error.error === 'invalid_grant' || 'unauthorized' ? 'Usuario o contraseña incorrectos' : ' ', 'error');
    });

  }

  // validaciones login

}
