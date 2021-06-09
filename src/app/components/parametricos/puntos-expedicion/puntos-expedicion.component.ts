import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from 'src/app/services/servicios/horario.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { PuntosExpedicionService } from '../../../services/servicios/puntos-expedicion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/services/servicios/usuario.service';

@Component({
  selector: 'app-puntos-expedicion',
  templateUrl: './puntos-expedicion.component.html',
  styleUrls: ['./puntos-expedicion.component.scss']
})
export class PuntosExpedicionComponent implements OnInit {

 
  
  form = this.fb.group({
    descripcion: ['', Validators.required],
  });

  puntos: any[] = [];
  horarioId: any;
  empleadoId: any;
  closeResult: string;
  admin: boolean;



  constructor(private fb:             FormBuilder,
              private puntoService: PuntosExpedicionService,
              public util:           UtilesService,
              private route:          ActivatedRoute,
              private router:         Router,
              private modalService:   NgbModal,
              private spinnerService: NgxSpinnerService,
              private usuarioService: UsuarioService) {

      this.form = this.fb.group({    
        descripcion: ['', Validators.required], 
      });
}


  ngOnInit() {
    /*const id = this.route.snapshot.params.id;
    this.empleadoId= id;*/
    this.puntoService.listarRecurso().subscribe( (resp: any[]) => {
        this.puntos = resp ;
    });
    
    if(localStorage.getItem('admin') == 'true'){
      this.admin = true;
    } else{
      this.admin = false;
    }
  }



  guardar() {
    let peticion: Observable<any>;
    peticion = this.puntoService.agregarRecurso(this.form.value);
    peticion.subscribe((result: any) => {
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );
      this.form.reset(this.form.controls.descripcion );
    });
    
    this.modalService.dismissAll();
    this.puntoService.listarRecurso().subscribe( (resp: any[]) => {
      this.puntos = resp ;
    });
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
          this.puntoService.eliminarRecurso(id).subscribe();
          this.puntos.splice(pos, 1);
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }

  btnClick(categoriaId: any) {
    this.router.navigate(['ventas/listar/', categoriaId]);
    this.spinnerService.show();
  }

  spinner(): void{
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

}
