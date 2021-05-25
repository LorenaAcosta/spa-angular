import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HorarioService } from 'src/app/services/servicios/horario.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit {

  
  form = this.fb.group({
    diaTrabajo: ['', Validators.required],
    horaFin: ['', Validators.required],
    horaInicioDescanso: ['', Validators.required],
    horaInicio: ['', Validators.required],
    horaFinDescanso: ['', Validators.required],
    empleadoId: ['', Validators.required],
  });

  horario: any[] = [];
  horarioId: any;
  empleadoId: any;
  closeResult: string;

  weekDays = [
    {"d": "Lunes", "cod": 1},
    {"d": "Martes", "cod": 2},
    {"d": "Miércoles", "cod":3},
    {"d": "Jueves", "cod":4},
    {"d": "Viernes", "cod":5},
    {"d": "Sábado", "cod":6},
    {"d": "Domingo", "cod":0}]



  constructor(private fb:             FormBuilder,
              private horarioService: HorarioService,
              public util:           UtilesService,
              private route:          ActivatedRoute,
              private router:         Router,
              private modalService:   NgbModal) {

      this.form = this.fb.group({    
        diaTrabajo: ['', Validators.required],
        horaFin: ['', Validators.required],
        horaInicioDescanso: ['', Validators.required],
        horaInicio: ['', Validators.required],
        horaFinDescanso: ['', Validators.required],
        empleadoId: ['', Validators.required],  
      });
}


  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.empleadoId= id;
    this.horarioService.getHorariosById(this.empleadoId).subscribe( (resp: any[]) => {
        this.horario = resp ;
    });
  }



  guardar() {
    this.form.controls.empleadoId.setValue(parseInt(this.empleadoId));
    let peticion: Observable<any>;
    peticion = this.horarioService.agregarRecurso(this.form.value);
    peticion.subscribe((result: any) => {
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );
      this.ngOnInit();
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
          this.horarioService.eliminarRecurso(id).subscribe();
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


