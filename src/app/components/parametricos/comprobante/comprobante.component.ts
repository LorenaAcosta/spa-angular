import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ComprobanteService } from 'src/app/services/servicios/comprobante.service';
import { PuntosExpedicionService } from 'src/app/services/servicios/puntos-expedicion.service';
import { TipoComprobanteService } from 'src/app/services/servicios/tipo-comprobante.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import Swal from 'sweetalert2';
import { exit } from 'process';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.scss']
})
export class ComprobanteComponent implements OnInit {
  
  form = this.fb.group({
    tipoComprobanteId: ['', Validators.required],
    timbrado: ['', Validators.required, Validators.maxLength(8), Validators.minLength(8)],
    inicioVigencia: ['', Validators.required],
    finVigencia: ['', Validators.required],
    numeroInicial: ['1', Validators.required],
    numeroFinal: ['1', Validators.required],
    puntoExpedicionId: ['', Validators.required],
    puntoExpedicionCodigo: [''],
    estado: ['ACTIVO', Validators.required],
  });
  get finVigencia() { return this.form.get('finVigencia'); }
  boxForm = this.fb.group({
    descripcion: ['', Validators.required]
  });


  horario: any[] = [];
  tipos: any[] = [];
  puntos: any[] = [];
  horarioId: any;
  timbradoActivo: any;
  boxes: any;
  get timbrado() { return this.form.get('timbrado'); }
  closeResult: string;
  pageActual:any;


  constructor(private fb:             FormBuilder,
              private comprobanteService: ComprobanteService,
              private tipoComprobanteService: TipoComprobanteService,
              private puntoExpedicionService: PuntosExpedicionService,
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
        puntoExpedicionId: ['', Validators.required],
        puntoExpedicionCodigo: [''],
        estado: ['ACTIVO', Validators.required],
      });
}


  ngOnInit() {
    this.comprobanteService.listarRecurso().subscribe( (data: any[]) => {
        this.horario = data ;
    });
    this.tipoComprobanteService.listarRecurso().subscribe( (resp: any[]) => {
      this.tipos = resp ;
    });
    this.puntoExpedicionService.listarRecurso().subscribe( (resp: any[]) => {
      this.puntos = resp ;
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
      this.form.reset(this.form.controls.timbrado );
      this.ngOnInit();
    }, (error) => {
      console.log(error.error.error);
      Swal.fire(error.error.error, error.error.mensaje, 'warning');
    });
    this.modalService.dismissAll();
    this.comprobanteService.listarRecurso().subscribe( (data: any[]) => {this.horario = data ;});
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



  
  //open modal, add box
  openBox(content1) {
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.boxForm.value);
      this.tipoComprobanteService.agregarRecurso(this.boxForm.value)
      .subscribe((result: any) => {
          Swal.fire(
            'Guardado!',
            'Se guardaron los datos!',
            'success'
          );
        }); 
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  //open modal, Listar Boxes
  openBoxes(content2) {
    this.tipoComprobanteService.listarRecurso()
    .subscribe((result: any) => {
      this.boxes=result;
      }); 

    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  


  
  guardarTipo() {
    const id = this.route.snapshot.params.id;
    let peticion: Observable<any>;
    console.log(id);
    console.log(typeof id);
    if (typeof id === 'undefined') {
      peticion = this.tipoComprobanteService.agregarRecurso(this.boxForm.value);
      console.log(this.form.value);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se guardaron los datos!',
          'success'
        );
        this.ngOnInit();
      });
      this.modalService.dismissAll();
      this.form.reset(this.form.controls.value);
    }
    this.ngOnInit();
  }

  fechaFinNoValida() {
    const fin = this.form.get('finVigencia').value;
    const inicio = this.form.get('inicioVigencia').value;
    
    if ((inicio > fin) && (this.finVigencia.touched || this.finVigencia.dirty) ) {
      return true;
    } else {
      return false;
    }
  }

  campoNoValido( campo: string ): boolean {
    if (this.form.get(campo).invalid && (this.form.get(campo).touched || this.form.get(campo).dirty)) {
      return true;
    } else {
      return false;
    }
  }


}
