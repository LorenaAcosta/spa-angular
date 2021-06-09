import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
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
  
  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [ Validators.required, Validators.minLength(3) ]]
  });

  constructor(private route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private modalService:   NgbModal,
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

}
