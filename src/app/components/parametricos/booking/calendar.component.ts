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
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  disponibleId: number;
  empleadoId: any;
  servicioId: number;
  dispo: any;

  horaInicial: any;

  fecha: number;
  horaInicio: any;

  model: NgbDateStruct;
  date: {year: number, month: number, day: number};
  turno: {hora: string};
  disponible: any[] = [];
  horarioEmp: any[] = [];

  horario: any[] = [];
  turnosArray: any[] = [];
  arrayObject: any[] = [];
  turnos: any[] = [];

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
              private empleadoService: EmpleadoService ,
              private disponibleService: DisponibleService,
              public util: UtilesService ) {
  }

  ngOnInit(): void {
    /* Obtiene el objeto disponible {disponibleId, } */
    this.disponibleId = this.route.snapshot.params.id;
    
    this.disponibleService.getRecurso(this.disponibleId)
     .subscribe( (resp: any) =>  {
       this.disponible = resp.disponibleId;
       this.empleadoId = resp.empleadoId.empleadoId;
       this.servicioId =  resp.servicioId.servicioId;
       this.dispo = resp;
       localStorage.setItem('empleado', this.empleadoId);
     });
  }


  selectToday() {
    this.model = this.calendar.getToday();
  }


  print() {
    this.printedOption = this.selectedOption;
    this.form.controls.empleado.setValue( localStorage.getItem('empleado'));
    this.form.controls.fechaReserva.setValue( localStorage.getItem('fecha') );
    this.form.controls.hora.setValue(this.selectedOption.toString().substr(-20, 5));
    this.form.controls.disponibleId.setValue(Number(this.disponibleId));
    this.form.controls.usuarioId.setValue(1);

    console.log(this.form);

    let peticion: Observable<any>;
    peticion = this.reservaService.agregarRecurso(this.form.value);
    peticion.subscribe((result: any) =>  {
      Swal.fire(
        'Reserva Confirmada!',
        'Se guardaron  los datos!',
        'success'
        );
      });
    this.redireccionar();
  }


  redireccionar() {
      this.router.navigateByUrl('booking/categorias');
  }

  getHorariosDisponibles() {
    let Today1 = Date();
    Today1 = ( this.model.year + '-' + this.model.month + '-' + this.model.day as string);
    console.log(Today1);
    localStorage.setItem('fecha', Today1);
    
    this.disponibleService.getHorasDisponibles(localStorage.getItem('categoria'), localStorage.getItem('servicio'), localStorage.getItem('empleado'), localStorage.getItem('fecha'))
    .subscribe( (resp: any) =>  {
      localStorage.setItem("horasDisponibles", JSON.stringify(resp));
      this.turnosArray = JSON.parse(localStorage.getItem("horasDisponibles"));
      console.log(this.turnosArray);
      console.log(this.turnosArray[0]);
      if (this.turnosArray[0] == null){
        Swal.fire('Lo siento!', 'No hay turnos disponibles para la fecha seleccionada', 'error');
      }
    });
  }
}
