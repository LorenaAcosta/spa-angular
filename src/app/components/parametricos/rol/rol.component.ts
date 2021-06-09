import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { DisponibleService } from 'src/app/services/servicios/disponibilidad.service';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import { HorarioService } from 'src/app/services/servicios/horario.service';
import { RolService } from 'src/app/services/servicios/rol.service';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { UsuarioService } from 'src/app/services/servicios/usuario.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
  
  form = this.fb.group({
    usuarioId: ['', Validators.required],
    rolId: ['', Validators.required]
  });

  rolesUsuario: any[] = [];
  roles: any[] = [];
  datosUsuario:any;
  nombreCompleto:any = '.';
  horarioId: any;
  usuarioId: any;
  closeResult: string;

  constructor(private fb:             FormBuilder,
    private rolService: RolService,
    private usuarioService: UsuarioService,
    public util:           UtilesService,
    private route:          ActivatedRoute,
    private router:         Router,
    private spinnerService: NgxSpinnerService,
    private modalService:   NgbModal) { 
      this.form = this.fb.group({    
        usuarioId: ['', Validators.required],
        rolId: ['', Validators.required]
      });
    }

    ngOnInit() {
      const id = this.route.snapshot.params.id;
      this.usuarioId= id;
      this.spinnerService.show();
      this.rolService.listarRolPorUsuario(this.usuarioId).subscribe( (resp: any[]) => {
          this.rolesUsuario = resp ;
          //setTimeout(() => {
            this.spinnerService.hide();
          //}, 200);
      });

      this.rolService.listarRolNoAsignadosPorUsuario(this.usuarioId).subscribe( (resp: any[]) => {
        this.roles = resp ;
      });

      this.usuarioService.obtenerPerfilUsuario(this.usuarioId).subscribe( (resp: any[]) => {
        this.datosUsuario = resp;
        this.nombreCompleto = this.datosUsuario.nombre + ' ' + this.datosUsuario.apellido;
      });
    }
  
    guardar() {
      this.form.controls.usuarioId.setValue(parseInt(this.usuarioId));
      let peticion: Observable<any>;
      peticion = this.rolService.asignarRol(this.usuarioId, this.form.get('rolId').value);
      peticion.subscribe((result: any) => {
        Swal.fire(
          'Guardado!',
          'Se guardaron los datos!',
          'success'
        );
        this.ngOnInit();
      });
      this.modalService.dismissAll();
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
            this.rolService.eliminarRolAsignado(this.usuarioId,id).subscribe((result: any) => {
              Swal.fire(
                'Eliminado!',
                'Los datos han sido eliminados.',
                'success'
              );
              this.ngOnInit();
            });
            //this.roles.splice(pos, 1);
          }
        });
    }
    
}
