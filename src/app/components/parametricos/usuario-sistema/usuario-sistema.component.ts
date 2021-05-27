import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/services/servicios/cliente.service';
import { ComprobanteService } from 'src/app/services/servicios/comprobante.service';
import { PuntosExpedicionService } from 'src/app/services/servicios/puntos-expedicion.service';
import { RolService } from 'src/app/services/servicios/rol.service';
import { TipoComprobanteService } from 'src/app/services/servicios/tipo-comprobante.service';
import { UsuarioService } from 'src/app/services/servicios/usuario.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-sistema',
  templateUrl: './usuario-sistema.component.html',
  styleUrls: ['./usuario-sistema.component.scss']
})
export class UsuarioSistemaComponent implements OnInit {

  public formSubmitted = false;
  
  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    //sexo: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' + '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
    password: ['', [ Validators.minLength(3) ]],
    password2: ['', [ Validators.minLength(3) ]],
    enabled: true,
  });

  horario: any[] = [];
  tipos: any[] = [];
  usuarios: any[] = [];
  roles: any[] = [];
  puntos: any[] = [];
  horarioId: any;
  timbradoActivo: any;
  //get timbrado() { return this.form.get('timbrado'); }
  closeResult: string;


  constructor(private fb:             FormBuilder,
              private usuarioService: UsuarioService,
              private rolService: RolService,
              private tipoComprobanteService: TipoComprobanteService,
              private puntoExpedicionService: PuntosExpedicionService,
              public clienteService: ClienteService,
              private util:           UtilesService,
              private route:          ActivatedRoute,
              private router:         Router,
              private modalService:   NgbModal) {
}


  ngOnInit() {
    this.clienteService.listarRecurso().subscribe( (resp: any[]) => {
      this.usuarios = resp ;
    });

    this.rolService.listarRecurso().subscribe( (resp: any[]) => {
      this.roles = resp ;
      console.log('roles', resp)
    });
    
    this.tipoComprobanteService.listarRecurso().subscribe( (resp: any[]) => {
      this.tipos = resp ;
    });
    this.puntoExpedicionService.listarRecurso().subscribe( (resp: any[]) => {
      this.puntos = resp ;
    });
  }

  guardar() {
    let usuarioId;
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {
      console.log('no anda');
      return;
    }

    this.usuarioService.crearUsuario( this.registerForm.value )
      .subscribe( (resp:any) => {
        usuarioId = resp.usuarioId;
        console.log('usuario creado')
        console.log(resp);
        /*this.usuarioService.asignarRol(usuarioId, 2 )
        .subscribe( (resp:any) => {});*/
        Swal.fire(
          'Guardado!',
          'Se guardaron los datos!',
          'success'
        );
        this.ngOnInit();
      }, (err) => {
        console.log(err);
        Swal.fire('Error', err.error, 'error');
      });
      this.modalService.dismissAll();
  }

  redirigir(id) {
    this.router.navigate(['/config/rol/' + id]);
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

  
  borrar(id: any, pos: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podrás revertir esta operación!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.value) {
          //this.comprobanteService.eliminarRecurso(id).subscribe();
          //this.horario.splice(pos, 1);
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
        this.ngOnInit();
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
