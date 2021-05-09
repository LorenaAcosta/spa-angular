import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ComprobanteService } from 'src/app/services/servicios/comprobante.service';
import { TipoComprobanteService } from 'src/app/services/servicios/tipo-comprobante.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.scss']
})
export class ComprobanteComponent implements OnInit {
  
  form = this.fb.group({
    tipoComprobanteId: ['', Validators.required],
    timbrado: ['', Validators.required],
    inicioVigencia: ['', Validators.required],
    finVigencia: ['', Validators.required],
    numeroInicial: ['', Validators.required],
    numeroFinal: ['', Validators.required],
    numeroActual: ['', Validators.required],
    estado: ['', Validators.required],
  });

  horario: any[] = [];
  tipos: any[] = [];
  horarioId: any;
  get timbrado() { return this.form.get('timbrado'); }
  closeResult: string;


  constructor(private fb:             FormBuilder,
              private comprobanteService: ComprobanteService,
              private tipoComprobanteService: TipoComprobanteService,
              private util:           UtilesService,
              private route:          ActivatedRoute,
              private router:         Router,
              private modalService:   NgbModal) {

      this.form = this.fb.group({    
        tipoComprobanteId: ['', Validators.required],
        timbrado: ['', Validators.required],
        inicioVigencia: ['', Validators.required],
        finVigencia: ['', Validators.required],
        numeroInicial: ['', Validators.required],
        numeroFinal: ['', Validators.required],
        numeroActual: ['', Validators.required],
        estado: ['', Validators.required],
      });
}


  ngOnInit() {
    this.comprobanteService.listarRecurso().subscribe( (data: any[]) => {
        this.horario = data ;
    });
    this.tipoComprobanteService.listarRecurso().subscribe( (resp: any[]) => {
      this.tipos = resp ;
  });
  }



  guardar() {
    let peticion: Observable<any>;
    this.form.controls.estado.setValue('ACTIVO');
    peticion = this.comprobanteService.agregarRecurso(this.form.value);
    peticion.subscribe((result: any) => {
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );
    });
    this.modalService.dismissAll();
    this.ngOnInit();
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
          this.comprobanteService.eliminarRecurso(id).subscribe();
          this.horario.splice(pos, 1);
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }


}
