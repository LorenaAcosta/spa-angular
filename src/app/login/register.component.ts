import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../services/servicios/usuario.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class RegisterComponent implements OnInit{

  public formSubmitted = false;

  public loginForm = this.fb.group({
    username: [''],
    password: ['']
  });
  
  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    sexo: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' + '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
    password: ['', [ Validators.minLength(3) ]],
    password2: ['', [ Validators.minLength(3) ]],
    enabled: true,
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private spinnerService: NgxSpinnerService,
               public router: Router
  ) { }

  ngOnInit(){
    
  }

  crearUsuario() {
    let usuarioId;
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {
      console.log('no anda');
      return;
    }
    this.spinnerService.show();

    this.registerForm.controls.username.setValue(this.registerForm.controls.username.value.toLowerCase());
    this.loginForm.controls.username.setValue(this.registerForm.controls.username.value.toLowerCase());
    this.loginForm.controls.password.setValue(this.registerForm.controls.password.value);


    this.usuarioService.crearUsuario( this.registerForm.value )
      .subscribe( (resp:any) => {
        setTimeout(() => {
          this.spinnerService.hide();
        }, 2000);
        usuarioId = resp.usuarioId;
        console.log('usuario creado')
        this.usuarioService.asignarRol(usuarioId, 2 )
        .subscribe( (resp:any) => {});
        /*-----------generar token de confirmacion------*/
        //console.log('login', this.loginForm.value)
        this.usuarioService.confirmacionUsuario(this.loginForm.value).subscribe((r:any) => {
          let valor = false;
          this.usuarioService.modificarRecurso(valor, usuarioId).subscribe((resp:any) => {
            //console.log(resp);
          });
        });
        /*-----------------------------------------------*/
        Swal.fire(
          'Guardado!',
          'Le hemos enviado un correo para confirmar su cuenta!',
          'success'
        );

        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
        setTimeout(() => {
          this.spinnerService.hide();
        }, 200);
        Swal.fire('Error', err.error, 'error');
      });
  }

  campoNoValido( campo: string ): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  passwordNoValido() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if (pass1.length < 3 && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }
  passwordIguales() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if ( pass1 !== pass2 && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

}
