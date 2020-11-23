import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from 'src/app/services/servicios/horario.service';

import { ReservaService } from 'src/app/services/servicios/reserva.service';
import { Time } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DisponibleService } from '../../../services/servicios/disponibilidad.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  disponibleId: number;
  empleadoId: number;
  servicioId: number;

  fecha: number;
  horaInicio: any;

  model: NgbDateStruct;
  date: {year: number, month: number, day: number};
  turno: {hora: string};
  disponible: any[] = [];

  horario: any[] = [];
  turnosArray: any[] = [];
  arrayObject: any[] = [];
  turnos: any[] = [];
  reservas: any[] = [];

  i: number;
  f: number;

  selectedOption: string;
  printedOption: string;
  selectedTime: string;

  form = this.fb.group({
    empleado: [''],
    fechaReserva: [''],
    hora: ['' ],
    disponibleId: [''],
    usuarioId: ['']
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private calendar: NgbCalendar,
              private route: ActivatedRoute,
              private horarioService: HorarioService,
              private reservaService: ReservaService,
              private disponibleService: DisponibleService ) {
  }

  ngOnInit(): void {
    /* Obtiene el objeto disponible {disponibleId, } */
    this.disponibleId = this.route.snapshot.params.id;
    this.disponibleService.getRecurso(this.disponibleId)
     .subscribe( (resp: any) =>  {
       this.disponible = resp.disponibleId;
       this.empleadoId = resp.empleadoId.empleadoId;
       this.servicioId =  resp.servicioId.servicioId;
     /*  console.log(resp);
         console.log(this.disponible);
         console.log(this.empleadoId);
         console.log(this.servicioId); */
     });
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  print() {
    this.printedOption = this.selectedOption;
    this.form.controls.empleado.setValue( Number(this.empleadoId));
    this.form.controls.fechaReserva.setValue(this.model.year +  '-' + this.model.month + '-' +  this.model.day );
    this.form.controls.hora.setValue(this.selectedOption);
    this.form.controls.disponibleId.setValue(Number(this.disponibleId));
    this.form.controls.usuarioId.setValue(1);

   // console.log(this.form);
    // console.warn(this.form.value);
    let peticion: Observable<any>;
    peticion = this.reservaService.agregarRecurso(this.form.value);
    peticion.subscribe((result: any) =>  {
      Swal.fire(
        'Confirmado!',
        'Se guardaron  los datos!',
        'success'
        );
      });
  //  this.router.navigateByUrl('booking/categorias');
  }

  getSelectedDay() {

    this.turnosArray = [];
    /*Obtiene el horario del empleado */
    this.horarioService.obtenerHorario(this.empleadoId)
    .subscribe( (resp: any) =>  this.horario = resp  );
    // 07, 11

    /* Obtiene los turnos guardados del empleado y de la fecha*/
    this.reservaService.getTurnos(this.empleadoId)
    .subscribe( (resp: any) =>  this.turnos = resp  );

    /*genera el array de horas disponibles*/
    this.generateArray();

  }

  generateArray() {
    const Hinicio = this.horario[0].horaInicio ; // 07:00
    const Hfin = this.horario[0].horaFin; // 11:00
    this.i = Hinicio.substr(-20, 2);   //07
    this.f = Hfin.substr(-20, 2);   //11
    const length = (this.f - this.i);  //5
    const long = this.turnos.length;
    console.log('longitud: ' + long );
    for (let x = 0; x < length; x++) { // 5
      // tslint:disable-next-line:prefer-for-of
      for ( let y = 0; y < long; y++ ) {
        const horita =  this.turnos[y].hora;  // 07:00
        const xVar = horita.substr(-20, 2); //07
        console.log('horita' + horita);
        console.log('xVar' + Number(xVar)); // 09
        if ( Number(xVar) === Number(this.i) ) {   // 07 = 07 
          this.i++;
        } else {
          this.turnosArray.push( this.i.toString() + ':00'  );
          this.i++;
        }
      } // {'01:00, '02:00', 03:00, 04:00, 05:00'}
    }
    this.arrayObject = this.turnosArray as string[];
  }
}


