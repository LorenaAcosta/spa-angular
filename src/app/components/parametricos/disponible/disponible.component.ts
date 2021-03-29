import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DisponibleService } from 'src/app/services/servicios/disponibilidad.service';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../../services/servicios/empleado.service';

@Component({
  selector: 'app-disponible',
  templateUrl: './disponible.component.html',
  styleUrls: ['./disponible.component.scss']
})

export class DisponibleComponent implements OnInit {

  servicios: any[] = [];
  listaServicios: any[] = [];
  disponibles: any[] = [];
  empleadoNombre: String;
  empleadoId;
  closeResult = '';
  

  form = this.fb.group({
    comision: ['', Validators.required],
    empleadoId: ['', Validators.required],
    servicioId: ['', Validators.required]
  });

  constructor(private servicioService: ServicioService,
    private disponibleService: DisponibleService,
    private empleadoService: EmpleadoService,
    private utilService: UtilesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    console.log(id);
    this.empleadoId = parseInt(this.route.snapshot.params.id);

    this.disponibleService.listarByEmpleadoV2(this.empleadoId).
      subscribe((resp: any[]) =>{
        this.disponibles = resp;
        console.log('disponible');
        console.log(resp);
      } 
      );

    this.servicioService.listarServiciosDisponibles(this.empleadoId).
      subscribe((resp: any[]) => {
        console.log('servicios');
        console.log(this.servicios);
        this.servicios = resp; });

    if (this.servicios.length == 0){
      this.servicioService.listarRecurso()
        .subscribe((resp: any[]) => {
          console.log('servicios si está vacio');
          this.servicios = resp;
          console.log(this.servicios); });
    }

  }


  // (click)="modal.close('Save click')"
  guardar() {
    this.form.controls.empleadoId.setValue(parseInt(this.empleadoId));
    console.log(this.form.value);
    let peticion: Observable<any>;

    peticion = this.disponibleService.agregarRecurso(this.form.value);
    peticion.subscribe((result: any) => {
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );

    });
    this.ngOnInit();
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.form.controls.empleadoId.setValue(parseInt(this.empleadoId));
      console.log(this.form.value);

    this.disponibleService.agregarRecurso(this.form.value)
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
