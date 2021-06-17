import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/services/servicios/cliente.service';
import { UsuarioService } from 'src/app/services/servicios/usuario.service';
import Swal from 'sweetalert2';
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
  menuRecepcion: any[] = [];
  menuAdmin: any[] = [];
  urlUsuario: any = null;
  usuario: any;
  closeResult: string;
  usuarioPerfil: any;
  logueado: boolean = false;
  fechaNac: any;

  public formSubmitted = false;

  public loginForm = this.fb.group({
    username: [localStorage.getItem('username') || '', Validators.required],
    password: ['', [ Validators.required, Validators.minLength(3) ]],
    remember: [false]
  });

  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    cedula: ['', Validators.required],
    fechaNac: ['', Validators.required],
    sexo: ['', Validators.required],
    telefono: ['', Validators.required],
    nacionalidad: [''],
    ciudad: [''],
    direccion: [''],
    ruc: [''],
    username: ['', Validators.required],
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' + '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
    password: ['', [ Validators.minLength(3), Validators.required ]],
    password2: ['', [ Validators.minLength(3), Validators.required ]],
    enabled: true,
  });

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get password2() { return this.registerForm.get('password2'); }

  constructor(
    private fbc: FormBuilder,
    private fb: FormBuilder,
    private navbarService: NavbarService,
    public usuarioService: UsuarioService,
    public clienteService: ClienteService,
    private modalService:   NgbModal,
    private spinnerService: NgxSpinnerService,
    public route: Router
    ) {
      
      this.formCliente = this.fbc.group({
        nombre: ['', Validators.required],
        username: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', Validators.required],
        cedula: ['', Validators.required],
        ruc: [''],
        ciudad: [''],
        nacionalidad: [''],
        direccion: [''],
        telefono: ['', Validators.required],
        sexo: ['', Validators.required],
        estado: [1]
      });

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
        if (roles[i].nombre === 'ROLE_RECEPCION') {
          this.menuRecepcion = navbarService.menuRecepcion;
          console.log(this.menuRecepcion);
        }
    }
    //se concatena los menus en caso de tener mas de un rol
    this.menuItems = [].concat(this.menuCliente, this.menuCajero, this.menuAdmin, this.menuRecepcion);
    console.log(this.menuItems, this.menuItems.length);
    
  }

  formCliente = this.fbc.group({
    nombre: ['', Validators.required],
    username: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required],
    cedula: ['', Validators.required],
    ruc: [''],
    telefono: ['', Validators.required],
    sexo: ['', Validators.required],
    estado: [1]
    });

  get correo() { return this.formCliente.get('email'); }
  get telefono() { return this.formCliente.get('telefono'); }

  ngOnInit(): void {
    this.usuario = this.usuarioService.obtenerUsuarioLogueado();
    if (this.usuarioService.obtenerUsuarioLogueado()){
      this.logueado = true;
    }else{
      this.logueado = false;
    }
    this.urlUsuario = "/cliente/modificar/" + this.usuario;
    console.log(this.urlUsuario);
  }

  logout() {
    this.usuarioService.logout();
  }

  open(content) {
    if(this.usuarioService.obtenerUsuarioLogueado()){
      //cargar los datos del usuario
      this.usuarioService.obtenerPerfilUsuario(this.usuarioService.obtenerUsuarioLogueado())
      .subscribe( (resp: any[]) => {
         this.usuarioPerfil = resp,
         this.formCliente.controls.username.setValue(this.usuarioPerfil.username);
         this.formCliente.controls.nombre.setValue(this.usuarioPerfil.nombre);
         this.formCliente.controls.apellido.setValue(this.usuarioPerfil.apellido);
         this.formCliente.controls.email.setValue(this.usuarioPerfil.email);
         this.formCliente.controls.cedula.setValue(this.usuarioPerfil.cedula);
         this.formCliente.controls.ruc.setValue(this.usuarioPerfil.ruc);
         this.formCliente.controls.telefono.setValue(this.usuarioPerfil.telefono);
         this.formCliente.controls.sexo.setValue(this.usuarioPerfil.sexo);
         this.formCliente.controls.estado.setValue(this.usuarioPerfil.estado);
      });;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      Swal.fire('Error', 'No tiene permisos para acceder a esta pagina...', 'error');
      this.route.navigateByUrl('/');
    }
  }

  open2(content) {
    this.modalService.dismissAll();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open3(content) {
    this.modalService.dismissAll();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  guardarCliente() {
    // console.warn(this.form.value);
      const id = this.usuarioService.obtenerUsuarioLogueado();
      let peticion: Observable<any>;
      console.log(this.formCliente.value)
         peticion = this.clienteService.modificarRecurso(this.formCliente.value, id);
         peticion.subscribe((result: any) =>  {
           Swal.fire(
             'Guardado!',
             'Se actualizaron los datos!',
             'success'
           );
         });
         this.modalService.dismissAll();
         this.ngOnInit();
  }

  misReservas(){
    this.route.navigate(['/reserva/mis-reservas/' + this.usuario]);
  }

/************************Login************************************ */  
  login() {
    this.spinnerService.show();
    this.usuarioService.login( this.loginForm.value)
    .subscribe( resp => {
      this.spinnerService.hide();
      if ( this.loginForm.get('remember').value ) {
        localStorage.setItem('username', this.loginForm.get('username').value);
      } else {
        localStorage.removeItem('username');
      }
      
      let roles: any[];
      roles = JSON.parse(localStorage.getItem('usuario')) || ' ';
      let band:any = null;
      localStorage.setItem('admin', 'false');
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < roles.length; i++) {
          console.log(roles[i]);
          if (roles[i].nombre === 'ROLE_ADMIN') {
            localStorage.setItem('admin', 'true');
            this.menuAdmin = this.navbarService.menu;
            console.log(this.menuItems);
            break;
          }
          if (roles[i].nombre === 'ROLE_CLIENTE') {
            this.menuCliente = this.navbarService.menu1;
            console.log(this.menuCliente);
          }
          if (roles[i].nombre === 'ROLE_CAJERO') {
            this.menuCajero = this.navbarService.menuCaja;
            console.log(this.menuCajero);
          }
          if (roles[i].nombre === 'ROLE_RECEPCION') {
            this.menuRecepcion = this.navbarService.menuRecepcion;
            console.log(this.menuRecepcion);
          }
      }
      //se concatena los menus en caso de tener mas de un rol
      this.menuItems = [].concat(this.menuCliente, this.menuCajero, this.menuAdmin, this.menuRecepcion);
      console.log(this.menuItems, this.menuItems.length);
      this.loginForm.reset(this.loginForm.controls.username );
      this.loginForm.reset(this.loginForm.controls.password );
    }, (err) => {
      this.spinnerService.hide();
      console.log(err);
      Swal.fire('Error', err.error.error === 'invalid_grant' || 'unauthorized' ? 'Usuario o contraseña incorrectos' : ' ', 'error');
    });

    this.modalService.dismissAll();
  }
  /************************************************************************************* */

  /************************Registro******************************************************************* */
  crearUsuario(content) {
    this.spinnerService.show();
    let usuarioId;
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {
      this.spinnerService.hide();
      console.log('no anda');
      return;
    }

    this.registerForm.controls.username.setValue(this.registerForm.controls.username.value.toLowerCase());
    this.loginForm.controls.username.setValue(this.registerForm.controls.username.value.toLowerCase());
    this.loginForm.controls.password.setValue(this.registerForm.controls.password.value);


    this.usuarioService.crearUsuario( this.registerForm.value )
      .subscribe( (resp:any) => {

        usuarioId = resp.usuarioId;
        console.log('usuario creado')
        this.usuarioService.asignarRol(usuarioId, 2 )
        .subscribe( (resp:any) => {});
        /*-----------generar token de confirmacion------*/
        //console.log('login', this.loginForm.value)
        this.usuarioService.confirmacionUsuario(this.loginForm.value).subscribe((r:any) => {
          //this.spinnerService.hide();
          let valor = false;
          this.usuarioService.modificarRecurso(valor, usuarioId).subscribe((resp:any) => {
            //console.log(resp);
          });
        });
        /*-----------------------------------------------*/
        //limpiar login form
        this.loginForm.reset(this.loginForm.controls.username );
        this.loginForm.reset(this.loginForm.controls.password );
        //limpiar register form
        this.registerForm.reset(this.registerForm.controls.nombre );
        this.registerForm.reset(this.registerForm.controls.apellido );
        this.registerForm.reset(this.registerForm.controls.cedula );
        this.registerForm.reset(this.registerForm.controls.fechaNac );
        this.registerForm.reset(this.registerForm.controls.sexo );
        this.registerForm.reset(this.registerForm.controls.telefono );
        this.registerForm.reset(this.registerForm.controls.nacionalidad );
        this.registerForm.reset(this.registerForm.controls.cedula );
        this.registerForm.reset(this.registerForm.controls.direccion );
        this.registerForm.reset(this.registerForm.controls.ruc );
        this.registerForm.reset(this.registerForm.controls.username );
        this.registerForm.reset(this.registerForm.controls.email );
        this.registerForm.reset(this.registerForm.controls.password );
        this.registerForm.reset(this.registerForm.controls.password2 );
        this.modalService.dismissAll();
        this.open2(content);

      }, (err) => {
        console.log(err);
        this.spinnerService.hide();
        Swal.fire('Error', err.error, 'error');
      });
  }

  campoNoValido( campo: string ): boolean {
    if (this.registerForm.get(campo).invalid && (this.registerForm.get(campo).touched || this.registerForm.get(campo).dirty)) {
      return true;
    } else {
      return false;
    }
  }

  campoNoValidoSexo( campo: string ): boolean {
    if (this.registerForm.get(campo).invalid && (this.registerForm.get(campo).touched || this.registerForm.get(campo).dirty) || ((this.registerForm.get('username').touched) && this.registerForm.get(campo).invalid)) {
      return true;
    } else {
      return false;
    }
  }

  userNoValido() {
    const user = this.registerForm.get('username').value;
    if (user.length < 3 && (this.username.touched || this.username.dirty) ) {
      return true;
    } else {
      return false;
    }
  }

  passwordNoValido() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if (pass1.length < 3 && (this.password.touched || this.password.dirty) ) {
      return true;
    } else {
      return false;
    }
  }
  passwordIguales() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if ( pass1 !== pass2 && (this.password2.touched || this.password2.dirty) ) {
      return true;
    } else {
      return false;
    }
  }


}
