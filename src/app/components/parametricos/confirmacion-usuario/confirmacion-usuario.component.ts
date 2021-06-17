import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavbarService } from 'src/app/shared/navbar/navbar.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/servicios/usuario.service';

@Component({
  selector: 'app-confirmacion-usuario',
  templateUrl: './confirmacion-usuario.component.html',
  styleUrls: ['./confirmacion-usuario.component.scss']
})
export class ConfirmacionUsuarioComponent implements OnInit {

  expirado: any;
  closeResult: string;
  usId: any;
  menuItems: any[] = [];
  menuCliente: any[] = [];
  menuCajero: any[] = [];
  menuRecepcion: any[] = [];
  menuAdmin: any[] = [];
  
  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [ Validators.required, Validators.minLength(3) ]]
  });

  public loginForm2 = this.fb.group({
    username: [localStorage.getItem('username') || '', Validators.required],
    password: ['', [ Validators.required, Validators.minLength(3) ]],
    remember: [false]
  });

  constructor(private route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private modalService:   NgbModal,
              private navbarService: NavbarService,
              private fb: FormBuilder,
              private spinnerService: NgxSpinnerService,
              public router: Router
    ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    const access_token = this.route.snapshot.params.access_token;
    console.log(access_token);
    let payload = JSON.parse( atob( access_token.split('.')[1] ) );
    console.log('payload', payload);
    console.log('usuario', payload.usuarioId);
    this.usId = payload.usuarioId;
    let valor = true;
    this.usuarioService.habilitarDeshabilitar(valor, payload.usuarioId, access_token).subscribe((resp:any) => {
      //console.log('resp', resp);
      this.spinnerService.hide();
    })
    
    const ahora = new Date().getTime()
    this.expirado = (ahora > payload.exp * 1000) ? true: false;
    if (ahora > payload.exp * 1000){
      Swal.fire(
        'Expirado!',
        'El enlace ha expirado',
        'warning'
      );
    } else {
      Swal.fire(
        'Listo!',
        'Su cuenta se encuentra habilitada',
        'success'
      );
    }
  }

  login(){
    this.router.navigate(['/login']);
  }

  open(content) {
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

  enviar(){
    this.usuarioService.modificarRecurso(true, this.usId).subscribe((resp:any)=>{
      console.log(resp);
      this.loginForm.reset(this.loginForm.controls.username );
      this.loginForm.reset(this.loginForm.controls.password );
    });
    this.usuarioService.confirmacionUsuario(this.loginForm.value).subscribe((r:any) => {
      let valor = false;
      this.usuarioService.modificarRecurso(valor, this.usId).subscribe((resp:any) => {
        //console.log(resp);
      });
    }, (err) => {
      console.log(err);
      Swal.fire('Error', err.error.error === 'invalid_grant' || 'unauthorized' ? 'Usuario o contraseña incorrectos' : ' ', 'error');
    });
    this.modalService.dismissAll();
  }

  /************************Login************************************ */  
  login2() {
    this.spinnerService.show();
    this.usuarioService.login( this.loginForm2.value)
    .subscribe( resp => {
      this.spinnerService.hide();
      if ( this.loginForm2.get('remember').value ) {
        localStorage.setItem('username', this.loginForm2.get('username').value);
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
      this.loginForm2.reset(this.loginForm2.controls.username );
      this.loginForm2.reset(this.loginForm2.controls.password );
    }, (err) => {
      this.spinnerService.hide();
      console.log(err);
      Swal.fire('Error', err.error.error === 'invalid_grant' || 'unauthorized' ? 'Usuario o contraseña incorrectos' : ' ', 'error');
    });

    this.modalService.dismissAll();
  }

  open2(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


}
